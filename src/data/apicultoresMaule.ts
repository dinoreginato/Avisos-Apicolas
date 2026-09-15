// Base de datos expandida de apicultores SIPEC - Maule
// Según SAG: 1,720 apicultores, 3,699 apiarios, 292,853 colmenas

import { ApicultorSIPEC } from '../types/fields';

export const apicultoresMaule: ApicultorSIPEC[] = [
  {
    id: 'ml1',
    nombre: 'Héctor Muñoz',
    email: 'hmunoz@mielmaule.cl',
    telefono: '+56912345028',
    region: 'Maule',
    comuna: 'Talca',
    apiarios: [
      { id: 'ml1-api1', nombre: 'Apiario Talca Norte', latitud: -35.4000, longitud: -71.6500, comuna: 'Talca', region: 'Maule', cantidadColmenas: 180 },
      { id: 'ml1-api2', nombre: 'Apiario Talca Sur', latitud: -35.4500, longitud: -71.6700, comuna: 'Talca', region: 'Maule', cantidadColmenas: 150 }
    ],
    totalColmenas: 330,
    sipecRegistrado: true
  },
  {
    id: 'ml2',
    nombre: 'Patricia Rojas',
    email: 'projas@apiculturamaule.cl',
    telefono: '+56912345029',
    region: 'Maule',
    comuna: 'Curicó',
    apiarios: [
      { id: 'ml2-api1', nombre: 'Apiario Curicó', latitud: -34.9800, longitud: -71.2400, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 220 }
    ],
    totalColmenas: 220,
    sipecRegistrado: true
  },
  {
    id: 'ml4',
    nombre: 'Marcela Pérez',
    email: 'mperez@mielmaule.cl',
    telefono: '+56912345031',
    region: 'Maule',
    comuna: 'Molina',
    apiarios: [
      { id: 'ml4-api1', nombre: 'Apiario Molina', latitud: -35.1200, longitud: -71.2800, comuna: 'Molina', region: 'Maule', cantidadColmenas: 160 }
    ],
    totalColmenas: 160,
    sipecRegistrado: true
  },
  {
    id: 'ml6',
    nombre: 'Miguel Torres',
    email: 'mtorres@mielcurico.cl',
    telefono: '+56912345130',
    region: 'Maule',
    comuna: 'Curicó',
    apiarios: [
      { id: 'ml6-api1', nombre: 'Apiario Curicó Este', latitud: -34.9900, longitud: -71.2200, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 280 },
      { id: 'ml6-api2', nombre: 'Apiario Curicó Oeste', latitud: -34.9700, longitud: -71.2600, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 240 }
    ],
    totalColmenas: 520,
    sipecRegistrado: true
  },
  {
    id: 'ml7',
    nombre: 'Isabel Martínez',
    email: 'imartinez@mieltalca.cl',
    telefono: '+56912345131',
    region: 'Maule',
    comuna: 'Talca',
    apiarios: [
      { id: 'ml7-api1', nombre: 'Apiario Talca Centro', latitud: -35.4200, longitud: -71.6600, comuna: 'Talca', region: 'Maule', cantidadColmenas: 195 }
    ],
    totalColmenas: 195,
    sipecRegistrado: true
  },
  {
    id: 'ml8',
    nombre: 'Tomás Reyes',
    email: 'treyes@miellinares.cl',
    telefono: '+56912345132',
    region: 'Maule',
    comuna: 'Linares',
    apiarios: [
      { id: 'ml8-api1', nombre: 'Apiario Linares', latitud: -35.8500, longitud: -71.5800, comuna: 'Linares', region: 'Maule', cantidadColmenas: 210 }
    ],
    totalColmenas: 210,
    sipecRegistrado: true
  },
  {
    id: 'ml9',
    nombre: 'Valentina Sepúlveda',
    email: 'vsepulveda@mielparral.cl',
    telefono: '+56912345133',
    region: 'Maule',
    comuna: 'Parral',
    apiarios: [
      { id: 'ml9-api1', nombre: 'Apiario Parral', latitud: -36.1400, longitud: -71.8200, comuna: 'Parral', region: 'Maule', cantidadColmenas: 175 }
    ],
    totalColmenas: 175,
    sipecRegistrado: true
  },
  {
    id: 'ml10',
    nombre: 'Diego Contreras',
    email: 'dcontreras@mielconstitucion.cl',
    telefono: '+56912345134',
    region: 'Maule',
    comuna: 'Constitución',
    apiarios: [
      { id: 'ml10-api1', nombre: 'Apiario Constitución', latitud: -35.3300, longitud: -72.4100, comuna: 'Constitución', region: 'Maule', cantidadColmenas: 240 }
    ],
    totalColmenas: 240,
    sipecRegistrado: true
  },
  {
    id: 'ml11',
    nombre: 'Francisca Morales',
    email: 'fmorales@mielcolbun.cl',
    telefono: '+56912345135',
    region: 'Maule',
    comuna: 'Colbún',
    apiarios: [
      { id: 'ml11-api1', nombre: 'Apiario Colbún', latitud: -35.6800, longitud: -71.4200, comuna: 'Colbún', region: 'Maule', cantidadColmenas: 165 }
    ],
    totalColmenas: 165,
    sipecRegistrado: true
  },
  {
    id: 'ml12',
    nombre: 'Sebastián Navarro',
    email: 'snavarro@mielrancagua.cl',
    telefono: '+56912345136',
    region: 'Maule',
    comuna: 'Rancagua',
    apiarios: [
      { id: 'ml12-api1', nombre: 'Apiario Rancagua', latitud: -34.1700, longitud: -70.7400, comuna: 'Rancagua', region: 'Maule', cantidadColmenas: 200 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  }
];
