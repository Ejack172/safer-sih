import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { mockAlerts } from '../data/mockData';

const AlertsPanel = () => {
  return (
    <div className="panel alerts-panel">
      <div className="panel-title">
        <AlertTriangle size={14} color="var(--text-main)" /> EARLY WARNING ALERTS
      </div>
      <div className="text-xs text-muted mb-4">Real-time AI Generated Alerts</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {mockAlerts.map(alert => (
          <div key={alert.id} style={{ 
            display: 'flex', 
            gap: '12px',
            padding: '12px',
            background: 'var(--bg-panel-light)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: `2px solid ${alert.type === 'Critical' ? 'var(--risk-critical)' : 'var(--risk-moderate)'}`
          }}>
            <div>
              <AlertTriangle size={16} color={alert.type === 'Critical' ? 'var(--risk-critical)' : 'var(--risk-moderate)'} />
            </div>
            <div>
              <div className="flex gap-2 items-center mb-1">
                <span className="text-xs text-muted">{alert.time}</span>
                <span className="text-sm" style={{ fontWeight: 500, color: 'var(--text-main)' }}>{alert.message}</span>
              </div>
              <div className="text-xs text-muted">{alert.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4" style={{ textAlign: 'right' }}>
        <a href="#" className="text-xs" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 500 }}>
          View All Alerts →
        </a>
      </div>
    </div>
  );
};

export default AlertsPanel;
