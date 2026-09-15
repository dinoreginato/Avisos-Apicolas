// Apiarios Región del Maule

import { ApicultorSIPEC } from '../types/fields';

export const apiariosMaule: ApicultorSIPEC[] = [
  // Talca
  {
    id: 'ml-talca-1',
    nombre: 'Ricardo Vargas Soto',
    email: 'rvargas@mieltalca.cl',
    telefono: '+56912345301',
    region: 'Maule',
    comuna: 'Talca',
    apiarios: [
      { id: 'ml-talca-1-a1', nombre: 'Apiario Miel Pura', latitud: -35.4264, longitud: -71.6554, comuna: 'Talca', region: 'Maule', cantidadColmenas: 180 },
      { id: 'ml-talca-1-a2', nombre: 'Apiario Talca Norte', latitud: -35.4000, longitud: -71.6500, comuna: 'Talca', region: 'Maule', cantidadColmenas: 150 }
    ],
    totalColmenas: 330,
    sipecRegistrado: true
  },
  {
    id: 'ml-talca-2',
    nombre: 'Héctor Muñoz González',
    email: 'hmunoz@mieltalca.cl',
    telefono: '+56912345302',
    region: 'Maule',
    comuna: 'Talca',
    apiarios: [
      { id: 'ml-talca-2-a1', nombre: 'Apiario Maule Centro', latitud: -35.4200, longitud: -71.6600, comuna: 'Talca', region: 'Maule', cantidadColmenas: 200 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },
  // Curicó
  {
    id: 'ml-curi-1',
    nombre: 'Andrea López Bravo',
    email: 'alopez@mielcurico.cl',
    telefono: '+56912345303',
    region: 'Maule',
    comuna: 'Curicó',
    apiarios: [
      { id: 'ml-curi-1-a1', nombre: 'Apiario Valle del Maule', latitud: -34.9830, longitud: -71.2330, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 220 }
    ],
    totalColmenas: 220,
    sipecRegistrado: true
  },
  {
    id: 'ml-curi-2',
    nombre: 'Miguel Torres López',
    email: 'mtorres@mielcurico.cl',
    telefono: '+56912345304',
    region: 'Maule',
    comuna: 'Curicó',
    apiarios: [
      { id: 'ml-curi-2-a1', nombre: 'Apiario Curicó Este', latitud: -34.9900, longitud: -71.2200, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 280 },
      { id: 'ml-curi-2-a2', nombre: 'Apiario Curicó Oeste', latitud: -34.9700, longitud: -71.2600, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 240 }
    ],
    totalColmenas: 520,
    sipecRegistrado: true
  },
  // Linares
  {
    id: 'ml-linares-1',
    nombre: 'Isabel Martínez Soto',
    email: 'imartinez@miellinares.cl',
    telefono: '+56912345305',
    region: 'Maule',
    comuna: 'Linares',
    apiarios: [
      { id: 'ml-linares-1-a1', nombre: 'Apiario Linares', latitud: -35.8500, longitud: -71.5800, comuna: 'Linares', region: 'Maule', cantidadColmenas: 210 }
    ],
    totalColmenas: 210,
    sipecRegistrado: true
  },
  // Parral
  {
    id: 'ml-parral-1',
    nombre: 'Tomás Reyes Contreras',
    email: 'treyes@mielparral.cl',
    telefono: '+56912345306',
    region: 'Maule',
    comuna: 'Parral',
    apiarios: [
      { id: 'ml-parral-1-a1', nombre: 'Apiario Parral', latitud: -36.1400, longitud: -71.8200, comuna: 'Parral', region: 'Maule', cantidadColmenas: 175 }
    ],
    totalColmenas: 175,
    sipecRegistrado: true
  },
  // Molina
  {
    id: 'ml-molina-1',
    nombre: 'Valentina Sepúlveda Morales',
    email: 'vsepulveda@mielmolina.cl',
    telefono: '+56912345307',
    region: 'Maule',
    comuna: 'Molina',
    apiarios: [
      { id: 'ml-molina-1-a1', nombre: 'Apiario Molina', latitud: -35.1200, longitud: -71.2800, comuna: 'Molina', region: 'Maule', cantidadColmenas: 160 }
    ],
    totalColmenas: 160,
    sipecRegistrado: true
  },
  // Constitución
  {
    id: 'ml-consti-1',
    nombre: 'Diego Contreras Ruiz',
    email: 'dcontreras@mielconstitucion.cl',
    telefono: '+56912345308',
    region: 'Maule',
    comuna: 'Constitución',
    apiarios: [
      { id: 'ml-consti-1-a1', nombre: 'Apiario Constitución', latitud: -35.3300, longitud: -72.4100, comuna: 'Constitución', region: 'Maule', cantidadColmenas: 240 }
    ],
    totalColmenas: 240,
    sipecRegistrado: true
  },
  // Colbún
  {
    id: 'ml-colbun-1',
    nombre: 'Francisca Morales Vargas',
    email: 'fmorales@mielcolbun.cl',
    telefono: '+56912345309',
    region: 'Maule',
    comuna: 'Colbún',
    apiarios: [
      { id: 'ml-colbun-1-a1', nombre: 'Apiario Colbún', latitud: -35.6800, longitud: -71.4200, comuna: 'Colbún', region: 'Maule', cantidadColmenas: 165 }
    ],
    totalColmenas: 165,
    sipecRegistrado: true
  },
  // San Javier
  {
    id: 'ml-sjavier-1',
    nombre: 'Sebastián Navarro Pinto',
    email: 'snavarro@mielsanjavier.cl',
    telefono: '+56912345310',
    region: 'Maule',
    comuna: 'San Javier',
    apiarios: [
      { id: 'ml-sjavier-1-a1', nombre: 'Apiario San Javier', latitud: -35.6200, longitud: -71.7300, comuna: 'San Javier', region: 'Maule', cantidadColmenas: 190 }
    ],
    totalColmenas: 190,
    sipecRegistrado: true
  },
  // Cauquenes
  {
    id: 'ml-cauquenes-1',
    nombre: 'Carolina Díaz Silva',
    email: 'cdiaz@mielcauquenes.cl',
    telefono: '+56912345311',
    region: 'Maule',
    comuna: 'Cauquenes',
    apiarios: [
      { id: 'ml-cauquenes-1-a1', nombre: 'Apiario Cauquenes', latitud: -35.9700, longitud: -72.3200, comuna: 'Cauquenes', region: 'Maule', cantidadColmenas: 175 }
    ],
    totalColmenas: 175,
    sipecRegistrado: true
  }
];
