// Apiarios Regiones de Coquimbo, Atacama y Norte

import { ApicultorSIPEC } from '../types/fields';

export const apiariosCoquimbo: ApicultorSIPEC[] = [
  // La Serena
  {
    id: 'cq-laserena-1',
    nombre: 'Javiera Pinto',
    email: 'jpinto@miellaserena.cl',
    telefono: '+56912346001',
    region: 'Coquimbo',
    comuna: 'La Serena',
    apiarios: [
      { id: 'cq-laserena-1-a1', nombre: 'Apiario La Serena', latitud: -29.9030, longitud: -71.2500, comuna: 'La Serena', region: 'Coquimbo', cantidadColmenas: 80 }
    ],
    totalColmenas: 80,
    sipecRegistrado: true
  },
  // Ovalle
  {
    id: 'cq-ovalle-1',
    nombre: 'Nicolás Bravo',
    email: 'nbravo@mielovalle.cl',
    telefono: '+56912346002',
    region: 'Coquimbo',
    comuna: 'Ovalle',
    apiarios: [
      { id: 'cq-ovalle-1-a1', nombre: 'Apiario Ovalle', latitud: -30.6000, longitud: -71.2000, comuna: 'Ovalle', region: 'Coquimbo', cantidadColmenas: 100 }
    ],
    totalColmenas: 100,
    sipecRegistrado: true
  },
  // Illapel
  {
    id: 'cq-illapel-1',
    nombre: 'Gonzalo Herrera',
    email: 'gherrera@mielillapel.cl',
    telefono: '+56912346003',
    region: 'Coquimbo',
    comuna: 'Illapel',
    apiarios: [
      { id: 'cq-illapel-1-a1', nombre: 'Apiario Illapel', latitud: -31.6300, longitud: -71.1700, comuna: 'Illapel', region: 'Coquimbo', cantidadColmenas: 125 }
    ],
    totalColmenas: 125,
    sipecRegistrado: true
  },
  // Combarbalá
  {
    id: 'cq-combarbala-1',
    nombre: 'Silvia Contreras',
    email: 'scontreras@mielcombarbala.cl',
    telefono: '+56912346004',
    region: 'Coquimbo',
    comuna: 'Combarbalá',
    apiarios: [
      { id: 'cq-combarbala-1-a1', nombre: 'Apiario Combarbalá', latitud: -31.1800, longitud: -71.0200, comuna: 'Combarbalá', region: 'Coquimbo', cantidadColmenas: 95 }
    ],
    totalColmenas: 95,
    sipecRegistrado: true
  },
  // Vicuña
  {
    id: 'cq-vicuna-1',
    nombre: 'Rodrigo Vera',
    email: 'rvera@mielvicuna.cl',
    telefono: '+56912346005',
    region: 'Coquimbo',
    comuna: 'Vicuña',
    apiarios: [
      { id: 'cq-vicuna-1-a1', nombre: 'Apiario Vicuña', latitud: -30.0300, longitud: -70.7500, comuna: 'Vicuña', region: 'Coquimbo', cantidadColmenas: 140 }
    ],
    totalColmenas: 140,
    sipecRegistrado: true
  }
];

export const apiariosAtacama: ApicultorSIPEC[] = [
  // Copiapó
  {
    id: 'at-copiapo-1',
    nombre: 'Renato Guzmán',
    email: 'rguzman@mielcopiapo.cl',
    telefono: '+56912346101',
    region: 'Atacama',
    comuna: 'Copiapó',
    apiarios: [
      { id: 'at-copiapo-1-a1', nombre: 'Apiario Copiapó', latitud: -27.3670, longitud: -70.3330, comuna: 'Copiapó', region: 'Atacama', cantidadColmenas: 50 }
    ],
    totalColmenas: 50,
    sipecRegistrado: true
  },
  // Vallenar
  {
    id: 'at-vallenar-1',
    nombre: 'Raúl Espinoza',
    email: 'respinoza@mielvallenar.cl',
    telefono: '+56912346102',
    region: 'Atacama',
    comuna: 'Vallenar',
    apiarios: [
      { id: 'at-vallenar-1-a1', nombre: 'Apiario Vallenar', latitud: -28.5700, longitud: -70.7600, comuna: 'Vallenar', region: 'Atacama', cantidadColmenas: 65 }
    ],
    totalColmenas: 65,
    sipecRegistrado: true
  },
  // Chañaral
  {
    id: 'at-chanaral-1',
    nombre: 'Paula Torres',
    email: 'ptorres@mielchanaral.cl',
    telefono: '+56912346103',
    region: 'Atacama',
    comuna: 'Chañaral',
    apiarios: [
      { id: 'at-chanaral-1-a1', nombre: 'Apiario Chañaral', latitud: -26.3500, longitud: -70.6200, comuna: 'Chañaral', region: 'Atacama', cantidadColmenas: 35 }
    ],
    totalColmenas: 35,
    sipecRegistrado: true
  }
];

