import { User, AvisoEnviado, PlantillaMensaje } from '../types/user';
import { getCorreosCC } from '../data/contactosSAG';

const USERS_KEY = 'sag_users';
const CURRENT_USER_KEY = 'sag_current_user';
const AVISOS_KEY = 'sag_avisos_enviados';
const PLANTILLAS_KEY = 'sag_plantillas';

// ========== GESTIÓN DE USUARIOS ==========

export function getUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function registerUser(userData: Omit<User, 'id' | 'fechaRegistro' | 'activo'>): User {
  const users = getUsers();
  
  // Verificar si el email ya existe
  if (users.find(u => u.email === userData.email)) {
    throw new Error('El email ya está registrado');
  }

  const newUser: User = {
    ...userData,
    id: `user_${Date.now()}`,
    fechaRegistro: new Date().toISOString(),
    activo: true
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);
  
  return newUser;
}

export function loginUser(email: string): User | null {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.activo);
  
  if (user) {
    setCurrentUser(user);
    return user;
  }
  
  return null;
}

export function logoutUser(): void {
  setCurrentUser(null);
}

export function updateUser(userId: string, updates: Partial<User>): User | null {
  const users = getUsers();
  const index = users.findIndex(u => u.id === userId);
  
  if (index === -1) return null;
  
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  
  // Si es el usuario actual, actualizarlo también
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[index]);
  }
  
  return users[index];
}

// ========== GESTIÓN DE AVISOS ==========

export function getAvisos(): AvisoEnviado[] {
  const avisos = localStorage.getItem(AVISOS_KEY);
  return avisos ? JSON.parse(avisos) : [];
}

export function saveAviso(aviso: AvisoEnviado): void {
  const avisos = getAvisos();
  avisos.push(aviso);
  localStorage.setItem(AVISOS_KEY, JSON.stringify(avisos));
}

export function getAvisosByUser(userId: string): AvisoEnviado[] {
  return getAvisos().filter(a => a.usuarioId === userId);
}

export function updateAviso(avisoId: string, updates: Partial<AvisoEnviado>): void {
  const avisos = getAvisos();
  const index = avisos.findIndex(a => a.id === avisoId);
  
  if (index !== -1) {
    avisos[index] = { ...avisos[index], ...updates };
    localStorage.setItem(AVISOS_KEY, JSON.stringify(avisos));
  }
}

// ========== GESTIÓN DE PLANTILLAS ==========

