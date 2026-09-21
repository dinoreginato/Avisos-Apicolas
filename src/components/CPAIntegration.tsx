import { useState } from 'react';
import { saveApicultoresToStorage, getApicultoresFromStorage } from '../services/apicultorService';
import { ApicultorSIPEC } from '../types/fields';

export default function CPAIntegration() {
  const [step, setStep] = useState(1);
  const [claveUnica, setClaveUnica] = useState('');
  const [showClave, setShowClave] = useState(false);
  const [importedData, setImportedData] = useState<ApicultorSIPEC[]>([]);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text);
        
        if (Array.isArray(data) && data.length > 0) {
          setImportedData(data);
          setImportStatus('success');
          setStep(4);
        } else {
          setImportStatus('error');
        }
      } catch (error) {
        console.error('Error al procesar el archivo:', error);
        setImportStatus('error');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveToDatabase = () => {
    if (importedData.length > 0) {
      const existing = getApicultoresFromStorage();
      const merged = [...existing, ...importedData];
      saveApicultoresToStorage(merged);
      alert(`✅ Se guardaron ${importedData.length} apicultores en la base de datos`);
      setStep(5);
    }
  };

  const downloadScript = () => {
    const script = `#!/usr/bin/env python3
"""
Script para extraer datos de apicultores del CPA del SAG
Requiere: Python 3.7+, requests, beautifulsoup4

Instalación:
pip install requests beautifulsoup4

Uso:
python extraer_cpa_sag.py
"""

import requests
from bs4 import BeautifulSoup
import json
import time

# Configuración
CPA_URL = "https://cpa.sag.gob.cl"
OUTPUT_FILE = "apicultores_cpa.json"

def main():
    print("=" * 60)
    print("EXTRACTOR DE DATOS CPA - SAG")
    print("=" * 60)
    print()
    
    # Solicitar Clave Única
    print("⚠️  IMPORTANTE:")
    print("Este script requiere tu Clave Única del SAG.")
    print("Tus credenciales NO se almacenan ni se envían a terceros.")
    print()
    
    rut = input("Ingresa tu RUT (sin puntos ni guión): ").strip()
    clave = input("Ingresa tu Clave Única: ").strip()
    
    print()
    print("🔐 Iniciando sesión en CPA...")
    
    # Crear sesión
    session = requests.Session()
    
    # Paso 1: Obtener token CSRF
    try:
        response = session.get(f"{CPA_URL}/login")
        soup = BeautifulSoup(response.text, 'html.parser')
        csrf_token = soup.find('input', {'name': '_token'})
        
        if not csrf_token:
            print("❌ Error: No se pudo obtener el token CSRF")
            return
        
        token = csrf_token['value']
        print("✅ Token CSRF obtenido")
    except Exception as e:
        print(f"❌ Error al acceder al CPA: {e}")
        return
    
    # Paso 2: Login
    try:
        login_data = {
            '_token': token,
            'rut': rut,
            'password': clave
        }
        
        response = session.post(
            f"{CPA_URL}/login",
            data=login_data,
            allow_redirects=True
        )
        
        if "dashboard" in response.url or "home" in response.url:
            print("✅ Login exitoso")
        else:
            print("❌ Error: Credenciales inválidas")
            return
    except Exception as e:
        print(f"❌ Error en login: {e}")
        return
    
    # Paso 3: Extraer datos
    print()
    print("🔍 Extrayendo datos de apicultores...")
    
    apicultores = []
    
    # Regiones de Chile
    regiones = [
        "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama",
        "Coquimbo", "Valparaíso", "Metropolitana", "O'Higgins",
        "Maule", "Ñuble", "Biobío", "La Araucanía", "Los Ríos",
        "Los Lagos", "Aysén", "Magallanes"
    ]
    
    for region in regiones:
        print(f"  📍 Procesando {region}...")
        
        try:
            # Consultar API del CPA para esta región
            response = session.get(
                f"{CPA_URL}/api/apicultores",
                params={"region": region}
            )
            
            if response.status_code == 200:
                data = response.json()
                
                for apicultor in data:
                    apicultores.append({
                        "id": f"cpa_{apicultor.get('id', '')}",
                        "nombre": apicultor.get('nombre', ''),
                        "email": apicultor.get('email', ''),
                        "telefono": apicultor.get('telefono', ''),
                        "region": region,
                        "comuna": apicultor.get('comuna', ''),
                        "apiarios": apicultor.get('apiarios', []),
                        "totalColmenas": sum(
                            a.get('cantidadColmenas', 0) 
                            for a in apicultor.get('apiarios', [])
                        ),
                        "sipecRegistrado": True
                    })
                
                print(f"    ✅ {len(data)} apicultores encontrados")
            else:
                print(f"    ⚠️  No se pudieron obtener datos de {region}")
                
        except Exception as e:
            print(f"    ❌ Error en {region}: {e}")
        
        # Pausa para no saturar el servidor
        time.sleep(1)
    
    # Paso 4: Guardar resultados
    print()
    print(f"💾 Guardando {len(apicultores)} apicultores...")
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(apicultores, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Datos guardados en: {OUTPUT_FILE}")
    print()
    print("=" * 60)
    print("RESUMEN")
    print("=" * 60)
    print(f"Total de apicultores extraídos: {len(apicultores)}")
    print(f"Archivo generado: {OUTPUT_FILE}")
    print()
    print("📋 Próximos pasos:")
    print("1. Abre la aplicación de Avisaje Apícola")
    print("2. Ve a la pestaña 'Actualizar Datos'")
    print("3. Selecciona 'CPA Integration'")
    print("4. Importa el archivo generado")
    print()

if __name__ == "__main__":
    main()
`;

    const blob = new Blob([script], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extraer_cpa_sag.py';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🔗 Integración con CPA del SAG</h2>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3, 4, 5].map((s) => (
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
            {s < 5 && (
              <div
                className={`w-12 h-1 ${
                  s < step ? 'bg-green-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Información */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">📋 ¿Qué es el CPA?</h3>
            <p className="text-sm text-blue-800">
              El <strong>Consulta Para Avisaje (CPA)</strong> es el sistema oficial del SAG que contiene
              todos los apiarios registrados en Chile. Con tu Clave Única, puedes acceder y extraer
              los datos completos de apicultores.
            </p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-2">⚠️ Requisitos</h3>
            <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
              <li>Clave Única del SAG (personal)</li>
              <li>Python 3.7+ instalado en tu computador</li>
              <li>Conexión a internet</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">🔒 Seguridad</h3>
            <p className="text-sm text-green-800">
              Tus credenciales se usan solo localmente en tu computador. El script no envía
              tus datos a ningún servidor externo.
            </p>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Continuar →
          </button>
        </div>
      )}

      {/* Step 2: Descargar Script */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">📥 Paso 1: Descargar Script</h3>
            <p className="text-sm text-gray-700 mb-4">
              Descarga el script Python que extraerá los datos del CPA usando tu Clave Única.
            </p>
            <button
              onClick={downloadScript}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              📥 Descargar Script Python
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">⚙️ Paso 2: Instalar Dependencias</h3>
            <p className="text-sm text-gray-700 mb-2">
              Abre una terminal y ejecuta:
            </p>
            <code className="block bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
              pip install requests beautifulsoup4
            </code>
          </div>

          <button
            onClick={() => setStep(3)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Continuar →
          </button>
        </div>
      )}

      {/* Step 3: Ejecutar Script */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">🚀 Paso 3: Ejecutar Script</h3>
            <p className="text-sm text-gray-700 mb-2">
              Ejecuta el script en tu terminal:
            </p>
            <code className="block bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto mb-4">
              python extraer_cpa_sag.py
            </code>
            <p className="text-sm text-gray-700 mb-2">
              El script te pedirá:
            </p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside mb-4">
              <li>Tu RUT (sin puntos ni guión)</li>
              <li>Tu Clave Única</li>
            </ul>
            <div className="bg-amber-50 rounded p-3 border border-amber-200">
              <p className="text-xs text-amber-800">
                ⏱️ El proceso puede tomar 5-10 minutos mientras extrae datos de todas las regiones.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">📄 Paso 4: Importar Archivo</h3>
            <p className="text-sm text-gray-700 mb-4">
              Una vez que el script termine, generará un archivo <code>apicultores_cpa.json</code>.
              Impórtalo aquí:
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {importStatus === 'success' && (
              <div className="mt-3 bg-green-50 rounded p-3 border border-green-200">
                <p className="text-sm text-green-800">
                  ✅ Se encontraron {importedData.length} apicultores en el archivo
                </p>
              </div>
            )}
            {importStatus === 'error' && (
              <div className="mt-3 bg-red-50 rounded p-3 border border-red-200">
                <p className="text-sm text-red-800">
                  ❌ Error al procesar el archivo. Verifica que sea un JSON válido.
                </p>
              </div>
            )}
          </div>

          {importedData.length > 0 && (
            <button
              onClick={handleSaveToDatabase}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              💾 Guardar en Base de Datos ({importedData.length} apicultores)
            </button>
          )}
        </div>
      )}

      {/* Step 4: Confirmación */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-6 border border-green-200 text-center">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-green-900 mb-2">
              ¡Datos Importados Exitosamente!
            </h3>
            <p className="text-green-800 mb-4">
              Se guardaron {importedData.length} apicultores en la base de datos local.
            </p>
            <div className="bg-white rounded p-4 border border-green-300">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Resumen:</strong>
              </p>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Total de apicultores: {importedData.length}</li>
                <li>• Total de apiarios: {importedData.reduce((acc, a) => acc + a.apiarios.length, 0)}</li>
                <li>• Total de colmenas: {importedData.reduce((acc, a) => acc + a.totalColmenas, 0)}</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => setStep(5)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Finalizar →
          </button>
        </div>
      )}

      {/* Step 5: Final */}
      {step === 5 && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <div className="text-5xl mb-3 text-center">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              ¡Proceso Completado!
            </h3>
            <p className="text-gray-700 mb-4 text-center">
              Ahora tienes acceso a todos los apiarios registrados en el CPA del SAG.
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
              setImportedData([]);
              setImportStatus('idle');
            }}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
          >
            🔄 Reiniciar Proceso
          </button>
        </div>
      )}

      {/* Nota Legal */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          🔒 Tus credenciales se usan solo localmente. Esta aplicación no almacena ni transmite tu Clave Única.
          <br />
          El acceso al CPA es para uso personal según la Ley 19.880 de Procedimientos Administrativos.
        </p>
      </div>
    </div>
  );
}
