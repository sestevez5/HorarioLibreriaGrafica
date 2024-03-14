// ejecucion durante el desarrollo
//import { forEachChild } from 'typescript';
//import { HorarioG } from './lib/root'

// Ejecución para prueba externa con vite
//import { HorarioG } from '../dist/HorarioG.es'

// Ejecución con live-server
import { HorarioG } from '../dist/HorarioG.es.js'

//--------------------------------------------------------------
// DATOS
//--------------------------------------------------------------

    
var configuracionPorDefecto;
var graficoHorario;




// 1.- conficuración grafico
var configuracion = {

 grafico: {
    //pixelesPorHora:500
 },
  configuracionSemana: {

    horaMinima: '08:00',
    horaMaxima: '14:00',
    diasSemanaHabiles: ['L','M','X','J','V']

  },

  actividades: {
    //tamanyoTexto: '54'
    // mostrarPanelAcciones: true,
    // contenidoSecciones: ["GRU","DOC","DEP"], // Cadenas posibles: 'DEP': dependencias. 'DOC': docentes, 'CON': contenido lectivo, 'GRU': grupos.
    // mostrarSeccionPie: false
    criterioColoreado: 'TIPO_ACTIVIDAD',  //Valores posibles: TIPO_ACTIVIDAD, CONTENIDO
    
    
  },
  panelSesiones: {
    alto:1,
    ancho:1,
    colorCuerpo: '#f4f4f4'
  }
}




// 2.- plantilla que se rendeizará en el gráfico (Colecció de sesiones)
var plantilla =  {
  idPlantilla: '1',
  plantillaPorDefecto: true,
  denominacion: 'prueba',
  sesionesPlantilla: [{
      diaSemana: "L",
      horaInicio: "08:00",
      horaFin: "08:55",
      idSesion: "P1L1"

  },
  {
      diaSemana: "L",
      horaInicio: "08:55",
      horaFin: "09:50",
      idSesion: "P1L2"

  },
  {
      diaSemana: "L",
      horaInicio: "09:50",
      horaFin: "10:45",
      idSesion: "P1L3"

  },
  {
      diaSemana: "L",
      horaInicio: "11:15",
      horaFin: "12:10",
      idSesion: "P1L4"

  },
  {
      diaSemana: "L",
      horaInicio: "12:10",
      horaFin: "13:05",
      idSesion: "P1L5"

  },
  {
      diaSemana: "L",
      horaInicio: "13:05",
      horaFin: "14:00",
      idSesion: "P1L6"

  },{
      diaSemana: "M",
      horaInicio: "08:00",
      horaFin: "08:55",
      idSesion: "P1M1"

  },
  {
      diaSemana: "M",
      horaInicio: "08:55",
      horaFin: "09:50",
      idSesion: "P1M2"

  },
  {
      diaSemana: "M",
      horaInicio: "09:50",
      horaFin: "10:45",
      idSesion: "P1M3"

  },
  {
      diaSemana: "M",
      horaInicio: "11:15",
      horaFin: "12:10",
      idSesion: "P1M4"

  },
  {
      diaSemana: "M",
      horaInicio: "12:10",
      horaFin: "13:05",
      idSesion: "P1M5"

  },
  {
      diaSemana: "M",
      horaInicio: "13:05",
      horaFin: "14:00",
      idSesion: "P1M6"

  },{
      diaSemana: "X",
      horaInicio: "08:00",
      horaFin: "08:55",
      idSesion: "P1X1"

  },
  {
      diaSemana: "X",
      horaInicio: "08:55",
      horaFin: "09:50",
      idSesion: "P1X2"

  },
  {
      diaSemana: "X",
      horaInicio: "09:50",
      horaFin: "10:45",
      idSesion: "P1X3"

  },
  {
      diaSemana: "X",
      horaInicio: "11:15",
      horaFin: "12:10",
      idSesion: "P1X4"

  },
  {
      diaSemana: "X",
      horaInicio: "12:10",
      horaFin: "13:05",
      idSesion: "P1X5"

  },
  {
      diaSemana: "X",
      horaInicio: "13:05",
      horaFin: "14:00",
      idSesion: "P1X6"

  },
  {
      diaSemana: "J",
      horaInicio: "08:00",
      horaFin: "08:55",
      idSesion: "P1J1"

  },
  {
      diaSemana: "J",
      horaInicio: "08:55",
      horaFin: "09:50",
      idSesion: "P1J2"

  },
  {
      diaSemana: "J",
      horaInicio: "09:50",
      horaFin: "10:45",
      idSesion: "P1J3"

  },
  {
      diaSemana: "J",
      horaInicio: "11:15",
      horaFin: "12:10",
      idSesion: "P1J4"

  },
  {
      diaSemana: "J",
      horaInicio: "12:10",
      horaFin: "13:05",
      idSesion: "P1J5"

  },
  {
      diaSemana: "J",
      horaInicio: "13:05",
      horaFin: "14:00",
      idSesion: "P1J6"

  },
  {
      diaSemana: "V",
      horaInicio: "08:00",
      horaFin: "08:55",
      idSesion: "P1V1"

  },
  {
      diaSemana: "V",
      horaInicio: "08:55",
      horaFin: "09:50",
      idSesion: "P1V2"

  },
  {
      diaSemana: "V",
      horaInicio: "09:50",
      horaFin: "10:45",
      idSesion: "P1V3"

  },
  {
      diaSemana: "V",
      horaInicio: "11:15",
      horaFin: "12:10",
      idSesion: "P1V4"

  },
  {
      diaSemana: "V",
      horaInicio: "12:10",
      horaFin: "13:05",
      idSesion: "P1V5"

  },
  {
      diaSemana: "V",
      horaInicio: "13:05",
      horaFin: "14:00",
      idSesion: "P1V6"

  }]
}