export const apiariosNorte: ApicultorSIPEC[] = [
  // Antofagasta
  {
    id: 'nt-antofagasta-1',
    nombre: 'Julio Tapia',
    email: 'jtapia@mielantofagasta.cl',
    telefono: '+56912346201',
    region: 'Antofagasta',
    comuna: 'Antofagasta',
    apiarios: [
      { id: 'nt-antofagasta-1-a1', nombre: 'Apiario Antofagasta', latitud: -23.6500, longitud: -70.3900, comuna: 'Antofagasta', region: 'Antofagasta', cantidadColmenas: 25 }
    ],
    totalColmenas: 25,
    sipecRegistrado: true
  },
  // Calama
  {
    id: 'nt-calama-1',
    nombre: 'Carmen Gloria Muñoz',
    email: 'cmmunoz@mielcalama.cl',
    telefono: '+56912346202',
    region: 'Antofagasta',
    comuna: 'Calama',
    apiarios: [
      { id: 'nt-calama-1-a1', nombre: 'Apiario Calama', latitud: -22.4600, longitud: -68.9300, comuna: 'Calama', region: 'Antofagasta', cantidadColmenas: 25 }
    ],
    totalColmenas: 25,
    sipecRegistrado: true
  },
  // Tarapacá - Iquique
  {
    id: 'nt-iquique-1',
    nombre: 'Constanza Vega',
    email: 'cvega@mieliquique.cl',
    telefono: '+56912346203',
    region: 'Tarapacá',
    comuna: 'Iquique',
    apiarios: [
      { id: 'nt-iquique-1-a1', nombre: 'Apiario Iquique', latitud: -20.2130, longitud: -70.1500, comuna: 'Iquique', region: 'Tarapacá', cantidadColmenas: 30 }
    ],
    totalColmenas: 30,
    sipecRegistrado: true
  },
  // Arica y Parinacota
  {
    id: 'nt-arica-1',
    nombre: 'María Elena Bravo',
    email: 'mebravo@mielarica.cl',
    telefono: '+56912346204',
    region: 'Arica y Parinacota',
    comuna: 'Arica',
    apiarios: [
      { id: 'nt-arica-1-a1', nombre: 'Apiario Arica', latitud: -18.4800, longitud: -70.3100, comuna: 'Arica', region: 'Arica y Parinacota', cantidadColmenas: 20 }
    ],
    totalColmenas: 20,
    sipecRegistrado: true
  }
];

export const apiariosSur: ApicultorSIPEC[] = [
  // Aysén
  {
    id: 'sr-aysen-1',
    nombre: 'Carmen Gloria Muñoz',
    email: 'cmmunoz@mielaysen.cl',
    telefono: '+56912346301',
    region: 'Aysén',
    comuna: 'Coyhaique',
    apiarios: [
      { id: 'sr-aysen-1-a1', nombre: 'Apiario Coyhaique', latitud: -45.5700, longitud: -72.0700, comuna: 'Coyhaique', region: 'Aysén', cantidadColmenas: 45 }
    ],
    totalColmenas: 45,
    sipecRegistrado: true
  },
  // Magallanes
  {
    id: 'sr-magallanes-1',
    nombre: 'María José Rojas',
    email: 'mjrojas@mielmagallanes.cl',
    telefono: '+56912346302',
    region: 'Magallanes',
    comuna: 'Punta Arenas',
    apiarios: [
      { id: 'sr-magallanes-1-a1', nombre: 'Apiario Punta Arenas', latitud: -53.1600, longitud: -70.9100, comuna: 'Punta Arenas', region: 'Magallanes', cantidadColmenas: 15 }
    ],
    totalColmenas: 15,
    sipecRegistrado: true
  }
];
