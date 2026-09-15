import { useState, useMemo } from 'react';
import MapView from './components/MapView';
import {
  productosQuimicos,
  clasificacionesToxicidad,
  ProductoQuimico,
  ToxicidadAbejas,
  CategoriaProducto
} from './data/products';
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

type Tab = 'productos' | 'campos' | 'avisaje' | 'info';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState<CategoriaProducto | ''>('');
  const [filterToxicidad, setFilterToxicidad] = useState<ToxicidadAbejas | ''>('');
  const [campoSeleccionado, setCampoSeleccionado] = useState<Campo | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoQuimico | null>(null);
  const [avisoEnviado, setAvisoEnviado] = useState(false);
  const [avisos, setAvisos] = useState<AvisoAplicacion[]>([]);
  const [fechaAplicacion, setFechaAplicacion] = useState('');
  const [horaAplicacion, setHoraAplicacion] = useState('');

  // Filtrar productos
  const productosFiltrados = useMemo(() => {
    return productosQuimicos.filter(p => {
      const matchSearch = p.nombreComercial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.ingredienteActivo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.empresa.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategoria = !filterCategoria || p.categoria === filterCategoria;
      const matchToxicidad = !filterToxicidad || p.toxicidadAbejas === filterToxicidad;
      return matchSearch && matchCategoria && matchToxicidad;
    });
  }, [searchTerm, filterCategoria, filterToxicidad]);

  // Apiarios en zona del campo seleccionado
  const apiariosEnZona = useMemo(() => {
    if (!campoSeleccionado) return [];
    return getApiariosEnZona(campoSeleccionado, apiariosEjemplo);
  }, [campoSeleccionado]);

  // Verificar si se requiere aviso
  const requiereAviso = useMemo(() => {
    if (!productoSeleccionado) return false;
    return productoSeleccionado.requiereAviso;
  }, [productoSeleccionado]);

  const getToxicidadColor = (nivel: ToxicidadAbejas) => {
    return clasificacionesToxicidad.find(c => c.nivel === nivel)?.color || '#666';
  };

  const getToxicidadLabel = (nivel: ToxicidadAbejas) => {
    return clasificacionesToxicidad.find(c => c.nivel === nivel)?.label || nivel;
  };

  const handleEnviarAviso = () => {
    if (!campoSeleccionado || !productoSeleccionado || !fechaAplicacion || !horaAplicacion) return;
    if (!requiereAviso) return;

    const nuevoAviso: AvisoAplicacion = {
      id: `aviso-${Date.now()}`,
      campoId: campoSeleccionado.id,
      productoId: productoSeleccionado.id,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                🐝
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Sistema de Avisaje Apícola</h1>
                <p className="text-xs text-gray-500">Conectado con base de datos SAG - Ley Apícola N°21.489</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
              <span className="text-amber-600">⚠️</span>
              <span className="text-xs text-amber-700 font-medium">
                Aviso obligatorio: Tóxicos desde 26/01/2026 | Moderados desde 26/04/2026
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'productos' as Tab, label: 'Productos SAG', icon: '🧪' },
              { id: 'campos' as Tab, label: 'Campos y Mapa', icon: '🗺️' },
              { id: 'avisaje' as Tab, label: 'Avisaje Apícola', icon: '📨' },
              { id: 'info' as Tab, label: 'Info Toxicidad', icon: 'ℹ️' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-700 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab: Productos SAG */}
        {activeTab === 'productos' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                🧪 Base de Datos de Productos Fitosanitarios - SAG
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Consulta los productos químicos registrados, sus ingredientes activos y clasificación de toxicidad para abejas según la Resolución 7068/2024.
              </p>

              {/* Filtros */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Buscar por nombre, ingrediente o empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <select
                  value={filterCategoria}
                  onChange={(e) => setFilterCategoria(e.target.value as CategoriaProducto | '')}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Todas las categorías</option>
                  <option value="Insecticida">Insecticida</option>
                  <option value="Fungicida">Fungicida</option>
                  <option value="Herbicida">Herbicida</option>
                  <option value="Acaricida">Acaricida</option>
                  <option value="Nematicida">Nematicida</option>
                </select>
                <select
                  value={filterToxicidad}
                  onChange={(e) => setFilterToxicidad(e.target.value as ToxicidadAbejas | '')}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Todas las toxicidades</option>
                  <option value="muy_tóxico">Muy Tóxico</option>
                  <option value="tóxico">Tóxico</option>
                  <option value="moderadamente_tóxico">Moderadamente Tóxico</option>
                  <option value="prácticamente_no_tóxico">Prácticamente No Tóxico</option>
                </select>
              </div>
            </div>

            {/* Resultados */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Producto</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Ingrediente Activo</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Categoría</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Toxicidad Abejas</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">DL50</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Aviso</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {productosFiltrados.map(producto => (
                      <tr key={producto.id} className={`hover:bg-gray-50 transition-colors ${productoSeleccionado?.id === producto.id ? 'bg-green-50' : ''}`}>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-800">{producto.nombreComercial}</div>
                          <div className="text-xs text-gray-500">{producto.empresa} | {producto.registroSAG}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">{producto.ingredienteActivo}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            {producto.categoria}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: getToxicidadColor(producto.toxicidadAbejas) }}
                          >
                            {getToxicidadLabel(producto.toxicidadAbejas)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{producto.dl50Oral}</td>
                        <td className="px-4 py-3">
                          {producto.requiereAviso ? (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                              ⚠️ Sí requiere
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                              ✓ No requiere
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => {
                              setProductoSeleccionado(producto);
                              setActiveTab('avisaje');
                            }}
                            className="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Seleccionar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                Mostrando {productosFiltrados.length} de {productosQuimicos.length} productos
              </div>
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
              {/* Lista de campos */}
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
                      <div className="text-xs text-gray-400 mt-1">
                        📍 {campo.latitud.toFixed(4)}, {campo.longitud.toFixed(4)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info del campo seleccionado */}
              {campoSeleccionado && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <h3 className="font-bold text-gray-800 mb-2">📍 Campo Seleccionado</h3>
                  <div className="space-y-1.5 text-sm">
                    <p><strong>Nombre:</strong> {campoSeleccionado.nombre}</p>
                    <p><strong>Propietario:</strong> {campoSeleccionado.propietario}</p>
                    <p><strong>Ubicación:</strong> {campoSeleccionado.comuna}, {campoSeleccionado.region}</p>
                    <p><strong>Cultivo:</strong> {campoSeleccionado.cultivo}</p>
                    <p><strong>Superficie:</strong> {campoSeleccionado.hectareas} ha</p>
                    <p><strong>Coordenadas:</strong> {campoSeleccionado.latitud.toFixed(4)}, {campoSeleccionado.longitud.toFixed(4)}</p>
                  </div>

                  <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100">
                    <p className="font-semibold text-red-700 text-sm">
                      🐝 Apiarios en zona de influencia ({ZONA_AVISAJE_KM} km):
                    </p>
                    <p className="text-2xl font-bold text-red-600">{apiariosEnZona.length}</p>
                    {apiariosEnZona.map(a => (
                      <div key={a.id} className="text-xs text-red-600 mt-1">
                        • {a.nombre} - {a.apicultor} ({a.cantidadColmenas} colmenas)
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
            {/* Producto seleccionado */}
            {productoSeleccionado && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">🧪 Producto Seleccionado</h3>
                    <p className="text-gray-600">{productoSeleccionado.nombreComercial} - {productoSeleccionado.ingredienteActivo}</p>
                  </div>
                  <span
                    className="px-3 py-1.5 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: getToxicidadColor(productoSeleccionado.toxicidadAbejas) }}
                  >
                    {getToxicidadLabel(productoSeleccionado.toxicidadAbejas)}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500">Categoría</p>
                    <p className="font-semibold text-sm">{productoSeleccionado.categoria}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500">DL50 Oral</p>
                    <p className="font-semibold text-sm">{productoSeleccionado.dl50Oral}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500">Registro SAG</p>
                    <p className="font-semibold text-sm">{productoSeleccionado.registroSAG}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2.5">
                    <p className="text-xs text-gray-500">Empresa</p>
                    <p className="font-semibold text-sm">{productoSeleccionado.empresa}</p>
                  </div>
                </div>

                {/* Determinación de aviso */}
                <div className={`mt-4 p-4 rounded-xl border-2 ${
                  productoSeleccionado.requiereAviso
                    ? 'bg-red-50 border-red-200'
                    : 'bg-green-50 border-green-200'
                }`}>
                  {productoSeleccionado.requiereAviso ? (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        <div>
                          <p className="font-bold text-red-700">SE REQUIERE AVISAJE OBLIGATORIO</p>
                          <p className="text-sm text-red-600">
                            Este producto está clasificado como <strong>{getToxicidadLabel(productoSeleccionado.toxicidadAbejas)}</strong> para abejas.
                            Debe avisar con al menos <strong>48 horas de anticipación</strong> a los apicultores en la zona de influencia.
                          </p>
                          <p className="text-xs text-red-500 mt-1">
                            Vigencia aviso: {productoSeleccionado.fechaInicioAviso}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-bold text-green-700">NO SE REQUIERE AVISAJE</p>
                        <p className="text-sm text-green-600">
                          Este producto está clasificado como <strong>Prácticamente No Tóxico</strong> para abejas.
                          No es obligatorio notificar a los apicultores.
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
                <p className="text-gray-600 mb-4">Primero seleccione un producto químico desde la pestaña "Productos SAG"</p>
                <button
                  onClick={() => setActiveTab('productos')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ir a Productos SAG
                </button>
              </div>
            )}

            {/* Formulario de avisaje */}
            {productoSeleccionado && requiereAviso && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-4">📨 Generar Aviso de Aplicación</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Selección de campo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campo a tratar</label>
                    <select
                      value={campoSeleccionado?.id || ''}
                      onChange={(e) => {
                        const campo = camposEjemplo.find(c => c.id === e.target.value);
                        setCampoSeleccionado(campo || null);
                      }}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Seleccione un campo...</option>
                      {camposEjemplo.map(campo => (
                        <option key={campo.id} value={campo.id}>
                          {campo.nombre} - {campo.comuna} ({campo.hectareas} ha)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Fecha de aplicación */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de aplicación</label>
                    <input
                      type="date"
                      value={fechaAplicacion}
                      onChange={(e) => setFechaAplicacion(e.target.value)}
                      min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Mínimo 48 horas desde hoy (requisito legal)</p>
                  </div>

                  {/* Hora de aplicación */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hora de aplicación</label>
                    <select
                      value={horaAplicacion}
                      onChange={(e) => setHoraAplicacion(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Seleccione horario...</option>
                      <option value="05:00-07:00">🌅 Madrugada (05:00 - 07:00) - Recomendado</option>
                      <option value="19:00-21:00">🌇 Atardecer (19:00 - 21:00) - Recomendado</option>
                      <option value="21:00-05:00">🌙 Noche (21:00 - 05:00)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Solo en horarios de baja actividad de abejas</p>
                  </div>

                  {/* Medio de notificación */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medio de notificación</label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded text-green-600" />
                        📧 Correo electrónico
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded text-green-600" />
                        📱 Mensaje de texto (SMS)
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded text-green-600" />
                        📝 Notificación presencial
                      </label>
                    </div>
                  </div>
                </div>

                {/* Apiarios a notificar */}
                {campoSeleccionado && (
                  <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      🐝 Apicultores a notificar (zona {ZONA_AVISAJE_KM} km)
                    </h4>
                    {apiariosEnZona.length > 0 ? (
                      <div className="space-y-2">
                        {apiariosEnZona.map(apiario => (
                          <div key={apiario.id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-amber-100">
                            <div>
                              <p className="font-medium text-sm text-gray-800">{apiario.nombre}</p>
                              <p className="text-xs text-gray-500">
                                {apiario.apicultor} | {apiario.cantidadColmenas} colmenas |{' '}
                                {calcularDistanciaKm(
                                  campoSeleccionado.latitud, campoSeleccionado.longitud,
                                  apiario.latitud, apiario.longitud
                                ).toFixed(1)} km
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">{apiario.contactoEmail}</p>
                              <p className="text-xs text-gray-500">{apiario.contactoTelefono}</p>
                              {apiario.sipecRegistrado && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">SIPEC ✓</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-amber-600">
                        No se encontraron apiarios registrados en SIPEC dentro de la zona de influencia de {ZONA_AVISAJE_KM} km.
                      </p>
                    )}
                  </div>
                )}

                {/* Botón enviar aviso */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {campoSeleccionado && productoSeleccionado && fechaAplicacion && horaAplicacion
                      ? '✓ Todos los campos completos'
                      : '⚠️ Complete todos los campos requeridos'
                    }
                  </div>
                  <button
                    onClick={handleEnviarAviso}
                    disabled={!campoSeleccionado || !fechaAplicacion || !horaAplicacion || apiariosEnZona.length === 0}
                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-sm"
                  >
                    📨 Enviar Aviso a Apicultores
                  </button>
                </div>

                {/* Confirmación */}
                {avisoEnviado && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-bold text-green-700">¡Aviso enviado exitosamente!</p>
                        <p className="text-sm text-green-600">
                          Se notificó a {apiariosEnZona.length} apicultor(es) sobre la aplicación de{' '}
                          <strong>{productoSeleccionado.nombreComercial}</strong> en{' '}
                          <strong>{campoSeleccionado?.nombre}</strong> para el{' '}
                          <strong>{fechaAplicacion}</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Historial de avisos */}
            {avisos.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-3">📋 Historial de Avisos Enviados</h3>
                <div className="space-y-2">
                  {avisos.map(aviso => {
                    const producto = productosQuimicos.find(p => p.id === aviso.productoId);
                    const campo = camposEjemplo.find(c => c.id === aviso.campoId);
                    return (
                      <div key={aviso.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{producto?.nombreComercial} - {campo?.nombre}</p>
                            <p className="text-xs text-gray-500">
                              Aplicación: {aviso.fechaAplicacion} a las {aviso.horaAplicacion} |
                              Notificados: {aviso.apicultoresNotificados.length} apicultores
                            </p>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            ✓ Enviado
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Info Toxicidad */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-2">ℹ️ Clasificación de Toxicidad para Abejas</h2>
              <p className="text-sm text-gray-600 mb-4">
                Según la Resolución Exenta N°7068/2024 del SAG y la Ley Apícola N°21.489, los plaguicidas se clasifican
                en 4 categorías según su toxicidad para abejas (DL50 oral aguda):
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clasificacionesToxicidad.map(clasif => (
                  <div
                    key={clasif.nivel}
                    className="p-4 rounded-xl border-2"
                    style={{ borderColor: clasif.color + '40', backgroundColor: clasif.color + '08' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: clasif.color }}
                      ></span>
                      <h3 className="font-bold text-gray-800">{clasif.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2"><strong>Rango:</strong> {clasif.rango}</p>
                    <p className="text-sm text-gray-600 mb-2">{clasif.descripcion}</p>
                    <div className="flex items-center gap-2 mt-3">
                      {clasif.requiereAviso ? (
                        <span className="px-2.5 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                          ⚠️ Requiere aviso
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          ✓ No requiere aviso
                        </span>
                      )}
                      {clasif.fechaAviso && (
                        <span className="text-xs text-gray-500">
                          Desde: {clasif.fechaAviso}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Normativa */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">📜 Marco Legal</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="font-semibold text-blue-800">Ley Apícola N°21.489</p>
                  <p className="text-blue-700">De promoción, protección y fomento de la actividad apícola. Promulgada el 4 de octubre de 2022.</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="font-semibold text-purple-800">Resolución Exenta N°7068/2024</p>
                  <p className="text-purple-700">Establece obligaciones para compraventa, almacenaje, manipulación y aplicación de plaguicidas de uso agrícola.</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="font-semibold text-amber-800">Obligaciones del avisaje:</p>
                  <ul className="list-disc list-inside text-amber-700 mt-1 space-y-1">
                    <li>El aviso debe realizarse con al menos <strong>48 horas de anticipación</strong></li>
                    <li>Debe ser mediante un <strong>medio verificable</strong> (email, SMS, escrito)</li>
                    <li>La responsabilidad recae en <strong>quien aplica el plaguicida</strong></li>
                    <li>Aplicación solo en <strong>horarios de baja actividad</strong> de abejas (madrugada/atardecer)</li>
                    <li>Zona de influencia: apiarios dentro de <strong>3 km</strong> del predio</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sistema SIPEC */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">🐝 SIPEC Apícola</h3>
              <p className="text-sm text-gray-600 mb-3">
                El Sistema de Información del Patrimonio Pecuario (SIPEC) es el registro obligatorio donde los apicultores
                deben inscribir sus apiarios y colmenas. Esta información es la base para el sistema de avisaje.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">{apiariosEjemplo.length}</p>
                  <p className="text-xs text-gray-500">Apiarios registrados (demo)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-amber-600">
                    {apiariosEjemplo.reduce((acc, a) => acc + a.cantidadColmenas, 0)}
                  </p>
                  <p className="text-xs text-gray-500">Colmenas totales (demo)</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{camposEjemplo.length}</p>
                  <p className="text-xs text-gray-500">Campos registrados (demo)</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm text-green-700">
                  <strong>Enlaces oficiales:</strong>
                </p>
                <div className="mt-1 space-y-1">
                  <a href="https://cpa.sag.gob.cl" target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline block">
                    🔗 Sistema Consulta Para Avisaje (CPA) - cpa.sag.gob.cl
                  </a>
                  <a href="https://sipecweb.sag.gob.cl" target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline block">
                    🔗 SIPEC Apícola - sipecweb.sag.gob.cl
                  </a>
                  <a href="https://www.sag.gob.cl/ambitos-de-accion/aviso-aplicaciones-de-plaguicidas-toxico-y-moderadamente-toxicos-para-las-abeja" target="_blank" rel="noopener noreferrer" className="text-xs text-green-600 hover:underline block">
                    🔗 Info oficial SAG sobre avisaje
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-8 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            Sistema de Avisaje Apícola - Basado en Ley Apícola N°21.489 y Resolución SAG N°7068/2024
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Datos de productos basados en registros oficiales del SAG. Aplicación de demostración.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
