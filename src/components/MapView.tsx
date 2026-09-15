import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Campo, Apiario, calcularDistanciaKm, ZONA_AVISAJE_KM } from '../data/fields';

interface MapViewProps {
  campos: Campo[];
  apiarios: Apiario[];
  campoSeleccionado?: Campo | null;
  apiariosEnZona?: Apiario[];
  onCampoClick?: (campo: Campo) => void;
  onApiarioClick?: (apiario: Apiario) => void;
  center?: [number, number];
  zoom?: number;
}

export default function MapView({
  campos,
  apiarios,
  campoSeleccionado,
  apiariosEnZona,
  onCampoClick,
  onApiarioClick,
  center = [-34.5, -71.0],
  zoom = 6
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Limpiar capas previas
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Circle) {
        map.removeLayer(layer);
      }
    });

    // Iconos personalizados
    const campoIcon = L.divIcon({
      html: '<div style="background:#2563eb;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;">🌾</div>',
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const apiarioIcon = L.divIcon({
      html: '<div style="background:#f59e0b;width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;">🐝</div>',
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const apiarioEnZonaIcon = L.divIcon({
      html: '<div style="background:#dc2626;width:28px;height:28px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(220,38,38,0.5);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;animation:pulse 1.5s infinite;">🐝</div>',
      className: 'custom-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const campoSeleccionadoIcon = L.divIcon({
      html: '<div style="background:#16a34a;width:32px;height:32px;border-radius:50%;border:4px solid white;box-shadow:0 2px 10px rgba(22,163,74,0.5);display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">🌾</div>',
      className: 'custom-marker',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    // Agregar marcadores de campos
    campos.forEach(campo => {
      const isSelected = campoSeleccionado?.id === campo.id;
      const marker = L.marker([campo.latitud, campo.longitud], {
        icon: isSelected ? campoSeleccionadoIcon : campoIcon
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width:200px;">
          <h3 style="margin:0 0 5px;font-weight:bold;color:#2563eb;">🌾 ${campo.nombre}</h3>
          <p style="margin:2px 0;"><strong>Propietario:</strong> ${campo.propietario}</p>
          <p style="margin:2px 0;"><strong>Cultivo:</strong> ${campo.cultivo}</p>
          <p style="margin:2px 0;"><strong>Hectáreas:</strong> ${campo.hectareas} ha</p>
          <p style="margin:2px 0;"><strong>Comuna:</strong> ${campo.comuna}</p>
          <p style="margin:2px 0;font-size:11px;color:#666;">Lat: ${campo.latitud.toFixed(4)}, Lng: ${campo.longitud.toFixed(4)}</p>
        </div>
      `);

      if (onCampoClick) {
        marker.on('click', () => onCampoClick(campo));
      }
    });

    // Agregar marcadores de apiarios
    const apiariosEnZonaIds = apiariosEnZona?.map(a => a.id) || [];

    apiarios.forEach(apiario => {
      const isInZone = apiariosEnZonaIds.includes(apiario.id);
      const marker = L.marker([apiario.latitud, apiario.longitud], {
        icon: isInZone ? apiarioEnZonaIcon : apiarioIcon
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width:200px;">
          <h3 style="margin:0 0 5px;font-weight:bold;color:#f59e0b;">🐝 ${apiario.nombre}</h3>
          <p style="margin:2px 0;"><strong>Apicultor:</strong> ${apiario.apicultor}</p>
          <p style="margin:2px 0;"><strong>Colmenas:</strong> ${apiario.cantidadColmenas}</p>
          <p style="margin:2px 0;"><strong>Comuna:</strong> ${apiario.comuna}</p>
          <p style="margin:2px 0;"><strong>Email:</strong> ${apiario.contactoEmail}</p>
          ${isInZone ? '<p style="margin:5px 0 0;padding:4px 8px;background:#fef2f2;color:#dc2626;border-radius:4px;font-weight:bold;">⚠️ EN ZONA DE AVISAJE</p>' : ''}
        </div>
      `);

      if (onApiarioClick) {
        marker.on('click', () => onApiarioClick(apiario));
      }
    });

    // Dibujar zona de influencia si hay campo seleccionado
    if (campoSeleccionado) {
      L.circle([campoSeleccionado.latitud, campoSeleccionado.longitud], {
        radius: ZONA_AVISAJE_KM * 1000,
        color: '#dc2626',
        fillColor: '#dc2626',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '5, 10'
      }).addTo(map);

      // Dibujar líneas a apiarios en zona
      apiariosEnZona?.forEach(apiario => {
        const distancia = calcularDistanciaKm(
          campoSeleccionado.latitud, campoSeleccionado.longitud,
          apiario.latitud, apiario.longitud
        );
        L.polyline(
          [[campoSeleccionado.latitud, campoSeleccionado.longitud], [apiario.latitud, apiario.longitud]],
          { color: '#dc2626', weight: 1.5, dashArray: '3, 6', opacity: 0.7 }
        ).addTo(map);

        // Etiqueta de distancia
        const midLat = (campoSeleccionado.latitud + apiario.latitud) / 2;
        const midLng = (campoSeleccionado.longitud + apiario.longitud) / 2;
        const distIcon = L.divIcon({
          html: `<div style="background:white;padding:2px 6px;border-radius:10px;font-size:10px;font-weight:bold;color:#dc2626;border:1px solid #dc2626;white-space:nowrap;">${distancia.toFixed(1)} km</div>`,
          className: 'distance-label',
          iconSize: [60, 20],
          iconAnchor: [30, 10]
        });
        L.marker([midLat, midLng], { icon: distIcon }).addTo(map);
      });

      map.setView([campoSeleccionado.latitud, campoSeleccionado.longitud], 12);
    }

  }, [campos, apiarios, campoSeleccionado, apiariosEnZona, onCampoClick, onApiarioClick]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gray-200">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <p className="text-xs font-semibold text-gray-700 mb-1">Leyenda:</p>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-4 h-4 rounded-full bg-blue-600 inline-flex items-center justify-center text-[8px]">🌾</span>
          <span>Campos</span>
        </div>
        <div className="flex items-center gap-2 text-xs mt-1">
          <span className="w-4 h-4 rounded-full bg-amber-500 inline-flex items-center justify-center text-[8px]">🐝</span>
          <span>Apiarios</span>
        </div>
        <div className="flex items-center gap-2 text-xs mt-1">
          <span className="w-4 h-4 rounded-full bg-red-600 inline-flex items-center justify-center text-[8px]">🐝</span>
          <span>En zona aviso</span>
        </div>
        <div className="flex items-center gap-2 text-xs mt-1">
          <span className="w-4 h-1 border-t-2 border-dashed border-red-500 inline-block"></span>
          <span>Zona 3km</span>
        </div>
      </div>
    </div>
  );
}
