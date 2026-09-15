// Contactos oficiales del SAG por región
// Fuente: Directorio de Oficinas SAG - https://www.sag.gob.cl/directorio-de-oficinas

export interface ContactoSAG {
  region: string;
  emailContacto: string;
  emailOficinaPartes: string;
  telefono: string;
  direccion: string;
}

export const contactosSAG: Record<string, ContactoSAG> = {
  'Arica y Parinacota': {
    region: 'Arica y Parinacota',
    emailContacto: 'contacto.arica@sag.gob.cl',
    emailOficinaPartes: 'op.arica@sag.gob.cl',
    telefono: '+56 58 2251910',
    direccion: '18 de Septiembre 370, Arica'
  },
  'Tarapacá': {
    region: 'Tarapacá',
    emailContacto: 'contacto.tarapaca@sag.gob.cl',
    emailOficinaPartes: 'op.tarapaca@sag.gob.cl',
    telefono: '+56 57 2411000',
    direccion: 'Tarapacá 444, Iquique'
  },
  'Antofagasta': {
    region: 'Antofagasta',
    emailContacto: 'contacto.antofagasta@sag.gob.cl',
    emailOficinaPartes: 'oficinadepartes.afta@sag.gob.cl',
    telefono: '+56 55 225139722',
    direccion: 'Coquimbo 842, Antofagasta'
  },
  'Atacama': {
    region: 'Atacama',
    emailContacto: 'contacto.atacama@sag.gob.cl',
    emailOficinaPartes: 'op.atacama@sag.gob.cl',
    telefono: '+56 52 225139783',
    direccion: 'Chacabuco 546, Copiapó'
  },
  'Coquimbo': {
    region: 'Coquimbo',
    emailContacto: 'contacto.coquimbo@sag.gob.cl',
    emailOficinaPartes: 'op.coquimbo@sag.gob.cl',
    telefono: '+56 51 2226053',
    direccion: 'Francisco de Aguirre 1250, La Serena'
  },
  'Valparaíso': {
    region: 'Valparaíso',
    emailContacto: 'contacto.valparaiso@sag.gob.cl',
    emailOficinaPartes: 'op.valparaiso@sag.gob.cl',
    telefono: '+56 32 2933091',
    direccion: 'Av. Francia 1636, Valparaíso'
  },
  'Metropolitana': {
    region: 'Metropolitana',
    emailContacto: 'contacto.metropolitana@sag.gob.cl',
    emailOficinaPartes: 'op.metropolitana@sag.gob.cl',
    telefono: '+56 2 23451100',
    direccion: 'Bulnes 140, Santiago'
  },
  "O'Higgins": {
    region: "O'Higgins",
    emailContacto: 'contacto.ohiggins@sag.gob.cl',
    emailOficinaPartes: 'op.ohiggins@sag.gob.cl',
    telefono: '+56 9 79490421',
    direccion: "Independencia 315, Rancagua"
  },
  'Maule': {
    region: 'Maule',
    emailContacto: 'contacto.maule@sag.gob.cl',
    emailOficinaPartes: 'op.maule@sag.gob.cl',
    telefono: '+56 71 2226053',
    direccion: '1 Norte 850, Talca'
  },
  'Ñuble': {
    region: 'Ñuble',
    emailContacto: 'contacto.nuble@sag.gob.cl',
    emailOficinaPartes: 'op.nuble@sag.gob.cl',
    telefono: '+56 42 2226053',
    direccion: "5 Oriente 999, Chillán"
  },
  'Biobío': {
    region: 'Biobío',
    emailContacto: 'contacto.biobio@sag.gob.cl',
    emailOficinaPartes: 'op.biobio@sag.gob.cl',
    telefono: '+56 41 2226053',
    direccion: 'Aníbal Pinto 255, Concepción'
  },
  'La Araucanía': {
    region: 'La Araucanía',
    emailContacto: 'contacto.araucania@sag.gob.cl',
    emailOficinaPartes: 'op.araucania@sag.gob.cl',
    telefono: '+56 45 2210383',
    direccion: 'Francisco Bilbao 931, Temuco'
  },
  'Los Ríos': {
    region: 'Los Ríos',
    emailContacto: 'contacto.losrios@sag.gob.cl',
    emailOficinaPartes: 'op.losrios@sag.gob.cl',
    telefono: '+56 63 2226053',
    direccion: 'Yungay 330, Valdivia'
  },
  'Los Lagos': {
    region: 'Los Lagos',
    emailContacto: 'contacto.loslagos@sag.gob.cl',
    emailOficinaPartes: 'op.loslagos@sag.gob.cl',
    telefono: '+56 65 2226053',
    direccion: 'España 450, Puerto Montt'
  },
  'Aysén': {
    region: 'Aysén',
    emailContacto: 'contacto.aysen@sag.gob.cl',
    emailOficinaPartes: 'op.aysen@sag.gob.cl',
    telefono: '+56 67 2325360',
    direccion: 'Av. Ogana 1060, Coyhaique'
  },
  'Magallanes': {
    region: 'Magallanes',
    emailContacto: 'contacto.magallanes@sag.gob.cl',
    emailOficinaPartes: 'op.magallanes@sag.gob.cl',
    telefono: '+56 61 2226053',
    direccion: 'Avenida Colón 690, Punta Arenas'
  }
};

// Función para obtener el contacto SAG de una región
export function getContactoSAG(region: string): ContactoSAG | null {
  return contactosSAG[region] || null;
}

// Función para obtener todos los correos CC para una región
export function getCorreosCC(region: string): string[] {
  const contacto = getContactoSAG(region);
  if (!contacto) return [];
  
  return [
    contacto.emailContacto,
    contacto.emailOficinaPartes
  ];
}

// Función para obtener información de contacto formateada
export function getInfoContactoSAG(region: string): string {
  const contacto = getContactoSAG(region);
  if (!contacto) return '';
  
  return `
SAG - ${contacto.region}
Email: ${contacto.emailContacto}
Teléfono: ${contacto.telefono}
Dirección: ${contacto.direccion}
  `.trim();
}
