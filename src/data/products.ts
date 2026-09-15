// Base de datos de productos químicos registrados en el SAG
// con clasificación de toxicidad para abejas según Resolución 7068/2024

export type ToxicidadAbejas = 'muy_tóxico' | 'tóxico' | 'moderadamente_tóxico' | 'prácticamente_no_tóxico';

export type CategoriaProducto = 'Insecticida' | 'Fungicida' | 'Herbicida' | 'Acaricida' | 'Nematicida' | 'Molusquicida';

export interface ProductoQuimico {
  id: string;
  nombreComercial: string;
  ingredienteActivo: string;
  categoria: CategoriaProducto;
  toxicidadAbejas: ToxicidadAbejas;
  dl50Oral: string; // μg/abeja
  empresa: string;
  registroSAG: string;
  requiereAviso: boolean;
  fechaInicioAviso?: string;
  formulacion: string;
}

export interface ClasificacionToxicidad {
  nivel: ToxicidadAbejas;
  label: string;
  color: string;
  rango: string;
  requiereAviso: boolean;
  fechaAviso?: string;
  descripcion: string;
}

export const clasificacionesToxicidad: ClasificacionToxicidad[] = [
  {
    nivel: 'muy_tóxico',
    label: 'Muy Tóxico',
    color: '#dc2626',
    rango: 'DL50 oral < 2 μg/abeja',
    requiereAviso: true,
    fechaAviso: '26 de enero 2026',
    descripcion: 'Producto altamente peligroso para abejas. Requiere aviso con 48h de anticipación.'
  },
  {
    nivel: 'tóxico',
    label: 'Tóxico',
    color: '#ea580c',
    rango: 'DL50 oral 2 - 10.99 μg/abeja',
    requiereAviso: true,
    fechaAviso: '26 de enero 2026',
    descripcion: 'Producto peligroso para abejas. Requiere aviso con 48h de anticipación.'
  },
  {
    nivel: 'moderadamente_tóxico',
    label: 'Moderadamente Tóxico',
    color: '#d97706',
    rango: 'DL50 oral 11 - 25 μg/abeja',
    requiereAviso: true,
    fechaAviso: '26 de abril 2026',
    descripcion: 'Producto con toxicidad moderada para abejas. Requiere aviso con 48h de anticipación.'
  },
  {
    nivel: 'prácticamente_no_tóxico',
    label: 'Prácticamente No Tóxico',
    color: '#16a34a',
    rango: 'DL50 oral > 25 μg/abeja',
    requiereAviso: false,
    descripcion: 'Producto con baja o nula toxicidad para abejas. No requiere aviso.'
  }
];

