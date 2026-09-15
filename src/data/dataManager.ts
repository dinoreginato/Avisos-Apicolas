import { ProductoQuimico, ToxicidadAbejas, CategoriaProducto, determinarToxicidad } from './products';

export interface DataSource {
  id: string;
  nombre: string;
  tipo: 'csv' | 'api' | 'manual';
  url?: string;
  ultimaActualizacion?: Date;
  estado: 'activo' | 'inactivo' | 'error';
}

export interface ImportResult {
  exito: number;
  errores: number;
  detalles: string[];
  productos: ProductoQuimico[];
}

// Función para parsear CSV y convertir a productos
export function parseCSV(csvText: string): ImportResult {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const productos: ProductoQuimico[] = [];
  const detalles: string[] = [];
  let errores = 0;

  // Mapeo de columnas esperadas
  const columnMap: Record<string, number> = {};
  headers.forEach((h, i) => {
    if (h.includes('nombre') || h.includes('comercial')) columnMap['nombreComercial'] = i;
    if (h.includes('ingrediente') || h.includes('activo')) columnMap['ingredienteActivo'] = i;
    if (h.includes('categor') || h.includes('tipo')) columnMap['categoria'] = i;
    if (h.includes('dl50') || h.includes('toxicidad') || h.includes('contacto')) columnMap['dl50Contacto'] = i;
    if (h.includes('oral')) columnMap['dl50Oral'] = i;
    if (h.includes('empresa') || h.includes('titular')) columnMap['empresa'] = i;
    if (h.includes('sag') || h.includes('registro')) columnMap['registroSAG'] = i;
    if (h.includes('formulacion')) columnMap['formulacion'] = i;
    if (h.includes('grupo') || h.includes('accion')) columnMap['grupoAccion'] = i;
  });

  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(',').map(v => v.trim());
      
      const nombreComercial = values[columnMap['nombreComercial']] || `Producto ${i}`;
      const ingredienteActivo = values[columnMap['ingredienteActivo']] || 'No especificado';
      const categoriaStr = values[columnMap['categoria']] || 'Insecticida';
      const dl50Str = values[columnMap['dl50Contacto']] || '0';
      const empresa = values[columnMap['empresa']] || 'No especificado';
      const registroSAG = values[columnMap['registroSAG']] || `PQ-${1000 + i}`;
      const formulacion = values[columnMap['formulacion']] || 'No especificado';
      const grupoAccion = values[columnMap['grupoAccion']] || 'N/D';

      // Parsear DL50
      let dl50Contacto = 0;
      const dl50Match = dl50Str.match(/[\d.]+/);
      if (dl50Match) {
        dl50Contacto = parseFloat(dl50Match[0]);
      }

      // Determinar categoría
      let categoria: CategoriaProducto = 'Insecticida';
      const catLower = categoriaStr.toLowerCase();
      if (catLower.includes('fung')) categoria = 'Fungicida';
      else if (catLower.includes('herb')) categoria = 'Herbicida';
      else if (catLower.includes('acar')) categoria = 'Acaricida';
      else if (catLower.includes('nemat')) categoria = 'Nematicida';
      else if (catLower.includes('molu')) categoria = 'Molusquicida';

      // Determinar toxicidad
      const toxicidadAbejas = determinarToxicidad(dl50Contacto);
      const requiereAviso = toxicidadAbejas !== 'prácticamente_no_tóxico';
      const fechaInicioAviso = requiereAviso
        ? (toxicidadAbejas === 'moderadamente_tóxico' ? '26 de abril 2026' : '26 de enero 2026')
        : undefined;

      productos.push({
        id: `import-${Date.now()}-${i}`,
        nombreComercial,
        ingredienteActivo,
        categoria,
        toxicidadAbejas,
        dl50Contacto: `${dl50Contacto} μg/abeja`,
        dl50Oral: values[columnMap['dl50Oral']] || 'N/D',
        empresa,
        registroSAG,
        requiereAviso,
        fechaInicioAviso,
        formulacion,
        grupoAccion
      });

      detalles.push(`✓ ${nombreComercial} importado correctamente`);
    } catch (error) {
      errores++;
      detalles.push(`✗ Error en línea ${i + 1}: ${(error as Error).message}`);
    }
  }

  return {
    exito: productos.length,
    errores,
    detalles,
    productos
  };
}

