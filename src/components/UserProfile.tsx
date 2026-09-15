import { useState } from 'react';
import { User } from '../types/user';
import { updateUser, getEstadisticasUsuario } from '../services/userService';

interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
  onLogout: () => void;
}

export default function UserProfile({ user, onUpdate, onLogout }: UserProfileProps) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const stats = getEstadisticasUsuario(user.id);

  const handleSave = () => {
    const updated = updateUser(user.id, formData);
    if (updated) {
      onUpdate(updated);
      setEditing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header con info del usuario */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
              {user.rol === 'aplicador' ? '🌾' : user.rol === 'apicultor' ? '🐝' : '📋'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user.nombre}</h2>
              <p className="text-sm text-gray-600">
                {user.rol === 'aplicador' ? 'Aplicador de Plaguicidas' : 
                 user.rol === 'apicultor' ? 'Apicultor' : 'Asesor Técnico'}
              </p>
              {user.empresa && (
                <p className="text-xs text-gray-500 mt-1">{user.empresa}</p>
              )}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.totalAvisos}</p>
          <p className="text-xs text-gray-500">Avisos Enviados</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.avisosEsteMes}</p>
          <p className="text-xs text-gray-500">Este Mes</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{stats.apicultoresNotificados}</p>
          <p className="text-xs text-gray-500">Apicultores Notificados</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {stats.ultimoAviso ? new Date(stats.ultimoAviso).toLocaleDateString('es-CL') : 'N/A'}
          </p>
          <p className="text-xs text-gray-500">Último Aviso</p>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">📞 Información de Contacto</h3>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
            >
              ✏️ Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                💾 Guardar
              </button>
              <button
                onClick={() => { setEditing(false); setFormData(user); }}
                className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                ❌ Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Email</label>
            {editing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            ) : (
              <p className="text-sm font-medium text-gray-800">{user.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Teléfono (WhatsApp)</label>
            {editing ? (
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            ) : (
              <p className="text-sm font-medium text-gray-800">{user.telefono}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Región</label>
            {editing ? (
              <input
                type="text"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            ) : (
              <p className="text-sm font-medium text-gray-800">{user.region}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Comuna</label>
            {editing ? (
              <input
                type="text"
                value={formData.comuna}
                onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            ) : (
              <p className="text-sm font-medium text-gray-800">{user.comuna}</p>
            )}
          </div>

          {user.empresa && (
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Empresa</label>
              {editing ? (
                <input
                  type="text"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              ) : (
                <p className="text-sm font-medium text-gray-800">{user.empresa}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Información de la cuenta */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-3">📋 Información de la Cuenta</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">ID de Usuario:</span>
            <span className="font-mono text-xs text-gray-800">{user.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fecha de Registro:</span>
            <span className="text-gray-800">{new Date(user.fechaRegistro).toLocaleDateString('es-CL')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estado:</span>
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              ✓ Activo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