export const productosQuimicos: ProductoQuimico[] = [
  // Insecticidas - Muy tóxicos para abejas
  {
    id: '1',
    nombreComercial: 'Confidor 200 SL',
    ingredienteActivo: 'Imidacloprid',
    categoria: 'Insecticida',
    toxicidadAbejas: 'muy_tóxico',
    dl50Oral: '0.004 μg/abeja',
    empresa: 'Bayer',
    registroSAG: 'PQ-2847',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Concentrado soluble'
  },
  {
    id: '2',
    nombreComercial: 'Closer 240 SC',
    ingredienteActivo: 'Sulfoxaflor',
    categoria: 'Insecticida',
    toxicidadAbejas: 'muy_tóxico',
    dl50Oral: '0.56 μg/abeja',
    empresa: 'Dow AgroSciences',
    registroSAG: 'PQ-3521',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Suspensión concentrada'
  },
  {
    id: '3',
    nombreComercial: 'Karate Zeon 5 CS',
    ingredienteActivo: 'Lambda-cialotrina',
    categoria: 'Insecticida',
    toxicidadAbejas: 'muy_tóxico',
    dl50Oral: '0.045 μg/abeja',
    empresa: 'Syngenta',
    registroSAG: 'PQ-2156',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Cápsulas en suspensión'
  },
  {
    id: '4',
    nombreComercial: 'Poncho 600 DS',
    ingredienteActivo: 'Clotianidina',
    categoria: 'Insecticida',
    toxicidadAbejas: 'muy_tóxico',
    dl50Oral: '0.003 μg/abeja',
    empresa: 'Bayer',
    registroSAG: 'PQ-3089',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Polvo para tratamiento de semillas'
  },
  {
    id: '5',
    nombreComercial: 'Cruiser 350 FS',
    ingredienteActivo: 'Tiametoxam',
    categoria: 'Insecticida',
    toxicidadAbejas: 'muy_tóxico',
    dl50Oral: '0.005 μg/abeja',
    empresa: 'Syngenta',
    registroSAG: 'PQ-2934',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Suspensión para tratamiento de semillas'
  },
  // Insecticidas - Tóxicos
  {
    id: '6',
    nombreComercial: 'Tamaron 500 EC',
    ingredienteActivo: 'Metamidofós',
    categoria: 'Insecticida',
    toxicidadAbejas: 'tóxico',
    dl50Oral: '2.1 μg/abeja',
    empresa: 'BASF',
    registroSAG: 'PQ-1234',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Concentrado emulsionable'
  },
  {
    id: '7',
    nombreComercial: 'Decis 25 EC',
    ingredienteActivo: 'Deltametrina',
    categoria: 'Insecticida',
    toxicidadAbejas: 'tóxico',
    dl50Oral: '3.5 μg/abeja',
    empresa: 'Bayer',
    registroSAG: 'PQ-1876',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Concentrado emulsionable'
  },
  {
    id: '8',
    nombreComercial: 'Fastac 100 EC',
    ingredienteActivo: 'Alfacipermetrina',
    categoria: 'Insecticida',
    toxicidadAbejas: 'tóxico',
    dl50Oral: '4.2 μg/abeja',
    empresa: 'BASF',
    registroSAG: 'PQ-2045',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Concentrado emulsionable'
  },
  {
    id: '9',
    nombreComercial: 'Sumithion 500 EC',
    ingredienteActivo: 'Fenitrotion',
    categoria: 'Insecticida',
    toxicidadAbejas: 'tóxico',
    dl50Oral: '8.7 μg/abeja',
    empresa: 'Sumitomo Chemical',
    registroSAG: 'PQ-1567',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Concentrado emulsionable'
  },
  // Insecticidas - Moderadamente tóxicos
  {
    id: '10',
    nombreComercial: 'Lannate 90 SP',
    ingredienteActivo: 'Metomil',
    categoria: 'Insecticida',
    toxicidadAbejas: 'moderadamente_tóxico',
    dl50Oral: '15.2 μg/abeja',
    empresa: 'DuPont',
    registroSAG: 'PQ-1456',
    requiereAviso: true,
    fechaInicioAviso: '26 de abril 2026',
    formulacion: 'Polvo soluble'
  },
  {
    id: '11',
    nombreComercial: 'Sevin 480 EC',
    ingredienteActivo: 'Carbaril',
    categoria: 'Insecticida',
    toxicidadAbejas: 'moderadamente_tóxico',
    dl50Oral: '12.5 μg/abeja',
    empresa: 'Bayer',
    registroSAG: 'PQ-1234',
    requiereAviso: true,
    fechaInicioAviso: '26 de abril 2026',
    formulacion: 'Concentrado emulsionable'
  },
  {
    id: '12',
    nombreComercial: 'Dimetoato 400',
    ingredienteActivo: 'Dimetoato',
    categoria: 'Insecticida',
    toxicidadAbejas: 'moderadamente_tóxico',
    dl50Oral: '22.0 μg/abeja',
    empresa: 'Anasac',
    registroSAG: 'PQ-0987',
    requiereAviso: true,
    fechaInicioAviso: '26 de abril 2026',
    formulacion: 'Concentrado emulsionable'
  },
  // Insecticidas - Prácticamente no tóxicos
  {
    id: '13',
    nombreComercial: 'Dipel DF',
    ingredienteActivo: 'Bacillus thuringiensis var. kurstaki',
    categoria: 'Insecticida',
    toxicidadAbejas: 'prácticamente_no_tóxico',
    dl50Oral: '> 100 μg/abeja',
    empresa: 'BASF',
    registroSAG: 'PQ-1678',
    requiereAviso: false,
    formulacion: 'Polvo mojable'
  },
  {
    id: '14',
    nombreComercial: 'Capture 240 EC',
    ingredienteActivo: 'Bifentrina',
    categoria: 'Insecticida',
    toxicidadAbejas: 'prácticamente_no_tóxico',
    dl50Oral: '35.0 μg/abeja',
    empresa: 'FMC',
    registroSAG: 'PQ-2234',
    requiereAviso: false,
    formulacion: 'Concentrado emulsionable'
  },
  // Fungicidas
  {
    id: '15',
    nombreComercial: 'Ridomil Gold MZ',
    ingredienteActivo: 'Metalaxil-M + Mancozeb',
    categoria: 'Fungicida',
    toxicidadAbejas: 'prácticamente_no_tóxico',
    dl50Oral: '> 50 μg/abeja',
    empresa: 'Syngenta',
    registroSAG: 'PQ-2567',
    requiereAviso: false,
    formulacion: 'Gránulos dispersables'
  },
  {
    id: '16',
    nombreComercial: 'Amistar Xtra',
    ingredienteActivo: 'Azoxistrobin + Ciproconazol',
    categoria: 'Fungicida',
    toxicidadAbejas: 'moderadamente_tóxico',
    dl50Oral: '18.5 μg/abeja',
    empresa: 'Syngenta',
    registroSAG: 'PQ-3102',
    requiereAviso: true,
    fechaInicioAviso: '26 de abril 2026',
    formulacion: 'Suspensión concentrada'
  },
  {
    id: '17',
    nombreComercial: 'Score 250 EC',
    ingredienteActivo: 'Difenoconazol',
    categoria: 'Fungicida',
    toxicidadAbejas: 'prácticamente_no_tóxico',
    dl50Oral: '> 50 μg/abeja',
    empresa: 'Syngenta',
    registroSAG: 'PQ-2345',
    requiereAviso: false,
    formulacion: 'Concentrado emulsionable'
  },
  // Herbicidas
  {
    id: '18',
    nombreComercial: 'Roundup Power Max',
    ingredienteActivo: 'Glifosato',
    categoria: 'Herbicida',
    toxicidadAbejas: 'prácticamente_no_tóxico',
    dl50Oral: '> 100 μg/abeja',
    empresa: 'Bayer',
    registroSAG: 'PQ-1890',
    requiereAviso: false,
    formulacion: 'Concentrado soluble'
  },
  {
    id: '19',
    nombreComercial: '2,4-Damina 720',
    ingredienteActivo: '2,4-D',
    categoria: 'Herbicida',
    toxicidadAbejas: 'prácticamente_no_tóxico',
    dl50Oral: '> 50 μg/abeja',
    empresa: 'Anasac',
    registroSAG: 'PQ-0678',
    requiereAviso: false,
    formulacion: 'Concentrado soluble'
  },
  // Acaricidas
  {
    id: '20',
    nombreComercial: 'Enidor 240 SC',
    ingredienteActivo: 'Spirodiclofen',
    categoria: 'Acaricida',
    toxicidadAbejas: 'tóxico',
    dl50Oral: '5.8 μg/abeja',
    empresa: 'Bayer',
    registroSAG: 'PQ-3234',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Suspensión concentrada'
  },
  {
    id: '21',
    nombreComercial: 'Abamectina 18 EC',
    ingredienteActivo: 'Abamectina',
    categoria: 'Acaricida',
    toxicidadAbejas: 'muy_tóxico',
    dl50Oral: '0.02 μg/abeja',
    empresa: 'Anasac',
    registroSAG: 'PQ-2678',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Concentrado emulsionable'
  },
  // Más productos variados
  {
    id: '22',
    nombreComercial: 'Actara 25 WG',
    ingredienteActivo: 'Tiametoxam',
    categoria: 'Insecticida',
    toxicidadAbejas: 'muy_tóxico',
    dl50Oral: '0.005 μg/abeja',
    empresa: 'Syngenta',
    registroSAG: 'PQ-2935',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Gránulos dispersables'
  },
  {
    id: '23',
    nombreComercial: 'Mospilan 20 SG',
    ingredienteActivo: 'Acetamiprid',
    categoria: 'Insecticida',
    toxicidadAbejas: 'tóxico',
    dl50Oral: '4.6 μg/abeja',
    empresa: 'Nisso Chemical',
    registroSAG: 'PQ-2876',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Gránulos solubles'
  },
  {
    id: '24',
    nombreComercial: 'Plenum 50 WG',
    ingredienteActivo: 'Pirimicarb',
    categoria: 'Insecticida',
    toxicidadAbejas: 'prácticamente_no_tóxico',
    dl50Oral: '> 25 μg/abeja',
    empresa: 'Syngenta',
    registroSAG: 'PQ-2456',
    requiereAviso: false,
    formulacion: 'Gránulos dispersables'
  },
  {
    id: '25',
    nombreComercial: 'Vertimec 18 EC',
    ingredienteActivo: 'Abamectina',
    categoria: 'Insecticida',
    toxicidadAbejas: 'muy_tóxico',
    dl50Oral: '0.03 μg/abeja',
    empresa: 'Syngenta',
    registroSAG: 'PQ-2567',
    requiereAviso: true,
    fechaInicioAviso: '26 de enero 2026',
    formulacion: 'Concentrado emulsionable'
  }
];

// Regiones y comunas de Chile
export const regionesChile = [
  { id: '1', nombre: 'Arica y Parinacota' },
  { id: '2', nombre: 'Tarapacá' },
  { id: '3', nombre: 'Antofagasta' },
  { id: '4', nombre: 'Atacama' },
  { id: '5', nombre: 'Coquimbo' },
  { id: '6', nombre: 'Valparaíso' },
  { id: '7', nombre: 'Metropolitana' },
  { id: '8', nombre: "O'Higgins" },
  { id: '9', nombre: 'Maule' },
  { id: '10', nombre: 'Ñuble' },
  { id: '11', nombre: 'Biobío' },
  { id: '12', nombre: 'La Araucanía' },
  { id: '13', nombre: 'Los Ríos' },
  { id: '14', nombre: 'Los Lagos' },
  { id: '15', nombre: 'Aysén' },
  { id: '16', nombre: 'Magallanes' },
];
