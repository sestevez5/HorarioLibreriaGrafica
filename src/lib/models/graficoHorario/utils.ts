import { DiaSemana } from './../diaSemana.model';
import { Sesion } from './../sesion';
import { IActividadesSesion } from './../actividadesSesion.model';
import { ActividadG } from './../actividadG.model';
import { CONFIGURACION_GRAFICO, DIAS_SEMANA } from './configuracionPorDefecto';
import * as d3 from 'd3';
// import * as d3 from '../../d3/d3/dist/d3.js';
export class Utilidades
{
  static compare(a: ActividadG, b: ActividadG): number {

    const codigosDiasSemana = DIAS_SEMANA.map(ds => ds.codigo);

    if (codigosDiasSemana.indexOf(a.sesion.diaSemana) < codigosDiasSemana.indexOf(b.sesion.diaSemana))      return -1
    else if (codigosDiasSemana.indexOf(a.sesion.diaSemana) > codigosDiasSemana.indexOf(b.sesion.diaSemana)) return 1
    else {

      if (Utilidades.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) < Utilidades.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) return -1
      else if (Utilidades.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) > Utilidades.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) return 1
      else if (Utilidades.convertirCadenaHoraEnTiempo(a.sesion.horaInicio) == Utilidades.convertirCadenaHoraEnTiempo(b.sesion.horaInicio)) {

        if (Utilidades.convertirCadenaHoraEnTiempo(a.sesion.horaFin) < Utilidades.convertirCadenaHoraEnTiempo(b.sesion.horaFin)) return -1
        else if (Utilidades.convertirCadenaHoraEnTiempo(a.sesion.horaFin) > Utilidades.convertirCadenaHoraEnTiempo(b.sesion.horaFin)) return 1
        else if (Utilidades.convertirCadenaHoraEnTiempo(a.sesion.horaFin) == Utilidades.convertirCadenaHoraEnTiempo(b.sesion.horaFin)) {
          if (a.sesion.idSesion < b.sesion.idSesion) return -1
          else if (a.sesion.idSesion > b.sesion.idSesion) return 1
          else return 0;
        } else return 0;
      } else return 0;
    }
  } // Fin compare
  static obtenerActividadesSesiones(actividadesG: ActividadG[]): IActividadesSesion[]{

    // Construimos una estructura para agrupar actividades por sesión.
    const actividadesSesion: IActividadesSesion[] = [];

    // tenemos todas las sesiones afectadas de forma única.
    const sesionesConActividad: Sesion[] = [];

    actividadesG.forEach(actg => {

      if (sesionesConActividad.filter(sesion => sesion.idSesion === actg.sesion.idSesion).length===0) {
        sesionesConActividad.push(actg.sesion);
      }
      
    });
    
    
    // [... new Set(actividadesG.map(actg => actg.sesion))];
 

    sesionesConActividad.forEach(ses => {
      const actividadesSesionActual: ActividadG[] = [];
      actividadesG.filter(actg => actg.sesion.idSesion === ses.idSesion).sort(this.compare).forEach(act => actividadesSesionActual.push(act))
      actividadesSesion.push({ sesion: ses, actividades: actividadesSesionActual })
    });

  
  return actividadesSesion;


  }
  static altoPanel(sesion: Sesion) {
    const coordenadaHoraInicio =  CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(sesion.horaInicio));
    const coordenadaHoraFin = CONFIGURACION_GRAFICO.escalas.escalaVertical(Utilidades.convertirCadenaHoraEnTiempo(sesion.horaFin));
    return coordenadaHoraFin - coordenadaHoraInicio;
  }
  static anyadirDefs(element: any) {
    const defs = element.append('defs');
    const patronFondoPanelHorario = 	defs.append('pattern')
    .attr('id','smallGrid')
    .attr('width',1 )
    .attr('height',1)
      .attr('patternUnits', 'userSpaceOnUse')
      .append('rect')
      .attr('width',10)
      .attr('height', 10)

      var g = defs.append("pattern")
      .attr('id', 'x')
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('width', '4')
        .attr('height', '4')


      .attr("x", 0).attr("y", 0)
      .append("g").style("fill", "white").style("stroke", "black").style("stroke-width", 0.5);
  g.append("path").attr("d", "M0,0 l25,25");
  g.append("path").attr("d", "M25,0 l-25,25");
  }
  static obtenerHorasInicionHorasFin(actividadesG: ActividadG[]): Date[] {
    return actividadesG.reduce(
      function (colecAnterior: Date[], actividadActual) {
        return colecAnterior.concat([Utilidades.convertirCadenaHoraEnTiempo(actividadActual.sesion.horaInicio), Utilidades.convertirCadenaHoraEnTiempo(actividadActual.sesion.horaFin)]);
     },
     []
     )
  }
  static obtenerDiasSemanaHorario(): DiaSemana[] {

    return DIAS_SEMANA.filter((ds: DiaSemana) => CONFIGURACION_GRAFICO.configuracionSemana?.diasSemanaHabiles.includes(ds.codigo) );

  }
  static minimoIntervaloTemporal(): Date {
    const horaMinima: Date = Utilidades.convertirCadenaHoraEnTiempo(CONFIGURACION_GRAFICO.configuracionSemana?.horaMinima);
    return Utilidades.convertirCadenaHoraEnTiempo(CONFIGURACION_GRAFICO.configuracionSemana?.horaMinima);
  }
  static maximoIntervaloTemporal(): Date {
    const horaMaxima = Utilidades.convertirCadenaHoraEnTiempo(CONFIGURACION_GRAFICO.configuracionSemana?.horaMaxima);
    return horaMaxima.setMinutes(horaMaxima.getMinutes()) as Date;
  }
  static actividadesCubiertasPor(actividad: ActividadG, actividades: ActividadG[]): ActividadG[] {
    return actividades.filter(
      act =>
        act.idActividad != actividad.idActividad
        && act.sesion.diaSemana === actividad.sesion.diaSemana
        && Utilidades.convertirCadenaHoraEnTiempo(act.sesion.horaInicio) >= Utilidades.convertirCadenaHoraEnTiempo(actividad.sesion.horaInicio)
        && Utilidades.convertirCadenaHoraEnTiempo(act.sesion.horaFin) <= Utilidades.convertirCadenaHoraEnTiempo(actividad.sesion.horaFin)
    )

  }
  static calcularFactorAnchoActividadesG(actsG: ActividadG[], actividades: ActividadG[]) {

  actsG.forEach(
    actG => {
      const actividadesCubiertas = Utilidades.actividadesCubiertasPor(actG, actividades);
      if (actividadesCubiertas.length > 0 && actG) {
        actG.nivelAncho = d3.max(actividadesCubiertas.map(act => act.nivelAncho)) as number + 1;
      }
    });

  }
  static calcularColoresActividadesG(actsG: ActividadG[], criterioColoreado: string) {

    switch (criterioColoreado) {
      case 'TIPO_ACTIVIDAD':
        this.colorearActividadesPorTipoActividad(actsG);
      break;

      case 'CONTENIDO':
        this.colorearActividadesPorContenido(actsG);
      break;

      case 'GRUPOS':
        this.colorearActividadesPorGrupos(actsG);
      break;
    
      default:
        this.colorearActividadesPorTipoActividad(actsG);
      break;
    }




   

  }

  private static colorearActividadesPorGrupos(actsG: ActividadG[]) {

    const grupos: string[] = [];

    var diccionarioGruposActividades: { [index: string]: string;} = {}


    // Localizamos todos los diferentes tipos de tipos de actividad y los registramos en TiposActividad.
    actsG.forEach(
      actG => {

        var gruposActividadActual: string ='-';

        // Construímos una cadena con todos los códigos de las materias incluidas en la colección de actividades.
        actG.grupos.sort((gru1, gru2) => gru1.codigo < gru2.codigo ? 1 : 0).forEach(
          grupos => gruposActividadActual += grupos.codigo
        )

        //console.log(contenidoActividadActual);

        // Añadimos el par <idActividad. contenidoActividadActual> al diccionario
        diccionarioGruposActividades[actG.idActividad]=gruposActividadActual;
        // En el caso de que aún no se haya encontrado un contenido en la lista de contenidos se añade como nuevo elemento.
        if (!grupos.some(grupos => grupos === gruposActividadActual))
        { grupos.push(gruposActividadActual) }


      });

    for (let index = 0; index < grupos.length; index++) {
      const gruposActuales = grupos[index];

      actsG.filter(actG => diccionarioGruposActividades[actG.idActividad] === gruposActuales).forEach(
        actG =>  {actG.color = CONFIGURACION_GRAFICO.actividades.colores[index]}
     
      );

      console.log(gruposActuales)
    }
  }


  private static colorearActividadesPorContenido(actsG: ActividadG[]) {

    const contenidos: string[] = [];

    var diccionarioContenidoActividades: { [index: string]: string;} = {}


    // Localizamos todos los diferentes tipos de tipos de actividad y los registramos en TiposActividad.
    actsG.forEach(
      actG => {

        var contenidoActividadActual: string ='-';

        // Construímos una cadena con todos los códigos de las materias incluidas en la colección de actividades.
        actG.asignaturas.sort((asi1, asi2) => asi1.codigo < asi2.codigo ? 1 : 0).forEach(
          cont => contenidoActividadActual += cont.codigo
        )

        //console.log(contenidoActividadActual);

        // Añadimos el par <idActividad. contenidoActividadActual> al diccionario
        diccionarioContenidoActividades[actG.idActividad]=contenidoActividadActual;
        // En el caso de que aún no se haya encontrado un contenido en la lista de contenidos se añade como nuevo elemento.
        if (!contenidos.some(cont => cont === contenidoActividadActual))
        { contenidos.push(contenidoActividadActual) }


      });

    for (let index = 0; index < contenidos.length; index++) {
      const contenidoActual = contenidos[index];

      actsG.filter(actG => diccionarioContenidoActividades[actG.idActividad] === contenidoActual).forEach(
        actG => actG.color = CONFIGURACION_GRAFICO.actividades.colores[index]
    
      );


    }
  }

  private static colorearActividadesPorTipoActividad(actsG: ActividadG[]) {

    const tiposActividad: string[] = [];


    // Localizamos todos los diferentes tipos de tipos de actividad y los registramos en TiposActividad.
    actsG.forEach(
      actG => {
        if (!tiposActividad.some(idTipoActividad => idTipoActividad === actG.tipoActividad?.idTipoActividad))
        { tiposActividad.push(actG.tipoActividad?.idTipoActividad) }

      });

    for (let index = 0; index < tiposActividad.length; index++) {
      const tipoActividadActual = tiposActividad[index];

      actsG.filter(actG => actG.tipoActividad?.idTipoActividad === tipoActividadActual).forEach(
        actG => actG.color = CONFIGURACION_GRAFICO.actividades.colores[index]
      );


    }
  }





  static desmarcarActividadesComoSeleccionadas(actividades: ActividadG[], identificadoresActividades?: string[], ) {

    if (!identificadoresActividades) {
      d3.selectAll('g.panelActividad').select('.rectActividadSeleccionada').remove()
    } else
    {
      actividades
        .filter(actG => identificadoresActividades.includes(actG.idActividad))
        .forEach(actG => d3.select('g#panelActividad' + actG.idActividad).select('.rectActividadSeleccionada').remove()
        )
    }
  }
  static marcarActividadesComoSeleccionadas(identificadoresActividades: string[]) {
    identificadoresActividades.forEach(
      iact => {
        const x = d3.select('g#panelActividad_' + iact).select('.panelActividadZonaSeleccion')

        const y: any = x.select('.rectActividad');

        x.append('rect')
          .attr('width', y.attr('width'))
          .attr('height', y.attr('height'))
          .attr('class', 'rectActividadSeleccionada').attr('fill', 'url(#x)')

      }
    )

  }
  static convertirCadenaHoraEnTiempo: any = d3.timeParse("%I:%M");
  static convertirTiempoEnCadenaHora: any = d3.timeFormat("%I:%M");


}
