import { useState } from 'react';

export default function InfoDatosSAG() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-lg">📊 Estado de los Datos de Apiarios</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showDetails ? 'Ocultar detalles' : 'Ver detalles'}
        </button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-2xl font-bold text-blue-600">20,150</p>
          <p className="text-sm text-gray-600">Apiarios totales en Chile (SAG)</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-2xl font-bold text-green-600">~250</p>
          <p className="text-sm text-gray-600">Apiarios en nuestra base de datos</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-2xl font-bold text-amber-600">~1.2%</p>
          <p className="text-sm text-gray-600">Cobertura actual</p>
        </div>
      </div>

      {/* Explicación */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">💡 ¿Por qué faltan apiarios?</h4>
        <p className="text-sm text-gray-700 mb-2">
          Los <strong>20,150 apiarios</strong> son datos oficiales del SAG registrados en el SIPEC Apícola. 
          Sin embargo, esta información <strong>no está disponible públicamente</strong> en formato descargable.
        </p>
        <p className="text-sm text-gray-700">
          Nuestra base de datos contiene <strong>apiarios de ejemplo</strong> para demostrar el funcionamiento del sistema. 
          Para tener todos los apiarios reales, necesitas solicitar los datos al SAG.
        </p>
      </div>

      {/* Detalles expandibles */}
      {showDetails && (
        <div className="space-y-4">
          {/* Datos por región */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">📍 Datos por Región (SAG Oficial)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Región</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Apicultores</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Apiarios</th>
                    <th className="text-right px-3 py-2 font-semibold text-gray-700">Colmenas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-3 py-2">O'Higgins</td>
                    <td className="px-3 py-2 text-right">1,166</td>
                    <td className="px-3 py-2 text-right">2,684</td>
                    <td className="px-3 py-2 text-right">260,733</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Maule</td>
                    <td className="px-3 py-2 text-right">1,720</td>
                    <td className="px-3 py-2 text-right">3,699</td>
                    <td className="px-3 py-2 text-right">292,853</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Araucanía</td>
                    <td className="px-3 py-2 text-right">1,814</td>
                    <td className="px-3 py-2 text-right">2,628</td>
                    <td className="px-3 py-2 text-right">124,945</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Metropolitana</td>
                    <td className="px-3 py-2 text-right">850</td>
                    <td className="px-3 py-2 text-right">1,548</td>
                    <td className="px-3 py-2 text-right">152,507</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2">Valparaíso</td>
                    <td className="px-3 py-2 text-right">700</td>
                    <td className="px-3 py-2 text-right">1,588</td>
                    <td className="px-3 py-2 text-right">126,967</td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-3 py-2">Total Chile</td>
                    <td className="px-3 py-2 text-right">10,504</td>
                    <td className="px-3 py-2 text-right">20,150</td>
                    <td className="px-3 py-2 text-right">1,404,214</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Fuente: Boletín Apícola N°8 - SAG (mayo 2023)
            </p>
          </div>

          {/* Cómo obtener datos */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">📥 Cómo Obtener los Datos Reales</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>
                <strong>Solicitar al SAG</strong> (Ley de Transparencia)
                <ul className="list-disc list-inside ml-4 mt-1 text-xs">
                  <li>Email: oficina.informaciones@sag.gob.cl</li>
                  <li>Solicitar: Base de datos SIPEC con coordenadas GPS y contactos</li>
                </ul>
              </li>
              <li>
                <strong>Contactar SAG Regional</strong>
                <ul className="list-disc list-inside ml-4 mt-1 text-xs">
                  <li>O'Higgins: contacto.ohiggins@sag.gob.cl | +56 9 79490421</li>
                  <li>Maule: contacto.maule@sag.gob.cl | +56 71 2226053</li>
                  <li>Araucanía: contacto.araucania@sag.gob.cl | +56 45 2210383</li>
                </ul>
              </li>
              <li>
                <strong>Importar datos</strong> usando la herramienta de importación
                <ul className="list-disc list-inside ml-4 mt-1 text-xs">
                  <li>Descargar plantilla CSV</li>
                  <li>Completar con datos del SAG</li>
                  <li>Importar archivo en "Actualizar Datos"</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Enlaces útiles */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">🔗 Enlaces Útiles</h4>
            <div className="space-y-2">
              <a
                href="https://www.sag.gob.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm text-gray-800">🌐 SAG - Servicio Agrícola y Ganadero</p>
                <p className="text-xs text-gray-600">www.sag.gob.cl</p>
              </a>
              <a
                href="https://sipecweb.sag.gob.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm text-gray-800">🐝 SIPEC Apícola</p>
                <p className="text-xs text-gray-600">Sistema oficial de registro de apiarios</p>
              </a>
              <a
                href="https://cpa.sag.gob.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm text-gray-800">📋 CPA - Consulta Para Avisaje</p>
                <p className="text-xs text-gray-600">Sistema de consulta de apicultores en zona</p>
              </a>
              <a
                href="https://www.sag.gob.cl/sites/default/files/Bolet%C3%ADn%20Ap%C3%ADcola%20N%C2%BA8.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm text-gray-800">📊 Boletín Apícola N°8 (PDF)</p>
                <p className="text-xs text-gray-600">Estadísticas oficiales del SAG (mayo 2023)</p>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Acción recomendada */}
      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-900 mb-2">✅ Acción Recomendada</h4>
        <p className="text-sm text-green-800 mb-3">
          Para tener el <strong>100% de los apiarios</strong> y cumplir completamente con la Ley Apícola N°21.489:
        </p>
        <ol className="list-decimal list-inside space-y-1 text-sm text-green-800">
          <li>Solicita los datos oficiales al SAG (ver sección de detalles)</li>
          <li>Importa los datos reales usando la herramienta de importación</li>
          <li>Verifica que todos los apiarios tengan coordenadas GPS correctas</li>
          <li>Actualiza periódicamente según cambios del SAG</li>
        </ol>
      </div>
    </div>
  );
}
