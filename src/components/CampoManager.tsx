import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { CampoUsuario } from '../types/fields';
import { getCamposByUser, registerCampo, deleteCampo } from '../services/campoService';

interface CampoManagerProps {
  user: User;
  onCampoSelected?: (campo: CampoUsuario) => void;
}

export default function CampoManager({ user, onCampoSelected }: CampoManagerProps) {
  const [campos, setCampos] = useState<CampoUsuario[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    latitud: '',
    longitud: '',
    region: user.region || '',
    comuna: user.comuna || '',
    hectareas: '',
    cultivo: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadCampos();
  }, [user.id]);

  const loadCampos = () => {
    const userCampos = getCamposByUser(user.id);
    setCampos(userCampos);
  };

  const regionesChile = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
    'Valparaíso', 'Metropolitana', "O'Higgins", 'Maule', 'Ñuble',
    'Biobío', 'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
  ];

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('La geolocalización no está disponible en tu navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData({
          ...formData,
          latitud: position.coords.latitude.toFixed(6),
          longitud: position.coords.longitude.toFixed(6)
        });
        setError('');
      },
      (err) => {
        setError('No se pudo obtener tu ubicación. Ingresa las coordenadas manualmente.');
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre || !formData.latitud || !formData.longitud || !formData.region || !formData.comuna) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }

    const lat = parseFloat(formData.latitud);
    const lng = parseFloat(formData.longitud);

    if (isNaN(lat) || isNaN(lng)) {
      setError('Las coordenadas deben ser números válidos');
      return;
    }

    if (lat < -55 || lat > -17) {
      setError('La latitud debe estar en el rango de Chile (-55 a -17)');
      return;
    }

    if (lng < -76 || lng > -66) {
      setError('La longitud debe estar en el rango de Chile (-76 a -66)');
      return;
    }

    try {
      registerCampo({
        usuarioId: user.id,
        nombre: formData.nombre,
        latitud: lat,
        longitud: lng,
        region: formData.region,
        comuna: formData.comuna,
        hectareas: parseFloat(formData.hectareas) || 0,
        cultivo: formData.cultivo
      });

      loadCampos();
      setShowForm(false);
      setFormData({
        nombre: '',
        latitud: '',
        longitud: '',
        region: user.region || '',
        comuna: user.comuna || '',
        hectareas: '',
        cultivo: ''
      });
    } catch (err) {
      setError('Error al registrar el campo');
    }
  };

  const handleDelete = (campoId: string) => {
    if (confirm('¿Está seguro de eliminar este campo?')) {
      deleteCampo(campoId);
      loadCampos();
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">🌾 Mis Campos Registrados</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            {showForm ? '❌ Cancelar' : '➕ Registrar Nuevo Campo'}
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Registre sus campos con coordenadas geográficas para enviar avisos a los apicultores en la zona de influencia (3 km).
        </p>
      </div>

      {/* Formulario de registro */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">📝 Registrar Nuevo Campo</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Campo *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Fundo El Roble"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cultivo
                </label>
                <input
                  type="text"
                  value={formData.cultivo}
                  onChange={(e) => setFormData({ ...formData, cultivo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Manzano, Vid, Cerezo..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitud *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.latitud}
                    onChange={(e) => setFormData({ ...formData, latitud: e.target.value })}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="-34.153200"
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    title="Obtener ubicación actual"
                  >
                    📍
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitud *
                </label>
                <input
                  type="text"
                  value={formData.longitud}
                  onChange={(e) => setFormData({ ...formData, longitud: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="-70.764700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Región *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Seleccione...</option>
                  {regionesChile.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comuna *
                </label>
                <input
                  type="text"
                  value={formData.comuna}
                  onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Rancagua"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hectáreas
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.hectareas}
                  onChange={(e) => setFormData({ ...formData, hectareas: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="120"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              💾 Registrar Campo
            </button>
          </form>
        </div>
      )}

      {/* Lista de campos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">📋 Campos Registrados ({campos.length})</h3>
        
        {campos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-4xl mb-3">🌾</p>
            <p>No tiene campos registrados</p>
            <p className="text-sm mt-2">Registre sus campos para poder enviar avisos a apicultores</p>
          </div>
        ) : (
          <div className="space-y-3">
            {campos.map(campo => (
              <div key={campo.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{campo.nombre}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                      <div>
                        <p><strong>📍 Coordenadas:</strong> {campo.latitud.toFixed(6)}, {campo.longitud.toFixed(6)}</p>
                        <p><strong>🏘️ Ubicación:</strong> {campo.comuna}, {campo.region}</p>
                      </div>
                      <div>
                        {campo.cultivo && <p><strong>🌱 Cultivo:</strong> {campo.cultivo}</p>}
                        {campo.hectareas > 0 && <p><strong>📐 Superficie:</strong> {campo.hectareas} ha</p>}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Registrado: {new Date(campo.fechaRegistro).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {onCampoSelected && (
                      <button
                        onClick={() => onCampoSelected(campo)}
                        className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Usar
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(campo.id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
