import { ConfiguracionSemana } from './configuracionSemana.model';


export interface ConfiguracionGrafico {

  // Parámetros del gráfico, en general.
  configuracionSemana?: ConfiguracionSemana;

  grafico?: {
    colorGrafico: string;
    margenGrafico: {
      margenIzquierdoGrafico:  number;
      margenDerechoGrafico:    number;
      margenSuperiorGrafico:   number;
      margenInferiorGrafico:   number;
    };

    anchoGrafico:  number | undefined;
    altoGrafico:   number | undefined;

    pixelesPorHora: number | undefined;
  }

  panelHorario?: {
    anchoPanelHorario:  number | undefined;
    altoPanelHorario:   number | undefined;
    colorPanelHorario:  string;
  }

  panelDiaSemana?: {
    //colorPanelDiaSemana: string;
  }

  panelSesiones?: {
    alto?: number;
    ancho?: number;
    margenLateral: number; // porcentaje
    anchoSesion: number | undefined;
    altoCabecera: number;
    altoPie: number;
    colorCabecera: string;
    colorCuerpo: string;

  }

  escalas?: {
    escalaVertical: any;
    escalaHorizontal: any;
  }

  actividades?: {
    tamanyoTexto?: string;
    porcentajeZonaSeleccionActividad: number | undefined;
    altoSeccionPie: number | undefined;
    colores: string[];
    mostrarPanelAcciones: boolean;
    separacionActividades?: number | undefined;
    contenidoSecciones?: Array<string>
    mostrarSeccionPie: boolean 

  }


}