const PLANTILLAS_DEFAULT: PlantillaMensaje[] = [
  {
    id: 'whatsapp_default',
    nombre: 'Aviso de Aplicación (WhatsApp)',
    tipo: 'whatsapp',
    contenido: `🐝 *AVISO DE APLICACIÓN DE PLAGUICIDA*

Estimado/a apicultor/a {apicultor_nombre},

Le informo que se realizará una aplicación de plaguicida en las siguientes coordenadas:

📍 *Campo:* {campo_nombre}
📍 *Ubicación:* {campo_comuna}, {campo_region}
📍 *Coordenadas:* {campo_lat}, {campo_lng}
📍 *Superficie:* {campo_hectareas} ha

🧪 *Producto:* {producto_nombre}
⚠️ *Toxicidad:* {producto_toxicidad}
📅 *Fecha de aplicación:* {fecha_aplicacion}
⏰ *Hora:* {hora_aplicacion}

Por favor, tome las precauciones necesarias para proteger sus colmenas.

Saludos cordiales,
{usuario_nombre}
{usuario_empresa}
📞 {usuario_telefono}
📧 {usuario_email}`,
    variables: ['apicultor_nombre', 'campo_nombre', 'campo_comuna', 'campo_region', 'campo_lat', 'campo_lng', 'campo_hectareas', 'producto_nombre', 'producto_toxicidad', 'fecha_aplicacion', 'hora_aplicacion', 'usuario_nombre', 'usuario_empresa', 'usuario_telefono', 'usuario_email']
  },
  {
    id: 'email_default',
    nombre: 'Aviso de Aplicación (Email)',
    tipo: 'email',
    asunto: 'AVISO DE APLICACIÓN DE PLAGUICIDA - {campo_nombre} - {fecha_aplicacion}',
    contenido: `<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #16a34a 0%, #059669 100%); padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center;">
    <h1 style="margin: 0; font-size: 24px;">🐝 AVISO DE APLICACIÓN</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">Sistema de Avisaje Apícola - SAG</p>
  </div>
  
  <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
    <p>Estimado/a <strong>{apicultor_nombre}</strong>,</p>
    
    <p>Por medio del presente, le informo que se realizará una aplicación de plaguicida tóxico para abejas en las siguientes coordenadas:</p>
    
    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #16a34a;">
      <h3 style="margin: 0 0 10px 0; color: #16a34a;">📍 DATOS DEL CAMPO</h3>
      <p style="margin: 5px 0;"><strong>Campo:</strong> {campo_nombre}</p>
      <p style="margin: 5px 0;"><strong>Ubicación:</strong> {campo_comuna}, {campo_region}</p>
      <p style="margin: 5px 0;"><strong>Coordenadas:</strong> {campo_lat}, {campo_lng}</p>
      <p style="margin: 5px 0;"><strong>Superficie:</strong> {campo_hectareas} hectáreas</p>
    </div>
    
    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #dc2626;">
      <h3 style="margin: 0 0 10px 0; color: #dc2626;">🧪 DATOS DEL PRODUCTO</h3>
      <p style="margin: 5px 0;"><strong>Producto:</strong> {producto_nombre}</p>
      <p style="margin: 5px 0;"><strong>Toxicidad para abejas:</strong> <span style="color: #dc2626; font-weight: bold;">{producto_toxicidad}</span></p>
    </div>
    
    <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #2563eb;">
      <h3 style="margin: 0 0 10px 0; color: #2563eb;">📅 DATOS DE LA APLICACIÓN</h3>
      <p style="margin: 5px 0;"><strong>Fecha:</strong> {fecha_aplicacion}</p>
      <p style="margin: 5px 0;"><strong>Hora:</strong> {hora_aplicacion}</p>
    </div>
    
    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b;">
      <p style="margin: 0;"><strong>⚠️ IMPORTANTE:</strong> Por favor, tome las precauciones necesarias para proteger sus colmenas según lo establecido en la Ley Apícola N°21.489 y Resolución SAG N°7068/2024.</p>
    </div>
    
    <p>Saludos cordiales,</p>
    <p style="margin-top: 20px;">
      <strong>{usuario_nombre}</strong><br>
      {usuario_empresa}<br>
      📞 {usuario_telefono}<br>
      📧 {usuario_email}
    </p>
  </div>
  
  <div style="background: #f3f4f6; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #6b7280;">
    <p style="margin: 0;">Este aviso fue generado automáticamente por el Sistema de Avisaje Apícola</p>
    <p style="margin: 5px 0 0 0;">Ley Apícola N°21.489 | Resolución SAG N°7068/2024</p>
  </div>
</div>
</body>
</html>`,
    variables: ['apicultor_nombre', 'campo_nombre', 'campo_comuna', 'campo_region', 'campo_lat', 'campo_lng', 'campo_hectareas', 'producto_nombre', 'producto_toxicidad', 'fecha_aplicacion', 'hora_aplicacion', 'usuario_nombre', 'usuario_empresa', 'usuario_telefono', 'usuario_email']
  }
];

export function getPlantillas(): PlantillaMensaje[] {
  const plantillas = localStorage.getItem(PLANTILLAS_KEY);
  if (!plantillas) {
    // Si no hay plantillas, crear las default
    localStorage.setItem(PLANTILLAS_KEY, JSON.stringify(PLANTILLAS_DEFAULT));
    return PLANTILLAS_DEFAULT;
  }
  return JSON.parse(plantillas);
}

