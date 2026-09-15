export interface CampoUsuario {
  id: string;
  usuarioId: string;
  nombre: string;
  latitud: number;
  longitud: number;
  region: string;
  comuna: string;
  hectareas: number;
  cultivo: string;
  fechaRegistro: string;
}

export interface ApicultorSIPEC {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  region: string;
  comuna: string;
  apiarios: ApiarioSIPEC[];
  totalColmenas: number;
  sipecRegistrado: boolean;
}

export interface ApiarioSIPEC {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
  comuna: string;
  region: string;
  cantidadColmenas: number;
}
