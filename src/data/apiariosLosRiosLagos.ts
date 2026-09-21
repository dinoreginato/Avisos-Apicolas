// Apiarios Regiones de Los Ríos y Los Lagos

import { ApicultorSIPEC } from '../types/fields';

export const apiariosLosRios: ApicultorSIPEC[] = [
  // Valdivia
  {
    id: 'lr-valdivia-1',
    nombre: 'Sebastián Navarro',
    email: 'snavarro@mielvaldivia.cl',
    telefono: '+56912345801',
    region: 'Los Ríos',
    comuna: 'Valdivia',
    apiarios: [
      { id: 'lr-valdivia-1-a1', nombre: 'Apiario Valdivia', latitud: -39.8142, longitud: -73.2459, comuna: 'Valdivia', region: 'Los Ríos', cantidadColmenas: 130 }
    ],
    totalColmenas: 130,
    sipecRegistrado: true
  },
  {
    id: 'lr-valdivia-2',
    nombre: 'Esteban Cifuentes',
    email: 'ecifuentes@mielvaldivia.cl',
    telefono: '+56912345802',
    region: 'Los Ríos',
    comuna: 'Valdivia',
    apiarios: [
      { id: 'lr-valdivia-2-a1', nombre: 'Apiario Valdivia Centro', latitud: -39.8100, longitud: -73.2500, comuna: 'Valdivia', region: 'Los Ríos', cantidadColmenas: 155 }
    ],
    totalColmenas: 155,
    sipecRegistrado: true
  },
  // Osorno
  {
    id: 'lr-osorno-1',
    nombre: 'Carolina Díaz',
    email: 'cdiaz@mielosorno.cl',
    telefono: '+56912345803',
    region: 'Los Ríos',
    comuna: 'Osorno',
    apiarios: [
      { id: 'lr-osorno-1-a1', nombre: 'Apiario Osorno', latitud: -40.5740, longitud: -73.1330, comuna: 'Osorno', region: 'Los Ríos', cantidadColmenas: 85 }
    ],
    totalColmenas: 85,
    sipecRegistrado: true
  },
  // La Unión
  {
    id: 'lr-launion-1',
    nombre: 'Mónica Ulloa',
    email: 'mulloa@miellaunion.cl',
    telefono: '+56912345804',
    region: 'Los Ríos',
    comuna: 'La Unión',
    apiarios: [
      { id: 'lr-launion-1-a1', nombre: 'Apiario La Unión', latitud: -40.2900, longitud: -73.0800, comuna: 'La Unión', region: 'Los Ríos', cantidadColmenas: 130 }
    ],
    totalColmenas: 130,
    sipecRegistrado: true
  },
  // Río Bueno
  {
    id: 'lr-riobueno-1',
    nombre: 'Patricio Guzmán',
    email: 'pguzman@mielriobueno.cl',
    telefono: '+56912345805',
    region: 'Los Ríos',
    comuna: 'Río Bueno',
    apiarios: [
      { id: 'lr-riobueno-1-a1', nombre: 'Apiario Río Bueno', latitud: -40.3200, longitud: -72.9600, comuna: 'Río Bueno', region: 'Los Ríos', cantidadColmenas: 110 }
    ],
    totalColmenas: 110,
    sipecRegistrado: true
  }
];

export const apiariosLosLagos: ApicultorSIPEC[] = [
  // Puerto Montt
  {
    id: 'll-pmontt-1',
    nombre: 'Alejandro Ruiz',
    email: 'aruiz@mielpuertomontt.cl',
    telefono: '+56912345901',
    region: 'Los Lagos',
    comuna: 'Puerto Montt',
    apiarios: [
      { id: 'll-pmontt-1-a1', nombre: 'Apiario Puerto Montt', latitud: -41.4687, longitud: -72.9411, comuna: 'Puerto Montt', region: 'Los Lagos', cantidadColmenas: 110 }
    ],
    totalColmenas: 110,
    sipecRegistrado: true
  },
  {
    id: 'll-pmontt-2',
    nombre: 'Liliana Paredes',
    email: 'lparedes@mielpuertomontt.cl',
    telefono: '+56912345902',
    region: 'Los Lagos',
    comuna: 'Puerto Montt',
    apiarios: [
      { id: 'll-pmontt-2-a1', nombre: 'Apiario Puerto Montt Norte', latitud: -41.4500, longitud: -72.9500, comuna: 'Puerto Montt', region: 'Los Lagos', cantidadColmenas: 135 },
      { id: 'll-pmontt-2-a2', nombre: 'Apiario Puerto Montt Sur', latitud: -41.4900, longitud: -72.9300, comuna: 'Puerto Montt', region: 'Los Lagos', cantidadColmenas: 110 }
    ],
    totalColmenas: 245,
    sipecRegistrado: true
  },
  // Puerto Varas
  {
    id: 'll-pvaras-1',
    nombre: 'Paula Silva',
    email: 'psilva@mielpuertovaras.cl',
    telefono: '+56912345903',
    region: 'Los Lagos',
    comuna: 'Puerto Varas',
    apiarios: [
      { id: 'll-pvaras-1-a1', nombre: 'Apiario Puerto Varas', latitud: -41.3200, longitud: -72.6100, comuna: 'Puerto Varas', region: 'Los Lagos', cantidadColmenas: 70 }
    ],
    totalColmenas: 70,
    sipecRegistrado: true
  },
  // Osorno
  {
    id: 'll-osorno-1',
    nombre: 'Mauricio Cárdenas',
    email: 'mcardenas@mielosorno.cl',
    telefono: '+56912345904',
    region: 'Los Lagos',
    comuna: 'Osorno',
    apiarios: [
      { id: 'll-osorno-1-a1', nombre: 'Apiario Osorno', latitud: -40.5700, longitud: -73.1300, comuna: 'Osorno', region: 'Los Lagos', cantidadColmenas: 190 }
    ],
    totalColmenas: 190,
    sipecRegistrado: true
  },
  // Castro
  {
    id: 'll-castro-1',
    nombre: 'Carmen Gloria Muñoz',
    email: 'cmmunoz@mielcastro.cl',
    telefono: '+56912345905',
    region: 'Los Lagos',
    comuna: 'Castro',
    apiarios: [
      { id: 'll-castro-1-a1', nombre: 'Apiario Castro', latitud: -42.4800, longitud: -73.7700, comuna: 'Castro', region: 'Los Lagos', cantidadColmenas: 95 }
    ],
    totalColmenas: 95,
    sipecRegistrado: true
  },
  // Ancud
  {
    id: 'll-ancud-1',
    nombre: 'Julio Tapia',
    email: 'jtapia@mielancud.cl',
    telefono: '+56912345906',
    region: 'Los Lagos',
    comuna: 'Ancud',
    apiarios: [
      { id: 'll-ancud-1-a1', nombre: 'Apiario Ancud', latitud: -41.8500, longitud: -73.8300, comuna: 'Ancud', region: 'Los Lagos', cantidadColmenas: 80 }
    ],
    totalColmenas: 80,
    sipecRegistrado: true
  },
  // Frutillar
  {
    id: 'll-frutillar-1',
    nombre: 'María José Rojas',
    email: 'mjrojas@mielfrutillar.cl',
    telefono: '+56912345907',
    region: 'Los Lagos',
    comuna: 'Frutillar',
    apiarios: [
      { id: 'll-frutillar-1-a1', nombre: 'Apiario Frutillar', latitud: -41.1200, longitud: -73.0600, comuna: 'Frutillar', region: 'Los Lagos', cantidadColmenas: 120 }
    ],
    totalColmenas: 120,
    sipecRegistrado: true
  }
];
