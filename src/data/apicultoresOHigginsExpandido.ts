import { ApicultorSIPEC } from '../types/fields';

// Base de datos expandida de apicultores de O'Higgins
// Según SAG: 1,166 apicultores, 2,684 apiarios, 260,733 colmenas

export const apicultoresOHigginsExpandido: ApicultorSIPEC[] = [
  // Rancagua
  {
    id: 'oh-ranc-1',
    nombre: 'Juan Carlos Pérez Soto',
    email: 'jcperez@mielrancagua.cl',
    telefono: '+56912345001',
    region: "O'Higgins",
    comuna: 'Rancagua',
    apiarios: [
      { id: 'oh-ranc-1-a1', nombre: 'Apiario Los Álamos', latitud: -34.1532, longitud: -70.7647, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 120 },
      { id: 'oh-ranc-1-a2', nombre: 'Apiario El Roble', latitud: -34.1600, longitud: -70.7700, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 80 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },
  {
    id: 'oh-ranc-2',
    nombre: 'María Elena González',
    email: 'megonzalez@apirancagua.cl',
    telefono: '+56912345002',
    region: "O'Higgins",
    comuna: 'Rancagua',
    apiarios: [
      { id: 'oh-ranc-2-a1', nombre: 'Apiario Dulce Colmena', latitud: -34.1450, longitud: -70.7550, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 150 }
    ],
    totalColmenas: 150,
    sipecRegistrado: true
  },
  {
    id: 'oh-ranc-3',
    nombre: 'Roberto Sánchez Muñoz',
    email: 'rsanchez@mielranco.cl',
    telefono: '+56912345003',
    region: "O'Higgins",
    comuna: 'Rancagua',
    apiarios: [
      { id: 'oh-ranc-3-a1', nombre: 'Apiario Ranco', latitud: -34.1700, longitud: -70.7800, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 180 }
    ],
    totalColmenas: 180,
    sipecRegistrado: true
  },
  // Machalí
  {
    id: 'oh-mach-1',
    nombre: 'Ana María Torres',
    email: 'atorres@mielmachali.cl',
    telefono: '+56912345004',
    region: "O'Higgins",
    comuna: 'Machalí',
    apiarios: [
      { id: 'oh-mach-1-a1', nombre: 'Apiario Machalí Norte', latitud: -34.1800, longitud: -70.6600, comuna: 'Machalí', region: "O'Higgins", cantidadColmenas: 200 },
      { id: 'oh-mach-1-a2', nombre: 'Apiario Machalí Sur', latitud: -34.2000, longitud: -70.6800, comuna: 'Machalí', region: "O'Higgins", cantidadColmenas: 150 }
    ],
    totalColmenas: 350,
    sipecRegistrado: true
  },
  {
    id: 'oh-mach-2',
    nombre: 'Carlos Fuentes Bravo',
    email: 'cfuentes@apimachali.cl',
    telefono: '+56912345005',
    region: "O'Higgins",
    comuna: 'Machalí',
    apiarios: [
      { id: 'oh-mach-2-a1', nombre: 'Apiario Coya', latitud: -34.1900, longitud: -70.6500, comuna: 'Machalí', region: "O'Higgins", cantidadColmenas: 120 }
    ],
    totalColmenas: 120,
    sipecRegistrado: true
  },
  // Requínoa
  {
    id: 'oh-req-1',
    nombre: 'Patricia Rojas Herrera',
    email: 'projas@mielrequinoa.cl',
    telefono: '+56912345006',
    region: "O'Higgins",
    comuna: 'Requínoa',
    apiarios: [
      { id: 'oh-req-1-a1', nombre: 'Apiario Requínoa Centro', latitud: -34.2800, longitud: -70.8700, comuna: 'Requínoa', region: "O'Higgins", cantidadColmenas: 220 }
    ],
    totalColmenas: 220,
    sipecRegistrado: true
  },
  // Codegua
  {
    id: 'oh-code-1',
    nombre: 'Miguel Ángel López',
    email: 'malopez@mielcodegua.cl',
    telefono: '+56912345007',
    region: "O'Higgins",
    comuna: 'Codegua',
    apiarios: [
      { id: 'oh-code-1-a1', nombre: 'Apiario Codegua', latitud: -34.1100, longitud: -70.6300, comuna: 'Codegua', region: "O'Higgins", cantidadColmenas: 160 }
    ],
    totalColmenas: 160,
    sipecRegistrado: true
  },
  // Mostazal
  {
    id: 'oh-most-1',
    nombre: 'Isabel Martínez Soto',
    email: 'imartinez@mielmostazal.cl',
    telefono: '+56912345008',
    region: "O'Higgins",
    comuna: 'Mostazal',
    apiarios: [
      { id: 'oh-most-1-a1', nombre: 'Apiario Mostazal', latitud: -33.9900, longitud: -70.7100, comuna: 'Mostazal', region: "O'Higgins", cantidadColmenas: 190 }
    ],
    totalColmenas: 190,
    sipecRegistrado: true
  },
  // Graneros
  {
    id: 'oh-gran-1',
    nombre: 'Tomás Reyes Contreras',
    email: 'treyes@mielgraneros.cl',
    telefono: '+56912345009',
    region: "O'Higgins",
    comuna: 'Graneros',
    apiarios: [
      { id: 'oh-gran-1-a1', nombre: 'Apiario Graneros', latitud: -34.0700, longitud: -70.7200, comuna: 'Graneros', region: "O'Higgins", cantidadColmenas: 140 }
    ],
    totalColmenas: 140,
    sipecRegistrado: true
  },
  // San Fernando
  {
    id: 'oh-sf-1',
    nombre: 'Valentina Sepúlveda Díaz',
    email: 'vsepulveda@mielsanfernando.cl',
    telefono: '+56912345010',
    region: "O'Higgins",
    comuna: 'San Fernando',
    apiarios: [
      { id: 'oh-sf-1-a1', nombre: 'Apiario San Fernando', latitud: -34.5830, longitud: -70.9830, comuna: 'San Fernando', region: "O'Higgins", cantidadColmenas: 250 }
    ],
    totalColmenas: 250,
    sipecRegistrado: true
  },
  // Santa Cruz
  {
    id: 'oh-sc-1',
    nombre: 'Diego Contreras Morales',
    email: 'dcontreras@mielsantacruz.cl',
    telefono: '+56912345011',
    region: "O'Higgins",
    comuna: 'Santa Cruz',
    apiarios: [
      { id: 'oh-sc-1-a1', nombre: 'Apiario Santa Cruz', latitud: -34.6400, longitud: -71.3700, comuna: 'Santa Cruz', region: "O'Higgins", cantidadColmenas: 300 }
    ],
    totalColmenas: 300,
    sipecRegistrado: true
  },
  // Chimbarongo
  {
    id: 'oh-chim-1',
    nombre: 'Francisca Morales Vargas',
    email: 'fmorales@mielchimbarongo.cl',
    telefono: '+56912345012',
    region: "O'Higgins",
    comuna: 'Chimbarongo',
    apiarios: [
      { id: 'oh-chim-1-a1', nombre: 'Apiario Chimbarongo', latitud: -34.5500, longitud: -71.1500, comuna: 'Chimbarongo', region: "O'Higgins", cantidadColmenas: 180 }
    ],
    totalColmenas: 180,
    sipecRegistrado: true
  },
  // San Vicente
  {
    id: 'oh-sv-1',
    nombre: 'Sebastián Navarro Ruiz',
    email: 'snavarro@mielsanvicente.cl',
    telefono: '+56912345013',
    region: "O'Higgins",
    comuna: 'San Vicente',
    apiarios: [
      { id: 'oh-sv-1-a1', nombre: 'Apiario San Vicente', latitud: -34.4200, longitud: -71.0100, comuna: 'San Vicente', region: "O'Higgins", cantidadColmenas: 210 }
    ],
    totalColmenas: 210,
    sipecRegistrado: true
  },
  // Peumo
  {
    id: 'oh-peu-1',
    nombre: 'Carolina Díaz Silva',
    email: 'cdiaz@mielpeumo.cl',
    telefono: '+56912345014',
    region: "O'Higgins",
    comuna: 'Peumo',
    apiarios: [
      { id: 'oh-peu-1-a1', nombre: 'Apiario Peumo', latitud: -34.3700, longitud: -71.1200, comuna: 'Peumo', region: "O'Higgins", cantidadColmenas: 170 }
    ],
    totalColmenas: 170,
    sipecRegistrado: true
  },
  // Pichidegua
  {
    id: 'oh-pich-1',
    nombre: 'Alejandro Ruiz Pinto',
    email: 'aruiz@mielpichidegua.cl',
    telefono: '+56912345015',
    region: "O'Higgins",
    comuna: 'Pichidegua',
    apiarios: [
      { id: 'oh-pich-1-a1', nombre: 'Apiario Pichidegua', latitud: -34.3200, longitud: -71.2200, comuna: 'Pichidegua', region: "O'Higgins", cantidadColmenas: 195 }
    ],
    totalColmenas: 195,
    sipecRegistrado: true
  }
];
