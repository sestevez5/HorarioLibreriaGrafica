import { ConfiguracionGrafico } from '../configuracionGrafico.model';

import { Actividad } from '../actividad.model';
import { DiaSemana } from '../diaSemana.model';
import { IActividadesSesion } from '../actividadesSesion.model';
import { Sesion } from '../sesion';
import { Plantilla } from '../plantilla.model';
import { Subject } from 'rxjs';
import { ActividadG } from '../actividadG.model';
import * as d3 from 'd3';
import { CONFIGURACION_GRAFICO } from './configuracionPorDefecto';
import { Utilidades } from './utils';



export class HorarioG {

  svg: any;
  elementoRaiz: any;
  plantilla: Plantilla;
  actividadesG: ActividadG[] = [];
  

  // Observables.
  seleccionActividad$ = new Subject<ActividadG>();    // Emite un valor cuando se selecciona una actividad
  moverActividad$ = new Subject<ActividadG>();        // Emite un valor cuando se intenta mover una actividad
  duplicarActividad$ = new Subject<ActividadG>();     // Emite un valor cuando se intenta duplicar una actividad
  eliminarActividad$ = new Subject<ActividadG>();     // Emite un valor cuando se intenta eliminar una actividad
  anyadirActividadEnSesion$ = new Subject<Sesion>();  // Emite un valor cuando se intenta añadir una actividad en la misma sesión que la actividad seleccionada


  constructor(elementoRaiz: string) {
    this.elementoRaiz = elementoRaiz;  
  }

  //----------------------------------------------------------------------------------------------------------
  // MÉTODOS PÚBLICOS
  //----------------------------------------------------------------------------------------------------------
  public generarGrafico(configuracionGrafico: ConfiguracionGrafico, plantillaActual?: Plantilla) {


    if (this.svg) {
      d3.select('svg').remove();
    }

    this.svg = d3.select(this.elementoRaiz).append('svg');
    this.establecerParametrosConfiguracion(configuracionGrafico);
    this.configurarSvg(this.svg);
    this.renderizarPanelHorario(this.svg);
    this.renderizarPanelesDiasSamanas();
    if (plantillaActual) {
      this.plantilla = plantillaActual;
      this.renderizarPlantilla(this.plantilla);
    }
    this.renderizarActividades();
  }

  public actualizarActividades(actividades: Actividad[]) {

    this.actividadesG = [];
    actividades.forEach(
      act => {
        const nuevaActividadG = new ActividadG(act);
        this.actividadesG.push(nuevaActividadG);
      }
    );

    Utilidades.calcularFactorAnchoActividadesG(this.actividadesG, this.actividadesG);
    Utilidades.calcularColoresActividadesG(this.actividadesG);

    this.renderizarActividades();

  }

  private configurarSvg(svg:any)
  {
    //-------------------------------------------------
    // Definición del SVG
    //-------------------------------------------------
    svg
      .attr('width', CONFIGURACION_GRAFICO.grafico.anchoGrafico)
      .attr('height', CONFIGURACION_GRAFICO.grafico.altoGrafico)

    //-------------------------------------------------
    // Definición del rectángulo
    //-------------------------------------------------
    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('id', 'fondografico')
      .attr('fill', CONFIGURACION_GRAFICO.grafico.colorGrafico)
      .attr('rx', '10')
      .attr('ry', '10')

    Utilidades.anyadirDefs(svg);

  }

  private establecerParametrosConfiguracion(configuracionGrafico: ConfiguracionGrafico) {

    
    configuracionGrafico.configuracionSemana?CONFIGURACION_GRAFICO.configuracionSemana = configuracionGrafico.configuracionSemana:null;
    configuracionGrafico.actividades?.mostrarPanelAcciones?CONFIGURACION_GRAFICO.actividades.mostrarPanelAcciones = configuracionGrafico.actividades?.mostrarPanelAcciones:CONFIGURACION_GRAFICO.actividades.mostrarPanelAcciones=false;
    configuracionGrafico.actividades?.tamanyoTexto?CONFIGURACION_GRAFICO.actividades.tamanyoTexto = configuracionGrafico.actividades?.tamanyoTexto:null;
    configuracionGrafico.panelSesiones?.colorCuerpo?CONFIGURACION_GRAFICO.panelSesiones.colorCuerpo = configuracionGrafico.panelSesiones.colorCuerpo:null;
    configuracionGrafico.panelSesiones?.alto?CONFIGURACION_GRAFICO.panelSesiones.alto = configuracionGrafico.panelSesiones.alto:null;
    configuracionGrafico.panelSesiones?.ancho?CONFIGURACION_GRAFICO.panelSesiones.ancho = configuracionGrafico.panelSesiones.ancho:null;

    // Cálculo del rango en horas del horario
    const fechaFin: Date = Utilidades.convertirCadenaHoraEnTiempo(CONFIGURACION_GRAFICO.configuracionSemana.horaMaxima);
    const fechaInicio: Date = Utilidades.convertirCadenaHoraEnTiempo(CONFIGURACION_GRAFICO.configuracionSemana.horaMinima);
    // El resultado vienen en milisegundos y los convierto en horas.
    const rangoEnHoras = (fechaFin.getTime()-fechaInicio.getTime())/(3600000);
    const factorAlto = CONFIGURACION_GRAFICO.panelSesiones.alto;
    const factorAncho = CONFIGURACION_GRAFICO.panelSesiones.ancho;

    CONFIGURACION_GRAFICO.grafico.anchoGrafico = parseFloat(d3.select(this.elementoRaiz).style('width'))*factorAncho;
    CONFIGURACION_GRAFICO.grafico.altoGrafico = parseFloat(d3.select(this.elementoRaiz).style('height'))*factorAlto * Math.max(1, rangoEnHoras / 7)-22;


    // Establecer dimensiones del panel que contiene las barras.
    CONFIGURACION_GRAFICO.panelHorario.anchoPanelHorario  = CONFIGURACION_GRAFICO.grafico.anchoGrafico * ((100-CONFIGURACION_GRAFICO.grafico.margenGrafico.margenIzquierdoGrafico - CONFIGURACION_GRAFICO.grafico.margenGrafico.margenDerechoGrafico)/100);
    CONFIGURACION_GRAFICO.panelHorario.altoPanelHorario   = CONFIGURACION_GRAFICO.grafico.altoGrafico * ((100-CONFIGURACION_GRAFICO.grafico.margenGrafico.margenSuperiorGrafico - CONFIGURACION_GRAFICO.grafico.margenGrafico.margenInferiorGrafico)/100);

    // Establecer escala horizontal: Serán bandas que identifiquen a los días de la semana
    CONFIGURACION_GRAFICO.escalas.escalaHorizontal = d3.scaleBand()
      .domain(Utilidades.obtenerDiasSemanaHorario().map(ds=> ds.denominacionLarga))
      .range([0, CONFIGURACION_GRAFICO.panelHorario.anchoPanelHorario])
      .paddingInner(0.0)
      .paddingOuter(0.0);

    // Establecer escala vertical:
    CONFIGURACION_GRAFICO.escalas.escalaVertical = d3.scaleTime()
      .domain([Utilidades.minimoIntervaloTemporal(), Utilidades.maximoIntervaloTemporal()])
      .range([0, CONFIGURACION_GRAFICO.panelHorario.altoPanelHorario]);


    // Calcular el ancho de las sesiones.
    CONFIGURACION_GRAFICO.panelSesiones.anchoSesion = parseFloat(CONFIGURACION_GRAFICO.escalas.escalaHorizontal.bandwidth()) * (100-CONFIGURACION_GRAFICO.panelSesiones.margenLateral * 2)*0.01;

  }

