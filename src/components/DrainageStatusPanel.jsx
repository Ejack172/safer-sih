import React from 'react';
import { Database } from 'lucide-react';

const DrainageStatusPanel = () => {
  // SVG Gauge calculations for 135% (over 100%, maxed out visually at say 180 degrees)
  const radius = 60;
  const circumference = radius * Math.PI;
  // Visually cap it at max (100% of the semi circle)
  const strokeDashoffset = 0; 

  return (
    <div className="panel">
      <div className="flex justify-between items-center mb-4">
        <div className="panel-title" style={{ margin: 0 }}>
          <Database size={14} color="var(--text-main)" /> DRAINAGE STATUS
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: '24px', height: '12px', background: 'var(--accent-blue)', borderRadius: '6px' }}>
            <div style={{ width: '10px', height: '10px', background: '#fff', borderRadius: '50%', margin: '1px 1px 1px 13px' }} />
          </div>
          <span className="text-xs text-muted">Show Network</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', height: '100%' }}>
        
        {/* Gauge */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '140px', height: '70px', overflow: 'hidden' }}>
            {/* Background Track */}
            <svg width="140" height="70" viewBox="0 0 140 70">
              <path 
                d="M 10 70 A 60 60 0 0 1 130 70" 
                fill="none" 
                stroke="var(--bg-panel-light)" 
                strokeWidth="12" 
                strokeLinecap="round"
              />
              {/* Foreground Track (Red for >100%) */}
              <path 
                d="M 10 70 A 60 60 0 0 1 130 70" 
                fill="none" 
                stroke="var(--risk-critical)" 
                strokeWidth="12" 
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center' }}>
              <div className="value-lg" style={{ color: 'var(--risk-critical)' }}>135%</div>
              <div className="text-xs" style={{ color: 'var(--risk-critical)' }}>Over Capacity</div>
            </div>
          </div>
          <div className="text-xs text-muted mt-4" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <span>Capacity:</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>165 m³/s</span>
          </div>
          <div className="text-xs text-muted mt-1" style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <span>Inflow:</span>
            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>223 m³/s</span>
          </div>
        </div>

        {/* Stats text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px', borderLeft: '1px solid var(--border-color)', paddingLeft: '16px' }}>
          <div>
            <div className="text-xs text-muted mb-1">Critical Nodes</div>
            <div className="value-lg" style={{ color: 'var(--risk-critical)' }}>5 <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/ 18</span></div>
            <div className="text-xs" style={{ color: 'var(--risk-critical)' }}>Overloaded</div>
          </div>
          <div>
            <div className="text-xs text-muted mb-1">Pump Stations</div>
            <div className="value-lg" style={{ color: 'var(--risk-low)' }}>4 <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/ 4</span></div>
            <div className="text-xs text-muted">Online</div>
          </div>
          
          <div className="flex gap-4 mt-auto">
             <div className="flex items-center gap-2">
               <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--risk-low)' }} />
               <span className="text-xs text-muted">Normal</span>
             </div>
             <div className="flex items-center gap-2">
               <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--risk-critical)' }} />
               <span className="text-xs text-muted">Overloaded</span>
             </div>
          </div>
        </div>

        {/* Network Mini Map (SVG Simulation) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            {/* Lines representing pipes */}
            <line x1="20" y1="20" x2="80" y2="20" stroke="var(--risk-low)" strokeWidth="1" />
            <line x1="20" y1="50" x2="80" y2="50" stroke="var(--risk-critical)" strokeWidth="2" />
            <line x1="20" y1="80" x2="80" y2="80" stroke="var(--risk-low)" strokeWidth="1" />
            
            <line x1="20" y1="20" x2="20" y2="80" stroke="var(--risk-low)" strokeWidth="1" />
            <line x1="50" y1="20" x2="50" y2="80" stroke="var(--risk-critical)" strokeWidth="2" />
            <line x1="80" y1="20" x2="80" y2="80" stroke="var(--risk-low)" strokeWidth="1" />

            <line x1="20" y1="20" x2="50" y2="50" stroke="var(--risk-low)" strokeWidth="1" />
            <line x1="50" y1="50" x2="80" y2="80" stroke="var(--risk-moderate)" strokeWidth="1.5" />

            {/* Nodes */}
            <circle cx="20" cy="20" r="3" fill="var(--risk-low)" />
            <circle cx="50" cy="20" r="3" fill="var(--risk-low)" />
            <circle cx="80" cy="20" r="3" fill="var(--risk-low)" />
            
            <circle cx="20" cy="50" r="3" fill="var(--risk-moderate)" />
            <circle cx="50" cy="50" r="4" fill="var(--risk-critical)" />
            <circle cx="80" cy="50" r="4" fill="var(--risk-critical)" />

            <circle cx="20" cy="80" r="3" fill="var(--risk-low)" />
            <circle cx="50" cy="80" r="3" fill="var(--risk-low)" />
            <circle cx="80" cy="80" r="3" fill="var(--risk-low)" />
          </svg>
        </div>

      </div>
    </div>
  );
};

export default DrainageStatusPanel;
