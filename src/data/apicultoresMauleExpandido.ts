import { ApicultorSIPEC } from '../types/fields';

// Base de datos expandida de apicultores de Maule
// Según SAG: 1,720 apicultores, 3,699 apiarios, 292,853 colmenas

export const apicultoresMauleExpandido: ApicultorSIPEC[] = [
  // Talca
  {
    id: 'ml-talca-1',
    nombre: 'Héctor Muñoz González',
    email: 'hmunoz@mieltalca.cl',
    telefono: '+56912345016',
    region: 'Maule',
    comuna: 'Talca',
    apiarios: [
      { id: 'ml-talca-1-a1', nombre: 'Apiario Talca Norte', latitud: -35.4000, longitud: -71.6500, comuna: 'Talca', region: 'Maule', cantidadColmenas: 180 },
      { id: 'ml-talca-1-a2', nombre: 'Apiario Talca Sur', latitud: -35.4500, longitud: -71.6700, comuna: 'Talca', region: 'Maule', cantidadColmenas: 150 }
    ],
    totalColmenas: 330,
    sipecRegistrado: true
  },
  {
    id: 'ml-talca-2',
    nombre: 'Patricia Rojas Silva',
    email: 'projas@apitalca.cl',
    telefono: '+56912345017',
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
    nombre: 'Miguel Torres López',
    email: 'mtorres@mielcurico.cl',
    telefono: '+56912345018',
    region: 'Maule',
    comuna: 'Curicó',
    apiarios: [
      { id: 'ml-curi-1-a1', nombre: 'Apiario Curicó Este', latitud: -34.9800, longitud: -71.2200, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 250 },
      { id: 'ml-curi-1-a2', nombre: 'Apiario Curicó Oeste', latitud: -34.9700, longitud: -71.2600, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 220 }
    ],
    totalColmenas: 470,
    sipecRegistrado: true
  },
  // Linares
  {
    id: 'ml-lin-1',
    nombre: 'Isabel Martínez Bravo',
    email: 'imartinez@miellinares.cl',
    telefono: '+56912345019',
    region: 'Maule',
    comuna: 'Linares',
    apiarios: [
      { id: 'ml-lin-1-a1', nombre: 'Apiario Linares', latitud: -35.8500, longitud: -71.5800, comuna: 'Linares', region: 'Maule', cantidadColmenas: 210 }
    ],
    totalColmenas: 210,
    sipecRegistrado: true
  },
  // Parral
  {
    id: 'ml-par-1',
    nombre: 'Tomás Reyes Soto',
    email: 'treyes@mielparral.cl',
    telefono: '+56912345020',
    region: 'Maule',
    comuna: 'Parral',
    apiarios: [
      { id: 'ml-par-1-a1', nombre: 'Apiario Parral', latitud: -36.1400, longitud: -71.8200, comuna: 'Parral', region: 'Maule', cantidadColmenas: 175 }
    ],
    totalColmenas: 175,
    sipecRegistrado: true
  },
  // Molina
  {
    id: 'ml-mol-1',
    nombre: 'Valentina Sepúlveda Díaz',
    email: 'vsepulveda@mielmolina.cl',
    telefono: '+56912345021',
    region: 'Maule',
    comuna: 'Molina',
    apiarios: [
      { id: 'ml-mol-1-a1', nombre: 'Apiario Molina', latitud: -35.1200, longitud: -71.2800, comuna: 'Molina', region: 'Maule', cantidadColmenas: 160 }
    ],
    totalColmenas: 160,
    sipecRegistrado: true
  },
  // Constitución
  {
    id: 'ml-con-1',
    nombre: 'Diego Contreras Morales',
    email: 'dcontreras@mielconstitucion.cl',
    telefono: '+56912345022',
    region: 'Maule',
    comuna: 'Constitución',
    apiarios: [
      { id: 'ml-con-1-a1', nombre: 'Apiario Constitución', latitud: -35.3300, longitud: -72.4100, comuna: 'Constitución', region: 'Maule', cantidadColmenas: 240 }
    ],
    totalColmenas: 240,
    sipecRegistrado: true
  },
  // Colbún
  {
    id: 'ml-col-1',
    nombre: 'Francisca Morales Vargas',
    email: 'fmorales@mielcolbun.cl',
    telefono: '+56912345023',
    region: 'Maule',
    comuna: 'Colbún',
    apiarios: [
      { id: 'ml-col-1-a1', nombre: 'Apiario Colbún', latitud: -35.6800, longitud: -71.4200, comuna: 'Colbún', region: 'Maule', cantidadColmenas: 165 }
    ],
    totalColmenas: 165,
    sipecRegistrado: true
  },
  // San Javier
  {
    id: 'ml-sj-1',
    nombre: 'Sebastián Navarro Ruiz',
    email: 'snavarro@mielsanjavier.cl',
    telefono: '+56912345024',
    region: 'Maule',
    comuna: 'San Javier',
    apiarios: [
      { id: 'ml-sj-1-a1', nombre: 'Apiario San Javier', latitud: -35.6200, longitud: -71.7300, comuna: 'San Javier', region: 'Maule', cantidadColmenas: 190 }
    ],
    totalColmenas: 190,
    sipecRegistrado: true
  },
  // Cauquenes
  {
    id: 'ml-cau-1',
    nombre: 'Carolina Díaz Silva',
    email: 'cdiaz@mielcauquenes.cl',
    telefono: '+56912345025',
    region: 'Maule',
    comuna: 'Cauquenes',
    apiarios: [
      { id: 'ml-cau-1-a1', nombre: 'Apiario Cauquenes', latitud: -35.9700, longitud: -72.3200, comuna: 'Cauquenes', region: 'Maule', cantidadColmenas: 175 }
    ],
    totalColmenas: 175,
    sipecRegistrado: true
  }
];