var plantillaAMostrar = plantilla;


// 3.- colección de actividades que se renderizarán en el gráfico.
// OBSERVACIONES: 
// a) Igual que en ekade, su renderizado es independiente del renderizado 
//    de la plantilla
// b) En el caso de que hayan actividades en sesiones defindas en días
//    de la semana que no se hayan tenido en cuenta en la configuración
//    no habrá ningún problema. Simplemente, no serán renderizadas.
var actividades = [
    {
      idActividad: '616c632e-93d9-496b-b29c-0c39e2d8c6a1',

      sesion: {
          diaSemana: 'J',
          horaInicio: '08:55',
          horaFin: '09:50',
          idSesion: 'P1J2'
      },

      periodoVigencia: {
          idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
          denominacion: 'Curso completo',
          fechaInicio: '20210901',
          fechaFin: '20220630'
      },

      tipoActividad: {
          idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
          codigo: 'CCM',
          denominacionLarga: 'Clase colectiva de una materia',
          obligaDocentes: false,
          permiteDocentes: true,
          obligaAsignaturas: false,
          permiteAsignaturas: true,
          obligaGrupos: false,
          permiteGrupos: true,
          obligaDetalle: false,
          permiteDetalle: true,
          esLectiva: true,
          tipoPredeterminado: true

      },

      docentes: [
       
          {
              idDocente: '02cd8ece-e7c9-40a7-a8a0-d661ff7aa996',
              nombre: 'Lucía',
              apellido1: 'Dorta',
              apellido2: 'Dorta',
              foto: '',
              alias: 'sesther'
          },
           
          {
            idDocente: '02cd8ece-e7c9-40a7-a8a0-d661ff7aa996',
            nombre: 'Lucía',
            apellido1: 'Dorta',
            apellido2: 'Dorta',
            foto: '',
            alias: 'afumfer'
        },


      ],

      asignaturas: [
          {
              idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
              codigo: 'MAT',
              denominacionLarga: 'Matemáticas'
          },
          {
              idAsignatura: '21c88887-aa1b-4e67-b915-62674e1c478c',
              codigo: 'FYQ',
              denominacionLarga: 'Física y Química'
          },

      ],

      grupos: [ 
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '1BACA',
              denominacionLarga: '1º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '1BACB',
              denominacionLarga: '1º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '2BACA',
              denominacionLarga: '2º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '2BACB',
              denominacionLarga: 'º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '1BACA',
              denominacionLarga: '1º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '1BACB',
              denominacionLarga: '1º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '2BACA',
              denominacionLarga: '2º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '2BACB',
              denominacionLarga: 'º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '1BACA',
              denominacionLarga: '1º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '1BACB',
              denominacionLarga: '1º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '2BACA',
              denominacionLarga: '2º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '2BACB',
              denominacionLarga: 'º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '1BACA',
              denominacionLarga: '1º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '1BACB',
              denominacionLarga: '1º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '2BACA',
              denominacionLarga: '2º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '2BACB',
              denominacionLarga: 'º Bachillerato B'
          }, {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '1BACA',
              denominacionLarga: '1º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '1BACB',
              denominacionLarga: '1º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '2BACA',
              denominacionLarga: '2º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '2BACB',
              denominacionLarga: 'º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '1BACA',
              denominacionLarga: '1º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '1BACB',
              denominacionLarga: '1º Bachillerato B'
          },
          {
              idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
              codigo: '2BACA',
              denominacionLarga: '2º Bachillerato A'
          },
          {
              idGrupo: 'c6e390b7-7d76-4556-832d-09c2cf4f36a3',
              codigo: '2BACB',
              denominacionLarga: 'º Bachillerato B'
          },


      ],

      dependencia: {
          idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
          codigo: 'CA01',
          denominacionLarga: 'Cancha 1'
      },

      detalleActividad: ""

    },
    {
    idActividad: '646c632e-93d9-496b-b29c-0c39e2d8c6a1',

    sesion: {
        diaSemana: 'M',
        horaInicio: '08:00',
        horaFin: '08:55',
        idSesion: 'P1M1'
    },

    periodoVigencia: {
        idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
        denominacion: 'Curso completo',
        fechaInicio: '20210901',
        fechaFin: '20220630'
    },

    tipoActividad: {
        idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
        codigo: 'CCM',
        denominacionLarga: 'Clase colectiva de una materia',
        obligaDocentes: false,
        permiteDocentes: true,
        obligaAsignaturas: false,
        permiteAsignaturas: true,
        obligaGrupos: false,
        permiteGrupos: true,
        obligaDetalle: false,
        permiteDetalle: true,
        esLectiva: true,
        tipoPredeterminado: true

    },

    docentes: [
     
        {
            idDocente: 'f935e30d-7d90-411c-86c6-3618a8cea0f9',
            nombre: 'Edita',
            apellido1: 'Martín',
            apellido2: 'Sanabria',
            foto: '',
            alias: 'emarsan'
        },
       


    ],

    asignaturas: [
        {
            idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
            codigo: 'MII',
            denominacionLarga: 'Matemáticas I'
        }
   

    ],

    grupos: [ 
        {
            idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
            codigo: '1BACA',
            denominacionLarga: '1º Bachillerato A'
        }


    ],

    dependencia: {
        idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
        codigo: '3.1',
        denominacionLarga: 'Aula 3.1'
    },

    detalleActividad: ""

    },
    {
        idActividad: '656c632e-93d9-496b-b29c-0c39e2d8c6a1',

        sesion: {
            diaSemana: 'X',
            horaInicio: '08:00',
            horaFin: '08:55',
            idSesion: 'P1X1'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
        
            {
                idDocente: 'f935e30d-7d90-411c-86c6-3618a8cea0f9',
                nombre: 'Edita',
                apellido1: 'Martín',
                apellido2: 'Sanabria',
                foto: '',
                alias: 'emarsan'
            },
        


        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'MII',
                denominacionLarga: 'Matemáticas I'
            }

        ],

        grupos: [ 
            {
                idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
                codigo: '1BACA',
                denominacionLarga: '1º Bachillerato A'
            }


        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: '3.1',
            denominacionLarga: 'Aula 3.1'
        },

        detalleActividad: ""

    },
    {
        idActividad: '246c632e-93d9-496b-b29c-0c39e2d8c6a1',

        sesion: {
            diaSemana: 'X',
            horaInicio: '09:50',
            horaFin: '10:45',
            idSesion: 'P1X3'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
        
            {
                idDocente: 'f935e30d-7d90-411c-86c6-3618a8cea0f9',
                nombre: 'Edita',
                apellido1: 'Martín',
                apellido2: 'Sanabria',
                foto: '',
                alias: 'emarsan'
            },
        


        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'MII',
                denominacionLarga: 'Matemáticas I'
            }

        ],

        grupos: [ 
            {
                idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
                codigo: '1BACA',
                denominacionLarga: '1º Bachillerato A'
            }


        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: '3.1',
            denominacionLarga: 'Aula 3.1'
        },

        detalleActividad: ""

    },
    {
        idActividad: '676c632e-93d9-496b-b29c-0c39e2d8c6a1',

        sesion: {
            diaSemana: 'J',
            horaInicio: '08:00',
            horaFin: '08:55',
            idSesion: 'P1J1'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
        
            {
                idDocente: 'f935e30d-7d90-411c-86c6-3618a8cea0f9',
                nombre: 'Edita',
                apellido1: 'Martín',
                apellido2: 'Sanabria',
                foto: '',
                alias: 'emarsan'
            },
        


        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'CSO',
                denominacionLarga: 'Ciencias Sociales'
            }

        ],

        grupos: [ 
            {
                idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
                codigo: '1BACA',
                denominacionLarga: '1º Bachillerato A'
            }


        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: '3.1',
            denominacionLarga: 'Aula 3.1'
        },

        detalleActividad: ""

    },
    {
        idActividad: '346c632e-93d9-496b-b29c-0c39e2d8c6a3',

        sesion: {
            diaSemana: 'M',
            horaInicio: '08:55',
            horaFin: '09:50',
            idSesion: 'P1M2'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
        
            {
                idDocente: 'f935e30d-7d90-411c-86c6-3618a8cea0f9',
                nombre: 'Edita',
                apellido1: 'Martín',
                apellido2: 'Sanabria',
                foto: '',
                alias: 'emarsan'
            },
        


        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'TEC',
                denominacionLarga: 'Tecnología'
            }

        ],

        grupos: [ 
            {
                idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
                codigo: '3ESOA',
                denominacionLarga: '3º ESO'
            }


        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: 'GYM',
            denominacionLarga: 'gimnasio'
        },

        detalleActividad: "Se imparte en el Gimnasio"

    },
    {
        idActividad: '346c632e-93d9-496b-b29c-0c39e2d8c6a1',

        sesion: {
            diaSemana: 'V',
            horaInicio: '08:00',
            horaFin: '08:55',
            idSesion: 'P1V1'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
        
            {
                idDocente: 'f935e30d-7d90-411c-86c6-3618a8cea0f9',
                nombre: 'Edita',
                apellido1: 'Martín',
                apellido2: 'Sanabria',
                foto: '',
                alias: 'emarsan'
            },
        


        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'TEC',
                denominacionLarga: 'Tecnología'
            }

        ],

        grupos: [ 
            {
                idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
                codigo: '3ESOA',
                denominacionLarga: '3º ESO'
            }


        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: 'GYM',
            denominacionLarga: 'gimnasio'
        },

        detalleActividad: "Se imparte en el Gimnasio"

    },
    {
        idActividad: '946c632e-93d9-496b-b29c-0c39e2d8c6a1',

        sesion: {
            diaSemana: 'X',
            horaInicio: '08:55',
            horaFin: '09:50',
            idSesion: 'P1X2'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
        
            {
                idDocente: 'f935e30d-7d90-411c-86c6-3618a8cea0f9',
                nombre: 'Edita',
                apellido1: 'López',
                apellido2: 'Sanabria',
                foto: '',
                alias: 'jlopbonu'
            },
        


        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'LCL',
                denominacionLarga: 'Lengua'
            }

        ],

        grupos: [ 
            {
                idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
                codigo: '1BACA',
                denominacionLarga: '1º Bachillerato A'
            }


        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: '3.7',
            denominacionLarga: 'Aula 3.7'
        },

        detalleActividad: "Se imparte en el Gimnasio"

    },
    {
        idActividad: '75fc3ad4-da1a-4860-ae35-d8a675fa06a6',

        sesion: {
            diaSemana: 'L',
            horaInicio: '09:50',
            horaFin: '12:55',
            idSesion: 'P1L2'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            }
        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'FYQ',
                denominacionLarga: 'Física y Química'
            }
        ],

        grupos: [ 
            {
            idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
            codigo: '3ESOB',
            denominacionLarga: '3º ESO A'
            }
        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: '3.1',
            denominacionLarga: 'Aula 3.1'
        },

        detalleActividad: "Se imparte en el Gimnasio"

    },
    {
        idActividad: '77fc3ad1-da1a-4860-ae35-d8a675fa06a6',

        sesion: {
            diaSemana: 'L',
            horaInicio: '09:50',
            horaFin: '12:55',
            idSesion: 'P1L2'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
        
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            }
        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'FYQ',
                denominacionLarga: 'Física y Química'
            }
        ],

        grupos: [ 
            {
            idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
            codigo: '3ESOB',
            denominacionLarga: '3º ESO A'
            }
        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: '3.1',
            denominacionLarga: 'Aula 3.1'
        },

        detalleActividad: "Se imparte en el Gimnasio"

    },
    {
        idActividad: '75fc3ad4-da1a-4860-ae35-d8a675fa06a5',

        sesion: {
            diaSemana: 'L',
            horaInicio: '10:00',
            horaFin: '10:55',
            idSesion: 'P1L1'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba136',
            codigo: 'CCM',
            denominacionLarga: 'Clase colectiva de una materia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            },
            {
                idDocente: '387a0e4e-4eef-4736-85ac-4236f72e03c3',
                nombre: 'Santiago',
                apellido1: 'Estévez',
                apellido2: 'Hernández',
                foto: '',
                alias: 'sesther'
            }
        ],

        asignaturas: [
            {
                idAsignatura: '03fb8932-2b7f-4c9c-89c8-3242e30f9ebb',
                codigo: 'FYQ',
                denominacionLarga: 'Física y Química'
            }
        ],

        grupos: [ 
            {
            idGrupo: 'c93eeb67-df6b-4d99-9d52-ecbab0cad82d',
            codigo: '3ESOC',
            denominacionLarga: '3º ESO A'
            }
        ],

        dependencia: {
            idDependencia: 'f217df71-a791-4439-ad5e-3460dd8b17f3',
            codigo: '3.1',
            denominacionLarga: 'Aula 3.1'
        },

        detalleActividad: "Se imparte en el Gimnasio"

    },
    {
        idActividad: '76fc3ad4-da1a-4860-ae35-d8a675fa06a1',

        sesion: {
            diaSemana: 'M',
            horaInicio: '11:15',
            horaFin: '12:10',
            idSesion: 'P1L4'
        },

        periodoVigencia: {
            idPeriodoVigencia: 'ab88957d-ef61-46c1-a659-893619ea02e0',
            denominacion: 'Curso completo',
            fechaInicio: '20210901',
            fechaFin: '20220630'
        },

        tipoActividad: {
            idTipoActividad: 'cf5aa348-2dd8-4645-ada8-7e6db13ba132',
            codigo: 'G',
            denominacionLarga: 'Guardia',
            obligaDocentes: false,
            permiteDocentes: true,
            obligaAsignaturas: false,
            permiteAsignaturas: true,
            obligaGrupos: false,
            permiteGrupos: true,
            obligaDetalle: false,
            permiteDetalle: true,
            esLectiva: true,
            tipoPredeterminado: true

        },

        docentes: [
            
        ],

        asignaturas: [
            
        ],

        grupos: [ 
            
            
        ],

        dependencia: {
        
        },

        detalleActividad: "Se imparte en el Gimnasio"

    },

     
     
]



