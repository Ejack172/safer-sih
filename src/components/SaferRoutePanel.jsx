import React from 'react';
import { Route, Map as MapIcon } from 'lucide-react';

const SaferRoutePanel = ({ showSaferRoute, setShowSaferRoute }) => {
  return (
    <div className="panel">
      <div className="panel-title mb-4">
        <Route size={14} color="var(--text-main)" /> SAFER ROUTE RECOMMENDATION
      </div>
      <div className="text-xs text-muted mb-4">AI Risk-Aware Routing</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', height: '100%' }}>
        
        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div className="text-xs text-muted mb-1">From</div>
            <select style={{ 
              width: '100%', 
              background: 'var(--bg-panel-light)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-main)', 
              padding: '6px 8px', 
              borderRadius: 'var(--radius-sm)',
              outline: 'none' 
            }}>
              <option>Eco Park</option>
            </select>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">To</div>
            <select style={{ 
              width: '100%', 
              background: 'var(--bg-panel-light)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-main)', 
              padding: '6px 8px', 
              borderRadius: 'var(--radius-sm)',
              outline: 'none' 
            }}>
              <option>Sector V</option>
            </select>
          </div>
          
          <div className="flex gap-4 mt-2">
            <div>
              <div className="text-xs text-muted mb-1">Travel Time</div>
              <div style={{ fontWeight: 600 }}>32 min</div>
            </div>
            <div>
              <div className="text-xs text-muted mb-1">Distance</div>
              <div style={{ fontWeight: 600 }}>9.4 km</div>
            </div>
          </div>

          <button 
            onClick={() => setShowSaferRoute(!showSaferRoute)}
            style={{
              marginTop: 'auto',
              width: '100%',
              padding: '8px',
              background: showSaferRoute ? 'var(--accent-blue-hover)' : 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '13px'
            }}
          >
            {showSaferRoute ? 'Hide Route' : 'Show Safer Route'}
          </button>
        </div>

        {/* Mini Map (SVG Simulation) & Legend */}
        <div style={{ display: 'flex', gap: '12px' }}>
          
          <div style={{ flex: 1, background: 'var(--bg-dark)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
            {/* SVG acting as a mini-map */}
            <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ opacity: 0.8 }}>
              {/* Fake water/terrain */}
              <circle cx="20" cy="80" r="30" fill="#1e3a8a" opacity="0.2" />
              <rect x="60" y="20" width="30" height="20" fill="var(--risk-critical)" opacity="0.2" />
              
              {/* High Risk Route (Red, dashed) */}
              <polyline points="30,20 40,40 45,70 70,80" fill="none" stroke="var(--risk-critical)" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />
              
              {/* Safer Route (Green) */}
              <polyline points="30,20 60,15 80,40 85,60 70,80" fill="none" stroke="var(--risk-low)" strokeWidth="2" opacity={showSaferRoute ? 1 : 0.2} />

              {/* Markers */}
              <circle cx="30" cy="20" r="3" fill="#fff" stroke="var(--risk-low)" strokeWidth="1" />
              <circle cx="70" cy="80" r="3" fill="#fff" stroke="var(--risk-critical)" strokeWidth="1" />
              
              <text x="35" y="18" fill="var(--text-main)" fontSize="6">Eco Park</text>
              <text x="75" y="85" fill="var(--text-main)" fontSize="6">Sector V</text>
            </svg>
          </div>

          <div style={{ width: '100px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
            <div className="text-xs text-muted mb-1" style={{ fontWeight: 600 }}>Routes</div>
            
            <div className="flex items-center gap-2">
              <div style={{ width: 12, height: 2, background: 'var(--risk-critical)', border: '1px dashed transparent' }} />
              <span className="text-xs">High Risk Route</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div style={{ width: 12, height: 2, background: 'var(--risk-low)' }} />
              <span className="text-xs">Safer Route</span>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <div style={{ width: 12, height: 8, background: 'var(--risk-critical)', opacity: 0.2, border: '1px solid var(--risk-critical)' }} />
              <span className="text-xs text-muted">Avoided Risk Zones</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SaferRoutePanel;
