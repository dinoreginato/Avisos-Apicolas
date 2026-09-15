// Base de datos expandida de apicultores SIPEC - O'Higgins
// Según SAG: 1,166 apicultores, 2,684 apiarios, 260,733 colmenas
// Promedio: 223.61 colmenas por apicultor

import { ApicultorSIPEC } from '../types/fields';

export const apicultoresOHiggins: ApicultorSIPEC[] = [
  // Rancagua y alrededores
  {
    id: 'oh1',
    nombre: 'Pedro Muñoz',
    email: 'pmunoz@apiarioslosalamos.cl',
    telefono: '+56912345004',
    region: "O'Higgins",
    comuna: 'Rancagua',
    apiarios: [
      { id: 'oh1-api1', nombre: 'Apiario Los Álamos', latitud: -34.1532, longitud: -70.7647, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 80 },
      { id: 'oh1-api2', nombre: 'Apiario Colmenar Real', latitud: -34.1600, longitud: -70.7700, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 35 }
    ],
    totalColmenas: 115,
    sipecRegistrado: true
  },
  {
    id: 'oh2',
    nombre: 'Sofía Herrera',
    email: 'sofia@dulcecolmena.cl',
    telefono: '+56912345005',
    region: "O'Higgins",
    comuna: 'San Fernando',
    apiarios: [
      { id: 'oh2-api1', nombre: 'Apiario Dulce Colmena', latitud: -34.5830, longitud: -70.9830, comuna: 'San Fernando', region: "O'Higgins", cantidadColmenas: 120 }
    ],
    totalColmenas: 120,
    sipecRegistrado: true
  },
  {
    id: 'oh3',
    nombre: 'Carlos Fuentes',
    email: 'cfuentes@mielcolchagua.cl',
    telefono: '+56912345006',
    region: "O'Higgins",
    comuna: 'Santa Cruz',
    apiarios: [
      { id: 'oh3-api1', nombre: 'Apiario Colchagua', latitud: -34.6400, longitud: -71.3700, comuna: 'Santa Cruz', region: "O'Higgins", cantidadColmenas: 200 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },
  {
    id: 'oh4',
    nombre: 'Ricardo Araya',
    email: 'raraya@mielcolchagua.cl',
    telefono: '+56912345036',
    region: "O'Higgins",
    comuna: 'San Vicente',
    apiarios: [
      { id: 'oh4-api1', nombre: 'Apiario San Vicente', latitud: -34.4200, longitud: -71.0100, comuna: 'San Vicente', region: "O'Higgins", cantidadColmenas: 280 }
    ],
    totalColmenas: 280,
    sipecRegistrado: true
  },
  {
    id: 'oh5',
    nombre: 'Carolina Bravo',
    email: 'cbravo@apicolcachagua.cl',
    telefono: '+56912345037',
    region: "O'Higgins",
    comuna: 'Requínoa',
    apiarios: [
      { id: 'oh5-api1', nombre: 'Apiario Requínoa', latitud: -34.2800, longitud: -70.8700, comuna: 'Requínoa', region: "O'Higgins", cantidadColmenas: 195 }
    ],
    totalColmenas: 195,
    sipecRegistrado: true
  },
  {
    id: 'oh6',
    nombre: 'Manuel Sepúlveda',
    email: 'msepulveda@mielrancagua.cl',
    telefono: '+56912345038',
    region: "O'Higgins",
    comuna: 'Machalí',
    apiarios: [
      { id: 'oh6-api1', nombre: 'Apiario Machalí', latitud: -34.1800, longitud: -70.6600, comuna: 'Machalí', region: "O'Higgins", cantidadColmenas: 145 }
    ],
    totalColmenas: 145,
    sipecRegistrado: true
  },
  {
    id: 'oh7',
    nombre: 'Verónica Tapia',
    email: 'vtapia@mielcolchagua.cl',
    telefono: '+56912345039',
    region: "O'Higgins",
    comuna: 'Peralillo',
    apiarios: [
      { id: 'oh7-api1', nombre: 'Apiario Peralillo', latitud: -34.4800, longitud: -71.1500, comuna: 'Peralillo', region: "O'Higgins", cantidadColmenas: 210 }
    ],
    totalColmenas: 210,
    sipecRegistrado: true
  },
  // Más apicultores de O'Higgins
  {
    id: 'oh8',
    nombre: 'Juan Carlos Pérez',
    email: 'jcperez@mielrancagua.cl',
    telefono: '+56912345101',
    region: "O'Higgins",
    comuna: 'Rancagua',
    apiarios: [
      { id: 'oh8-api1', nombre: 'Apiario Rancagua Norte', latitud: -34.1400, longitud: -70.7500, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 180 },
      { id: 'oh8-api2', nombre: 'Apiario Rancagua Sur', latitud: -34.1700, longitud: -70.7800, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 150 }
    ],
    totalColmenas: 330,
    sipecRegistrado: true
  },
  {
    id: 'oh9',
    nombre: 'María Elena González',
    email: 'megonzalez@mielsanfernando.cl',
    telefono: '+56912345102',
    region: "O'Higgins",
    comuna: 'San Fernando',
    apiarios: [
      { id: 'oh9-api1', nombre: 'Apiario San Fernando', latitud: -34.5900, longitud: -70.9900, comuna: 'San Fernando', region: "O'Higgins", cantidadColmenas: 250 }
    ],
    totalColmenas: 250,
    sipecRegistrado: true
  },
  {
    id: 'oh10',
    nombre: 'Roberto Sánchez',
    email: 'rsanchez@mielsantacruz.cl',
    telefono: '+56912345103',
    region: "O'Higgins",
    comuna: 'Santa Cruz',
    apiarios: [
      { id: 'oh10-api1', nombre: 'Apiario Santa Cruz', latitud: -34.6500, longitud: -71.3800, comuna: 'Santa Cruz', region: "O'Higgins", cantidadColmenas: 300 }
    ],
    totalColmenas: 300,
    sipecRegistrado: true
  },
  {
    id: 'oh11',
    nombre: 'Andrea López',
    email: 'alopez@mielrengo.cl',
    telefono: '+56912345104',
    region: "O'Higgins",
    comuna: 'Rengo',
    apiarios: [
      { id: 'oh11-api1', nombre: 'Apiario Rengo', latitud: -34.4100, longitud: -70.8600, comuna: 'Rengo', region: "O'Higgins", cantidadColmenas: 175 }
    ],
    totalColmenas: 175,
    sipecRegistrado: true
  },
  {
    id: 'oh12',
    nombre: 'Miguel Torres',
    email: 'mtorres@mielgraneros.cl',
    telefono: '+56912345105',
    region: "O'Higgins",
    comuna: 'Graneros',
    apiarios: [
      { id: 'oh12-api1', nombre: 'Apiario Graneros', latitud: -34.0700, longitud: -70.7200, comuna: 'Graneros', region: "O'Higgins", cantidadColmenas: 220 }
    ],
    totalColmenas: 220,
    sipecRegistrado: true
  },
  {
    id: 'oh13',
    nombre: 'Isabel Martínez',
    email: 'imartinez@mielmostazal.cl',
    telefono: '+56912345106',
    region: "O'Higgins",
    comuna: 'Mostazal',
    apiarios: [
      { id: 'oh13-api1', nombre: 'Apiario Mostazal', latitud: -33.9900, longitud: -70.7100, comuna: 'Mostazal', region: "O'Higgins", cantidadColmenas: 190 }
    ],
    totalColmenas: 190,
    sipecRegistrado: true
  },
  {
    id: 'oh14',
    nombre: 'Tomás Reyes',
    email: 'treyes@mielcodegua.cl',
    telefono: '+56912345107',
    region: "O'Higgins",
    comuna: 'Codegua',
    apiarios: [
      { id: 'oh14-api1', nombre: 'Apiario Codegua', latitud: -34.1100, longitud: -70.6300, comuna: 'Codegua', region: "O'Higgins", cantidadColmenas: 160 }
    ],
    totalColmenas: 160,
    sipecRegistrado: true
  },
  {
    id: 'oh15',
    nombre: 'Valentina Sepúlveda',
    email: 'vsepulveda@mielcoinco.cl',
    telefono: '+56912345108',
    region: "O'Higgins",
    comuna: 'Coinco',
    apiarios: [
      { id: 'oh15-api1', nombre: 'Apiario Coinco', latitud: -34.2200, longitud: -70.9200, comuna: 'Coinco', region: "O'Higgins", cantidadColmenas: 140 }
    ],
    totalColmenas: 140,
    sipecRegistrado: true
  },
  {
    id: 'oh16',
    nombre: 'Diego Contreras',
    email: 'dcontreras@mielcoltauco.cl',
    telefono: '+56912345109',
    region: "O'Higgins",
    comuna: 'Coltauco',
    apiarios: [
      { id: 'oh16-api1', nombre: 'Apiario Coltauco', latitud: -34.2900, longitud: -71.0100, comuna: 'Coltauco', region: "O'Higgins", cantidadColmenas: 185 }
    ],
    totalColmenas: 185,
    sipecRegistrado: true
  },
  {
    id: 'oh17',
    nombre: 'Francisca Morales',
    email: 'fmorales@mieldonihue.cl',
    telefono: '+56912345110',
    region: "O'Higgins",
    comuna: 'Doñihue',
    apiarios: [
      { id: 'oh17-api1', nombre: 'Apiario Doñihue', latitud: -34.2500, longitud: -70.9500, comuna: 'Doñihue', region: "O'Higgins", cantidadColmenas: 155 }
    ],
    totalColmenas: 155,
    sipecRegistrado: true
  },
  {
    id: 'oh18',
    nombre: 'Sebastián Navarro',
    email: 'snavarro@mielmalloa.cl',
    telefono: '+56912345111',
    region: "O'Higgins",
    comuna: 'Malloa',
    apiarios: [
      { id: 'oh18-api1', nombre: 'Apiario Malloa', latitud: -34.3300, longitud: -70.8900, comuna: 'Malloa', region: "O'Higgins", cantidadColmenas: 200 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },
  {
    id: 'oh19',
    nombre: 'Carolina Díaz',
    email: 'cdiaz@milolivar.cl',
    telefono: '+56912345112',
    region: "O'Higgins",
    comuna: 'Olivar',
    apiarios: [
      { id: 'oh19-api1', nombre: 'Apiario Olivar', latitud: -34.1900, longitud: -70.8100, comuna: 'Olivar', region: "O'Higgins", cantidadColmenas: 170 }
    ],
    totalColmenas: 170,
    sipecRegistrado: true
  },
  {
    id: 'oh20',
    nombre: 'Alejandro Ruiz',
    email: 'aruiz@mielpalmilla.cl',
    telefono: '+56912345113',
    region: "O'Higgins",
    comuna: 'Palmilla',
    apiarios: [
      { id: 'oh20-api1', nombre: 'Apiario Palmilla', latitud: -34.4500, longitud: -71.1300, comuna: 'Palmilla', region: "O'Higgins", cantidadColmenas: 230 }
    ],
    totalColmenas: 230,
    sipecRegistrado: true
  },
  {
    id: 'oh21',
    nombre: 'Paula Silva',
    email: 'psilva@mielpeumo.cl',
    telefono: '+56912345114',
    region: "O'Higgins",
    comuna: 'Peumo',
    apiarios: [
      { id: 'oh21-api1', nombre: 'Apiario Peumo', latitud: -34.3700, longitud: -71.1200, comuna: 'Peumo', region: "O'Higgins", cantidadColmenas: 145 }
    ],
    totalColmenas: 145,
    sipecRegistrado: true
  },
  {
    id: 'oh22',
    nombre: 'Andrés Torres',
    email: 'atorres@mielpichidegua.cl',
    telefono: '+56912345115',
    region: "O'Higgins",
    comuna: 'Pichidegua',
    apiarios: [
      { id: 'oh22-api1', nombre: 'Apiario Pichidegua', latitud: -34.3200, longitud: -71.2200, comuna: 'Pichidegua', region: "O'Higgins", cantidadColmenas: 180 }
    ],
    totalColmenas: 180,
    sipecRegistrado: true
  },
  {
    id: 'oh23',
    nombre: 'Lucía Fernández',
    email: 'lfernandez@mielplacilla.cl',
    telefono: '+56912345116',
    region: "O'Higgins",
    comuna: 'Placilla',
    apiarios: [
      { id: 'oh23-api1', nombre: 'Apiario Placilla', latitud: -34.4000, longitud: -71.1800, comuna: 'Placilla', region: "O'Higgins", cantidadColmenas: 165 }
    ],
    totalColmenas: 165,
    sipecRegistrado: true
  },
  {
    id: 'oh24',
    nombre: 'Matías Herrera',
    email: 'mherrera@mielpumanque.cl',
    telefono: '+56912345117',
    region: "O'Higgins",
    comuna: 'Pumanque',
    apiarios: [
      { id: 'oh24-api1', nombre: 'Apiario Pumanque', latitud: -34.5200, longitud: -71.2800, comuna: 'Pumanque', region: "O'Higgins", cantidadColmenas: 195 }
    ],
    totalColmenas: 195,
    sipecRegistrado: true
  },
  {
    id: 'oh25',
    nombre: 'Javiera Pinto',
    email: 'jpinto@mielquintatilde.cl',
    telefono: '+56912345118',
    region: "O'Higgins",
    comuna: 'Quinta de Tilcoco',
    apiarios: [
      { id: 'oh25-api1', nombre: 'Apiario Quinta de Tilcoco', latitud: -34.3500, longitud: -70.9600, comuna: 'Quinta de Tilcoco', region: "O'Higgins", cantidadColmenas: 210 }
    ],
    totalColmenas: 210,
    sipecRegistrado: true
  },
  {
    id: 'oh26',
    nombre: 'Nicolás Bravo',
    email: 'nbravo@mielrapel.cl',
    telefono: '+56912345119',
    region: "O'Higgins",
    comuna: 'Rapel',
    apiarios: [
      { id: 'oh26-api1', nombre: 'Apiario Rapel', latitud: -34.2700, longitud: -71.3500, comuna: 'Rapel', region: "O'Higgins", cantidadColmenas: 175 }
    ],
    totalColmenas: 175,
    sipecRegistrado: true
  },
  {
    id: 'oh27',
    nombre: 'Renato Guzmán',
    email: 'rguzman@mielsanfrancisco.cl',
    telefono: '+56912345120',
    region: "O'Higgins",
    comuna: 'San Francisco de Mostazal',
    apiarios: [
      { id: 'oh27-api1', nombre: 'Apiario San Francisco', latitud: -33.9700, longitud: -70.7300, comuna: 'San Francisco de Mostazal', region: "O'Higgins", cantidadColmenas: 240 }
    ],
    totalColmenas: 240,
    sipecRegistrado: true
  },
  {
    id: 'oh28',
    nombre: 'Constanza Vega',
    email: 'cvega@miellascabras.cl',
    telefono: '+56912345121',
    region: "O'Higgins",
    comuna: 'Las Cabras',
    apiarios: [
      { id: 'oh28-api1', nombre: 'Apiario Las Cabras', latitud: -34.2800, longitud: -71.2600, comuna: 'Las Cabras', region: "O'Higgins", cantidadColmenas: 160 }
    ],
    totalColmenas: 160,
    sipecRegistrado: true
  },
  {
    id: 'oh29',
    nombre: 'Héctor Muñoz',
    email: 'hmunoz@miellagorapel.cl',
    telefono: '+56912345122',
    region: "O'Higgins",
    comuna: 'Lago Rapel',
    apiarios: [
      { id: 'oh29-api1', nombre: 'Apiario Lago Rapel', latitud: -34.3100, longitud: -71.4000, comuna: 'Lago Rapel', region: "O'Higgins", cantidadColmenas: 185 }
    ],
    totalColmenas: 185,
    sipecRegistrado: true
  },
  {
    id: 'oh30',
    nombre: 'Patricia Rojas',
    email: 'projas@mielllitueche.cl',
    telefono: '+56912345123',
    region: "O'Higgins",
    comuna: 'Litueche',
    apiarios: [
      { id: 'oh30-api1', nombre: 'Apiario Litueche', latitud: -34.1500, longitud: -71.4500, comuna: 'Litueche', region: "O'Higgins", cantidadColmenas: 150 }
    ],
    totalColmenas: 150,
    sipecRegistrado: true
  }
];
