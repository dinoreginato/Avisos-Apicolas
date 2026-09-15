export interface User {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa?: string;
  rol: 'aplicador' | 'apicultor' | 'asesor';
  region: string;
  comuna: string;
  fechaRegistro: string;
  activo: boolean;
}

export interface AvisoEnviado {
  id: string;
  usuarioId: string;
  campoId: string;
  productoId: string;
  fechaAplicacion: string;
  horaAplicacion: string;
  apicultoresNotificados: string[];
  estado: 'enviado' | 'pendiente' | 'confirmado';
  fechaEnvio: string;
  medioEnvio: ('whatsapp' | 'email')[];
  mensajeWhatsapp?: string;
  mensajeEmail?: string;
}

export interface PlantillaMensaje {
  id: string;
  nombre: string;
  tipo: 'whatsapp' | 'email';
  asunto?: string; // Solo para email
  contenido: string;
  variables: string[];
}