//--------------------------------------------------------------
// CÓDIGO
//--------------------------------------------------------------
function notificacion(cadena, actividadActual) {
  document.getElementById('ultimaAccion').textContent=cadena;
  establecerActividadActual(actividadActual)
}

function establecerActividadActual(actividad) {
  if (actividad) {
      document.getElementById('act_idActividad').textContent=actividad.idActividad;
      document.getElementById('act_tipoActividad').textContent=actividad.tipoActividad.denominacionLarga;
      document.getElementById('act_sesion').textContent='Dia semana: ' + actividad.sesion.diaSemana + ', franja horaria: '+' de '+actividad.sesion.horaInicio+' a '+actividad.sesion.horaFin;
      document.getElementById('act_periodoVigencia').textContent=actividad.periodoVigencia.denominacion;
      document.getElementById('act_espacioFisico').textContent=actividad.dependencia.denominacionLarga;
      document.getElementById('act_observaciones').textContent=actividad.detalleActividad;

      var docentes='';
      actividad.docentes.forEach(docente=> docentes += docente.alias+' ');
      document.getElementById('act_docentes').textContent=docentes;

      var asignaturas='';
      actividad.asignaturas.forEach(asignatura=> asignaturas += asignatura.denominacionLarga+' ');
      document.getElementById('act_asignaturas').textContent=asignaturas;

      var grupos='';
      actividad.grupos.forEach(grupo=> grupos += grupo.denominacionLarga+' ');
      document.getElementById('act_grupos').textContent=grupos;
  } else {
      document.getElementById('act_idActividad').textContent='-- No establecida --';
      document.getElementById('act_tipoActividad').textContent='';
      document.getElementById('act_sesion').textContent='';
      document.getElementById('act_periodoVigencia').textContent='';
      document.getElementById('act_espacioFisico').textContent='';
      document.getElementById('act_observaciones').textContent='';
      document.getElementById('act_docentes').textContent='';
      document.getElementById('act_asignaturas').textContent='';
      document.getElementById('act_grupos').textContent='';

  }

}


