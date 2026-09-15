import { ApicultorSIPEC } from '../types/fields';

// Base de datos de apicultores registrados en SIPEC por región
// Fuente: SAG - Sistema de Información Pecuaria Apícola
// Total aproximado: 20,150 apiarios en Chile (promedio 73 colmenas/apiario)

export const apicultoresSIPEC: ApicultorSIPEC[] = [
  // REGIÓN METROPOLITANA
  {
    id: 'ap1',
    nombre: 'Juan Carlos Muñoz',
    email: 'jcmunoz@apicolametro.cl',
    telefono: '+56912345001',
    region: 'Metropolitana',
    comuna: 'Buin',
    apiarios: [
      { id: 'api1', nombre: 'Apiario Los Álamos', latitud: -33.7290, longitud: -70.7220, comuna: 'Buin', region: 'Metropolitana', cantidadColmenas: 120 },
      { id: 'api2', nombre: 'Apiario El Roble', latitud: -33.7350, longitud: -70.7180, comuna: 'Buin', region: 'Metropolitana', cantidadColmenas: 80 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },
  {
    id: 'ap2',
    nombre: 'María Elena González',
    email: 'megonzalez@mielpura.cl',
    telefono: '+56912345002',
    region: 'Metropolitana',
    comuna: 'Paine',
    apiarios: [
      { id: 'api3', nombre: 'Apiario Dulce Colmena', latitud: -33.8180, longitud: -70.7050, comuna: 'Paine', region: 'Metropolitana', cantidadColmenas: 150 }
    ],
    totalColmenas: 150,
    sipecRegistrado: true
  },
  {
    id: 'ap3',
    nombre: 'Roberto Sánchez',
    email: 'rsanchez@apitotal.cl',
    telefono: '+56912345003',
    region: 'Metropolitana',
    comuna: 'Talagante',
    apiarios: [
      { id: 'api4', nombre: 'Apiario Valle Verde', latitud: -33.6630, longitud: -70.9260, comuna: 'Talagante', region: 'Metropolitana', cantidadColmenas: 95 }
    ],
    totalColmenas: 95,
    sipecRegistrado: true
  },

  // REGIÓN DE O'HIGGINS
  {
    id: 'ap4',
    nombre: 'Pedro Muñoz',
    email: 'pmunoz@apiarioslosalamos.cl',
    telefono: '+56912345004',
    region: "O'Higgins",
    comuna: 'Rancagua',
    apiarios: [
      { id: 'api5', nombre: 'Apiario Los Álamos', latitud: -34.1532, longitud: -70.7647, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 80 },
      { id: 'api6', nombre: 'Apiario Colmenar Real', latitud: -34.1600, longitud: -70.7700, comuna: 'Rancagua', region: "O'Higgins", cantidadColmenas: 35 }
    ],
    totalColmenas: 115,
    sipecRegistrado: true
  },
  {
    id: 'ap5',
    nombre: 'Sofía Herrera',
    email: 'sofia@dulcecolmena.cl',
    telefono: '+56912345005',
    region: "O'Higgins",
    comuna: 'San Fernando',
    apiarios: [
      { id: 'api7', nombre: 'Apiario Dulce Colmena', latitud: -34.5830, longitud: -70.9830, comuna: 'San Fernando', region: "O'Higgins", cantidadColmenas: 120 }
    ],
    totalColmenas: 120,
    sipecRegistrado: true
  },
  {
    id: 'ap6',
    nombre: 'Carlos Fuentes',
    email: 'cfuentes@mielcolchagua.cl',
    telefono: '+56912345006',
    region: "O'Higgins",
    comuna: 'Santa Cruz',
    apiarios: [
      { id: 'api8', nombre: 'Apiario Colchagua', latitud: -34.6400, longitud: -71.3700, comuna: 'Santa Cruz', region: "O'Higgins", cantidadColmenas: 200 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },

  // REGIÓN DEL MAULE
  {
    id: 'ap7',
    nombre: 'Ricardo Vargas',
    email: 'rvargas@mielpura.cl',
    telefono: '+56912345007',
    region: 'Maule',
    comuna: 'Talca',
    apiarios: [
      { id: 'api9', nombre: 'Apiario Miel Pura', latitud: -35.4264, longitud: -71.6554, comuna: 'Talca', region: 'Maule', cantidadColmenas: 45 }
    ],
    totalColmenas: 45,
    sipecRegistrado: true
  },
  {
    id: 'ap8',
    nombre: 'Andrea López',
    email: 'alopez@apiculturamaule.cl',
    telefono: '+56912345008',
    region: 'Maule',
    comuna: 'Curicó',
    apiarios: [
      { id: 'api10', nombre: 'Apiario Valle del Maule', latitud: -34.9830, longitud: -71.2330, comuna: 'Curicó', region: 'Maule', cantidadColmenas: 180 }
    ],
    totalColmenas: 180,
    sipecRegistrado: true
  },
  {
    id: 'ap9',
    nombre: 'Miguel Torres',
    email: 'mtorres@mielmaule.cl',
    telefono: '+56912345009',
    region: 'Maule',
    comuna: 'Linares',
    apiarios: [
      { id: 'api11', nombre: 'Apiario Linares', latitud: -35.8500, longitud: -71.5830, comuna: 'Linares', region: 'Maule', cantidadColmenas: 90 }
    ],
    totalColmenas: 90,
    sipecRegistrado: true
  },

  // REGIÓN DE ÑUBLE
  {
    id: 'ap10',
    nombre: 'Camila Rojas',
    email: 'crojas@elbosque.cl',
    telefono: '+56912345010',
    region: 'Ñuble',
    comuna: 'Chillán',
    apiarios: [
      { id: 'api12', nombre: 'Apiario El Bosque', latitud: -36.6069, longitud: -72.1034, comuna: 'Chillán', region: 'Ñuble', cantidadColmenas: 60 }
    ],
    totalColmenas: 60,
    sipecRegistrado: true
  },
  {
    id: 'ap11',
    nombre: 'Felipe Contreras',
    email: 'fcontreras@mielñuble.cl',
    telefono: '+56912345011',
    region: 'Ñuble',
    comuna: 'San Carlos',
    apiarios: [
      { id: 'api13', nombre: 'Apiario San Carlos', latitud: -36.4330, longitud: -71.9670, comuna: 'San Carlos', region: 'Ñuble', cantidadColmenas: 110 }
    ],
    totalColmenas: 110,
    sipecRegistrado: true
  },

  // REGIÓN DEL BIOBÍO
  {
    id: 'ap12',
    nombre: 'Isabel Martínez',
    email: 'imartinez@apibiobio.cl',
    telefono: '+56912345012',
    region: 'Biobío',
    comuna: 'Concepción',
    apiarios: [
      { id: 'api14', nombre: 'Apiario Concepción', latitud: -36.8270, longitud: -73.0500, comuna: 'Concepción', region: 'Biobío', cantidadColmenas: 75 }
    ],
    totalColmenas: 75,
    sipecRegistrado: true
  },
  {
    id: 'ap13',
    nombre: 'Tomás Reyes',
    email: 'treyes@mielbiobio.cl',
    telefono: '+56912345013',
    region: 'Biobío',
    comuna: 'Los Ángeles',
    apiarios: [
      { id: 'api15', nombre: 'Apiario Los Ángeles', latitud: -37.4700, longitud: -72.3500, comuna: 'Los Ángeles', region: 'Biobío', cantidadColmenas: 140 }
    ],
    totalColmenas: 140,
    sipecRegistrado: true
  },

  // REGIÓN DE LA ARAUCANÍA
  {
    id: 'ap14',
    nombre: 'Valentina Sepúlveda',
    email: 'vsepulveda@araucaniamiel.cl',
    telefono: '+56912345014',
    region: 'La Araucanía',
    comuna: 'Temuco',
    apiarios: [
      { id: 'api16', nombre: 'Apiario Araucanía Miel', latitud: -38.7359, longitud: -72.5904, comuna: 'Temuco', region: 'La Araucanía', cantidadColmenas: 200 }
    ],
    totalColmenas: 200,
    sipecRegistrado: true
  },
  {
    id: 'ap15',
    nombre: 'Diego Contreras',
    email: 'dcontreras@colmenarreal.cl',
    telefono: '+56912345015',
    region: 'La Araucanía',
    comuna: 'Villarrica',
    apiarios: [
      { id: 'api17', nombre: 'Apiario Villarrica', latitud: -39.2830, longitud: -72.2170, comuna: 'Villarrica', region: 'La Araucanía', cantidadColmenas: 160 }
    ],
    totalColmenas: 160,
    sipecRegistrado: true
  },
  {
    id: 'ap16',
    nombre: 'Francisca Morales',
    email: 'fmorales@mielaraucania.cl',
    telefono: '+56912345016',
    region: 'La Araucanía',
    comuna: 'Angol',
    apiarios: [
      { id: 'api18', nombre: 'Apiario Angol', latitud: -37.8000, longitud: -72.7170, comuna: 'Angol', region: 'La Araucanía', cantidadColmenas: 95 }
    ],
    totalColmenas: 95,
    sipecRegistrado: true
  },

  // REGIÓN DE LOS RÍOS
  {
    id: 'ap17',
    nombre: 'Sebastián Navarro',
    email: 'snavarro@miellosrios.cl',
    telefono: '+56912345017',
    region: 'Los Ríos',
    comuna: 'Valdivia',
    apiarios: [
      { id: 'api19', nombre: 'Apiario Valdivia', latitud: -39.8142, longitud: -73.2459, comuna: 'Valdivia', region: 'Los Ríos', cantidadColmenas: 130 }
    ],
    totalColmenas: 130,
    sipecRegistrado: true
  },
  {
    id: 'ap18',
    nombre: 'Carolina Díaz',
    email: 'cdiaz@apilosrios.cl',
    telefono: '+56912345018',
    region: 'Los Ríos',
    comuna: 'Osorno',
    apiarios: [
      { id: 'api20', nombre: 'Apiario Osorno', latitud: -40.5740, longitud: -73.1330, comuna: 'Osorno', region: 'Los Ríos', cantidadColmenas: 85 }
    ],
    totalColmenas: 85,
    sipecRegistrado: true
  },

  // REGIÓN DE LOS LAGOS
  {
    id: 'ap19',
    nombre: 'Alejandro Ruiz',
    email: 'aruiz@mielloslagos.cl',
    telefono: '+56912345019',
    region: 'Los Lagos',
    comuna: 'Puerto Montt',
    apiarios: [
      { id: 'api21', nombre: 'Apiario Puerto Montt', latitud: -41.4687, longitud: -72.9411, comuna: 'Puerto Montt', region: 'Los Lagos', cantidadColmenas: 110 }
    ],
    totalColmenas: 110,
    sipecRegistrado: true
  },
  {
    id: 'ap20',
    nombre: 'Paula Silva',
    email: 'psilva@apilagos.cl',
    telefono: '+56912345020',
    region: 'Los Lagos',
    comuna: 'Puerto Varas',
    apiarios: [
      { id: 'api22', nombre: 'Apiario Puerto Varas', latitud: -41.3200, longitud: -72.6100, comuna: 'Puerto Varas', region: 'Los Lagos', cantidadColmenas: 70 }
    ],
    totalColmenas: 70,
    sipecRegistrado: true
  },

  // REGIÓN DE VALPARAÍSO
  {
    id: 'ap21',
    nombre: 'Andrés Torres',
    email: 'atorres@valleverde.cl',
    telefono: '+56912345021',
    region: 'Valparaíso',
    comuna: 'Quillota',
    apiarios: [
      { id: 'api23', nombre: 'Apiario Valle Verde', latitud: -32.8830, longitud: -71.2500, comuna: 'Quillota', region: 'Valparaíso', cantidadColmenas: 95 }
    ],
    totalColmenas: 95,
    sipecRegistrado: true
  },
  {
    id: 'ap22',
    nombre: 'Lucía Fernández',
    email: 'lfernandez@mielvalpo.cl',
    telefono: '+56912345022',
    region: 'Valparaíso',
    comuna: 'San Felipe',
    apiarios: [
      { id: 'api24', nombre: 'Apiario San Felipe', latitud: -32.7500, longitud: -70.7170, comuna: 'San Felipe', region: 'Valparaíso', cantidadColmenas: 125 }
    ],
    totalColmenas: 125,
    sipecRegistrado: true
  },
  {
    id: 'ap23',
    nombre: 'Matías Herrera',
    email: 'mherrera@apivalpo.cl',
    telefono: '+56912345023',
    region: 'Valparaíso',
    comuna: 'La Ligua',
    apiarios: [
      { id: 'api25', nombre: 'Apiario La Ligua', latitud: -32.4500, longitud: -71.2330, comuna: 'La Ligua', region: 'Valparaíso', cantidadColmenas: 60 }
    ],
    totalColmenas: 60,
    sipecRegistrado: true
  },

  // REGIÓN DE COQUIMBO
  {
    id: 'ap24',
    nombre: 'Javiera Pinto',
    email: 'jpinto@mielcoquimbo.cl',
    telefono: '+56912345024',
    region: 'Coquimbo',
    comuna: 'La Serena',
    apiarios: [
      { id: 'api26', nombre: 'Apiario La Serena', latitud: -29.9030, longitud: -71.2500, comuna: 'La Serena', region: 'Coquimbo', cantidadColmenas: 80 }
    ],
    totalColmenas: 80,
    sipecRegistrado: true
  },
  {
    id: 'ap25',
    nombre: 'Nicolás Bravo',
    email: 'nbravo@apicoquimbo.cl',
    telefono: '+56912345025',
    region: 'Coquimbo',
    comuna: 'Ovalle',
    apiarios: [
      { id: 'api27', nombre: 'Apiario Ovalle', latitud: -30.6000, longitud: -71.2000, comuna: 'Ovalle', region: 'Coquimbo', cantidadColmenas: 100 }
    ],
    totalColmenas: 100,
    sipecRegistrado: true
  },

  // REGIÓN DE ATACAMA
  {
    id: 'ap26',
    nombre: 'Renato Guzmán',
    email: 'rguzman@mielatacama.cl',
    telefono: '+56912345026',
    region: 'Atacama',
    comuna: 'Copiapó',
    apiarios: [
      { id: 'api28', nombre: 'Apiario Copiapó', latitud: -27.3670, longitud: -70.3330, comuna: 'Copiapó', region: 'Atacama', cantidadColmenas: 50 }
    ],
    totalColmenas: 50,
    sipecRegistrado: true
  },

  // REGIÓN DE TARAPACÁ
  {
    id: 'ap27',
    nombre: 'Constanza Vega',
    email: 'cvega@mielnorte.cl',
    telefono: '+56912345027',
    region: 'Tarapacá',
    comuna: 'Iquique',
    apiarios: [
      { id: 'api29', nombre: 'Apiario Iquique', latitud: -20.2130, longitud: -70.1500, comuna: 'Iquique', region: 'Tarapacá', cantidadColmenas: 30 }
    ],
    totalColmenas: 30,
    sipecRegistrado: true
  }
];

// Función para obtener apicultores por región
export function getApicultoresByRegion(region: string): ApicultorSIPEC[] {
  return apicultoresSIPEC.filter(a => a.region === region);
}

// Función para obtener apicultores por comuna
export function getApicultoresByComuna(comuna: string): ApicultorSIPEC[] {
  return apicultoresSIPEC.filter(a => a.comuna === comuna);
}

// Función para obtener todos los apiarios de una región
export function getApiariosByRegion(region: string) {
  const apicultores = getApicultoresByRegion(region);
  return apicultores.flatMap(a => a.apiarios);
}

// Función para obtener estadísticas por región
export function getEstadisticasRegion(region: string) {
  const apicultores = getApicultoresByRegion(region);
  const totalApiarios = apicultores.reduce((acc, a) => acc + a.apiarios.length, 0);
  const totalColmenas = apicultores.reduce((acc, a) => acc + a.totalColmenas, 0);
  
  return {
    totalApicultores: apicultores.length,
    totalApiarios,
    totalColmenas
  };
}
