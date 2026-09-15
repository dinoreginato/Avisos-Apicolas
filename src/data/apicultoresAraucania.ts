// Base de datos expandida de apicultores SIPEC - Araucanía
// Según SAG: 1,814 apicultores, 2,628 apiarios, 124,945 colmenas

import { ApicultorSIPEC } from '../types/fields';

export const apicultoresAraucania: ApicultorSIPEC[] = [
  {
    id: 'ar1',
    nombre: 'Eduardo Huenchumán',
    email: 'ehuenchuman@mielaraucania.cl',
    telefono: '+56912345032',
    region: 'La Araucanía',
    comuna: 'Temuco',
    apiarios: [
      { id: 'ar1-api1', nombre: 'Apiario Temuco Norte', latitud: -38.7200, longitud: -72.6000, comuna: 'Temuco', region: 'La Araucanía', cantidadColmenas: 140 },
      { id: 'ar1-api2', nombre: 'Apiario Temuco Sur', latitud: -38.7500, longitud: -72.5800, comuna: 'Temuco', region: 'La Araucanía', cantidadColmenas: 120 }
    ],
    totalColmenas: 260,
    sipecRegistrado: true
  },
  {
    id: 'ar2',
    nombre: 'Rosa Curipan',
    email: 'rcuripan@apiculturamapuche.cl',
    telefono: '+56912345033',
    region: 'La Araucanía',
    comuna: 'Padre Las Casas',
    apiarios: [
      { id: 'ar2-api1', nombre: 'Apiario Mapuche', latitud: -38.7700, longitud: -72.6100, comuna: 'Padre Las Casas', region: 'La Araucanía', cantidadColmenas: 85 }
    ],
    totalColmenas: 85,
    sipecRegistrado: true
  },
  {
    id: 'ar3',
    nombre: 'Fernando Marín',
    email: 'fmarin@mielcarahue.cl',
    telefono: '+56912345034',
    region: 'La Araucanía',
    comuna: 'Carahue',
    apiarios: [
      { id: 'ar3-api1', nombre: 'Apiario Carahue', latitud: -38.9800, longitud: -73.1700, comuna: 'Carahue', region: 'La Araucanía', cantidadColmenas: 110 }
    ],
    totalColmenas: 110,
    sipecRegistrado: true
  },
  {
    id: 'ar4',
    nombre: 'Gloria Huenuñir',
    email: 'ghuenuñir@mielaraucania.cl',
    telefono: '+56912345035',
    region: 'La Araucanía',
    comuna: 'Nueva Imperial',
    apiarios: [
      { id: 'ar4-api1', nombre: 'Apiario Imperial', latitud: -38.7500, longitud: -72.9600, comuna: 'Nueva Imperial', region: 'La Araucanía', cantidadColmenas: 75 }
    ],
    totalColmenas: 75,
    sipecRegistrado: true
  },
  {
    id: 'ar5',
    nombre: 'Juan Carlos Aedo',
    email: 'jcaedo@mieltemuco.cl',
    telefono: '+56912345140',
    region: 'La Araucanía',
    comuna: 'Temuco',
    apiarios: [
      { id: 'ar5-api1', nombre: 'Apiario Temuco Centro', latitud: -38.7350, longitud: -72.5900, comuna: 'Temuco', region: 'La Araucanía', cantidadColmenas: 180 }
    ],
    totalColmenas: 180,
    sipecRegistrado: true
  },
  {
    id: 'ar6',
    nombre: 'María Elena Llanquileo',
    email: 'mllanquileo@mielvillarrica.cl',
    telefono: '+56912345141',
    region: 'La Araucanía',
    comuna: 'Villarrica',
    apiarios: [
      { id: 'ar6-api1', nombre: 'Apiario Villarrica', latitud: -39.2800, longitud: -72.2200, comuna: 'Villarrica', region: 'La Araucanía', cantidadColmenas: 220 }
    ],
    totalColmenas: 220,
    sipecRegistrado: true
  },
  {
    id: 'ar7',
    nombre: 'Roberto Sánchez',
    email: 'rsanchez@mielangol.cl',
    telefono: '+56912345142',
    region: 'La Araucanía',
    comuna: 'Angol',
    apiarios: [
      { id: 'ar7-api1', nombre: 'Apiario Angol', latitud: -37.8000, longitud: -72.7200, comuna: 'Angol', region: 'La Araucanía', cantidadColmenas: 195 }
    ],
    totalColmenas: 195,
    sipecRegistrado: true
  },
  {
    id: 'ar8',
    nombre: 'Andrea López',
    email: 'alopez@mielpucon.cl',
    telefono: '+56912345143',
    region: 'La Araucanía',
    comuna: 'Pucón',
    apiarios: [
      { id: 'ar8-api1', nombre: 'Apiario Pucón', latitud: -39.2500, longitud: -71.9700, comuna: 'Pucón', region: 'La Araucanía', cantidadColmenas: 165 }
    ],
    totalColmenas: 165,
    sipecRegistrado: true
  },
  {
    id: 'ar9',
    nombre: 'Miguel Torres',
    email: 'mtorres@miellautaro.cl',
    telefono: '+56912345144',
    region: 'La Araucanía',
    comuna: 'Lautaro',
    apiarios: [
      { id: 'ar9-api1', nombre: 'Apiario Lautaro', latitud: -38.5300, longitud: -72.7800, comuna: 'Lautaro', region: 'La Araucanía', cantidadColmenas: 140 }
    ],
    totalColmenas: 140,
    sipecRegistrado: true
  },
  {
    id: 'ar10',
    nombre: 'Isabel Martínez',
    email: 'imartinez@mielfreire.cl',
    telefono: '+56912345145',
    region: 'La Araucanía',
    comuna: 'Freire',
    apiarios: [
      { id: 'ar10-api1', nombre: 'Apiario Freire', latitud: -38.9500, longitud: -72.6300, comuna: 'Freire', region: 'La Araucanía', cantidadColmenas: 155 }
    ],
    totalColmenas: 155,
    sipecRegistrado: true
  }
];
