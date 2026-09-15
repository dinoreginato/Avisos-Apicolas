import { useState } from 'react';
import { ApicultorSIPEC } from '../types/fields';
import { saveApicultoresToStorage, getApicultoresFromStorage } from '../services/apicultorService';

interface DataImportProps {
  onImportComplete: () => void;
}

export default function DataImport({ onImportComplete }: DataImportProps) {
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle');
  const [importMessage, setImportMessage] = useState('');
  const [importedCount, setImportedCount] = useState(0);

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportStatus('importing');
    setImportMessage('Procesando archivo...');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        
        // Detectar si es CSV o JSON
        if (file.name.endsWith('.json')) {
          const data = JSON.parse(text);
          processImportedData(data);
        } else if (file.name.endsWith('.csv')) {
          const data = parseCSV(text);
          processImportedData(data);
        } else {
          throw new Error('Formato de archivo no soportado. Use CSV o JSON.');
        }
      } catch (error) {
        setImportStatus('error');
        setImportMessage(`Error al procesar el archivo: ${(error as Error).message}`);
      }
    };

    reader.onerror = () => {
      setImportStatus('error');
      setImportMessage('Error al leer el archivo');
    };

    reader.readAsText(file);
  };

  const parseCSV = (text: string): ApicultorSIPEC[] => {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    const apicultores: ApicultorSIPEC[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      
      // Soporte para múltiples formatos de columnas
      const nombreIdx = headers.findIndex(h => h.includes('nombre') || h.includes('name'));
      const emailIdx = headers.findIndex(h => h.includes('email') || h.includes('correo'));
      const telefonoIdx = headers.findIndex(h => h.includes('telefono') || h.includes('celular') || h.includes('phone'));
      const regionIdx = headers.findIndex(h => h.includes('region') || h.includes('región'));
      const comunaIdx = headers.findIndex(h => h.includes('comuna'));
      const colmenasIdx = headers.findIndex(h => h.includes('colmena') || h.includes('hive'));
      const apiariosIdx = headers.findIndex(h => h.includes('apiario'));
      
      const apicultor: ApicultorSIPEC = {
        id: `imported_${Date.now()}_${i}`,
        nombre: nombreIdx >= 0 ? values[nombreIdx] : '',
        email: emailIdx >= 0 ? values[emailIdx] : '',
        telefono: telefonoIdx >= 0 ? values[telefonoIdx] : '',
        region: regionIdx >= 0 ? values[regionIdx] : '',
        comuna: comunaIdx >= 0 ? values[comunaIdx] : '',
        apiarios: [],
        totalColmenas: colmenasIdx >= 0 ? parseInt(values[colmenasIdx] || '0') : 0,
        sipecRegistrado: true
      };

      // Parsear apiarios si existen (formato JSON)
      if (apiariosIdx >= 0 && values[apiariosIdx]) {
        try {
          apicultor.apiarios = JSON.parse(values[apiariosIdx]);
        } catch (e) {
          console.warn('Error al parsear apiarios para', apicultor.nombre);
        }
      }

      // Si no hay apiarios en formato JSON, crear uno básico con coordenadas
      if (apicultor.apiarios.length === 0) {
        const latIdx = headers.findIndex(h => h.includes('lat'));
        const lngIdx = headers.findIndex(h => h.includes('lng') || h.includes('lon'));
        
        if (latIdx >= 0 && lngIdx >= 0) {
          apicultor.apiarios = [{
            id: `api_${i}_1`,
            nombre: `Apiario ${apicultor.nombre}`,
            latitud: parseFloat(values[latIdx] || '0'),
            longitud: parseFloat(values[lngIdx] || '0'),
            comuna: apicultor.comuna,
            region: apicultor.region,
            cantidadColmenas: apicultor.totalColmenas
          }];
        }
      }

      if (apicultor.nombre && apicultor.region) {
        apicultores.push(apicultor);
      }
    }

    return apicultores;
  };

  const processImportedData = (data: ApicultorSIPEC[]) => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('El archivo no contiene datos válidos');
    }

    // Guardar en localStorage
    const existing = getApicultoresFromStorage();
    const merged = [...existing, ...data];
    saveApicultoresToStorage(merged);

    setImportedCount(data.length);
    setImportStatus('success');
    setImportMessage(`Se importaron ${data.length} apicultores exitosamente`);
    
    setTimeout(() => {
      onImportComplete();
    }, 2000);
  };

  const downloadTemplate = () => {
    // Plantilla simple (un apiario por fila)
    const template = [
      {
        nombre: 'Juan Pérez',
        email: 'juan@ejemplo.cl',
        telefono: '+56912345678',
        region: "O'Higgins",
        comuna: 'Requínoa',
        latitud: -34.28,
        longitud: -70.86,
        colmenas: 150
      },
      {
        nombre: 'María González',
        email: 'maria@ejemplo.cl',
        telefono: '+56987654321',
        region: "O'Higgins",
        comuna: 'Rancagua',
        latitud: -34.17,
        longitud: -70.74,
        colmenas: 200
      }
    ];

    const csv = [
      Object.keys(template[0]).join(','),
      ...template.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_apicultores_simple.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadTemplateAvanzada = () => {
    // Plantilla avanzada (múltiples apiarios en JSON)
    const template = [
      {
        nombre: 'Juan Pérez',
        email: 'juan@ejemplo.cl',
        telefono: '+56912345678',
        region: "O'Higgins",
        comuna: 'Requínoa',
        totalcolmenas: 300,
        apiarios: JSON.stringify([
          {
            id: 'api1',
            nombre: 'Apiario Norte',
            latitud: -34.28,
            longitud: -70.86,
            comuna: 'Requínoa',
            region: "O'Higgins",
            cantidadColmenas: 150
          },
          {
            id: 'api2',
            nombre: 'Apiario Sur',
            latitud: -34.29,
            longitud: -70.87,
            comuna: 'Requínoa',
            region: "O'Higgins",
            cantidadColmenas: 150
          }
        ])
      }
    ];

    const csv = [
      Object.keys(template[0]).join(','),
      ...template.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_apicultores_avanzada.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="font-bold text-gray-800 mb-3">📥 Importar Datos de Apiarios</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Formato soportado:</strong> CSV o JSON
          </p>
          <p className="text-xs text-blue-700 mb-3">
            El archivo debe contener: nombre, email, telefono, region, comuna, totalcolmenas, apiarios (JSON)
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={downloadTemplate}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              📄 Plantilla Simple
            </button>
            <button
              onClick={downloadTemplateAvanzada}
              className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
            >
              📄 Plantilla Avanzada
            </button>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileImport}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer block"
          >
            <div className="text-4xl mb-2">📁</div>
            <p className="text-sm text-gray-600 mb-1">
              Haga clic para seleccionar un archivo
            </p>
            <p className="text-xs text-gray-500">
              CSV o JSON con datos de apicultores
            </p>
          </label>
        </div>

        {importStatus === 'importing' && (
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">⏳ {importMessage}</p>
          </div>
        )}

        {importStatus === 'success' && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800">✅ {importMessage}</p>
            <p className="text-xs text-green-700 mt-1">
              Total importados: {importedCount}
            </p>
          </div>
        )}

        {importStatus === 'error' && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-800">❌ {importMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