export function savePlantilla(plantilla: PlantillaMensaje): void {
  const plantillas = getPlantillas();
  const index = plantillas.findIndex(p => p.id === plantilla.id);
  
  if (index !== -1) {
    plantillas[index] = plantilla;
  } else {
    plantillas.push(plantilla);
  }
  
  localStorage.setItem(PLANTILLAS_KEY, JSON.stringify(plantillas));
}

export function getPlantillaByTipo(tipo: 'whatsapp' | 'email'): PlantillaMensaje {
  const plantillas = getPlantillas();
  return plantillas.find(p => p.tipo === tipo) || PLANTILLAS_DEFAULT.find(p => p.tipo === tipo)!;
}

// ========== GENERACIÓN DE MENSAJES ==========

export function generarMensaje(
  plantilla: string,
  variables: Record<string, string>
): string {
  let mensaje = plantilla;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    mensaje = mensaje.replace(regex, value || 'N/A');
  });
  
  return mensaje;
}

export function generarAsuntoEmail(
  asunto: string,
  variables: Record<string, string>
): string {
  let resultado = asunto;
  
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    resultado = resultado.replace(regex, value || 'N/A');
  });
  
  return resultado;
}

// ========== ENLACES DE ENVÍO ==========

export function generarLinkWhatsApp(telefono: string, mensaje: string): string {
  // Limpiar el número de teléfono (quitar espacios, guiones, etc.)
  const telefonoLimpio = telefono.replace(/[\s\-\(\)]/g, '');
  
  // Codificar el mensaje para URL
  const mensajeCodificado = encodeURIComponent(mensaje);
  
  return `https://wa.me/${telefonoLimpio}?text=${mensajeCodificado}`;
}

export function generarLinkEmail(email: string, asunto: string, mensaje: string): string {
  const asuntoCodificado = encodeURIComponent(asunto);
  const mensajeCodificado = encodeURIComponent(mensaje);
  
  return `mailto:${email}?subject=${asuntoCodificado}&body=${mensajeCodificado}&content-type=text/html`;
}

// Generar enlace de email con CC a contactos del SAG
export function generarLinkEmailConCC(
  email: string, 
  asunto: string, 
  mensaje: string,
  region: string
): string {
  const asuntoCodificado = encodeURIComponent(asunto);
  const mensajeCodificado = encodeURIComponent(mensaje);
  
  // Obtener correos CC del SAG para la región
  const correosCC = getCorreosCC(region);
  const ccString = correosCC.map(email => encodeURIComponent(email)).join(',');
  
  return `mailto:${email}?subject=${asuntoCodificado}&body=${mensajeCodificado}&cc=${ccString}&content-type=text/html`;
}

// Generar enlace de email solo para SAG (sin destinatario principal)
export function generarLinkEmailSAG(asunto: string, mensaje: string, region: string): string {
  const asuntoCodificado = encodeURIComponent(asunto);
  const mensajeCodificado = encodeURIComponent(mensaje);
  
  // Obtener correos del SAG para la región
  const correosCC = getCorreosCC(region);
  const destinatarios = correosCC.map(email => encodeURIComponent(email)).join(',');
  
  return `mailto:${destinatarios}?subject=${asuntoCodificado}&body=${mensajeCodificado}&content-type=text/html`;
}

// ========== ESTADÍSTICAS ==========

export function getEstadisticasUsuario(userId: string) {
  const avisos = getAvisosByUser(userId);
  
  return {
    totalAvisos: avisos.length,
    avisosEsteMes: avisos.filter(a => {
      const fecha = new Date(a.fechaEnvio);
      const ahora = new Date();
      return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
    }).length,
    apicultoresNotificados: new Set(avisos.flatMap(a => a.apicultoresNotificados)).size,
    ultimoAviso: avisos.length > 0 ? avisos[avisos.length - 1].fechaEnvio : null
  };
}
