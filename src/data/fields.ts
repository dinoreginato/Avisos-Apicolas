export interface Campo {
  id: string;
  nombre: string;
  propietario: string;
  latitud: number;
  longitud: number;
  region: string;
  comuna: string;
  hectareas: number;
  cultivo: string;
}

export interface Apiario {
  id: string;
  nombre: string;
  apicultor: string;
  latitud: number;
  longitud: number;
  region: string;
  comuna: string;
  cantidadColmenas: number;
  contactoEmail: string;
  contactoTelefono: string;
  sipecRegistrado: boolean;
}

export interface AvisoAplicacion {
  id: string;
  campoId: string;
  productoId: string;
  fechaAplicacion: string;
  fechaAviso: string;
  coordenadas: { lat: number; lng: number };
  estado: 'pendiente' | 'enviado' | 'confirmado';
  apicultoresNotificados: string[];
  horaAplicacion: string;
  superficieTratada: number;
}

// Campos de ejemplo
export const camposEjemplo: Campo[] = [
  {
    id: 'c1',
    nombre: 'Fundo El Roble',
    propietario: 'Juan Pérez Soto',
    latitud: -34.1532,
    longitud: -70.7647,
    region: "O'Higgins",
    comuna: 'Rancagua',
    hectareas: 120,
    cultivo: 'Manzano'
  },
  {
    id: 'c2',
    nombre: 'Hacienda Los Aromos',
    propietario: 'María González',
    latitud: -33.4569,
    longitud: -70.6483,
    region: 'Metropolitana',
    comuna: 'Buin',
    hectareas: 85,
    cultivo: 'Vid'
  },
  {
    id: 'c3',
    nombre: 'Agricultural San Miguel',
    propietario: 'Carlos Muñoz',
    latitud: -36.6069,
    longitud: -72.1034,
    region: 'Maule',
    comuna: 'Talca',
    hectareas: 200,
    cultivo: 'Cerezo'
  },
  {
    id: 'c4',
    nombre: 'Predio La Esperanza',
    propietario: 'Ana Fuentes',
    latitud: -37.9518,
    longitud: -72.8321,
    region: 'Ñuble',
    comuna: 'Chillán',
    hectareas: 65,
    cultivo: 'Trigo'
  },
  {
    id: 'c5',
    nombre: 'Fundo Las Paltas',
    propietario: 'Roberto Sánchez',
    latitud: -33.0456,
    longitud: -71.4567,
    region: 'Valparaíso',
    comuna: 'Quillota',
    hectareas: 45,
    cultivo: 'Palto'
  },
  {
    id: 'c6',
    nombre: 'Viñedos del Sur',
    propietario: 'Patricia López',
    latitud: -38.9382,
    longitud: -72.6250,
    region: 'La Araucanía',
    comuna: 'Temuco',
    hectareas: 150,
    cultivo: 'Vid'
  }
];

// Apiarios de ejemplo
export const apiariosEjemplo: Apiario[] = [
  {
    id: 'a1',
    nombre: 'Apiario Los Álamos',
    apicultor: 'Pedro Muñoz',
    latitud: -34.1480,
    longitud: -70.7590,
    region: "O'Higgins",
    comuna: 'Rancagua',
    cantidadColmenas: 80,
    contactoEmail: 'pmunoz@apiarioslosalamos.cl',
    contactoTelefono: '+56912345678',
    sipecRegistrado: true
  },
  {
    id: 'a2',
    nombre: 'Apiario Dulce Colmena',
    apicultor: 'Sofía Herrera',
    latitud: -33.4510,
    longitud: -70.6420,
    region: 'Metropolitana',
    comuna: 'Buin',
    cantidadColmenas: 120,
    contactoEmail: 'sofia@dulcecolmena.cl',
    contactoTelefono: '+56987654321',
    sipecRegistrado: true
  },
  {
    id: 'a3',
    nombre: 'Apiario Miel Pura',
    apicultor: 'Ricardo Vargas',
    latitud: -36.6010,
    longitud: -72.0980,
    region: 'Maule',
    comuna: 'Talca',
    cantidadColmenas: 45,
    contactoEmail: 'rvargas@mielpura.cl',
    contactoTelefono: '+56955512345',
    sipecRegistrado: true
  },
  {
    id: 'a4',
    nombre: 'Apiario El Bosque',
    apicultor: 'Camila Rojas',
    latitud: -37.9460,
    longitud: -72.8270,
    region: 'Ñuble',
    comuna: 'Chillán',
    cantidadColmenas: 60,
    contactoEmail: 'crojas@elbosque.cl',
    contactoTelefono: '+56944433221',
    sipecRegistrado: true
  },
  {
    id: 'a5',
    nombre: 'Apiario Valle Verde',
    apicultor: 'Andrés Torres',
    latitud: -33.0400,
    longitud: -71.4510,
    region: 'Valparaíso',
    comuna: 'Quillota',
    cantidadColmenas: 95,
    contactoEmail: 'atorres@valleverde.cl',
    contactoTelefono: '+56933322110',
    sipecRegistrado: true
  },
  {
    id: 'a6',
    nombre: 'Apiario Araucanía Miel',
    apicultor: 'Valentina Sepúlveda',
    latitud: -38.9330,
    longitud: -72.6200,
    region: 'La Araucanía',
    comuna: 'Temuco',
    cantidadColmenas: 200,
    contactoEmail: 'vsepulveda@araucaniamiel.cl',
    contactoTelefono: '+56922211000',
    sipecRegistrado: true
  },
  {
    id: 'a7',
    nombre: 'Apiario Colmenar Real',
    apicultor: 'Diego Contreras',
    latitud: -34.1600,
    longitud: -70.7700,
    region: "O'Higgins",
    comuna: 'Rancagua',
    cantidadColmenas: 35,
    contactoEmail: 'dcontreras@colmenarreal.cl',
    contactoTelefono: '+56911100998',
    sipecRegistrado: true
  }
];

// Función para calcular distancia entre dos puntos (fórmula de Haversine)
export function calcularDistanciaKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Zona de influencia para avisaje (3 km según normativa)
export const ZONA_AVISAJE_KM = 3;

// Obtener apiarios en zona de influencia de un campo
export function getApiariosEnZona(campo: Campo, apiarios: Apiario[]): Apiario[] {
  return apiarios.filter(apiario => {
    const distancia = calcularDistanciaKm(
      campo.latitud, campo.longitud,
      apiario.latitud, apiario.longitud
    );
    return distancia <= ZONA_AVISAJE_KM;
  });
}
