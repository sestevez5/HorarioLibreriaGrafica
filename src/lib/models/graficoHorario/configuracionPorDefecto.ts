import { ConfiguracionGrafico } from '../configuracionGrafico.model';
import { DiaSemana } from '../diaSemana.model';

export const CONFIGURACION_GRAFICO: ConfiguracionGrafico = {

  configuracionSemana: {
    horaMinima: "08:00",
    horaMaxima: "14:00",
    diasSemanaHabiles: ['L','M','X']
  },

  // Parámetros generales
  grafico: {
    anchoGrafico: undefined,
    altoGrafico: undefined,
    colorGrafico: 'white',
    margenGrafico: {
      margenInferiorGrafico:     3,
      margenDerechoGrafico:      3,
      margenSuperiorGrafico:     5,
      margenIzquierdoGrafico:    5,
    },

    pixelesPorHora: undefined
  },

  panelHorario: {
    altoPanelHorario:     undefined,
    colorPanelHorario:    '#fff',
    anchoPanelHorario:    undefined
  },

  panelDiaSemana: {
    colorPanelDiaSemana: '#444',
  },

  panelSesiones: {

    alto: 1,   // 1=alto del contenedor.
    ancho: 1,  // 1=ancho del contenedor.
    margenLateral: 0,
    altoCabecera: 11,
    anchoSesion: undefined,
    altoPie: 0,
    colorCabecera:'#fff',
    colorCuerpo:'#f4f4f4'

  },

  escalas: {
    escalaVertical: undefined,
    escalaHorizontal: undefined
  },

  actividades: {
    tamanyoTexto: '15',
    porcentajeZonaSeleccionActividad: 4,
    colores: ['#bde8ef','#ffd4e5','#feffa2','#e0cdff','#fdfd96'],
    mostrarPanelAcciones: false,
    mostrarSeccionPie: false,
    contenidoSecciones: ["GRU","DEP","CON"],
    
    altoSeccionPie: 15
    }
  }



export const DIAS_SEMANA: DiaSemana[] = [
  { codigo: 'L', denominacionCorta: 'LUN', denominacionLarga: 'Lunes' },
  { codigo: 'M', denominacionCorta: 'MAR', denominacionLarga: 'Martes' },
  { codigo: 'X', denominacionCorta: 'MIE', denominacionLarga: 'Miércoles' },
  { codigo: 'J', denominacionCorta: 'JUE', denominacionLarga: 'Jueves' },
  { codigo: 'V', denominacionCorta: 'VIE', denominacionLarga: 'Viernes' },
  { codigo: 'S', denominacionCorta: 'SAB', denominacionLarga: 'Sábado' },
  { codigo: 'D', denominacionCorta: 'DOM', denominacionLarga: 'Domingo' },
];