function cadenasSeccionesToArray( cadenaSecciones) {
    const cadenasPosibles=['DOC','GRU','DEP','CON'];
    let cadenas = [];
    let secciones = cadenaSecciones.split(',');


    for (let index = 0; index < secciones.length; index++) {
      

        const v = secciones[index].trim();

        if (cadenasPosibles.includes(v)){
            
            cadenas.push(v)
        }
        else{
 
           break;
        }
        
        
    }


    return cadenas;

  
    

}

function seccionerToCadena( secciones ) {
    let cadena = "";
    secciones.forEach(seccion => cadena += seccion+',');
    cadena = cadena.substring(0, cadena.length-1);
    return cadena;
}

function iniciarParametros(){

    //----------------------------------------------------------
    // Configuración parámetro: mostrarBotonesAccionActividad 
    //----------------------------------------------------------
    document.getElementById("mostrarBotonesAccionActividad").checked=configuracion.actividades?.mostrarPanelAcciones?configuracion.actividades.mostrarPanelAcciones:configuracionPorDefecto.actividades?.mostrarPanelAcciones;

    // Gestionamos el evento 'input del parámetro "Activar acciones sobre actividades"
    document.getElementById("mostrarBotonesAccionActividad")
    .addEventListener('input', (event) =>  {
        configuracion.actividades.mostrarPanelAcciones=event.target.checked;
        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
    } );

    //----------------------------------------------------------
    // Configuración parámetro: mostrarBotonesAccionActividad 
    //----------------------------------------------------------
    document.getElementById("mostrarDetalleActividad").checked=configuracion.actividades.mostrarSeccionPie?configuracion.actividades.mostrarSeccionPie:configuracionPorDefecto.actividades.mostrarSeccionPie;

    // Gestionamos el evento 'input del parámetro "Activar acciones sobre actividades"
    document.getElementById("mostrarDetalleActividad")
    .addEventListener('input', (event) =>  {
        configuracion.actividades.mostrarSeccionPie=event.target.checked;
        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
    } );

    //----------------------------------------------------------
    // Configuración parámetro: sobrescribirAsignaturas
    //----------------------------------------------------------
    document.getElementById("sobrescribirAsignaturas").checked=configuracion.actividades.sobrescribirContenidoAreasPorTipo?configuracion.actividades.sobrescribirContenidoAreasPorTipo:configuracionPorDefecto.actividades.sobrescribirContenidoAreasPorTipo;

    // Gestionamos el evento 'input del parámetro "Activar acciones sobre actividades"
    document.getElementById("sobrescribirAsignaturas")
    .addEventListener('input', (event) =>  {

        configuracion.actividades.sobrescribirContenidoAreasPorTipo=event.target.checked;
        console.log(configuracion.actividades.sobrescribirContenidoAreasPorTipo);
        
        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
    } );
    

    //----------------------------------------------------------
    // Configuración parámetros: mostrarDia 
    //----------------------------------------------------------
    Array.prototype.filter.call(document.getElementsByClassName("mostrarDia"), function(element){

        //Establecemos valores iniciales de los elementos del DOM (días) en base a la configuración
        element.checked=configuracion.configuracionSemana?.diasSemanaHabiles?configuracion.configuracionSemana.diasSemanaHabiles.includes(element.id)?true:false:configuracionPorDefecto.configuracionSemana.diasSemanaHabiles.includes(element.id)?true:false;

        //Establecemos la reacción ante la selección/deselección de los elementos (días)
        element.addEventListener('input', (event) =>  {
            if ( event.target.checked) {
                configuracion.configuracionSemana.diasSemanaHabiles.push(event.target.id)
            }
            else{
                const index = configuracion.configuracionSemana.diasSemanaHabiles.indexOf(event.target.id)
                index > -1? configuracion.configuracionSemana.diasSemanaHabiles.splice(index,1):null
            }
            
            graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
         } );

       })

    //----------------------------------------------------------
    // Configuración parámetros: tamanyoTexto 
    //----------------------------------------------------------

    configuracion.actividades.mostrarSeccionPie?configuracion.actividades.mostrarSeccionPie:configuracionPorDefecto.actividades.mostrarSeccionPie;

    document.getElementById("tamanyoTexto").value=configuracion.actividades.tamanyoTexto?configuracion.actividades.tamanyoTexto:configuracionPorDefecto.actividades.tamanyoTexto;
    document.getElementById("valorTamanyoTexto").innerHTML=configuracion.actividades.tamanyoTexto?configuracion.actividades.tamanyoTexto:configuracionPorDefecto.actividades.tamanyoTexto;
    
    document.getElementById("tamanyoTexto")
    .addEventListener('input', (event) =>  {
        configuracion.actividades.tamanyoTexto=event.target.value;
        document.getElementById("valorTamanyoTexto").innerHTML=event.target.value;
        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
     } );

    //----------------------------------------------------------
    // Configuración parámetros: altoSesiones 
    //----------------------------------------------------------
    if (configuracion.panelSesiones?.alto)
    {
        document.getElementById("altoSesiones").value=configuracion.panelSesiones?.alto;
        document.getElementById("valorAltoSesiones").innerHTML=configuracion.panelSesiones?.alto*100 +'%';
    }
    
    document.getElementById("altoSesiones")
    .addEventListener('input', (event) =>  {
        configuracion.panelSesiones.alto=event.target.value;
        document.getElementById("valorAltoSesiones").innerHTML=parseInt(parseFloat(event.target.value)*100)+'%';
        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
     } );

    //----------------------------------------------------------
    // Configuración parámetros: anchoSesiones 
    //----------------------------------------------------------
    if (configuracion.panelSesiones?.alto)
    {
        document.getElementById("anchoSesiones").value=configuracion.panelSesiones?.ancho;
        document.getElementById("valorAnchoSesiones").innerHTML= configuracion.panelSesiones?.ancho*100 +'%';
    }
    
    document.getElementById("anchoSesiones")
    .addEventListener('input', (event) =>  {
        configuracion.panelSesiones.ancho=event.target.value;
        document.getElementById("valorAnchoSesiones").innerHTML=parseInt(parseFloat(event.target.value)*100)+'%';
        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
     } );

    document.getElementById("horaInicio").value=configuracion.configuracionSemana?.horaMinima?configuracion.configuracionSemana.horaMinima:null;
    document.getElementById("horaInicio")
    .addEventListener('input', (event) =>  {
        configuracion.configuracionSemana.horaMinima=event.target.value;
        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
     } );

    document.getElementById("horaFin").value=configuracion.configuracionSemana?.horaMaxima?configuracion.configuracionSemana.horaMaxima:null;
    document.getElementById("horaFin")
    .addEventListener('input', (event) =>  {
        configuracion.configuracionSemana.horaMaxima=event.target.value;
        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
     } );

     document.getElementById("colorSesiones").value=configuracion.panelSesiones?.colorCuerpo?configuracion.panelSesiones.colorCuerpo:null;
     document.getElementById("colorSesiones")
     .addEventListener('input', (event) =>  {
         configuracion.panelSesiones.colorCuerpo=event.target.value;
         graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
      } );

    //----------------------------------------------------------
    // Configuración parámetro: mostrarPlantilla
    //----------------------------------------------------------
    document.getElementById("mostrarPlantilla").checked=true;

    // Gestionamos el evento 'input del parámetro "Activar acciones sobre actividades"
    document.getElementById("mostrarPlantilla")
    .addEventListener('input', (event) =>  {

        plantillaAMostrar=event.target.checked?plantillaAMostrar=plantilla:null;

        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
    } );



    //Seccion 1
    document.getElementById("configuracionSecciones").value=configuracion.actividades.contenidoSecciones ? seccionerToCadena(configuracion.actividades.contenidoSecciones) : null;
    document.getElementById("botonAplicarConfiguracionSecciones")
    .addEventListener('click', (event) =>  {
       
        configuracion.actividades.contenidoSecciones = cadenasSeccionesToArray(document.getElementById("configuracionSecciones").value)

        graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar )
    } );


   
  

}

