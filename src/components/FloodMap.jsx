import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Popup, Marker, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MAP_CENTER, MAP_ZOOM, generateMockRoads, safeRouteCoords, getRiskColor } from '../data/mockData';
import { AlertTriangle } from 'lucide-react';

// Reset leaflet defaults
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Alert Icon (Red Triangle)
const alertHtml = `<div style="background-color: var(--risk-critical); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);">
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
</div>`;

const alertIcon = L.divIcon({
  html: alertHtml,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});


const Legend = () => {
  return (
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '16px',
      zIndex: 1000,
      background: 'var(--bg-panel)',
      border: '1px solid var(--border-color)',
      padding: '12px',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text-main)',
      minWidth: '140px'
    }}>
      <div className="text-xs" style={{ fontWeight: 600, marginBottom: '8px', letterSpacing: '0.5px' }}>FLOOD RISK MAP</div>
      <div className="text-xs text-muted mb-2">Risk Level</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { label: 'Low', color: 'var(--risk-low)' },
          { label: 'Moderate', color: 'var(--risk-moderate)' },
          { label: 'High', color: 'var(--risk-high)' },
          { label: 'Critical', color: 'var(--risk-critical)' }
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: r.color }} />
            <span className="text-xs">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const FloodMap = ({ timelineHour, showSaferRoute, rainfall }) => {
  const roads = generateMockRoads(rainfall);

  return (
    <div className="map-container">
      <Legend />
      <MapContainer 
        center={MAP_CENTER} 
        zoom={MAP_ZOOM} 
        style={{ height: '100%', width: '100%', zIndex: 1, background: '#090e17' }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        />

        {/* Roads */}
        {roads.map(road => {
          const riskData = road.risksByHour[timelineHour];
          const color = getRiskColor(riskData.level);
          
          // Only show alert icon if risk is critical
          const isCritical = riskData.level === 'Critical';
          const midPoint = road.coordinates[Math.floor(road.coordinates.length / 2)];

          return (
            <React.Fragment key={road.id}>
              <Polyline 
                positions={road.coordinates} 
                color={color}
                weight={isCritical ? 6 : 4}
                opacity={0.8}
              />
              
              {isCritical && (
                <Marker position={midPoint} icon={alertIcon}>
                  <Popup className="custom-popup" style={{ border: '1px solid var(--risk-critical)' }}>
                    <div style={{ padding: '4px' }}>
                      <div style={{ color: 'var(--risk-critical)', fontWeight: 600, fontSize: '11px', letterSpacing: '0.5px', marginBottom: '8px' }}>CRITICAL RISK</div>
                      <div className="text-sm" style={{ color: 'var(--text-main)', marginBottom: '8px' }}>{road.name}</div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                        <span className="text-muted">Predicted Depth:</span>
                        <span>{riskData.depth} cm</span>
                        
                        <span className="text-muted">Impact in:</span>
                        <span>{riskData.timeToImpact}</span>
                        
                        <span className="text-muted">Rainfall:</span>
                        <span>{rainfall} mm/hr</span>
                        
                        <span className="text-muted">Drainage Stress:</span>
                        <span>{road.stress}</span>
                      </div>
                      
                      <button style={{
                        marginTop: '12px',
                        width: '100%',
                        padding: '6px',
                        background: 'var(--bg-panel-light)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        View Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )}
            </React.Fragment>
          );
        })}

        {/* Safer Route */}
        {showSaferRoute && (
          <Polyline 
            positions={safeRouteCoords} 
            color="var(--risk-low)" // Green
            weight={6}
            opacity={0.9}
          >
            <Popup className="custom-popup">
              <div style={{ fontSize: '12px', fontWeight: 600 }}>Suggested AI Safe Route</div>
            </Popup>
          </Polyline>
        )}
      </MapContainer>
    </div>
  );
};

export default FloodMap;
