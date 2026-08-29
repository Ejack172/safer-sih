import React from 'react';
import { Clock } from 'lucide-react';

const NowcastPanel = ({ timelineHour, setTimelineHour }) => {
  const forecasts = [
    { hour: 0, label: 'NOW', risk: 'Moderate', color: 'var(--risk-moderate)', depth: '18 cm' },
    { hour: 1, label: '+1 HR', risk: 'High', color: 'var(--risk-high)', depth: '28 cm' },
    { hour: 2, label: '+2 HR', risk: 'High', color: 'var(--risk-high)', depth: '36 cm' },
    { hour: 3, label: '+3 HR', risk: 'Critical', color: 'var(--risk-critical)', depth: '45 cm' },
  ];

  return (
    <div className="panel nowcast-panel">
      <div className="panel-title">
        <Clock size={14} color="var(--text-main)" /> 0-3 HOUR FLOOD NOWCAST
      </div>
      <div className="text-xs text-muted mb-2">Predicted Flood Risk & Max Water Depth</div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '16px' }}>
        {forecasts.map(fc => (
          <div 
            key={fc.hour}
            onClick={() => setTimelineHour(fc.hour)}
            style={{
              background: timelineHour === fc.hour ? 'rgba(255,255,255,0.05)' : 'transparent',
              border: `1px solid ${timelineHour === fc.hour ? fc.color : 'var(--border-color)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '8px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <div className="text-xs" style={{ color: timelineHour === fc.hour ? 'var(--text-main)' : 'var(--accent-blue)', fontWeight: 600 }}>
              {fc.label}
            </div>
            <div className="text-sm mt-2 mb-2" style={{ color: fc.color, fontWeight: 600 }}>{fc.risk}</div>
            <div className="text-xs">{fc.depth}</div>
          </div>
        ))}
      </div>

      <div className="text-xs text-muted mb-2">Timeline</div>
      <input 
        type="range" 
        className="timeline-slider"
        min="0" max="3" step="1" 
        value={timelineHour}
        onChange={(e) => setTimelineHour(parseInt(e.target.value))}
      />
      <div className="flex justify-between mt-2 text-xs text-muted">
        <span>Now</span>
        <span>+1 Hour</span>
        <span>+2 Hour</span>
        <span>+3 Hour</span>
      </div>
    </div>
  );
};

export default NowcastPanel;