function init() {  
    

    // Paso 1: Instanciamos un objeto horario y almacenamos la configuración por defecto. En la iniciación de parámetros se aplicará la configuración establecida aqui y, en caso contrario, la estrablecida como valor por defecto.
    graficoHorario = new HorarioG('div#horario');
    configuracionPorDefecto = graficoHorario.obtenerConfiguracion();

    // Se inician todos los controles de la interfaz.
    iniciarParametros();



    // Paso 3: Subscripción a los observables ofrecidos por el objeto "HorarioG"
    // 4.1) ESTRATEGIA PARA COMUNICAR AL EXTERIOR LA INTERACCIÓN DEL USUARIO
    // la interacción de los usuarios con el gráfico se hace uno deprogramación reactiva.
    // Este paradigma de programación contempla la existencia de artefactos ( observables <emit>) que emiten datos y 
    // y que pueden ser observaos por los clientes a través del método "Subscribe". Se ha usado la librería "rxjs"
    // 4.2) INTERACIÓN DEL USUARIO
    // Se ha modelado 5 formas de interación. Se podrá detectar la intención del usuario de:
    //  a) Eliminar una actividad
    //  b) Duplicar una actividad
    //  c) Mover una actividad
    //  d) Seleccionar una actividad.
    //  e) Añadir una actividad a una sesión.
    // 4.2) INFORMACIÓN OFRECIDA EN LAS SUBSCRIPCIONES.
    //  a) En las primeras 4 interacción la herramienta cliente dispondrá de la actividad afectada por la interacción.
    //  b) En la sección anterior "Datos" se podrá observar la estructura del objeto actividad,
    //  c) En la opción "e) Añadir una actividad a una sesión" se devuelve enla que se desea crear la nueva actividad.
    //  b) En la sección anterior "Datos" se podrá observar la estructura del objeto sesion. es un nodo interno al objeto "plantilla"

    graficoHorario.eliminarActividad$.subscribe(
        act => { notificacion('. . . Eliminación la actividad: ' + act.idActividad, act);}
    );

    graficoHorario.duplicarActividad$.subscribe(
        act => notificacion('. . . Copiando la actividad <' + act.idActividad + '> a la sesión <' + act.sesion.idSesion + '>', act)
    );

    graficoHorario.moverActividad$.subscribe(
        act => notificacion('. . . Moviendo la actividad <' + act.idActividad + '> a la sesión <' + act.sesion.idSesion + '>', act)
    );

    graficoHorario.seleccionActividad$.subscribe(
        act => notificacion('. . . Seleccionado la actividad <' + act.idActividad + '> a la sesión <' + act.sesion.idSesion + '>', act)
    );

    graficoHorario.entrandoEnActividad$.subscribe(
        act => notificacion('. . . Entrando en la actividad actividad <' + act.idActividad + '> a la sesión <' + act.sesion.idSesion + '>', act)
    );
    graficoHorario.saliendoDeActividad$.subscribe(
        act => notificacion('. . . Saliendo de la actividad <' + act.idActividad + '> a la sesión <' + act.sesion.idSesion + '>', act)
    );

    graficoHorario.anyadirActividadEnSesion$.subscribe(
        ses => notificacion('. . . Añadiendo una actividad en la sesión: '+ses.idSesion, null)
    );

    
  // Paso 5: Se invoca a su renderizado.
  // IMPORTANTE: El renderizado depende de dos objetos que se pasarán por parámetro.
  // 1) Objeto de configuración: hora de inicio y fin y días habilitados
  // 2) Plantilla Horaria que se renderizará de fondo. 
  graficoHorario.renderizarGrafico( configuracion, plantillaAMostrar );

  // Paso 3: Definir las actividades que se "pintarán"
  // Observaciones: Generalmente, la configuración y plantilla de fondo permanece estable y no se suele cambiar.
  //                por ese motivo se ha separado la inclusión de actividades que, a medida que se cambia la entidad de 
  //                referencia se cambia el conjunto de actividades pero no el fondo del gráfico.
  graficoHorario.actualizarActividades(actividades);

 
}

init();