// Función para generar plantilla CSV
export function generarPlantillaCSV(): string {
  return `nombreComercial,ingredienteActivo,categoria,dl50Contacto,dl50Oral,empresa,registroSAG,formulacion,grupoAccion
Ejemplo Producto 1,Imidacloprid,Insecticida,0.078,0.0038,Bayer,PQ-9999,Concentrado soluble,4A
Ejemplo Producto 2,Glifosato,Herbicida,150,150,Monsanto,PQ-9998,Concentrado soluble,G`;
}

// Simulación de conexión a API Power BI del SAG
export async function fetchFromSAGAPI(): Promise<ImportResult> {
  // En producción, esto se conectaría a la API real de Power BI del SAG
  // URL: https://app.powerbi.com/view?r=eyJrIjoiMTA4ZDRjOWItODE3Yy00NjZlLTg3Y2ItZTgzY2QxY2M4YWQ1IiwidCI6Ijc3ZWNkYTc1LTU5NjQtNDIyYS1hNTM1LTZlYTY3MTU0MDI5YyIsImMiOjR9
  
  // Simulamos una respuesta
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        exito: 0,
        errores: 1,
        detalles: [
          '⚠️ Conexión directa a Power BI SAG no disponible en modo demo',
          'ℹ️ Para datos en tiempo real, descargue la planilla desde:',
          '🔗 http://www.sag.gob.cl/content/planilla-resumida-de-plaguicidas-autorizados',
          '🔗 O use el reporte Power BI:',
          '🔗 https://app.powerbi.com/view?r=eyJrIjoiMTA4ZDRjOWItODE3Yy00NjZlLTg3Y2ItZTgzY2QxY2M4YWQ1IiwidCI6Ijc3ZWNkYTc1LTU5NjQtNDIyYS1hNTM1LTZlYTY3MTU0MDI5YyIsImMiOjR9',
          '',
          '📋 Pasos para actualizar datos:',
          '1. Descargue la planilla Excel desde el sitio del SAG',
          '2. Convierta a formato CSV',
          '3. Importe usando el botón "Importar CSV" en esta aplicación',
          '4. Los datos se actualizarán automáticamente'
        ],
        productos: []
      });
    }, 1500);
  });
}

// Fuentes de datos externas
export const fuentesDatosExternas: DataSource[] = [
  {
    id: 'sag-powerbi',
    nombre: 'SAG - Power BI (Clasificación Ecotoxicológica)',
    tipo: 'api',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiMTA4ZDRjOWItODE3Yy00NjZlLTg3Y2ItZTgzY2QxY2M4YWQ1IiwidCI6Ijc3ZWNkYTc1LTU5NjQtNDIyYS1hNTM1LTZlYTY3MTU0MDI5YyIsImMiOjR9',
    estado: 'activo'
  },
  {
    id: 'sag-planilla',
    nombre: 'SAG - Planilla Resumida de Plaguicidas Autorizados',
    tipo: 'api',
    url: 'http://www.sag.gob.cl/content/planilla-resumida-de-plaguicidas-autorizados',
    estado: 'activo'
  },
  {
    id: 'sag-avisaje',
    nombre: 'SAG - Sistema Consulta Para Avisaje (CPA)',
    tipo: 'api',
    url: 'https://cpa.sag.gob.cl',
    estado: 'activo'
  },
  {
    id: 'epa-ecotox',
    nombre: 'EPA - Ecotoxicity Database',
    tipo: 'api',
    url: 'https://cfpub.epa.gov/ecotox/',
    estado: 'activo'
  }
];

// Estadísticas de la base de datos
export interface DatabaseStats {
  totalProductos: number;
  porCategoria: Record<CategoriaProducto, number>;
  porToxicidad: Record<ToxicidadAbejas, number>;
  requierenAviso: number;
  noRequierenAviso: number;
  ultimaActualizacion: Date;
}

export function calcularEstadisticas(productos: ProductoQuimico[]): DatabaseStats {
  const porCategoria: Record<string, number> = {};
  const porToxicidad: Record<string, number> = {};
  let requierenAviso = 0;

  productos.forEach(p => {
    porCategoria[p.categoria] = (porCategoria[p.categoria] || 0) + 1;
    porToxicidad[p.toxicidadAbejas] = (porToxicidad[p.toxicidadAbejas] || 0) + 1;
    if (p.requiereAviso) requierenAviso++;
  });

  return {
    totalProductos: productos.length,
    porCategoria: porCategoria as Record<CategoriaProducto, number>,
    porToxicidad: porToxicidad as Record<ToxicidadAbejas, number>,
    requierenAviso,
    noRequierenAviso: productos.length - requierenAviso,
    ultimaActualizacion: new Date()
  };
}
