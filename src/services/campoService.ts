import { CampoUsuario } from '../types/fields';

const CAMPOS_KEY = 'sag_campos_usuario';

// Obtener todos los campos de todos los usuarios
export function getAllCampos(): CampoUsuario[] {
  const campos = localStorage.getItem(CAMPOS_KEY);
  return campos ? JSON.parse(campos) : [];
}

// Guardar todos los campos
export function saveAllCampos(campos: CampoUsuario[]): void {
  localStorage.setItem(CAMPOS_KEY, JSON.stringify(campos));
}

// Obtener campos de un usuario específico
export function getCamposByUser(userId: string): CampoUsuario[] {
  return getAllCampos().filter(c => c.usuarioId === userId);
}

// Registrar un nuevo campo
export function registerCampo(campoData: Omit<CampoUsuario, 'id' | 'fechaRegistro'>): CampoUsuario {
  const campos = getAllCampos();
  
  const nuevoCampo: CampoUsuario = {
    ...campoData,
    id: `campo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fechaRegistro: new Date().toISOString()
  };
  
  campos.push(nuevoCampo);
  saveAllCampos(campos);
  
  return nuevoCampo;
}

// Actualizar un campo existente
export function updateCampo(campoId: string, updates: Partial<CampoUsuario>): CampoUsuario | null {
  const campos = getAllCampos();
  const index = campos.findIndex(c => c.id === campoId);
  
  if (index === -1) return null;
  
  campos[index] = { ...campos[index], ...updates };
  saveAllCampos(campos);
  
  return campos[index];
}

// Eliminar un campo
export function deleteCampo(campoId: string): boolean {
  const campos = getAllCampos();
  const filtered = campos.filter(c => c.id !== campoId);
  
  if (filtered.length === campos.length) {
    return false; // No se encontró el campo
  }
  
  saveAllCampos(filtered);
  return true;
}

// Obtener campos por región
export function getCamposByRegion(region: string): CampoUsuario[] {
  return getAllCampos().filter(c => c.region === region);
}