  //----------------------------------------------------------------------------------------------------------
  // MÉTODOS DE RENDERIZADO
  //----------------------------------------------------------------------------------------------------------
  public renderizarGrafico(configuracionGrafico: ConfiguracionGrafico, plantilla?: Plantilla) {
    window.addEventListener('resize', this.generarGrafico.bind(this, configuracionGrafico, plantilla));
    this.generarGrafico(configuracionGrafico, plantilla);
  }

  private renderizarPanelHorario(svg:any) {

    //-------------------------------------------------
    // Definición del panel
    //-------------------------------------------------
    const coordenadaXPanel = CONFIGURACION_GRAFICO.grafico.anchoGrafico as number * (CONFIGURACION_GRAFICO.grafico.margenGrafico.margenIzquierdoGrafico / 100);
    const coordenadaYPanel = CONFIGURACION_GRAFICO.grafico.altoGrafico as number * (CONFIGURACION_GRAFICO.grafico.margenGrafico.margenSuperiorGrafico / 100);
    const panelHorario = svg.append('g')
      .attr('id', 'panelHorario')
      .attr('transform', `translate(${coordenadaXPanel},${coordenadaYPanel})`)
      .attr('width', CONFIGURACION_GRAFICO.panelHorario.anchoPanelHorario)
      .attr('height', CONFIGURACION_GRAFICO.panelHorario.altoPanelHorario)


    //-------------------------------------------------
    // Rectángulo asociado
    //-------------------------------------------------
    panelHorario.append('rect')
      .attr('id', 'fondoPanelHorario')
      .attr('width', CONFIGURACION_GRAFICO.panelHorario.anchoPanelHorario)
      .attr('height', CONFIGURACION_GRAFICO.panelHorario.altoPanelHorario)
      .attr('fill', CONFIGURACION_GRAFICO.panelHorario.colorPanelHorario);

    //-------------------------------------------------
    // Adición del eje X
    //-------------------------------------------------
    var ejeXGenerator = d3.axisTop(CONFIGURACION_GRAFICO.escalas.escalaHorizontal as d3.ScaleBand<string>);

    // eliminamos las marcas "ticks"
    ejeXGenerator.tickSize(0);

    const ejeX = panelHorario.append('g')
      .attr('class', 'ejeX')
      .call(ejeXGenerator);

    // Elimnamos la línea del eje vertical.
    ejeX.select(".domain").remove()

    ejeX.selectAll(".tick text").attr("font-size", 20);


    //-------------------------------------------------
    // Adición del eje Y
    //-------------------------------------------------
    const inicioHora=parseInt(CONFIGURACION_GRAFICO.configuracionSemana.horaMinima.substring(0, 2));
    const inicioMinuto = parseInt(CONFIGURACION_GRAFICO.configuracionSemana.horaMinima.substring(3, 5));
    const fechaInicio: Date = new Date();
    fechaInicio.setHours(inicioHora);
    fechaInicio.setMinutes(inicioMinuto);

    const finHora=parseInt(CONFIGURACION_GRAFICO.configuracionSemana.horaMaxima.substring(0, 2));
    const finMinuto = parseInt(CONFIGURACION_GRAFICO.configuracionSemana.horaMaxima.substring(3, 5));
    const fechaFin: Date = new Date();
    fechaFin.setHours(finHora);
    fechaFin.setMinutes(finMinuto);

    const x = d3.scaleTime()
    .domain([fechaInicio.setMinutes(fechaInicio.getMinutes()-1), fechaFin])
    .range([0, CONFIGURACION_GRAFICO.panelHorario.altoPanelHorario]);


    var ejeYGenerator = d3.axisLeft(x);

    ejeYGenerator.ticks(d3.timeMinute.every(60));


    const ejeY = panelHorario.append('g')
      // .attr('transform', 'translate(-10,0)' )
      .attr('class', 'ejeY')
      .call(ejeYGenerator);

      ejeY.select(".domain").remove()


    // ejeY.selectAll(".tick text").attr("font-size", 10);



    //-------------------------------------------------
    // Devolución
    //-------------------------------------------------
    return panelHorario;
  }

  private renderizarPanelesDiasSamanas() {

    //-------------------------------------------------
    // Definición del panel
    //-------------------------------------------------
    const aux: any = d3.select('g#panelHorario').selectAll('g#panelDiaSemana').data(Utilidades.obtenerDiasSemanaHorario());
    const panelesDiasSemana = d3.select('g#panelHorario').selectAll('g#panelDiaSemana').data(Utilidades.obtenerDiasSemanaHorario()).enter().append('g');

    panelesDiasSemana.merge(aux)
      .attr('id', (d: DiaSemana) => d.codigo)
      .attr('class', 'panelDiaSemana')
      .attr('transform', (d: DiaSemana) => `translate(${CONFIGURACION_GRAFICO.escalas.escalaHorizontal ? CONFIGURACION_GRAFICO.escalas.escalaHorizontal(d.denominacionLarga) : 0},0)`);

    panelesDiasSemana.exit().remove();

    panelesDiasSemana
      .append('line')
      .attr('x1', CONFIGURACION_GRAFICO.escalas.escalaHorizontal?.bandwidth)
      .attr('y1', 0)
      .attr('x2', CONFIGURACION_GRAFICO.escalas.escalaHorizontal?.bandwidth)
      .attr('y2', CONFIGURACION_GRAFICO.panelHorario.altoPanelHorario as number)
      .attr('stroke-width', '0.1')
      .attr('stroke', 'black')
      .attr('stroke-dasharray','1')

    //-------------------------------------------------
    // Devolución
    //-------------------------------------------------
    return panelesDiasSemana;

  }

