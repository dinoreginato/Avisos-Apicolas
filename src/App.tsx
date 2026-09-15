import { useState, useMemo, useRef, useEffect } from 'react';
import MapView from './components/MapView';
import AuthScreen from './components/AuthScreen';
import UserProfile from './components/UserProfile';
import CampoManager from './components/CampoManager';
import { productosSAGCompletos, normalizarToxicidad, requiereAvisaje, ProductoSAG } from './data/sagProducts';
import { productosSAGComplemento } from './data/sagProductsExtra';
import { productosSAGMas } from './data/sagProductsMas';
import { clasificacionesToxicidad } from './data/products';
import { CampoUsuario } from './types/fields';
import { getCamposByUser } from './services/campoService';
import { 
  apicultoresSIPEC, 
  getApicultoresByRegion, 
  estadisticasOficialesSAG, 
  estimacionApicultoresNoRegistrados 
} from './data/apicultoresSIPEC';
import { calcularDistanciaKm, ZONA_AVISAJE_KM } from './data/fields';
import { User } from './types/user';
import { getCurrentUser, logoutUser, getAvisosByUser, saveAviso } from './services/userService';
import {
  getPlantillaByTipo,
  generarMensaje,
  generarAsuntoEmail,
  generarLinkWhatsApp,
  generarLinkEmail
} from './services/userService';

// Combinar todos los productos del SAG
const todosLosProductosSAG: ProductoSAG[] = [...productosSAGCompletos, ...productosSAGComplemento, ...productosSAGMas];

type Tab = 'productos' | 'misCampos' | 'avisaje' | 'info' | 'actualizar' | 'perfil';

