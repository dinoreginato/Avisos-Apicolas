import { useState, useMemo, useRef, useEffect } from 'react';
import MapView from './components/MapView';
import AuthScreen from './components/AuthScreen';
import UserProfile from './components/UserProfile';
import AvisoEnvio from './components/AvisoEnvio';
import { productosSAGCompletos, normalizarToxicidad, requiereAvisaje, ProductoSAG } from './data/sagProducts';
import { productosSAGComplemento } from './data/sagProductsExtra';
import { productosSAGMas } from './data/sagProductsMas';
import { clasificacionesToxicidad } from './data/products';
import {
  camposEjemplo,
  apiariosEjemplo,
  Campo,
  Apiario,
  getApiariosEnZona,
  calcularDistanciaKm,
  ZONA_AVISAJE_KM,
  AvisoAplicacion
} from './data/fields';
import { User } from './types/user';
import { getCurrentUser, logoutUser, getAvisosByUser } from './services/userService';

// Combinar todos los productos del SAG
const todosLosProductosSAG: ProductoSAG[] = [...productosSAGCompletos, ...productosSAGComplemento, ...productosSAGMas];

type Tab = 'productos' | 'campos' | 'avisaje' | 'info' | 'actualizar' | 'perfil';

interface ProductoNormalizado extends ProductoSAG {
  requiereAviso: boolean;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterToxicidad, setFilterToxicidad] = useState<string>('');
  const [filterAvisaje, setFilterAvisaje] = useState<string>('');
  const [campoSeleccionado, setCampoSeleccionado] = useState<Campo | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoNormalizado | null>(null);
  const [avisoEnviado, setAvisoEnviado] = useState(false);
  const [avisos, setAvisos] = useState<AvisoAplicacion[]>([]);
  const [fechaAplicacion, setFechaAplicacion] = useState('');
  const [horaAplicacion, setHoraAplicacion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Combinar y normalizar productos
  const productosNormalizados: ProductoNormalizado[] = useMemo(() => {
    return todosLosProductosSAG.map(p => ({
      ...p,
      toxicidadAbejas: normalizarToxicidad(p.toxicidadAbejas),
      requiereAviso: requiereAvisaje(p.avisaje)
    }));
  }, []);

  // Estadísticas
  const stats = useMemo(() => {
    const porToxicidad: Record<string, number> = {};
    let requierenAviso = 0;
    let noRequierenAviso = 0;

    productosNormalizados.forEach(p => {
      porToxicidad[p.toxicidadAbejas] = (porToxicidad[p.toxicidadAbejas] || 0) + 1;
      if (p.requiereAviso) requierenAviso++;
      else noRequierenAviso++;
    });

    return {
      total: productosNormalizados.length,
      porToxicidad,
      requierenAviso,
      noRequierenAviso
    };
  }, [productosNormalizados]);

  // Filtrar productos
  const productosFiltrados: ProductoNormalizado[] = useMemo(() => {
    return productosNormalizados.filter(p => {
      const matchSearch = p.nombreComercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.numeroSAG.includes(searchTerm);
      const matchToxicidad = !filterToxicidad || p.toxicidadAbejas === filterToxicidad;
      const matchAvisaje = !filterAvisaje || 
        (filterAvisaje === 'si' && p.requiereAviso) ||
        (filterAvisaje === 'no' && !p.requiereAviso);
      return matchSearch && matchToxicidad && matchAvisaje;
    });
  }, [productosNormalizados, searchTerm, filterToxicidad, filterAvisaje]);

  // Paginación
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
  const productosPaginados: ProductoNormalizado[] = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return productosFiltrados.slice(start, start + itemsPerPage);
  }, [productosFiltrados, currentPage]);

  // Apiarios en zona
  const apiariosEnZona = useMemo(() => {
    if (!campoSeleccionado) return [];
    return getApiariosEnZona(campoSeleccionado, apiariosEjemplo);
  }, [campoSeleccionado]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Si no hay usuario, mostrar pantalla de autenticación
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  const getToxicidadColor = (nivel: string) => {
    if (nivel.includes('Muy tóxico')) return '#dc2626';
    if (nivel.includes('Moderadamente')) return '#d97706';
    if (nivel.includes('Ligeramente')) return '#ca8a04';
    if (nivel.includes('Virtualmente')) return '#16a34a';
    if (nivel.includes('proceso')) return '#6b7280';
    return '#9ca3af';
  };

  const getToxicidadBadge = (nivel: string) => {
    if (nivel.includes('Muy tóxico')) return { bg: 'bg-red-100', text: 'text-red-700', label: 'Muy Tóxico' };
    if (nivel.includes('Moderadamente')) return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Moderadamente Tóxico' };
    if (nivel.includes('Ligeramente')) return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Ligeramente Tóxico' };
    if (nivel.includes('Virtualmente')) return { bg: 'bg-green-100', text: 'text-green-700', label: 'Virtualmente No Tóxico' };
    if (nivel.includes('proceso')) return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'En Actualización' };
    return { bg: 'bg-gray-100', text: 'text-gray-600', label: nivel };
  };

  const handleEnviarAviso = () => {
    if (!campoSeleccionado || !productoSeleccionado || !fechaAplicacion || !horaAplicacion) return;

    const nuevoAviso: AvisoAplicacion = {
      id: `aviso-${Date.now()}`,
      campoId: campoSeleccionado.id,
      productoId: productoSeleccionado.numeroSAG || '',
      fechaAplicacion,
      fechaAviso: new Date().toISOString().split('T')[0],
      coordenadas: { lat: campoSeleccionado.latitud, lng: campoSeleccionado.longitud },
      estado: 'enviado',
      apicultoresNotificados: apiariosEnZona.map(a => a.id),
      horaAplicacion,
      superficieTratada: campoSeleccionado.hectareas
    };

    setAvisos([...avisos, nuevoAviso]);
    setAvisoEnviado(true);
    setTimeout(() => setAvisoEnviado(false), 5000);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    alert(`Archivo "${file.name}" cargado. En producción, los datos se integrarían con la base de datos del SAG.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                🐝
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Sistema de Avisaje Apícola</h1>
                <p className="text-xs text-gray-500">Base de datos SAG - Res. 7068/2024 | Ley Apícola N°21.489</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                <span className="text-xs text-green-700 font-bold">
                  📊 {stats.total} productos | ⚠️ {stats.requierenAviso} requieren avisaje
                </span>
              </div>
              <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
                <span className="text-xs text-blue-700 font-medium">
                  🔄 Fuente: Power BI SAG (30/04/2026)
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'productos' as Tab, label: 'Productos SAG', icon: '🧪', count: stats.total },
              { id: 'campos' as Tab, label: 'Campos y Mapa', icon: '🗺️' },
              { id: 'avisaje' as Tab, label: 'Avisaje Apícola', icon: '📨' },
              { id: 'info' as Tab, label: 'Info Toxicidad', icon: 'ℹ️' },
              { id: 'actualizar' as Tab, label: 'Actualizar Datos', icon: '🔄' },
              { id: 'perfil' as Tab, label: 'Mi Perfil', icon: '👤' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-700 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
                {tab.count && <span className="ml-1.5 text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded-full">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        {/* Tab: Productos SAG */}
        {activeTab === 'productos' && (
          <div className="space-y-3">
            {/* Filtros */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">🧪 Clasificación Ecotoxicológica Abejas - SAG</h2>
                <span className="text-xs text-gray-500">Res. 7068/2024</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Buscar por N° SAG o nombre comercial..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={filterToxicidad}
                  onChange={(e) => { setFilterToxicidad(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Todas las toxicidades</option>
                  <option value="Muy tóxico">Muy Tóxico</option>
                  <option value="Moderadamente tóxico">Moderadamente Tóxico</option>
                  <option value="Ligeramente tóxico">Ligeramente Tóxico</option>
                  <option value="Virtualmente no tóxico">Virtualmente No Tóxico</option>
                  <option value="En proceso de actualización etiqueta">En Actualización</option>
                </select>
                <select
                  value={filterAvisaje}
                  onChange={(e) => { setFilterAvisaje(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Todos</option>
                  <option value="si">⚠️ Sí requiere avisaje</option>
                  <option value="no">✓ No requiere avisaje</option>
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{productosFiltrados.length} resultados</span>
                  {searchTerm && (
                    <button onClick={() => { setSearchTerm(''); setFilterToxicidad(''); setFilterAvisaje(''); setCurrentPage(1); }}
                      className="text-xs text-red-500 hover:text-red-700">Limpiar</button>
                  )}
                </div>
              </div>
            </div>

            {/* Tabla de productos */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700 text-xs">N° SAG</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700 text-xs">Nombre Comercial</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700 text-xs">Toxicidad Abejas</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700 text-xs">Avisaje</th>
                      <th className="text-left px-3 py-2.5 font-semibold text-gray-700 text-xs">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {productosPaginados.map(producto => {
                      const badge = getToxicidadBadge(producto.toxicidadAbejas);
                      return (
                        <tr key={producto.numeroSAG} className={`hover:bg-gray-50 transition-colors ${productoSeleccionado?.numeroSAG === producto.numeroSAG ? 'bg-green-50' : ''}`}>
                          <td className="px-3 py-2">
                            <span className="font-mono text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">{producto.numeroSAG}</span>
                          </td>
                          <td className="px-3 py-2">
                            <span className="font-medium text-gray-800 text-xs">{producto.nombreComercial}</span>
                          </td>
                          <td className="px-3 py-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            {producto.requiereAviso ? (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                ⚠️ Sí
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                ✓ No
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <button
                              onClick={() => { setProductoSeleccionado(producto); setActiveTab('avisaje'); }}
                              className="px-2.5 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                            >
                              Usar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Página {currentPage} de {totalPages} ({productosFiltrados.length} productos)
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      ← Anterior
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      Siguiente →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Campos y Mapa */}
        {activeTab === 'campos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 h-[600px]">
              <MapView
                campos={camposEjemplo}
                apiarios={apiariosEjemplo}
                campoSeleccionado={campoSeleccionado}
                apiariosEnZona={apiariosEnZona}
                onCampoClick={(campo) => setCampoSeleccionado(campo)}
                center={[-34.5, -71.0]}
                zoom={6}
              />
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-800 mb-3">🌾 Campos Registrados</h3>
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {camposEjemplo.map(campo => (
                    <button
                      key={campo.id}
                      onClick={() => setCampoSeleccionado(campo)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        campoSeleccionado?.id === campo.id
                          ? 'border-green-500 bg-green-50 shadow-sm'
                          : 'border-gray-100 hover:border-green-200 hover:bg-green-50/50'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-800">{campo.nombre}</div>
                      <div className="text-xs text-gray-500">{campo.comuna} | {campo.hectareas} ha | {campo.cultivo}</div>
                      <div className="text-xs text-gray-400 mt-1">📍 {campo.latitud.toFixed(4)}, {campo.longitud.toFixed(4)}</div>
                    </button>
                  ))}
                </div>
              </div>

              {campoSeleccionado && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-bold text-gray-800 mb-2">📍 {campoSeleccionado.nombre}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Propietario:</strong> {campoSeleccionado.propietario}</p>
                    <p><strong>Ubicación:</strong> {campoSeleccionado.comuna}, {campoSeleccionado.region}</p>
                    <p><strong>Cultivo:</strong> {campoSeleccionado.cultivo} ({campoSeleccionado.hectareas} ha)</p>
                  </div>
                  <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100">
                    <p className="font-semibold text-red-700 text-sm">🐝 Apiarios en zona ({ZONA_AVISAJE_KM} km): <span className="text-lg">{apiariosEnZona.length}</span></p>
                    {apiariosEnZona.map(a => (
                      <div key={a.id} className="text-xs text-red-600 mt-1">
                        • {a.nombre} - {a.apicultor} ({a.cantidadColmenas} colm.)
                        <span className="text-gray-500 ml-1">
                          [{calcularDistanciaKm(campoSeleccionado.latitud, campoSeleccionado.longitud, a.latitud, a.longitud).toFixed(1)} km]
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Avisaje */}
        {activeTab === 'avisaje' && (
          <div className="space-y-4">
            {productoSeleccionado && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">🧪 Producto Seleccionado</h3>
                    <p className="text-gray-600">N° SAG: {productoSeleccionado.numeroSAG} - {productoSeleccionado.nombreComercial}</p>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
                    productoSeleccionado.toxicidadAbejas.includes('Muy') ? 'bg-red-100 text-red-700' :
                    productoSeleccionado.toxicidadAbejas.includes('Moderadamente') ? 'bg-amber-100 text-amber-700' :
                    productoSeleccionado.toxicidadAbejas.includes('Ligeramente') ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {productoSeleccionado.toxicidadAbejas}
                  </span>
                </div>

                {/* Determinación de aviso */}
                <div className={`mt-4 p-4 rounded-xl border-2 ${
                  productoSeleccionado.requiereAviso ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                }`}>
                  {productoSeleccionado.requiereAviso ? (
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">⚠️</span>
                      <div>
                        <p className="font-bold text-red-700 text-lg">SE REQUIERE AVISAJE OBLIGATORIO</p>
                        <p className="text-sm text-red-600 mt-1">
                          Este producto está clasificado como <strong>{productoSeleccionado.toxicidadAbejas}</strong> para abejas.
                          Debe avisar con al menos <strong>48 horas de anticipación</strong> a los apicultores registrados en SIPEC dentro de la zona de influencia.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">✅</span>
                      <div>
                        <p className="font-bold text-green-700 text-lg">NO SE REQUIERE AVISAJE</p>
                        <p className="text-sm text-green-600 mt-1">
                          {productoSeleccionado.avisaje}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!productoSeleccionado && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-4xl mb-3">🧪</p>
                <p className="text-gray-600 mb-4">Seleccione un producto desde la pestaña "Productos SAG"</p>
                <button onClick={() => setActiveTab('productos')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Ir a Productos SAG
                </button>
              </div>
            )}

            {/* Formulario de avisaje */}
            {productoSeleccionado && productoSeleccionado.requiereAviso && campoSeleccionado && fechaAplicacion && horaAplicacion && (
              <AvisoEnvio
                user={currentUser}
                producto={productoSeleccionado}
                campo={campoSeleccionado}
                apiariosEnZona={apiariosEnZona}
                fechaAplicacion={fechaAplicacion}
                horaAplicacion={horaAplicacion}
                onAvisoEnviado={() => {
                  setAvisoEnviado(true);
                  setTimeout(() => setAvisoEnviado(false), 5000);
                }}
              />
            )}

            {/* Formulario de selección de datos */}
            {productoSeleccionado && productoSeleccionado.requiereAviso && (!campoSeleccionado || !fechaAplicacion || !horaAplicacion) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-4">📝 Complete los datos para enviar aviso</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campo a tratar</label>
                    <select
                      value={campoSeleccionado?.id || ''}
                      onChange={(e) => setCampoSeleccionado(camposEjemplo.find(c => c.id === e.target.value) || null)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value="">Seleccione un campo...</option>
                      {camposEjemplo.map(c => <option key={c.id} value={c.id}>{c.nombre} - {c.comuna}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de aplicación (mín. 48h)</label>
                    <input type="date" value={fechaAplicacion} onChange={(e) => setFechaAplicacion(e.target.value)}
                      min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horario (baja actividad abejas)</label>
                    <select value={horaAplicacion} onChange={(e) => setHoraAplicacion(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
                      <option value="">Seleccione...</option>
                      <option value="05:00-07:00">🌅 Madrugada (05:00-07:00)</option>
                      <option value="19:00-21:00">🌇 Atardecer (19:00-21:00)</option>
                      <option value="21:00-05:00">🌙 Noche (21:00-05:00)</option>
                    </select>
                  </div>
                </div>

                {campoSeleccionado && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">🐝 Apicultores en zona ({apiariosEnZona.length} en zona {ZONA_AVISAJE_KM} km)</h4>
                    {apiariosEnZona.length > 0 ? (
                      <div className="space-y-2">
                        {apiariosEnZona.map(a => (
                          <div key={a.id} className="flex justify-between bg-white p-2.5 rounded-lg border border-amber-100 text-sm">
                            <div>
                              <p className="font-medium">{a.nombre}</p>
                              <p className="text-xs text-gray-500">{a.apicultor} | {a.cantidadColmenas} colmenas | {calcularDistanciaKm(campoSeleccionado.latitud, campoSeleccionado.longitud, a.latitud, a.longitud).toFixed(1)} km</p>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                              <p>📱 {a.contactoTelefono}</p>
                              <p>📧 {a.contactoEmail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-amber-600">No hay apiarios SIPEC en la zona de influencia.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Historial */}
            {avisos.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-3">📋 Historial ({avisos.length})</h3>
                {avisos.map(a => {
                  const prod = productosNormalizados.find(p => p.numeroSAG === a.productoId);
                  const campo = camposEjemplo.find(c => c.id === a.campoId);
                  return (
                    <div key={a.id} className="p-3 bg-gray-50 rounded-lg mb-2 text-sm">
                      <p className="font-medium">{prod?.nombreComercial} → {campo?.nombre}</p>
                      <p className="text-xs text-gray-500">{a.fechaAplicacion} | {a.apicultoresNotificados.length} notificados</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab: Info */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-4">ℹ️ Clasificación de Toxicidad para Abejas (Res. 7068/2024)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clasificacionesToxicidad.map(c => (
                  <div key={c.nivel} className="p-4 rounded-xl border-2" style={{ borderColor: c.color + '40', backgroundColor: c.color + '08' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }}></span>
                      <h3 className="font-bold">{c.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{c.rango}</p>
                    <p className="text-sm text-gray-600 mt-1">{c.descripcion}</p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      {c.requiereAviso ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">⚠️ Requiere aviso</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">✓ Sin aviso</span>
                      )}
                      {c.fechaAviso && <span className="text-xs text-gray-500">Desde: {c.fechaAviso}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">📊 Resumen de la Base de Datos</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total Productos</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600">{stats.requierenAviso}</p>
                  <p className="text-xs text-gray-500">Requieren Avisaje</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{stats.noRequierenAviso}</p>
                  <p className="text-xs text-gray-500">No Requieren</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-600">{Object.keys(stats.porToxicidad).length}</p>
                  <p className="text-xs text-gray-500">Categorías</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-sm mb-2">Distribución por toxicidad:</h4>
                {Object.entries(stats.porToxicidad).sort((a, b) => b[1] - a[1]).map(([tox, count]) => (
                  <div key={tox} className="flex items-center justify-between py-1 border-b border-gray-50">
                    <span className="text-sm text-gray-600">{tox}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${(count / stats.total) * 100}%`, backgroundColor: getToxicidadColor(tox) }}></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">🔗 Enlaces Oficiales</h3>
              <div className="space-y-2">
                <a href="https://cpa.sag.gob.cl" target="_blank" rel="noopener noreferrer" className="block p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors">
                  <p className="font-semibold text-green-800 text-sm">🔗 Sistema Consulta Para Avisaje (CPA)</p>
                  <p className="text-xs text-green-600">cpa.sag.gob.cl</p>
                </a>
                <a href="https://www.sag.gob.cl/content/reporte-de-plaguicidas-clasificados-segun-toxicidad-en-abejas" target="_blank" rel="noopener noreferrer" className="block p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors">
                  <p className="font-semibold text-blue-800 text-sm">🔗 Reporte Toxicidad Abejas (Power BI)</p>
                  <p className="text-xs text-blue-600">Base de datos oficial SAG actualizada</p>
                </a>
                <a href="http://www.sag.gob.cl/content/planilla-resumida-de-plaguicidas-autorizados" target="_blank" rel="noopener noreferrer" className="block p-3 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">
                  <p className="font-semibold text-purple-800 text-sm">🔗 Planilla Plaguicidas Autorizados (Excel)</p>
                  <p className="text-xs text-purple-600">Descarga directa XLSX</p>
                </a>
                <a href="https://sipecweb.sag.gob.cl" target="_blank" rel="noopener noreferrer" className="block p-3 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors">
                  <p className="font-semibold text-amber-800 text-sm">🔗 SIPEC Apícola</p>
                  <p className="text-xs text-amber-600">Registro de apiarios y colmenas</p>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Actualizar */}
        {activeTab === 'actualizar' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-3">🔄 Actualización de Base de Datos</h2>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                <p className="font-semibold text-blue-800">📊 Estado actual:</p>
                <p className="text-sm text-blue-700 mt-1">
                  Base de datos cargada: <strong>{stats.total} productos</strong> del Power BI SAG (actualizado al 30/04/2026).
                  De estos, <strong>{stats.requierenAviso} requieren avisaje</strong> obligatorio.
                </p>
              </div>

              <h3 className="font-bold text-gray-800 mb-3">📥 Importar nuevos datos</h3>
              <p className="text-sm text-gray-600 mb-3">
                Para mantener la base de datos actualizada, descargue la planilla oficial del SAG e impórtela aquí:
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="https://www.sag.gob.cl/sites/default/files/2026-04-30%20Lista%20plaguicidas%20seg%C3%BAn%20su%20clasificaci%C3%B3n%20ecotox.xlsx"
                  target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                  📥 Descargar desde SAG
                </a>
                <button onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  📂 Importar CSV actualizado
                </button>
                <input ref={fileInputRef} type="file" accept=".csv,.xlsx" onChange={handleImportCSV} className="hidden" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">📋 Instrucciones de actualización</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="font-semibold text-green-800 text-sm">1. Descargar datos oficiales</p>
                  <p className="text-xs text-green-700">Visite el Power BI del SAG o descargue la planilla Excel actualizada.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="font-semibold text-blue-800 text-sm">2. Convertir a CSV</p>
                  <p className="text-xs text-blue-700">Guarde como CSV con columnas: N° SAG, Nombre Comercial, Toxicidad Abejas, Avisaje</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="font-semibold text-purple-800 text-sm">3. Importar datos</p>
                  <p className="text-xs text-purple-700">Use el botón "Importar CSV" para actualizar la base de datos.</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="font-semibold text-amber-800 text-sm">4. Verificar y usar</p>
                  <p className="text-xs text-amber-700">Revise los productos actualizados y utilícelos para el avisaje.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">🔗 Fuentes de datos oficiales</h3>
              <div className="space-y-2">
                <a href="https://app.powerbi.com/view?r=eyJrIjoiMTA4ZDRjOWItODE3Yy00NjZlLTg3Y2ItZTgzY2QxY2M4YWQ1IiwidCI6Ijc3ZWNkYTc1LTU5NjQtNDIyYS1hNTM1LTZlYTY3MTU0MDI5YyIsImMiOjR9"
                  target="_blank" rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100">
                  <p className="font-medium text-sm">📊 Power BI - Clasificación Ecotoxicológica Abejas</p>
                  <p className="text-xs text-gray-500">app.powerbi.com - Datos en tiempo real del SAG</p>
                </a>
                <a href="https://app.powerbi.com/view?r=eyJrIjoiNzAxNTc2MjEtYmQ0ZS00YzZkLWJlMGYtNjZhZDE1YzhmYWViIiwidCI6Ijc3ZWNkYTc1LTU4NjQtNDIyYS1hNTM1LTZlYTY3MTU0MDI5YyIsImMiOjR9"
                  target="_blank" rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100">
                  <p className="font-medium text-sm">📊 Power BI - Reporte Plaguicidas Autorizados</p>
                  <p className="text-xs text-gray-500">app.powerbi.com - Todos los productos registrados</p>
                </a>
                <a href="http://www.sag.gob.cl/content/planilla-resumida-de-plaguicidas-autorizados"
                  target="_blank" rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100">
                  <p className="font-medium text-sm">📋 Planilla Resumida de Plaguicidas Autorizados</p>
                  <p className="text-xs text-gray-500">sag.gob.cl - Archivo Excel actualizado mensualmente</p>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Perfil */}
        {activeTab === 'perfil' && (
          <UserProfile user={currentUser} onUpdate={setCurrentUser} onLogout={handleLogout} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            Sistema de Avisaje Apícola | Ley Apícola N°21.489 | Res. SAG N°7068/2024
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Base de datos: {stats.total} productos | Fuente: Power BI SAG (30/04/2026)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