  private renderizarPlantilla(pl: Plantilla) {

    d3.selectAll('g.panelSesiones').remove();

    d3.selectAll('g.panelDiaSemana').nodes().forEach(
      (nodo: any) => {
        const sesionesACrear = pl.sesionesPlantilla
          .filter(sesion => sesion.diaSemana === nodo['id']);
        this.renderizarSesiones('g#' + nodo['id'], sesionesACrear)
      }
    );
  }

  private renderizarActividades() {
    

    d3.selectAll('g.panelSesionActividades').remove();

    d3.selectAll('g.panelDiaSemana').nodes().forEach(
       (nodo: any) => {
         const actividadesACrear = this.actividadesG.filter(actG => actG.sesion.diaSemana === nodo['id']);
         this.renderizarActividadesPorDiaSemana('g#' + nodo['id'], actividadesACrear)
       }
     );


  }
  
  private renderizarSesiones(panelDiaSemana: string, sesiones: Sesion[]) {

    const anchoSesion = CONFIGURACION_GRAFICO.panelSesiones.anchoSesion ? CONFIGURACION_GRAFICO.panelSesiones.anchoSesion.toString() : '0';

    // Definición del panel
    const panelSesion = d3.select(panelDiaSemana).selectAll('g#sesion' + 'pp').data(sesiones).enter().append('g')
      .attr('transform', d => `translate(${CONFIGURACION_GRAFICO.panelSesiones.margenLateral},${CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.horaInicio))})`)
      .attr('class', 'panelSesion')
      .attr('id', d => 'ses' + d.idSesion);

    const panelCabeceraSesion = panelSesion.append('g')
      .attr('class', 'panelCabeceraSesion');

    // Definicion del rectángulo que representa a la cabecera de la sesión.
    panelCabeceraSesion.append('rect')
      .attr('class', 'fondoPanelSesionCabecera')
      .attr('id', d => 'fondoPanelSesionCabecera' + d.idSesion)
      .attr('height', CONFIGURACION_GRAFICO.panelSesiones.altoCabecera)
      .attr('width', parseFloat(anchoSesion))
      .attr('fill', CONFIGURACION_GRAFICO.panelSesiones.colorCabecera);

    panelCabeceraSesion.append('text')
      .attr('x', parseInt(anchoSesion) / 2)
      .text(d => d.horaInicio + ' - ' + d.horaFin)
      .attr('y', CONFIGURACION_GRAFICO.panelSesiones.altoCabecera / 2)
      .attr('font-size', '.5em')
      .attr('dominant-baseline', 'central')
      .attr('text-anchor', 'middle')

    const panelCuerpoSesion = panelSesion.append('g')
      .attr('class', 'panelCabeceraSesion')
      .attr('transform', d => `translate(0,${CONFIGURACION_GRAFICO.panelSesiones.altoCabecera})`);

    // Definición del fondo.
    panelCuerpoSesion.append('rect')
      .attr('class', 'fondoPanelSesion')
      .attr('id', d => 'fondoPanelSesion' + d.idSesion)
      .attr('height', (d: Sesion) => {
        const coordenadaHoraInicio = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.horaInicio));
        const coordenadaHoraFin = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.horaFin));
        return coordenadaHoraFin - coordenadaHoraInicio - CONFIGURACION_GRAFICO.panelSesiones.altoCabecera;
      })
      .attr('width', parseFloat(anchoSesion))
      .attr('fill', CONFIGURACION_GRAFICO.panelSesiones.colorCuerpo)
      .on("click", (d: any, e:any) => {

        this.anyadirActividadEnSesion$.next(e);
      });


  } 


  private renderizarActividadesPorDiaSemana(panelDiaSemana: string, actividadesG: ActividadG[]) {

    // Paso 0: Transformamos la colección de actividades agrupándolas por sesiones.
    const actividadesSesion: IActividadesSesion[] = Utilidades.obtenerActividadesSesiones(actividadesG);

    // Paso 1:  Crear los paneles que representarán a las actividades de una sesión
    //const panelesSesionActividades = this.generarPanelesActividadesSesion(panelDiaSemana, actividadesSesion);

    const panelesSesionActividades = d3.select(panelDiaSemana)
      .selectAll('g#act' + 'xx')
      .data(actividadesSesion)
      .enter()
      .append('g')
      .attr('transform', d => `translate(0,${CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaInicio))})`)
      .attr('class', 'panelSesionActividades')
      .attr('id', d => 'panelSesionActividades' + d.sesion.idSesion)
      .attr('data-actividades', d => d.actividades.map(act => act.idActividad).join(','))
      .attr('data-actividadVisible', d => d.actividades[0].idActividad);

    // Paso 2: Crear la cabecera de los paneles anteriores.
    const panelCabeceraSesionActividades = this.renderizarActividadesPorSesionActividad(panelesSesionActividades, actividadesSesion);
  } 

  private renderizarActividadesPorSesionActividad(panelSesionActividades: any, actividadesSesion: IActividadesSesion[]) {
    const anchoSesion = CONFIGURACION_GRAFICO.panelSesiones.anchoSesion ? (CONFIGURACION_GRAFICO.panelSesiones.anchoSesion).toString() : '0';
    const altoCabeceraSesion = CONFIGURACION_GRAFICO.panelSesiones.altoCabecera;
    const colorCabecera = CONFIGURACION_GRAFICO.panelSesiones.colorCabecera

    //---------------------------------------------------------------------------------
    // Paso1: Añadimos el panel cabecera para la sesión que representa con sus actividades.
    // Su identificador será el texto 'panelCabeceraSesionConSusActividades' con el id de la
    // sesión.
    //---------------------------------------------------------------------------------
    const panelCabeceraSesionConActividades = panelSesionActividades.append('g')
      .attr('class', 'panelCabeceraSesionConSusActividades')
      .attr('id', (d: IActividadesSesion) => 'panelCabeceraSesionConSusActividades' + d.sesion.idSesion);

    //---------------------------------------------------------------------------------
    // Definicion del rectángulo que representa a la cabecera de la sesión.
    //---------------------------------------------------------------------------------
    panelCabeceraSesionConActividades.append('rect')
      .attr('class', 'rectPanelCabeceraSesionConSusActividades')
      .attr('height', altoCabeceraSesion*2)  // Es un artificio para ocultar las esquinas inferiores redondeadas
      .attr('width', anchoSesion)
      .attr('rx',10)
      .attr('fill', '#ccc');

    // Se añade el texto de la cabecera: hora inicio-fin
    panelCabeceraSesionConActividades.append('text')
      .attr('x', parseInt(anchoSesion) / 2)
      .text((d: IActividadesSesion) => d.sesion.horaInicio + ' - ' + d.sesion.horaFin)
      .attr('y', altoCabeceraSesion / 2)
      .attr('font-size', '.6em')
      .attr('fill', 'white')
      .attr('dominant-baseline', 'central')
      .attr('text-anchor', 'middle');

    this.renderizarBotonesPanelCabeceraSesionesActividades(panelSesionActividades);
    this.renderizarPanelPieSesionActividades(panelSesionActividades)
    this.renderizarPanelesCuerpoSesionActividades(panelSesionActividades);
    this.anyadirPanelesActividades(actividadesSesion);

     return panelCabeceraSesionConActividades;


  }

  private renderizarPanelPieSesionActividades(panelSesionActividades: any) {

    const altoPie = CONFIGURACION_GRAFICO.panelSesiones.altoPie;
    const anchoSesion = CONFIGURACION_GRAFICO.panelSesiones.anchoSesion ? CONFIGURACION_GRAFICO.panelSesiones.anchoSesion.toString() : '0';
    const altoCabeceraSesion = CONFIGURACION_GRAFICO.panelSesiones.altoCabecera;
    const colorCabecera = CONFIGURACION_GRAFICO.panelSesiones.colorCabecera

    //---------------------------------------------------------------------------------
    // Paso1: Añadimos el panel cabecera para la sesión que representa con sus actividades.
    // Su identificador será el texto 'panelCabeceraSesionConSusActividades' con el id de la
    // sesión.
    //---------------------------------------------------------------------------------
    const panelPieSesionConActividades = panelSesionActividades.append('g')
      .attr('class', 'panelPieSesionConSusActividades')
      .attr('id', (d: IActividadesSesion) => 'panelPieSesionConSusActividades' + d.sesion.idSesion);



    //---------------------------------------------------------------------------------
    // Definicion del rectángulo que representa a la cabecera de la sesión.
    //---------------------------------------------------------------------------------



    panelPieSesionConActividades.append('rect')
      .attr('class', 'rectPanelCabeceraSesionConSusActividades')
      .attr('height', altoPie*2)  // Es un artificio para ocultar las esquinas inferiores redondeadas
      .attr('width', anchoSesion)
      .attr('rx',10)
      .attr('y', (d: any) => {
        const coordenadaHoraInicio = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaInicio));

        
        const coordenadaHoraFin = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaFin));
        return coordenadaHoraFin - coordenadaHoraInicio - altoPie*2;
      })
      .attr('fill', '#ccc');

    // Se añade el texto de la cabecera: hora inicio-fin
    panelPieSesionConActividades.append('text')
      .attr('x', parseInt(anchoSesion) / 2)
      .text((d: IActividadesSesion) => d.sesion.horaInicio + ' - ' + d.sesion.horaFin)
      .attr('y', altoCabeceraSesion / 2)
      .attr('font-size', '.6em')
      .attr('fill', 'white')
      .attr('dominant-baseline', 'central')
      .attr('text-anchor', 'middle');

     return panelPieSesionConActividades;
    
  }

  private renderizarBotonesPanelCabeceraSesionesActividades(pcsa: any) {
    const anchoSesion = CONFIGURACION_GRAFICO.panelSesiones.anchoSesion ? CONFIGURACION_GRAFICO.panelSesiones.anchoSesion.toString() : '0';
    const altoCabeceraSesion = CONFIGURACION_GRAFICO.panelSesiones.altoCabecera;
    const desplazamientoHorizontal = parseFloat(anchoSesion) / 2 - 15;
    const desplHorizontal2 = desplazamientoHorizontal + 10
    const desplVertical1 = altoCabeceraSesion / 18;
    const desplVertical2 = altoCabeceraSesion / 2;
    const desplVertical3 = altoCabeceraSesion * 17 / 18;

    const coordenadasTrianguloIzquierdo = [
      { 'x': parseFloat(anchoSesion) / 2 - desplazamientoHorizontal, 'y': desplVertical1 + 1 },
      { 'x': parseFloat(anchoSesion) / 2 - desplHorizontal2 + 2, 'y': desplVertical2 },
      { 'x': parseFloat(anchoSesion) / 2 - desplazamientoHorizontal, 'y': desplVertical3 - 1 },
    ];

    const coordenadasTrianguloDerecho = [
      { 'x': parseFloat(anchoSesion) / 2 + desplazamientoHorizontal, 'y': desplVertical1 + 1 },
      { 'x': parseFloat(anchoSesion) / 2 + desplHorizontal2-2, 'y': desplVertical2 },
      { 'x': parseFloat(anchoSesion) / 2 + desplazamientoHorizontal, 'y': desplVertical3 - 1 },
    ];



    // Obtener actividad
    const trianguloIzquierdo = pcsa.append("polygon");
    trianguloIzquierdo.attr("points", coordenadasTrianguloIzquierdo.map(function (d: any) { return [d.x, d.y].join(","); }).join(" "))
      .attr("fill", "#ccc")
      .attr('class', 'botonCabeceraSesionActividades botonIzquierdoCabeceraSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'botonIzquierdoCabeceraSesionActividades' + d.sesion.idSesion)
      .on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this))
      .on("mouseout", (d: any) => d3.select('body').style("cursor", "default"))
      .on("mouseover", (d: any) => d3.select('body').style("cursor", "pointer"));


    const trianguloDerecho = pcsa.append("polygon");
    pcsa.append("polygon")
      .attr('points', coordenadasTrianguloDerecho.map(function (d: any) { return [d.x, d.y].join(","); }).join(" "))
      .attr('fill', (d: IActividadesSesion) => d.actividades.length>1?'white':'#ccc'
        )
      .attr('class', 'botonCabeceraSesionActividades botonDerechoCabeceraSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'botonDerechoCabeceraSesionActividades'+d.sesion.idSesion)
      .on("click", this.actualizarActividadVisibleDeUnaSesion.bind(this))
      .on("mouseout", (d: any) => d3.select('body').style("cursor", "default"))
      .on("mouseover", (d: any) => d3.select('body').style("cursor", "pointer") );

  }

  private renderizarPanelesCuerpoSesionActividades(panelSesionActividades: any) {
    const anchoSesion = CONFIGURACION_GRAFICO.panelSesiones.anchoSesion ? CONFIGURACION_GRAFICO.panelSesiones.anchoSesion.toString() : '0';

    
    const altoPie = CONFIGURACION_GRAFICO.panelSesiones.altoPie;
    const altoCabeceraSesion = CONFIGURACION_GRAFICO.panelSesiones.altoCabecera;

    //---------------------------------------------------------------------------------
    // Paso1: Añadimos el panel cabecera para la sesión que representa con sus actividades.
    // Su identificador será el texto 'panelCabeceraSesionConSusActividades' con el id de la
    // sesión.
    //---------------------------------------------------------------------------------
    const panelCuerpoSesionConActividades = panelSesionActividades.append('g')
      .attr('class', 'panelCuerpoSesionActividades')
      .attr('id', (d: IActividadesSesion) => 'panelCuerpoSesionActividades' + d.sesion.idSesion)
      .attr('transform', `translate(0,${altoCabeceraSesion})`)

    panelCuerpoSesionConActividades.append('clipPath')
      .attr('id', (d: any) => 'rectanguloRecortador' + d.sesion.idSesion)
      .append('rect')
      .attr('id', (d:any) => 'rectRecortador' + d.sesion.idSesion)
      .attr('height', (d: any) => {
      const coordenadaHoraInicio = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaInicio));
      const coordenadaHoraFin = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(d.sesion.horaFin));
      return coordenadaHoraFin - coordenadaHoraInicio-altoCabeceraSesion - altoPie;
    })
      .attr('width', (d: any) => anchoSesion)


    panelCuerpoSesionConActividades
      .attr("clip-path", (d: any) => {

        return `url(#${'rectanguloRecortador' + d.sesion.idSesion})`
      })


     return panelCuerpoSesionConActividades;
  }

  private anyadirPanelesActividades(actividadesSesiones: IActividadesSesion[]) {

    const anchoSesion = CONFIGURACION_GRAFICO.panelSesiones.anchoSesion ? CONFIGURACION_GRAFICO.panelSesiones.anchoSesion.toString() : '0';

    actividadesSesiones.forEach(as => {

      // Precalculamos el alto de los paneles
      const altoPanelActividadesEnActividadSesiones = Utilidades.altoPanel(as.sesion) - CONFIGURACION_GRAFICO.panelSesiones.altoCabecera - CONFIGURACION_GRAFICO.panelSesiones.altoPie;

      // Localizamos el panel relativo al cuerpo de la actividadesSesion
      // y le añadimos los paneles que representarán a cada una de sus actividades.
      const idPanel = '#panelCuerpoSesionActividades' + as.sesion.idSesion;
      const panelesActividades: any = d3.select(idPanel).selectAll('act' + 'xx').data(as.actividades).enter().append('g');


      panelesActividades
        .attr('class', (d: any, i: any, n: any) => {
          if (i == 0) return 'panelActividad visible'
          else return 'panelActividad'
        })
        .attr('id', (d: any) => 'panelActividad_' + d.idActividad)
        .attr('transform', (d: any, i: any, n: any) => `translate(${(i) * parseFloat(anchoSesion)},0)`)
        .attr('x', (d: any, i: any, n: any) => (i) * parseFloat(anchoSesion))
        .attr('y', 0)
        .attr('height', altoPanelActividadesEnActividadSesiones)
        .attr('width', anchoSesion);

        // A cada panel de una actividad además le añadimos las tres secciones
        as.actividades.forEach(
          actividad => {
            const panelActividad = d3.select('g#panelActividad_' + actividad.idActividad);
            this.renderizarSeccionContenidoPanelActividad(panelActividad, actividad, 1, actividad.grupos?.map(grupo => grupo.codigo));
            this.renderizarSeccionContenidoPanelActividad(panelActividad, actividad, 2, actividad.docentes?.map(docente => docente.alias));
            this.renderizarSeccionContenidoPanelActividad(panelActividad, actividad, 3, actividad.dependencia ? [actividad.dependencia.codigo] : []);
            CONFIGURACION_GRAFICO.actividades.mostrarPanelAcciones? this.renderizarSeccionBotonesAccionPanelActividad(panelActividad, actividad): null;

          }
        )


      // -------------------------------------------------------------------
      // Añadimos el rectángulo
      // -------------------------------------------------------------------
      const porcentajeAnchoZonaSeleccion = CONFIGURACION_GRAFICO.actividades.porcentajeZonaSeleccionActividad;

      const anchoZonaSeleccion = parseFloat(anchoSesion) * CONFIGURACION_GRAFICO.actividades.porcentajeZonaSeleccionActividad / 100;


      const rectZonaSeleccion = panelesActividades.select('.panelActividadZonaSeleccion').append('rect')
          .attr('class', 'rectActividad')
          .attr('width', anchoZonaSeleccion)
          .attr('height', altoPanelActividadesEnActividadSesiones)
          .attr('fill', '#fafafa')
          .on("click", (d: any, i: any, e: any) => {

            const marcadaActividadActualComoSeleccionada = d3.select('g#panelActividad_' + i.idActividad).attr('class').split(' ').includes('actividadSeleccionada');
            d.ctrlKey ? null : Utilidades.desmarcarActividadesComoSeleccionadas(this.actividadesG);

            marcadaActividadActualComoSeleccionada ?
              d3.selectAll('g#panelActividad_' + i.idActividad).attr('class', 'panelActividad actividadSeleccionada') :
              d3.select('g#panelActividad_' + i.idActividad).attr('class', 'panelActividad');

            d3.select('g#panelActividad_' + i.idActividad).attr('class').split(' ').includes('actividadSeleccionada') ?
              Utilidades.desmarcarActividadesComoSeleccionadas(this.actividadesG,[i.idActividad]) :
              Utilidades.marcarActividadesComoSeleccionadas([i.idActividad]);
          });




      const botonesMoverDuplicar = panelesActividades.select('.panelActividadZonaSeleccion').append('svg:foreignObject')
        .attr("width", anchoZonaSeleccion + 'px')
        .attr("height", altoPanelActividadesEnActividadSesiones/2 + 'px')
        .attr("y",'3px')
        .append("xhtml:div")
        .style("width", anchoZonaSeleccion + 'px')
        .style("height", (altoPanelActividadesEnActividadSesiones/2)-3 + 'px')
        .style('text-align','center')
        .html(`<i class="fas fa fa-expand-arrows-alt" style="font-size:8px; "/><p style="font-size:4px"></p><i class="fas fa fa-copy" style="font-size:8px;"/i>`);

      const panelBotonesAnyadirEliminar = panelesActividades.select('.panelActividadZonaSeleccion').append('svg:foreignObject')
  
        .attr("width", anchoZonaSeleccion + 'px')
        .attr("height", altoPanelActividadesEnActividadSesiones/2 + 'px')
        .attr("y",altoPanelActividadesEnActividadSesiones/2+'px')
        .append("xhtml:div")
          .style("width", anchoZonaSeleccion + 'px')
          .style("height", altoPanelActividadesEnActividadSesiones/2 + 'px')
          .style("display", 'flex')
          .style("align-items","end")
          .style('justify-content', 'center')
          .style('text-align','center')
          .html(`<i class="fas fa fa-trash" style="font-size:8px;"/><p style="font-size:2px"><i class="fas fa fa-plus" style="font-size:8px; "/i>`)
                    .on("click", (d: any, i: any, e: any) => {
            const botonEliminarActividadPulsado: boolean = d.srcElement.classList.contains('fa-trash') ? true : false;
            const botonAnyadirActividadPulsado: boolean = d.srcElement.classList.contains('fa-plus') ? true : false;
            if (botonEliminarActividadPulsado) { this.eliminarActividad$.next(i);};
            if (botonAnyadirActividadPulsado) { this.anyadirActividadEnSesion$.next(i.sesion)};
          })


      // -------------------------------------------------------------------
      // Añadimos funcionalidad drag and drop
      // -------------------------------------------------------------------
      this.anyadirFuncionalidadDragAndDrop(botonesMoverDuplicar);



    }
    );

  }

  private renderizarSeccionBotonesAccionPanelActividad(panelActividad: any, actividad: ActividadG) {

    const panelActividadBBox =
    {
      'x': panelActividad.attr('x'),
      'y': panelActividad.attr('y'),
      'height': panelActividad.attr('height'),
      'width': panelActividad.attr('width')
    }
    const panelZonaSeleccionActividad = panelActividad.append('g')
      .attr('class', 'panelActividadZonaSeleccion')
      .attr('id', 'panelActividadZonaSeleccion_' + actividad.idActividad);



    const porcentajeAnchoZonaSeleccion = CONFIGURACION_GRAFICO.actividades.porcentajeZonaSeleccionActividad;


  }

  private renderizarSeccionContenidoPanelActividad(panelActividad: any, actividad: ActividadG, numeroSeccion: number, listaCadenas: string[]) {
   
    const panelActividadBBox =
    {
      'x': panelActividad.attr('x'),
      'y': panelActividad.attr('y'),
      'height': panelActividad.attr('height'),
      'width': panelActividad.attr('width')
    }

    const porcentajeAnchoZonaSeleccion = CONFIGURACION_GRAFICO.actividades.mostrarPanelAcciones? CONFIGURACION_GRAFICO.actividades.porcentajeZonaSeleccionActividad : 0;
    
    //Si en al configuración se indica que no se debe mostrar el panel de botones de acción, se cambia el porcentaje por el valor 0.
    const anchoZonaSeleccion = CONFIGURACION_GRAFICO.actividades.mostrarPanelAcciones? panelActividadBBox.width*(porcentajeAnchoZonaSeleccion/100): 0;
    const panelSeccionBBox =
    {
      'x': (numeroSeccion-1) * (panelActividadBBox.width*(1-porcentajeAnchoZonaSeleccion/100) / 3)+panelActividadBBox.width*(porcentajeAnchoZonaSeleccion/100),
      'y': panelActividadBBox.y,
      'height': panelActividadBBox.height,
      'width': panelActividadBBox.width * (1-porcentajeAnchoZonaSeleccion/100) / 3
    }


    const panelSeccion = panelActividad.append('g')
      .attr('class', 'panelActividadSeccion panelActividadSeccion_' + numeroSeccion)
      .attr('id', 'panelActividadSeccion_' + numeroSeccion + '_' + actividad.idActividad)
      .attr('transform', `translate(${(panelSeccionBBox.x)},0)`)
      .attr('x', panelSeccionBBox.x)
      .attr('y', panelSeccionBBox.y)
      .attr('height', panelSeccionBBox.height)
      .attr('width', panelSeccionBBox.width)

    const rectPanelSeccion = panelSeccion.append('rect')
      .attr('height', panelSeccionBBox.height)
      .attr('width', panelSeccionBBox.width+1)
      .attr('fill', actividad.color);


    const panelContenidoSeccion = panelSeccion
      .append('g')
      .attr('class', 'panelContenidoSeccion panelContenidoSeccion_' + numeroSeccion)
      .attr('id', 'panelContenidoSeccion_' + numeroSeccion + '_' + actividad.idActividad)



    panelSeccion.append('rect')
      .attr('id',  'rectActivarGestionActividad_' + numeroSeccion + '_' + actividad.idActividad )
      .attr('class','rectActivarGestionActividad')
      .attr('height', panelSeccionBBox.height)
      .attr('width', panelSeccionBBox.width * (100 - porcentajeAnchoZonaSeleccion) / 100)
      .attr('opacity', '0')

      .on("click", (d: any, i: any, e: any) => {
          this.seleccionActividad$.next(i);
       });

    const panelContenidolistaCadenas = this.renderizarContenidoPanelesSeccionesActividades(panelContenidoSeccion, listaCadenas);



  }

  private renderizarContenidoPanelesSeccionesActividades(panelContenidoSeccion: any, listaCadenas: string[]) {


    // Obtenemos las dimensiones y posicionamiento del panel Sección del contenido actual
    const panelSeccion = d3.select(panelContenidoSeccion.node().parentNode);



    const dps = {
      x: parseFloat(panelSeccion.attr('x')),
      y: parseFloat(panelSeccion.attr('y')),
      width: parseFloat(panelSeccion.attr('width')),
      height: parseFloat(panelSeccion.attr('height'))
    }

    if (listaCadenas) this.anyadirContenidoPanelesSeccion(panelContenidoSeccion, listaCadenas);

    const seccionContenidoBBox = panelContenidoSeccion.node().getBBox();

    if (dps.height < seccionContenidoBBox.height)
    {

      this.anyadirScrollSeccion(panelContenidoSeccion);
      // localizamos el rectángulo que contiene el evento de selección.
      // como vamos añadir scroll le reducimos el ancho.

      const rectActivarGestionActividad = panelSeccion.select('.rectActivarGestionActividad');
      rectActivarGestionActividad.attr('witdh', dps.width - 5);


    }



  }

  private anyadirContenidoPanelesSeccion(panelContenidoSeccion: any, listaCadenas: string[]) {

    const altoTexto = parseFloat(CONFIGURACION_GRAFICO.actividades.tamanyoTexto);
    const separacionEnteFilas = altoTexto/3;
    const dps = panelContenidoSeccion.node().parentNode.getBBox();

    for (let index = 0; index < listaCadenas.length; index++) {
      const item = listaCadenas[index];
      panelContenidoSeccion.append('text')
        .attr('x', dps.width / 2)
        .text((d: any, i: any, n: any) => item)
        .attr('y', (index) * (altoTexto + separacionEnteFilas))
        .attr('font-size', CONFIGURACION_GRAFICO.actividades.tamanyoTexto)
        .attr('fill', 'black')
        .attr('dominant-baseline', 'text-before-edge')
        .attr('text-anchor', 'middle');
    }

  }

  private anyadirScrollSeccion(panelContenidoSeccion: any) {


    // 1.- Obtenemos las dimensiones de la sección
    const panelSeccion = d3.select(panelContenidoSeccion.node().parentNode);
    const dps = {
      x: parseFloat(panelSeccion.attr('x')),
      y: parseFloat(panelSeccion.attr('y')),
      width: parseFloat(panelSeccion.attr('width')),
      height: parseFloat(panelSeccion.attr('height'))
    }

    // 2.- Obtenemos las dimenciones del grupo que contiene los textos.
    const dpcs = panelContenidoSeccion.node().getBBox();

    // 3,. Establecemos parámetros.
    const anchoScroll = 5;
    const altoScroll = dps.height * dps.height / dpcs.height;
    const maxDesplazamientoScroll = dps.height - altoScroll;
    const longitudSeccionExterna = dpcs.height - dps.height;

    // 3.- Creamos el panel para el scroll
    const panelScroll = panelSeccion.append('g');

    // 4.- Añadimos el fondo del panel de scroll
    const rectFondoZonaScroll = panelScroll.append('rect')
      .attr('rx', 2)
      .attr('ry',2)
      .attr('width', anchoScroll)
      .attr('height', dps.height)
      .attr('fill', '#eee');

    // 5.- Añadimos el propio scroll. Será un rectángulo.
    const rectScroll = panelScroll.append('rect')
      .attr('rx', 2)
      .attr('ry', 2)
      .attr('fill', '#777')
      .attr('width', anchoScroll)
      .attr('height', altoScroll)

    // 6.- Trasladamos el panel de scroll a la derecha de la sección.
    panelScroll.attr('transform', `translate(${dps.width-anchoScroll},0)`);


    // 7.- Definimos el evento de scroll
    const drag = d3.drag()
      .on("drag", function (event, d: any) {

        // Acotamos sus posibles valores.
        d.y = clamp(event.y-d.valorInicial, 0, maxDesplazamientoScroll);

        // Aplicamos el movimiento al scroll
        rectScroll.attr('y', d.y);

        // Aplicamos el movimiento al panel de contenido.
        panelContenidoSeccion.attr('transform', `translate(0,${(-1)*longitudSeccionExterna * d.y / maxDesplazamientoScroll})`)

      })
      .on("start", function (event,d:any) {
        d.valorInicial = event.y;
      });


    // 8.- Asociamos el scroll al panel
    drag(panelScroll as any);

    // 9.- Función auxiliar que acota valores posibles entre
    // un límite inferior y un límite superior.
    function clamp(x:any, lo:any, hi:any) {
      return x < lo ? lo : x > hi ? hi : x;
    }

  }

  private actualizarActividadVisibleDeUnaSesion(d: any, i: IActividadesSesion, e: any) {

    var botonDerechoPulsado: boolean = d.srcElement.classList.contains('botonDerechoCabeceraSesionActividades') ? true : false;

    const anchoSesion = CONFIGURACION_GRAFICO.panelSesiones.anchoSesion ? CONFIGURACION_GRAFICO.panelSesiones.anchoSesion.toString() : '0';
    const panelSesionActividadesActual = d3.select('#panelSesionActividades' + i.sesion.idSesion);
    const idActividadesEnSesion: string[] = panelSesionActividadesActual.attr('data-actividades').split(',');
    const idActividadVisible = panelSesionActividadesActual.attr('data-actividadVisible')
    var posActual = idActividadesEnSesion.indexOf(idActividadVisible);
    if (botonDerechoPulsado && posActual < idActividadesEnSesion.length - 1) posActual++;
    if (!botonDerechoPulsado && posActual > 0) posActual--;

    const colorBotonDerecho = posActual === idActividadesEnSesion.length - 1 ? '#ccc' : 'white';
    const colorBotonizquierdo = posActual === 0 ? '#ccc' : 'white';

    panelSesionActividadesActual.select('.botonIzquierdoCabeceraSesionActividades').attr('fill', colorBotonizquierdo);
    panelSesionActividadesActual.select('.botonDerechoCabeceraSesionActividades').attr('fill', colorBotonDerecho);

    panelSesionActividadesActual.attr('data-actividadVisible', idActividadesEnSesion[posActual]);

    // Obtenemos todos los paneles de actividad contenidos en el cuerpo
    // de la entidad Actividades-sesion
    panelSesionActividadesActual
      .selectAll('.panelActividad')
      .attr('transform', function (d, i, n) {
        return `translate(${(i-(posActual))*parseFloat(anchoSesion)},0)`
      })

  }

  private anyadirFuncionalidadDragAndDrop(elementoDom: any) {
    elementoDom.call(
      d3.drag()
        .on("start", this.dragstarted.bind(this))
        .on("drag", this.dragged.bind(this))
        .on("end", this.dragended.bind(this))
    );

  }

  private dragstarted(event: any, d: any) {

    

    //----------------------------------------------------------------------------------------------------
    //Paso 1: Creamos un clon de la actividad que vamos a mover (variable actividadClon)
    //---------------------------------------------------------------------------------------------------

    // Creamos un duplicado de la actividad que vamos a deslazar
    const actividadClon: any = d3.select('g#panelActividad_' + event.subject.idActividad).clone(true);

    // Eliminamos los botones de acción de la actividad duplicada
    actividadClon.select('foreignObject').remove();

    // Cambiamos el valor de los atributos que procedan en la actividad duplicada.
    actividadClon.attr('id', 'panelActividadClone_' + event.subject.idActividad);


    // Establecemos un recorte rectangular del tamaño de su sesión.
    actividadClon.attr('clip-path','url(#rectanguloRecortadorParaClon)')
    actividadClon.append('clipPath')
      .attr('id', 'rectanguloRecortadorParaClon')
      .append('rect')
      .attr('height', actividadClon.attr('height'))
      .attr('width', actividadClon.attr('width'));

    // La actividad clonada será hija directa de "PanelHorario"
    const panelHorario: any = d3.select('g#panelHorario');
    panelHorario.node().appendChild(actividadClon.node());



    //----------------------------------------------------------------------------------------------------
    //Paso 2: Establecer variables iniciales
    //----------------------------------------------------------------------------------------------------

    // registramos en la variable 'd' el tipo de accion que terminaremos haciendo
    // MOVERACTIVIDAD, DUPLICARACTIVIDAD

    // </i><i class="fas fa fa-expand-arrows-alt"></i><i class="fas fa fa-copy"></i > <i class="fas fa fa-trash" >
    if (event.sourceEvent.toElement.classList.contains('fa-expand-arrows-alt')) {
      d.accion = 'MOVERACTIVIDAD'
    }
    else if (event.sourceEvent.toElement.classList.contains('fa-copy')) {
      d.accion = 'DUPLICARACTIVIDAD'
    }

     d.valorInicialX = this.obtenerRectanguloAbsolutoSesion.bind(this, event.subject.sesion as Sesion)().AbsX;
     d.valorInicialY = this.obtenerRectanguloAbsolutoSesion.bind(this, event.subject.sesion as Sesion)().AbsY;

    actividadClon.attr('transform', 'translate(' + d.valorInicialX + ',' + d.valorInicialY + ')')

    d.altoPanelHorario = panelHorario.attr('height');
    d.anchoPanelHorario = panelHorario.attr('width') - actividadClon.attr('width');
    d.altoActividadFlotante = actividadClon.attr('height');
    d.anchoActividadFlotante = actividadClon.attr('width');
    d.dx = d.valorInicialX;
    d.dy = d.valorInicialY;

    d.datosActividad = new Actividad();

    d.datosActividad = {
      idActividad: event.subject.idActividad,
      sesion: event.subject.sesion,
      detalleActividad: event.subject.detalleActividad,
      docentes: event.subject.docentes,
      asignaturas: event.subject.asignaturas,
      grupos: event.subject.grupos,
      dependencia: event.subject.dependencia,
      periodoVigencia: event.subject.periodoVigencia,
      tipoActividad: event.subject.tipoActividad,
    };

    d.puntoMedio =  {
      puntoMedioX: parseFloat(d.dx)+parseFloat(d.anchoActividadFlotante) /2, puntoMedioY: parseFloat(d.dy)+parseFloat(d.altoActividadFlotante) /2
    }



    this.obtenerRectanguloAbsolutoSesiones.bind(this, d3.selectAll('.panelSesion').data() as Sesion[]);
    d.datosGraficosSesiones = this.obtenerRectanguloAbsolutoSesiones.bind(this, d3.selectAll('.panelSesion').data() as Sesion[])();
    d.altoCabecera = CONFIGURACION_GRAFICO.panelSesiones.altoCabecera;

    panelHorario.append('rect')
      .attr('id', 'marcoTransicionMoverActividad')
      .attr('fill', 'rgba(3,5,6,0.3)')
      .attr('stroke', 'orange')
      .attr('stroke-linecap', 'butt')
      .attr('stroke-width', '2')


  }

  private dragged(event: any, d: any) {


    d.dx = clamp(d.dx+event.dx, 0, d.anchoPanelHorario);
    d.dy = clamp(d.dy + event.dy, d.altoCabecera, d.altoPanelHorario - d.altoCabecera);

    d.puntoMedio = {
      puntoMedioX: parseFloat(d.dx)+parseFloat(d.anchoActividadFlotante) /2, puntoMedioY: parseFloat(d.dy)+parseFloat(d.altoActividadFlotante) /2
    }


    d.sesionSeleccionada1 = d.sesionSeleccionada
    d.sesionSeleccionada = this.sesionSeleccionada.bind(this, d.puntoMedio, d.datosGraficosSesiones)();

    if ( d.sesionSeleccionada && (d.sesionSeleccionada1 !== d.sesionSeleccionada || !d.sesionSeleccionada1)) {

      d.datosActividad.sesion = this.plantilla.sesionesPlantilla.filter(sesion => sesion.idSesion === d.sesionSeleccionada.idSesion)[0];

       d3.select('#marcoTransicionMoverActividad')
        .attr('height', d.sesionSeleccionada.alto)
        .attr('width', d.sesionSeleccionada.ancho)
        .attr('x', d.sesionSeleccionada.AbsX)
        .attr('y', d.sesionSeleccionada.AbsY)


    }


    const actividadFlotante = d3.select('g#panelActividadClone_' + d.idActividad).attr('transform', 'translate(' + d.dx + ',' + d.dy + ')')



    function clamp(x:any, lo:any, hi:any) {
      return x < lo ? lo : x > hi ? hi : x;
    }

;

  }

  private dragended(event:any, d:any) {
    d3.select('g#panelActividadClone_' + d.idActividad).remove();
    d3.select('#marcoTransicionMoverActividad').remove();


    if (d.accion === 'MOVERACTIVIDAD') {
      this.moverActividad$.next(d.datosActividad);
    }
    else if (d.accion === 'DUPLICARACTIVIDAD') {

      this.duplicarActividad$.next(d.datosActividad);
    }

    d.accion = undefined;



  }

  private obtenerRectanguloAbsolutoSesiones(sesiones: Sesion[]): { idSesion: string; AbsX: number; AbsY: number; ancho: number; alto: number;}[] {

    return sesiones.map( sesion => this.obtenerRectanguloAbsolutoSesion(sesion));
  }

  private obtenerRectanguloAbsolutoSesion(sesion: Sesion): { idSesion: string; AbsX: number; AbsY: number; ancho: number; alto: number;} {

    const DiasSemanas = Utilidades.obtenerDiasSemanaHorario();

    const diaSemanaSesion = DiasSemanas.filter(d => d.codigo === sesion.diaSemana)[0];
    const anchoSesion = parseFloat(CONFIGURACION_GRAFICO.panelSesiones.anchoSesion ? CONFIGURACION_GRAFICO.panelSesiones.anchoSesion.toString() : '0');
    const coordenadaHoraInicio = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(sesion.horaInicio));
    const coordenadaHoraFin = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(sesion.horaFin));
    const altoSesion = coordenadaHoraFin - coordenadaHoraInicio - CONFIGURACION_GRAFICO.panelSesiones.altoCabecera;
    const AbsX = CONFIGURACION_GRAFICO.escalas.escalaHorizontal(diaSemanaSesion.denominacionLarga);
    const AbsY = coordenadaHoraInicio+ + CONFIGURACION_GRAFICO.panelSesiones.altoCabecera;

    return { idSesion:sesion.idSesion, AbsX: parseInt(AbsX), AbsY: parseInt(AbsY), ancho: anchoSesion, alto: altoSesion}

  }

  private sesionSeleccionada(puntoMedio: { puntoMedioX: number, puntoMedioY: number }, datosGraficosSesiones: { idSesion: string; AbsX: number; AbsY: number; ancho: number; alto: number; }[]): { idSesion: string; AbsX: number; AbsY: number; ancho: number; alto: number; } {


    return datosGraficosSesiones.filter(
      sesion => {

        return sesion.AbsX <= puntoMedio.puntoMedioX && puntoMedio.puntoMedioX < sesion.AbsX + sesion.ancho && sesion.AbsY <= puntoMedio.puntoMedioY && puntoMedio.puntoMedioY < sesion.AbsY + sesion.alto
      })[0]

  }

}
