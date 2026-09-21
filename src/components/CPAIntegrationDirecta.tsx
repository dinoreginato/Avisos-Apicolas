import { useState } from 'react';
import { saveApicultoresToStorage, getApicultoresFromStorage } from '../services/apicultorService';
import { ApicultorSIPEC } from '../types/fields';

export default function CPAIntegrationDirecta() {
  const [step, setStep] = useState(1);
  const [pastedData, setPastedData] = useState('');
  const [parsedData, setParsedData] = useState<ApicultorSIPEC[]>([]);
  const [error, setError] = useState('');

  const openCPA = () => {
    window.open('https://cpa.sag.gob.cl', '_blank');
  };

  const handlePasteData = () => {
    setError('');
    
    try {
      // Intentar parsear como JSON
      let data;
      
      // Si parece JSON, parsearlo
      if (pastedData.trim().startsWith('[') || pastedData.trim().startsWith('{')) {
        data = JSON.parse(pastedData);
      } 
      // Si parece CSV, convertirlo
      else if (pastedData.includes(',')) {
        data = parseCSV(pastedData);
      }
      // Si parece texto copiado de tabla HTML
      else if (pastedData.includes('\t')) {
        data = parseTable(pastedData);
      }
      else {
        throw new Error('Formato no reconocido. Por favor copia los datos en formato JSON, CSV o desde una tabla.');
      }

      // Validar y normalizar datos
      const normalizedData = normalizeData(data);
      
      if (normalizedData.length === 0) {
        throw new Error('No se encontraron datos válidos. Verifica el formato.');
      }

      setParsedData(normalizedData);
      setStep(3);
    } catch (err) {
      setError(`Error al procesar los datos: ${(err as Error).message}`);
    }
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      data.push(row);
    }

    return data;
  };

  const parseTable = (text: string): any[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split('\t').map(h => h.trim().toLowerCase());
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split('\t').map(v => v.trim());
      const row: any = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      
      data.push(row);
    }

    return data;
  };

  const normalizeData = (data: any[]): ApicultorSIPEC[] => {
    return data.map((item, index) => {
      // Buscar campos con diferentes nombres posibles
      const nombre = item.nombre || item.name || item.apicultor || `Apicultor ${index + 1}`;
      const email = item.email || item.correo || item.mail || '';
      const telefono = item.telefono || item.celular || item.phone || item.fono || '';
      const region = item.region || item.región || '';
      const comuna = item.comuna || item.commune || '';
      
      // Manejar apiarios
      let apiarios = [];
      
      if (item.apiarios && Array.isArray(item.apiarios)) {
        apiarios = item.apiarios;
      } else if (item.latitud && item.longitud) {
        // Si tiene coordenadas directas, crear un apiario
        apiarios = [{
          id: `api_${index}_1`,
          nombre: item.nombre_apiario || item.apiario || `Apiario ${nombre}`,
          latitud: parseFloat(item.latitud || item.lat || 0),
          longitud: parseFloat(item.longitud || item.lng || item.lon || 0),
          comuna: comuna,
          region: region,
          cantidadColmenas: parseInt(item.colmenas || item.cantidad_colmenas || item.hives || 0)
        }];
      }

      const totalColmenas = apiarios.reduce((sum: number, api: any) => sum + (api.cantidadColmenas || 0), 0);

      return {
        id: `cpa_direct_${Date.now()}_${index}`,
        nombre: nombre,
        email: email,
        telefono: telefono,
        region: region,
        comuna: comuna,
        apiarios: apiarios,
        totalColmenas: totalColmenas,
        sipecRegistrado: true
      };
    }).filter(item => item.nombre && item.region); // Filtrar datos incompletos
  };

  const handleSaveToDatabase = () => {
    if (parsedData.length > 0) {
      const existing = getApicultoresFromStorage();
      const merged = [...existing, ...parsedData];
      saveApicultoresToStorage(merged);
      alert(`✅ Se guardaron ${parsedData.length} apicultores en la base de datos`);
      setStep(4);
    }
  };

  const copyExampleData = () => {
    const example = `[
  {
    "nombre": "Juan Pérez Soto",
    "email": "jperez@ejemplo.cl",
    "telefono": "+56912345678",
    "region": "O'Higgins",
    "comuna": "Requínoa",
    "apiarios": [
      {
        "id": "api1",
        "nombre": "Apiario Los Álamos",
        "latitud": -34.28,
        "longitud": -70.86,
        "comuna": "Requínoa",
        "region": "O'Higgins",
        "cantidadColmenas": 150
      }
    ]
  }
]`;
    navigator.clipboard.writeText(example);
    alert('✅ Ejemplo copiado al portapapeles');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🔗 Acceso Directo al CPA del SAG</h2>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                s === step
                  ? 'bg-blue-600 text-white'
                  : s < step
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s < step ? '✓' : s}
            </div>
            {s < 4 && (
              <div
                className={`w-12 h-1 ${
                  s < step ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Abrir CPA */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">📋 Paso 1: Abrir el CPA del SAG</h3>
            <p className="text-sm text-blue-800 mb-4">
              Haz clic en el botón para abrir el sistema CPA del SAG en una nueva pestaña. 
              Inicia sesión con tu Clave Única.
            </p>
            <button
              onClick={openCPA}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              🌐 Abrir CPA del SAG
            </button>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-2">📝 Paso 2: Copiar Datos del CPA</h3>
            <p className="text-sm text-amber-800 mb-3">
              Una vez en el CPA, navega hasta la sección de apicultores/apiarios y copia los datos:
            </p>
            <ol className="text-sm text-amber-800 space-y-2 list-decimal list-inside">
              <li>Busca la opción de <strong>"Exportar"</strong> o <strong>"Descargar datos"</strong></li>
              <li>Selecciona formato <strong>JSON</strong>, <strong>CSV</strong> o <strong>Excel</strong></li>
              <li>Si no hay opción de exportar, <strong>selecciona la tabla completa</strong> y cópiala (Ctrl+C)</li>
              <li>Vuelve a esta pestaña y continúa al siguiente paso</li>
            </ol>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">💡 Ejemplo de Formato</h3>
            <p className="text-sm text-gray-700 mb-2">
              Puedes copiar este ejemplo para probar el sistema:
            </p>
            <button
              onClick={copyExampleData}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
            >
              📋 Copiar Ejemplo
            </button>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            Ya copié los datos →
          </button>
        </div>
      )}

      {/* Step 2: Pegar Datos */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">📋 Paso 3: Pegar los Datos</h3>
            <p className="text-sm text-gray-700 mb-3">
              Pega los datos que copiaste del CPA. El sistema acepta:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside mb-4">
              <li>JSON (formato recomendado)</li>
              <li>CSV (separado por comas)</li>
              <li>Tablas copiadas desde Excel o web (separadas por tabs)</li>
            </ul>
            
            <textarea
              value={pastedData}
              onChange={(e) => setPastedData(e.target.value)}
              placeholder="Pega aquí los datos copiados del CPA..."
              className="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-xs resize-vertical"
            />

            {error && (
              <div className="mt-3 bg-red-50 rounded p-3 border border-red-200">
                <p className="text-sm text-red-800">❌ {error}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              ← Atrás
            </button>
            <button
              onClick={handlePasteData}
              disabled={!pastedData.trim()}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Procesar Datos →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmar Datos */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-3">✅ Paso 4: Confirmar Datos</h3>
            <p className="text-sm text-green-800 mb-4">
              Se procesaron correctamente <strong>{parsedData.length} apicultores</strong>.
            </p>
            
            <div className="bg-white rounded p-4 border border-green-300 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">📊 Resumen:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Total de apicultores: <strong>{parsedData.length}</strong></li>
                <li>• Total de apiarios: <strong>{parsedData.reduce((acc, a) => acc + a.apiarios.length, 0)}</strong></li>
                <li>• Total de colmenas: <strong>{parsedData.reduce((acc, a) => acc + a.totalColmenas, 0).toLocaleString()}</strong></li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded p-3 border border-blue-200">
              <p className="text-xs text-blue-800">
                💡 <strong>Vista previa:</strong> Los primeros 3 apicultores:
              </p>
              <div className="mt-2 space-y-2">
                {parsedData.slice(0, 3).map((apicultor, idx) => (
                  <div key={idx} className="bg-white rounded p-2 border border-blue-100 text-xs">
                    <p className="font-semibold">{apicultor.nombre}</p>
                    <p className="text-gray-600">
                      {apicultor.comuna}, {apicultor.region} | {apicultor.apiarios.length} apiario(s) | {apicultor.totalColmenas} colmenas
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              ← Atrás
            </button>
            <button
              onClick={handleSaveToDatabase}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              💾 Guardar en Base de Datos
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Final */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <div className="text-5xl mb-3 text-center">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              ¡Datos Importados Exitosamente!
            </h3>
            <p className="text-gray-700 mb-4 text-center">
              Se guardaron {parsedData.length} apicultores en la base de datos local.
            </p>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">📊 Próximos Pasos:</h4>
              <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
                <li>Ve a la pestaña <strong>"Mis Campos"</strong></li>
                <li>Registra tu campo con coordenadas GPS</li>
                <li>El sistema mostrará automáticamente todos los apiarios en radio de 3km</li>
                <li>Selecciona un producto y genera avisos a todos los apicultores afectados</li>
              </ol>
            </div>
          </div>

          <button
            onClick={() => {
              setStep(1);
              setPastedData('');
              setParsedData([]);
              setError('');
            }}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            🔄 Importar Más Datos
          </button>
        </div>
      )}

      {/* Nota Legal */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          🔒 Este proceso no requiere instalación. Todo se ejecuta en tu navegador.
          <br />
          Tus datos se guardan solo en tu navegador (localStorage) y no se envían a servidores externos.
        </p>
      </div>
    </div>
  );
}
