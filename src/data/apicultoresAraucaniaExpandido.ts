import { ApicultorSIPEC } from '../types/fields';

// Base de datos expandida de apicultores de Araucanía
// Según SAG: 1,814 apicultores, 2,628 apiarios, 124,945 colmenas

export const apicultoresAraucaniaExpandido: ApicultorSIPEC[] = [
  // Temuco
  {
    id: 'ar-temuco-1',
    nombre: 'Eduardo Huenchumán Curi',
    email: 'ehuenchuman@mieltemuco.cl',
    telefono: '+56912345026',
    region: 'La Araucanía',
    comuna: 'Temuco',
    apiarios: [
      { id: 'ar-temuco-1-a1', nombre: 'Apiario Temuco Norte', latitud: -38.7200, longitud: -72.6000, comuna: 'Temuco', region: 'La Araucanía', cantidadColmenas: 140 },
      { id: 'ar-temuco-1-a2', nombre: 'Apiario Temuco Sur', latitud: -38.7500, longitud: -72.5800, comuna: 'Temuco', region: 'La Araucanía', cantidadColmenas: 120 }
    ],
    totalColmenas: 260,
    sipecRegistrado: true
  },
  {
    id: 'ar-temuco-2',
    nombre: 'Rosa Curipan Huenchu',
    email: 'rcuripan@apiculturamapuche.cl',
    telefono: '+56912345027',
    region: 'La Araucanía',
    comuna: 'Temuco',
    apiarios: [
      { id: 'ar-temuco-2-a1', nombre: 'Apiario Mapuche', latitud: -38.7350, longitud: -72.5900, comuna: 'Temuco', region: 'La Araucanía', cantidadColmenas: 180 }
    ],
    totalColmenas: 180,
    sipecRegistrado: true
  },
  // Padre Las Casas
  {
    id: 'ar-plc-1',
    nombre: 'Fernando Marín Lefio',
    email: 'fmarin@mielpadrelascasas.cl',
    telefono: '+56912345028',
    region: 'La Araucanía',
    comuna: 'Padre Las Casas',
    apiarios: [
      { id: 'ar-plc-1-a1', nombre: 'Apiario Padre Las Casas', latitud: -38.7700, longitud: -72.6100, comuna: 'Padre Las Casas', region: 'La Araucanía', cantidadColmenas: 150 }
    ],
    totalColmenas: 150,
    sipecRegistrado: true
  },
  // Villarrica
  {
    id: 'ar-vill-1',
    nombre: 'Gloria Huenuñir Marín',
    email: 'ghuenuñir@mielvillarrica.cl',
    telefono: '+56912345029',
    region: 'La Araucanía',
    comuna: 'Villarrica',
    apiarios: [
      { id: 'ar-vill-1-a1', nombre: 'Apiario Villarrica', latitud: -39.2800, longitud: -72.2200, comuna: 'Villarrica', region: 'La Araucanía', cantidadColmenas: 220 }
    ],
    totalColmenas: 220,
    sipecRegistrado: true
  },
  // Angol
  {
    id: 'ar-ang-1',
    nombre: 'Juan Carlos Aedo Sánchez',
    email: 'jaedo@mielangol.cl',
    telefono: '+56912345030',
    region: 'La Araucanía',
    comuna: 'Angol',
    apiarios: [
      { id: 'ar-ang-1-a1', nombre: 'Apiario Angol', latitud: -37.8000, longitud: -72.7200, comuna: 'Angol', region: 'La Araucanía', cantidadColmenas: 195 }
    ],
    totalColmenas: 195,
    sipecRegistrado: true
  },
  // Pucón
  {
    id: 'ar-puc-1',
    nombre: 'María Elena Llanquileo',
    email: 'mllanquileo@mielpucon.cl',
    telefono: '+56912345031',
    region: 'La Araucanía',
    comuna: 'Pucón',
    apiarios: [
      { id: 'ar-puc-1-a1', nombre: 'Apiario Pucón', latitud: -39.2500, longitud: -71.9700, comuna: 'Pucón', region: 'La Araucanía', cantidadColmenas: 165 }
    ],
    totalColmenas: 165,
    sipecRegistrado: true
  },
  // Lautaro
  {
    id: 'ar-lau-1',
    nombre: 'Roberto Sánchez Torres',
    email: 'rsanchez@miellautaro.cl',
    telefono: '+56912345032',
    region: 'La Araucanía',
    comuna: 'Lautaro',
    apiarios: [
      { id: 'ar-lau-1-a1', nombre: 'Apiario Lautaro', latitud: -38.5300, longitud: -72.7800, comuna: 'Lautaro', region: 'La Araucanía', cantidadColmenas: 140 }
    ],
    totalColmenas: 140,
    sipecRegistrado: true
  },
  // Freire
  {
    id: 'ar-fre-1',
    nombre: 'Andrea López Martínez',
    email: 'alopez@mielfreire.cl',
    telefono: '+56912345033',
    region: 'La Araucanía',
    comuna: 'Freire',
    apiarios: [
      { id: 'ar-fre-1-a1', nombre: 'Apiario Freire', latitud: -38.9500, longitud: -72.6300, comuna: 'Freire', region: 'La Araucanía', cantidadColmenas: 155 }
    ],
    totalColmenas: 155,
    sipecRegistrado: true
  },
  // Carahue
  {
    id: 'ar-car-1',
    nombre: 'Miguel Torres Reyes',
    email: 'mtorres@mielcarahue.cl',
    telefono: '+56912345034',
    region: 'La Araucanía',
    comuna: 'Carahue',
    apiarios: [
      { id: 'ar-car-1-a1', nombre: 'Apiario Carahue', latitud: -38.9800, longitud: -73.1700, comuna: 'Carahue', region: 'La Araucanía', cantidadColmenas: 110 }
    ],
    totalColmenas: 110,
    sipecRegistrado: true
  },
  // Nueva Imperial
  {
    id: 'ar-ni-1',
    nombre: 'Isabel Martínez Sepúlveda',
    email: 'imartinez@mielnuevaimperial.cl',
    telefono: '+56912345035',
    region: 'La Araucanía',
    comuna: 'Nueva Imperial',
    apiarios: [
      { id: 'ar-ni-1-a1', nombre: 'Apiario Imperial', latitud: -38.7500, longitud: -72.9600, comuna: 'Nueva Imperial', region: 'La Araucanía', cantidadColmenas: 75 }
    ],
    totalColmenas: 75,
    sipecRegistrado: true
  }
];
