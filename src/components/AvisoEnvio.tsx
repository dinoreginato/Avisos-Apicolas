import { useState } from 'react';
import { User } from '../types/user';
import { ProductoSAG } from '../data/sagProducts';
import { Campo, Apiario } from '../data/fields';
import {
  getPlantillaByTipo,
  generarMensaje,
  generarAsuntoEmail,
  generarLinkWhatsApp,
  generarLinkEmail,
  saveAviso
} from '../services/userService';

interface AvisoEnvioProps {
  user: User;
  producto: ProductoSAG;
  campo: Campo;
  apiariosEnZona: Apiario[];
  fechaAplicacion: string;
  horaAplicacion: string;
  onAvisoEnviado: () => void;
}

export default function AvisoEnvio({
  user,
  producto,
  campo,
  apiariosEnZona,
  fechaAplicacion,
  horaAplicacion,
  onAvisoEnviado
}: AvisoEnvioProps) {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [medioEnvio, setMedioEnvio] = useState<{ whatsapp: boolean; email: boolean }>({
    whatsapp: true,
    email: true
  });
  const [vistaPrevia, setVistaPrevia] = useState<'whatsapp' | 'email' | null>(null);

  const variables = {
    usuario_nombre: user.nombre,
    usuario_empresa: user.empresa || 'N/A',
    usuario_telefono: user.telefono,
    usuario_email: user.email,
    campo_nombre: campo.nombre,
    campo_comuna: campo.comuna,
    campo_region: campo.region,
    campo_lat: campo.latitud.toFixed(4),
    campo_lng: campo.longitud.toFixed(4),
    campo_hectareas: campo.hectareas.toString(),
    producto_nombre: producto.nombreComercial,
    producto_toxicidad: producto.toxicidadAbejas,
    fecha_aplicacion: new Date(fechaAplicacion).toLocaleDateString('es-CL'),
    hora_aplicacion: horaAplicacion
  };

  const plantillaWhatsapp = getPlantillaByTipo('whatsapp');
  const plantillaEmail = getPlantillaByTipo('email');

  const mensajeWhatsapp = generarMensaje(plantillaWhatsapp.contenido, variables);
  const asuntoEmail = generarAsuntoEmail(plantillaEmail.asunto || 'Aviso de Aplicación', variables);
  const mensajeEmail = generarMensaje(plantillaEmail.contenido, variables);

  const handleEnviar = async () => {
    setEnviando(true);

    try {
      // Abrir enlaces de envío
      if (medioEnvio.whatsapp) {
        apiariosEnZona.forEach(apiario => {
          const link = generarLinkWhatsApp(apiario.contactoTelefono, mensajeWhatsapp);
          window.open(link, '_blank');
        });
      }

      if (medioEnvio.email) {
        apiariosEnZona.forEach(apiario => {
          const link = generarLinkEmail(apiario.contactoEmail, asuntoEmail, mensajeEmail);
          window.open(link, '_blank');
        });
      }

      // Guardar aviso en historial
      saveAviso({
        id: `aviso_${Date.now()}`,
        usuarioId: user.id,
        campoId: campo.id,
        productoId: producto.numeroSAG,
        fechaAplicacion,
        horaAplicacion,
        apicultoresNotificados: apiariosEnZona.map(a => a.id),
        estado: 'enviado',
        fechaEnvio: new Date().toISOString(),
        medioEnvio: [
          ...(medioEnvio.whatsapp ? ['whatsapp' as const] : []),
          ...(medioEnvio.email ? ['email' as const] : [])
        ],
        mensajeWhatsapp: medioEnvio.whatsapp ? mensajeWhatsapp : undefined,
        mensajeEmail: medioEnvio.email ? mensajeEmail : undefined
      });

      setEnviado(true);
      setTimeout(() => {
        onAvisoEnviado();
      }, 3000);
    } catch (error) {
      console.error('Error al enviar aviso:', error);
      alert('Error al enviar el aviso. Por favor intente nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
        <div className="text-5xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">¡Aviso Enviado Exitosamente!</h3>
        <p className="text-green-700">
          Se enviaron avisos a {apiariosEnZona.length} apicultor(es) mediante{' '}
          {medioEnvio.whatsapp && medioEnvio.email ? 'WhatsApp y correo electrónico' :
           medioEnvio.whatsapp ? 'WhatsApp' : 'correo electrónico'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selección de medio de envío */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">📤 Seleccionar Medio de Envío</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            medioEnvio.whatsapp ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="checkbox"
              checked={medioEnvio.whatsapp}
              onChange={(e) => setMedioEnvio({ ...medioEnvio, whatsapp: e.target.checked })}
              className="w-5 h-5 text-green-600 rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💬</span>
                <span className="font-semibold text-gray-800">WhatsApp</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Se abrirá WhatsApp con el mensaje pre-llenado para cada apicultor
              </p>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            medioEnvio.email ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input
              type="checkbox"
              checked={medioEnvio.email}
              onChange={(e) => setMedioEnvio({ ...medioEnvio, email: e.target.checked })}
              className="w-5 h-5 text-blue-600 rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📧</span>
                <span className="font-semibold text-gray-800">Correo Electrónico</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Se abrirá su cliente de correo con el mensaje HTML formateado
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Vista previa de mensajes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-4">👁️ Vista Previa de Mensajes</h3>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setVistaPrevia('whatsapp')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              vistaPrevia === 'whatsapp'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            💬 WhatsApp
          </button>
          <button
            onClick={() => setVistaPrevia('email')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              vistaPrevia === 'email'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📧 Email
          </button>
        </div>

        {vistaPrevia === 'whatsapp' && (
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
              {mensajeWhatsapp}
            </pre>
          </div>
        )}

        {vistaPrevia === 'email' && (
          <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <div className="mb-2 text-xs text-gray-600">
              <strong>Asunto:</strong> {asuntoEmail}
            </div>
            <div
              className="bg-white rounded-lg p-4"
              dangerouslySetInnerHTML={{ __html: mensajeEmail }}
            />
          </div>
        )}

        {!vistaPrevia && (
          <div className="text-center py-8 text-gray-500">
            <p>Seleccione un medio para ver la vista previa del mensaje</p>
          </div>
        )}
      </div>

      {/* Apicultores a notificar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-bold text-gray-800 mb-3">
          🐝 Apicultores a Notificar ({apiariosEnZona.length})
        </h3>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {apiariosEnZona.map(apiario => (
            <div key={apiario.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <p className="font-medium text-sm text-gray-800">{apiario.nombre}</p>
                  <p className="text-xs text-gray-600">{apiario.apicultor}</p>
                </div>
                <div className="text-right text-xs">
                  {medioEnvio.whatsapp && (
                    <p className="text-green-600">📱 {apiario.contactoTelefono}</p>
                  )}
                  {medioEnvio.email && (
                    <p className="text-blue-600">📧 {apiario.contactoEmail}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botón de envío */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-gray-600">
            <p>Se enviarán avisos a <strong>{apiariosEnZona.length} apicultor(es)</strong></p>
            <p className="text-xs mt-1">
              Medios: {medioEnvio.whatsapp && '💬 WhatsApp'} {medioEnvio.email && '📧 Email'}
            </p>
          </div>
          <button
            onClick={handleEnviar}
            disabled={enviando || (!medioEnvio.whatsapp && !medioEnvio.email) || apiariosEnZona.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md"
          >
            {enviando ? '⏳ Enviando...' : '📨 Enviar Avisos'}
          </button>
        </div>
      </div>
    </div>
  );
}