interface ProductoNormalizado extends ProductoSAG {
  requiereAviso: boolean;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('productos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterToxicidad, setFilterToxicidad] = useState<string>('');
  const [filterAvisaje, setFilterAvisaje] = useState<string>('');
  const [campoSeleccionado, setCampoSeleccionado] = useState<CampoUsuario | null>(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoNormalizado | null>(null);
  const [fechaAplicacion, setFechaAplicacion] = useState('');
  const [horaAplicacion, setHoraAplicacion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [enviandoAviso, setEnviandoAviso] = useState(false);
  const [avisoEnviado, setAvisoEnviado] = useState(false);
  const [medioEnvio, setMedioEnvio] = useState<{ whatsapp: boolean; email: boolean }>({ whatsapp: true, email: true });
  const [vistaPrevia, setVistaPrevia] = useState<'whatsapp' | 'email' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemsPerPage = 50;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const user = getCurrentUser();
    if (user) setCurrentUser(user);
  }, []);

  const handleLogin = (user: User) => setCurrentUser(user);
  const handleLogout = () => { logoutUser(); setCurrentUser(null); };

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
    return { total: productosNormalizados.length, porToxicidad, requierenAviso, noRequierenAviso };
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

  // Campos del usuario
  const camposUsuario = useMemo(() => {
    if (!currentUser) return [];
    return getCamposByUser(currentUser.id);
  }, [currentUser, activeTab]);

  // Apicultores en zona del campo seleccionado
  const apiariosEnZona = useMemo(() => {
    if (!campoSeleccionado) return [];
    
    // Obtener todos los apiarios de la región del campo
    const apiariosRegion = getApicultoresByRegion(campoSeleccionado.region)
      .flatMap(a => a.apiarios.map(api => ({
        ...api,
        apicultorNombre: a.nombre,
        apicultorEmail: a.email,
        apicultorTelefono: a.telefono
      })));

    // Filtrar apiarios dentro de la zona de influencia
    return apiariosRegion.filter(apiario => {
      const distancia = calcularDistanciaKm(
        campoSeleccionado.latitud,
        campoSeleccionado.longitud,
        apiario.latitud,
        apiario.longitud
      );
      return distancia <= ZONA_AVISAJE_KM;
    }).map(apiario => ({
      ...apiario,
      distancia: calcularDistanciaKm(
        campoSeleccionado.latitud,
        campoSeleccionado.longitud,
        apiario.latitud,
        apiario.longitud
      )
    }));
  }, [campoSeleccionado]);

  // Campos para el mapa
  const camposParaMapa = useMemo(() => {
    return camposUsuario.map(c => ({
      id: c.id,
      nombre: c.nombre,
      propietario: currentUser?.nombre || '',
      latitud: c.latitud,
      longitud: c.longitud,
      region: c.region,
      comuna: c.comuna,
      hectareas: c.hectareas,
      cultivo: c.cultivo
    }));
  }, [camposUsuario, currentUser]);

  // Apiarios para el mapa
  const apiariosParaMapa = useMemo(() => {
    return apicultoresSIPEC.flatMap(a =>
      a.apiarios.map(api => ({
        id: api.id,
        nombre: api.nombre,
        apicultor: a.nombre,
        latitud: api.latitud,
        longitud: api.longitud,
        region: api.region,
        comuna: api.comuna,
        cantidadColmenas: api.cantidadColmenas,
        contactoEmail: a.email,
        contactoTelefono: a.telefono,
        sipecRegistrado: a.sipecRegistrado
      }))
    );
  }, []);

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

  // Función para enviar avisos
  const handleEnviarAvisos = () => {
    if (!currentUser || !productoSeleccionado || !campoSeleccionado || !fechaAplicacion || !horaAplicacion) return;

    setEnviandoAviso(true);

    const variables = {
      usuario_nombre: currentUser.nombre,
      usuario_empresa: currentUser.empresa || 'N/A',
      usuario_telefono: currentUser.telefono,
      usuario_email: currentUser.email,
      campo_nombre: campoSeleccionado.nombre,
      campo_comuna: campoSeleccionado.comuna,
      campo_region: campoSeleccionado.region,
      campo_lat: campoSeleccionado.latitud.toFixed(4),
      campo_lng: campoSeleccionado.longitud.toFixed(4),
      campo_hectareas: campoSeleccionado.hectareas.toString(),
      producto_nombre: productoSeleccionado.nombreComercial,
      producto_toxicidad: productoSeleccionado.toxicidadAbejas,
      fecha_aplicacion: new Date(fechaAplicacion).toLocaleDateString('es-CL'),
      hora_aplicacion: horaAplicacion
    };

    const plantillaWhatsapp = getPlantillaByTipo('whatsapp');
    const plantillaEmail = getPlantillaByTipo('email');
    const mensajeWhatsapp = generarMensaje(plantillaWhatsapp.contenido, variables);
    const asuntoEmail = generarAsuntoEmail(plantillaEmail.asunto || 'Aviso de Aplicación', variables);
    const mensajeEmail = generarMensaje(plantillaEmail.contenido, variables);

    try {
      // Abrir enlaces de envío
      const apicultoresNotificados: string[] = [];
      
      apiariosEnZona.forEach(apiario => {
        if (medioEnvio.whatsapp) {
          const link = generarLinkWhatsApp(apiario.apicultorTelefono, mensajeWhatsapp);
          window.open(link, '_blank');
        }
        if (medioEnvio.email) {
          const link = generarLinkEmail(apiario.apicultorEmail, asuntoEmail, mensajeEmail);
          window.open(link, '_blank');
        }
        apicultoresNotificados.push(apiario.apicultorNombre);
      });

      // Guardar aviso en historial
      saveAviso({
        id: `aviso_${Date.now()}`,
        usuarioId: currentUser.id,
        campoId: campoSeleccionado.id,
        productoId: productoSeleccionado.numeroSAG,
        fechaAplicacion,
        horaAplicacion,
        apicultoresNotificados,
        estado: 'enviado',
        fechaEnvio: new Date().toISOString(),
        medioEnvio: [
          ...(medioEnvio.whatsapp ? ['whatsapp' as const] : []),
          ...(medioEnvio.email ? ['email' as const] : [])
        ],
        mensajeWhatsapp: medioEnvio.whatsapp ? mensajeWhatsapp : undefined,
        mensajeEmail: medioEnvio.email ? mensajeEmail : undefined
      });

      setAvisoEnviado(true);
      setTimeout(() => setAvisoEnviado(false), 5000);
    } catch (error) {
      console.error('Error al enviar aviso:', error);
      alert('Error al enviar el aviso. Por favor intente nuevamente.');
    } finally {
      setEnviandoAviso(false);
    }
  };

  // Si no hay usuario, mostrar pantalla de autenticación
  if (!currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  // Variables para mensajes
  const variablesMensaje = campoSeleccionado && productoSeleccionado ? {
    usuario_nombre: currentUser.nombre,
    usuario_empresa: currentUser.empresa || 'N/A',
    usuario_telefono: currentUser.telefono,
    usuario_email: currentUser.email,
    campo_nombre: campoSeleccionado.nombre,
    campo_comuna: campoSeleccionado.comuna,
    campo_region: campoSeleccionado.region,
    campo_lat: campoSeleccionado.latitud.toFixed(4),
    campo_lng: campoSeleccionado.longitud.toFixed(4),
    campo_hectareas: campoSeleccionado.hectareas.toString(),
    producto_nombre: productoSeleccionado.nombreComercial,
    producto_toxicidad: productoSeleccionado.toxicidadAbejas,
    fecha_aplicacion: fechaAplicacion ? new Date(fechaAplicacion).toLocaleDateString('es-CL') : '',
    hora_aplicacion: horaAplicacion
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-green-600">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-md flex-shrink-0 object-cover"
              />
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-gray-800 truncate">Sistema de Avisaje Apícola</h1>
                <p className="text-xs text-gray-500 truncate hidden sm:block">Usuario: {currentUser.nombre} | {currentUser.region}</p>
                <p className="text-xs text-gray-500 truncate sm:hidden">{currentUser.nombre}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <div className="bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                <span className="text-xs text-green-700 font-bold whitespace-nowrap">
                  📊 {stats.total} productos | ⚠️ {stats.requierenAviso}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation - Desktop */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'productos' as Tab, label: 'Productos SAG', icon: '🧪', count: stats.total },
              { id: 'misCampos' as Tab, label: 'Mis Campos', icon: '🌾', count: camposUsuario.length },
              { id: 'avisaje' as Tab, label: 'Avisaje', icon: '📨' },
              { id: 'info' as Tab, label: 'Info', icon: 'ℹ️' },
              { id: 'actualizar' as Tab, label: 'Actualizar', icon: '🔄' },
              { id: 'perfil' as Tab, label: 'Perfil', icon: '👤' },
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
                {tab.count !== undefined && <span className="ml-1.5 text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded-full">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Navigation - Mobile */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 md:hidden">
        <div className="px-3 py-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg border border-gray-200"
          >
            <span className="text-sm font-medium text-gray-700">
              {[
                { id: 'productos', label: 'Productos SAG', icon: '🧪' },
                { id: 'misCampos', label: 'Mis Campos', icon: '🌾' },
                { id: 'avisaje', label: 'Avisaje', icon: '📨' },
                { id: 'info', label: 'Info', icon: 'ℹ️' },
                { id: 'actualizar', label: 'Actualizar', icon: '🔄' },
                { id: 'perfil', label: 'Perfil', icon: '👤' },
              ].find(t => t.id === activeTab)?.icon}{' '}
              {[
                { id: 'productos', label: 'Productos SAG', icon: '🧪' },
                { id: 'misCampos', label: 'Mis Campos', icon: '🌾' },
                { id: 'avisaje', label: 'Avisaje', icon: '📨' },
                { id: 'info', label: 'Info', icon: 'ℹ️' },
                { id: 'actualizar', label: 'Actualizar', icon: '🔄' },
                { id: 'perfil', label: 'Perfil', icon: '👤' },
              ].find(t => t.id === activeTab)?.label}
            </span>
            <svg className={`w-5 h-5 text-gray-500 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {mobileMenuOpen && (
            <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {[
                { id: 'productos' as Tab, label: 'Productos SAG', icon: '🧪', count: stats.total },
                { id: 'misCampos' as Tab, label: 'Mis Campos', icon: '🌾', count: camposUsuario.length },
                { id: 'avisaje' as Tab, label: 'Avisaje', icon: '📨' },
                { id: 'info' as Tab, label: 'Info', icon: 'ℹ️' },
                { id: 'actualizar' as Tab, label: 'Actualizar', icon: '🔄' },
                { id: 'perfil' as Tab, label: 'Perfil', icon: '👤' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { 
                    setActiveTab(tab.id); 
                    setCurrentPage(1); 
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all border-b border-gray-100 last:border-b-0 ${
                    activeTab === tab.id
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </span>
                  {tab.count !== undefined && (
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        {/* Tab: Productos SAG */}
        {activeTab === 'productos' && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">🧪 Clasificación Ecotoxicológica - SAG</h2>
                <span className="text-xs text-gray-500 hidden sm:inline">Res. 7068/2024</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                <input
                  type="text"
                  placeholder="Buscar por N° SAG o nombre..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={filterToxicidad}
                  onChange={(e) => { setFilterToxicidad(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">Todas las toxicidades</option>
                  <option value="Muy tóxico">Muy Tóxico</option>
                  <option value="Moderadamente tóxico">Moderadamente Tóxico</option>
                  <option value="Ligeramente tóxico">Ligeramente Tóxico</option>
                  <option value="Virtualmente no tóxico">Virtualmente No Tóxico</option>
                </select>
                <select
                  value={filterAvisaje}
                  onChange={(e) => { setFilterAvisaje(e.target.value); setCurrentPage(1); }}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">Todos</option>
                  <option value="si">⚠️ Requiere avisaje</option>
                  <option value="no">✓ No requiere</option>
                </select>
                <span className="text-xs text-gray-500 flex items-center">{productosFiltrados.length} resultados</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto max-h-[500px] sm:max-h-[600px] overflow-y-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="text-left px-2 sm:px-3 py-2 sm:py-2.5 font-semibold text-gray-700 text-xs">N° SAG</th>
                      <th className="text-left px-2 sm:px-3 py-2 sm:py-2.5 font-semibold text-gray-700 text-xs">Nombre Comercial</th>
                      <th className="text-left px-2 sm:px-3 py-2 sm:py-2.5 font-semibold text-gray-700 text-xs">Toxicidad</th>
                      <th className="text-left px-2 sm:px-3 py-2 sm:py-2.5 font-semibold text-gray-700 text-xs hidden sm:table-cell">Avisaje</th>
                      <th className="text-left px-2 sm:px-3 py-2 sm:py-2.5 font-semibold text-gray-700 text-xs">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {productosPaginados.map(producto => {
                      const badge = getToxicidadBadge(producto.toxicidadAbejas);
                      return (
                        <tr key={producto.numeroSAG} className={`hover:bg-gray-50 ${productoSeleccionado?.numeroSAG === producto.numeroSAG ? 'bg-green-50' : ''}`}>
                          <td className="px-2 sm:px-3 py-2">
                            <span className="font-mono text-xs text-gray-600 bg-gray-100 px-1 py-0.5 rounded">{producto.numeroSAG}</span>
                          </td>
                          <td className="px-2 sm:px-3 py-2">
                            <span className="font-medium text-gray-800 text-xs">{producto.nombreComercial}</span>
                          </td>
                          <td className="px-2 sm:px-3 py-2">
                            <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                              {badge.label}
                            </span>
                          </td>
                          <td className="px-2 sm:px-3 py-2 hidden sm:table-cell">
                            {producto.requiereAviso ? (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">⚠️ Sí</span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">✓ No</span>
                            )}
                          </td>
                          <td className="px-2 sm:px-3 py-2">
                            <button
                              onClick={() => { setProductoSeleccionado(producto); setActiveTab('avisaje'); }}
                              className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
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
              {totalPages > 1 && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Página {currentPage} de {totalPages}</span>
                  <div className="flex gap-1">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                      className="px-3 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">← Ant</button>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                      className="px-3 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50">Sig →</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Mis Campos */}
        {activeTab === 'misCampos' && (
          <div className="space-y-4">
            <CampoManager 
              user={currentUser} 
              onCampoSelected={(campo) => {
                setCampoSeleccionado(campo);
                setActiveTab('avisaje');
              }} 
            />
            
            {/* Mapa */}
            {camposUsuario.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-3">🗺️ Mapa de Campos y Apiarios</h3>
                <div className="h-[400px]">
                  <MapView
                    campos={camposParaMapa}
                    apiarios={apiariosParaMapa}
                    campoSeleccionado={campoSeleccionado ? {
                      ...campoSeleccionado,
                      propietario: currentUser.nombre
                    } : null}
                    apiariosEnZona={apiariosEnZona.map(a => ({
                      id: a.id,
                      nombre: a.nombre,
                      apicultor: a.apicultorNombre,
                      latitud: a.latitud,
                      longitud: a.longitud,
                      region: a.region,
                      comuna: a.comuna,
                      cantidadColmenas: a.cantidadColmenas,
                      contactoEmail: a.apicultorEmail,
                      contactoTelefono: a.apicultorTelefono,
                      sipecRegistrado: true
                    }))}
                    center={camposUsuario.length > 0 ? [camposUsuario[0].latitud, camposUsuario[0].longitud] as [number, number] : [-34.5, -71.0]}
                    zoom={8}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab: Avisaje */}
        {activeTab === 'avisaje' && (
          <div className="space-y-4">
            {/* Producto seleccionado */}
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

                <div className={`mt-4 p-4 rounded-xl border-2 ${
                  productoSeleccionado.requiereAviso ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                }`}>
                  {productoSeleccionado.requiereAviso ? (
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">⚠️</span>
                      <div>
                        <p className="font-bold text-red-700 text-lg">SE REQUIERE AVISAJE OBLIGATORIO</p>
                        <p className="text-sm text-red-600 mt-1">
                          Debe avisar con al menos <strong>48 horas de anticipación</strong> a los apicultores registrados en SIPEC.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">✅</span>
                      <div>
                        <p className="font-bold text-green-700 text-lg">NO SE REQUIERE AVISAJE</p>
                        <p className="text-sm text-green-600 mt-1">{productoSeleccionado.avisaje}</p>
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
            {productoSeleccionado && productoSeleccionado.requiereAviso && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-4">📨 Configurar Aviso de Aplicación</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mi Campo *</label>
                    {camposUsuario.length > 0 ? (
                      <select
                        value={campoSeleccionado?.id || ''}
                        onChange={(e) => setCampoSeleccionado(camposUsuario.find(c => c.id === e.target.value) || null)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="">Seleccione su campo...</option>
                        {camposUsuario.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.nombre} - {c.comuna}, {c.region}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-700">
                          No tiene campos registrados.{' '}
                          <button onClick={() => setActiveTab('misCampos')} className="underline font-medium">
                            Registrar campo aquí
                          </button>
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de aplicación (mín. 48h) *</label>
                    <input type="date" value={fechaAplicacion} onChange={(e) => setFechaAplicacion(e.target.value)}
                      min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Horario *</label>
                    <select value={horaAplicacion} onChange={(e) => setHoraAplicacion(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm">
                      <option value="">Seleccione...</option>
                      <option value="05:00-07:00">🌅 Madrugada (05:00-07:00)</option>
                      <option value="19:00-21:00">🌇 Atardecer (19:00-21:00)</option>
                      <option value="21:00-05:00">🌙 Noche (21:00-05:00)</option>
                    </select>
                  </div>
                </div>

                {/* Apicultores en zona */}
                {campoSeleccionado && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      🐝 Apicultores SIPEC en zona de {ZONA_AVISAJE_KM} km: {apiariosEnZona.length}
                    </h4>
                    {apiariosEnZona.length > 0 ? (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {apiariosEnZona.map((a, idx) => (
                          <div key={idx} className="flex justify-between bg-white p-2.5 rounded-lg border border-amber-100 text-sm">
                            <div>
                              <p className="font-medium">{a.nombre}</p>
                              <p className="text-xs text-gray-500">
                                {a.apicultorNombre} | {a.cantidadColmenas} colmenas | {a.distancia.toFixed(1)} km
                              </p>
                            </div>
                            <div className="text-right text-xs text-gray-500">
                              <p>📱 {a.apicultorTelefono}</p>
                              <p>📧 {a.apicultorEmail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-amber-600">
                        No hay apiarios SIPEC registrados en la zona de influencia de {ZONA_AVISAJE_KM} km.
                      </p>
                    )}
                  </div>
                )}

                {/* Selección de medio de envío */}
                {campoSeleccionado && fechaAplicacion && horaAplicacion && apiariosEnZona.length > 0 && variablesMensaje && (
                  <>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                        medioEnvio.whatsapp ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}>
                        <input type="checkbox" checked={medioEnvio.whatsapp}
                          onChange={(e) => setMedioEnvio({ ...medioEnvio, whatsapp: e.target.checked })}
                          className="w-5 h-5 text-green-600 rounded" />
                        <div>
                          <span className="font-semibold">💬 WhatsApp</span>
                          <p className="text-xs text-gray-600">Mensaje pre-llenado</p>
                        </div>
                      </label>

                      <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer ${
                        medioEnvio.email ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input type="checkbox" checked={medioEnvio.email}
                          onChange={(e) => setMedioEnvio({ ...medioEnvio, email: e.target.checked })}
                          className="w-5 h-5 text-blue-600 rounded" />
                        <div>
                          <span className="font-semibold">📧 Correo Electrónico</span>
                          <p className="text-xs text-gray-600">Email HTML profesional</p>
                        </div>
                      </label>
                    </div>

                    {/* Vista previa */}
                    <div className="mt-4">
                      <div className="flex gap-2 mb-3">
                        <button onClick={() => setVistaPrevia('whatsapp')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${vistaPrevia === 'whatsapp' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
                          👁️ Vista WhatsApp
                        </button>
                        <button onClick={() => setVistaPrevia('email')}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${vistaPrevia === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>
                          👁️ Vista Email
                        </button>
                      </div>

                      {vistaPrevia === 'whatsapp' && (
                        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                            {generarMensaje(getPlantillaByTipo('whatsapp').contenido, variablesMensaje)}
                          </pre>
                        </div>
                      )}

                      {vistaPrevia === 'email' && (
                        <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                          <div dangerouslySetInnerHTML={{
                            __html: generarMensaje(getPlantillaByTipo('email').contenido, variablesMensaje)
                          }} />
                        </div>
                      )}
                    </div>

                    {/* Botón de envío */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={handleEnviarAvisos}
                        disabled={enviandoAviso || (!medioEnvio.whatsapp && !medioEnvio.email)}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 transition-all shadow-md"
                      >
                        {enviandoAviso ? '⏳ Enviando...' : `📨 Enviar a ${apiariosEnZona.length} Apicultor(es)`}
                      </button>
                    </div>

                    {avisoEnviado && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="font-bold text-green-700">✅ ¡Avisos enviados exitosamente!</p>
                        <p className="text-sm text-green-600">
                          Se notificó a {apiariosEnZona.length} apicultor(es) sobre {productoSeleccionado.nombreComercial}.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab: Info */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-4">ℹ️ Clasificación de Toxicidad (Res. 7068/2024)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clasificacionesToxicidad.map(c => (
                  <div key={c.nivel} className="p-4 rounded-xl border-2" style={{ borderColor: c.color + '40', backgroundColor: c.color + '08' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }}></span>
                      <h3 className="font-bold">{c.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{c.rango}</p>
                    <p className="text-sm text-gray-600 mt-1">{c.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">🐝 Estadísticas Nacionales Apícolas</h3>
              <p className="text-sm text-gray-600 mb-4">
                Fuente: Boletín Apícola N°8 - SAG (mayo 2023) | Datos al 30 de septiembre de 2022
              </p>
              
              {/* Resumen Nacional */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">{estadisticasOficialesSAG.totalApicultores.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Apicultores Registrados</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-2xl font-bold text-green-600">{estadisticasOficialesSAG.totalApiarios.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Apiarios Totales</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-2xl font-bold text-amber-600">{estadisticasOficialesSAG.totalColmenas.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Colmenas Totales</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-2xl font-bold text-purple-600">{estadisticasOficialesSAG.promedioColmenasPorApicultor}</p>
                  <p className="text-xs text-gray-600">Promedio Colmenas/Apicultor</p>
                </div>
              </div>

              {/* Tipología */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-700 mb-2">Tipología de Apicultores</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(estadisticasOficialesSAG.tipologia).map(([key, tip]: [string, any]) => (
                    <div key={key} className="p-2 bg-gray-50 rounded border border-gray-200">
                      <p className="font-medium text-xs">{tip.nombre}</p>
                      <p className="text-xs text-gray-600">{tip.rango} | {tip.porcentaje}% | {tip.colmenas.toLocaleString()} colmenas</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apicultores No Registrados */}
              <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-4">
                <h4 className="font-semibold text-sm text-red-800 mb-2">⚠️ Estimación de Apicultores No Registrados</h4>
                <p className="text-xs text-red-700 mb-2">
                  Según estudios del sector, se estima que aproximadamente <strong>{estimacionApicultoresNoRegistrados.porcentajeEstimado}%</strong> de los 
                  apicultores no están registrados en SIPEC, principalmente pequeños productores de Agricultura Familiar Campesina.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{estimacionApicultoresNoRegistrados.totalEstimado.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Total Estimado</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{estimacionApicultoresNoRegistrados.noRegistrados.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">No Registrados</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{estadisticasOficialesSAG.totalApicultores.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">Registrados SIPEC</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-semibold text-red-800 mb-1">Perfil de apicultores no registrados:</p>
                  <ul className="text-xs text-red-700 space-y-1">
                    {estimacionApicultoresNoRegistrados.perfil.razones.slice(0, 3).map((razon: string, idx: number) => (
                      <li key={idx}>• {razon}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">📊 Distribución por Región</h3>
              <p className="text-sm text-gray-600 mb-4">
                Datos oficiales del SIPEC Apícola del SAG
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Object.entries(estadisticasOficialesSAG.porRegion)
                  .sort(([, a]: [string, any], [, b]: [string, any]) => b.apicultores - a.apicultores)
                  .map(([region, datos]: [string, any]) => {
                    const apicultoresEnBase = getApicultoresByRegion(region).length;
                    const porcentaje = (datos.apicultores / estadisticasOficialesSAG.totalApicultores * 100).toFixed(1);
                    return (
                      <div key={region} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">{region}</p>
                            <p className="text-xs text-gray-500">
                              {datos.apicultores.toLocaleString()} apicultores ({porcentaje}%)
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-gray-700">{datos.colmenas.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">colmenas</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-gray-600">Apiarios:</p>
                            <p className="font-semibold">{datos.apiarios.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Promedio:</p>
                            <p className="font-semibold">{(datos.colmenas / datos.apicultores).toFixed(0)} colm/apic</p>
                          </div>
                          <div>
                            <p className="text-gray-600">En base:</p>
                            <p className="font-semibold text-green-600">{apicultoresEnBase}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">📈 Actividades Apícolas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(estadisticasOficialesSAG.actividades).map(([key, act]: [string, any]) => (
                  <div key={key} className="p-2 bg-gray-50 rounded border border-gray-200">
                    <p className="text-lg font-bold text-gray-700">{act.porcentaje}%</p>
                    <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-xs text-gray-500">{act.apicultores.toLocaleString()} apicultores</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">👥 Género y RAMEX</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Distribución por Género</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-pink-50 rounded border border-pink-200">
                      <span className="text-sm">👩 Femenino</span>
                      <span className="font-semibold text-sm">{estadisticasOficialesSAG.genero.femenino.porcentaje}%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded border border-blue-200">
                      <span className="text-sm">👨 Masculino</span>
                      <span className="font-semibold text-sm">{estadisticasOficialesSAG.genero.masculino.porcentaje}%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200">
                      <span className="text-sm">🏢 Empresa</span>
                      <span className="font-semibold text-sm">{estadisticasOficialesSAG.genero.empresa.porcentaje}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Apicultores RAMEX (Exportadores)</h4>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-2xl font-bold text-green-600">{estadisticasOficialesSAG.ramex.total.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">apicultores exportadores ({estadisticasOficialesSAG.ramex.porcentaje}%)</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-semibold text-green-800">Top regiones:</p>
                      {Object.entries(estadisticasOficialesSAG.ramex.porRegion)
                        .sort(([, a]: [string, any], [, b]: [string, any]) => b - a)
                        .slice(0, 3)
                        .map(([region, count]: [string, any]) => (
                          <p key={region} className="text-xs text-green-700">
                            {region}: {count} ({(count / estadisticasOficialesSAG.ramex.total * 100).toFixed(1)}%)
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-bold text-gray-800 mb-3">🔗 Enlaces Oficiales</h3>
              <div className="space-y-2">
                <a href="https://cpa.sag.gob.cl" target="_blank" rel="noopener noreferrer" className="block p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100">
                  <p className="font-semibold text-green-800 text-sm">🔗 Sistema Consulta Para Avisaje (CPA)</p>
                  <p className="text-xs text-green-600">cpa.sag.gob.cl</p>
                </a>
                <a href="https://sipecweb.sag.gob.cl" target="_blank" rel="noopener noreferrer" className="block p-3 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100">
                  <p className="font-semibold text-amber-800 text-sm">🔗 SIPEC Apícola</p>
                  <p className="text-xs text-amber-600">Registro oficial de apiarios</p>
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
                <p className="text-sm text-blue-700">
                  Base de datos: <strong>{stats.total} productos</strong> del Power BI SAG (30/04/2026).
                  {stats.requierenAviso} requieren avisaje obligatorio.
                </p>
              </div>
              <a href="https://www.sag.gob.cl/sites/default/files/2026-04-30%20Lista%20plaguicidas%20seg%C3%BAn%20su%20clasificaci%C3%B3n%20ecotox.xlsx"
                target="_blank" rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                📥 Descargar desde SAG
              </a>
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
        </div>
      </footer>
    </div>
  );
}

export default App;
