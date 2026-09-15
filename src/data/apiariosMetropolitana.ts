// Apiarios Región Metropolitana
// Coordenadas basadas en comunas reales de la región

import { ApicultorSIPEC } from '../types/fields';

export const apiariosMetropolitana: ApicultorSIPEC[] = [
  // Buin
  {
    id: 'rm-buin-1',
    nombre: 'Juan Carlos Muñoz Pérez',
    email: 'jcmunoz@mielbuin.cl',
    telefono: '+56912345101',
    region: 'Metropolitana',
    comuna: 'Buin',
    apiarios: [
      { id: 'rm-buin-1-a1', nombre: 'Apiario Los Álamos', latitud: -33.7290, longitud: -70.7220, comuna: 'Buin', region: 'Metropolitana', cantidadColmenas: 120 },
      { id: 'rm-buin-1-a2', nombre: 'Apiario El Roble', latitud: -33.7350, longitud: -70.7180, comuna: 'Buin', region: 'Metropolitana', cantidadColmenas: 80 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },
  {
    id: 'rm-buin-2',
    nombre: 'María Elena González Soto',
    email: 'megonzalez@apibuin.cl',
    telefono: '+56912345102',
    region: 'Metropolitana',
    comuna: 'Buin',
    apiarios: [
      { id: 'rm-buin-2-a1', nombre: 'Apiario La Pradera', latitud: -33.7150, longitud: -70.7300, comuna: 'Buin', region: 'Metropolitana', cantidadColmenas: 150 }
    ],
    totalColmenas: 150,
    sipecRegistrado: true
  },
  // Paine
  {
    id: 'rm-paine-1',
    nombre: 'Roberto Sánchez Bravo',
    email: 'rsanchez@mielpaine.cl',
    telefono: '+56912345103',
    region: 'Metropolitana',
    comuna: 'Paine',
    apiarios: [
      { id: 'rm-paine-1-a1', nombre: 'Apiario Paine Norte', latitud: -33.8180, longitud: -70.7050, comuna: 'Paine', region: 'Metropolitana', cantidadColmenas: 180 }
    ],
    totalColmenas: 180,
    sipecRegistrado: true
  },
  {
    id: 'rm-paine-2',
    nombre: 'Ana María Torres López',
    email: 'atorres@apipaine.cl',
    telefono: '+56912345104',
    region: 'Metropolitana',
    comuna: 'Paine',
    apiarios: [
      { id: 'rm-paine-2-a1', nombre: 'Apiario Las Flores', latitud: -33.8250, longitud: -70.6980, comuna: 'Paine', region: 'Metropolitana', cantidadColmenas: 140 }
    ],
    totalColmenas: 140,
    sipecRegistrado: true
  },
  // Talagante
  {
    id: 'rm-tala-1',
    nombre: 'Carlos Fuentes Herrera',
    email: 'cfuentes@mieltalagante.cl',
    telefono: '+56912345105',
    region: 'Metropolitana',
    comuna: 'Talagante',
    apiarios: [
      { id: 'rm-tala-1-a1', nombre: 'Apiario Talagante Centro', latitud: -33.6630, longitud: -70.9260, comuna: 'Talagante', region: 'Metropolitana', cantidadColmenas: 160 }
    ],
    totalColmenas: 160,
    sipecRegistrado: true
  },
  // Melipilla
  {
    id: 'rm-meli-1',
    nombre: 'Patricia Rojas Díaz',
    email: 'projas@mielmelipilla.cl',
    telefono: '+56912345106',
    region: 'Metropolitana',
    comuna: 'Melipilla',
    apiarios: [
      { id: 'rm-meli-1-a1', nombre: 'Apiario Melipilla', latitud: -33.6900, longitud: -71.2100, comuna: 'Melipilla', region: 'Metropolitana', cantidadColmenas: 200 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },
  // Colina
  {
    id: 'rm-colina-1',
    nombre: 'Miguel Ángel López Vargas',
    email: 'malopez@mielcolina.cl',
    telefono: '+56912345107',
    region: 'Metropolitana',
    comuna: 'Colina',
    apiarios: [
      { id: 'rm-colina-1-a1', nombre: 'Apiario Colina', latitud: -33.2000, longitud: -70.6600, comuna: 'Colina', region: 'Metropolitana', cantidadColmenas: 175 }
    ],
    totalColmenas: 175,
    sipecRegistrado: true
  },
  // Isla de Maipo
  {
    id: 'rm-idm-1',
    nombre: 'Isabel Martínez Soto',
    email: 'imartinez@mielislmaipo.cl',
    telefono: '+56912345108',
    region: 'Metropolitana',
    comuna: 'Isla de Maipo',
    apiarios: [
      { id: 'rm-idm-1-a1', nombre: 'Apiario Isla de Maipo', latitud: -33.7500, longitud: -70.7800, comuna: 'Isla de Maipo', region: 'Metropolitana', cantidadColmenas: 130 }
    ],
    totalColmenas: 130,
    sipecRegistrado: true
  },
  // Peñaflor
  {
    id: 'rm-pena-1',
    nombre: 'Tomás Reyes Contreras',
    email: 'treyes@mielpenaflor.cl',
    telefono: '+56912345109',
    region: 'Metropolitana',
    comuna: 'Peñaflor',
    apiarios: [
      { id: 'rm-pena-1-a1', nombre: 'Apiario Peñaflor', latitud: -33.6100, longitud: -70.8700, comuna: 'Peñaflor', region: 'Metropolitana', cantidadColmenas: 145 }
    ],
    totalColmenas: 145,
    sipecRegistrado: true
  },
  // Padre Hurtado
  {
    id: 'rm-ph-1',
    nombre: 'Valentina Sepúlveda Morales',
    email: 'vsepulveda@mielpadrehurtado.cl',
    telefono: '+56912345110',
    region: 'Metropolitana',
    comuna: 'Padre Hurtado',
    apiarios: [
      { id: 'rm-ph-1-a1', nombre: 'Apiario Padre Hurtado', latitud: -33.6400, longitud: -70.7500, comuna: 'Padre Hurtado', region: 'Metropolitana', cantidadColmenas: 115 }
    ],
    totalColmenas: 115,
    sipecRegistrado: true
  }
];
