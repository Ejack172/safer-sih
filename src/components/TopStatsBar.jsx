import React from 'react';
import { CloudRain, Droplets, Database, Activity, AlertTriangle, ArrowUp } from 'lucide-react';

const TopStatsBar = ({ rainfall }) => {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <CloudRain size={24} color="var(--text-muted)" />
        <div>
          <div className="text-xs text-muted" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>RAINFALL INTENSITY</div>
          <div className="value-lg" style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            {rainfall} <span style={{ fontSize: '12px', fontWeight: 'normal' }}>mm/hr</span>
          </div>
          <div className="text-xs" style={{ color: 'var(--text-main)' }}>High</div>
        </div>
      </div>

      <div className="stat-card">
        <Droplets size={24} color="var(--accent-blue)" />
        <div>
          <div className="text-xs text-muted" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>SURFACE RUNOFF</div>
          <div className="value-lg" style={{ color: 'var(--accent-blue)' }}>High</div>
          <div className="text-xs" style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
            <ArrowUp size={12} /> Increasing
          </div>
        </div>
      </div>

      <div className="stat-card" style={{ borderColor: 'var(--risk-critical)' }}>
        <Database size={24} color="var(--text-muted)" />
        <div>
          <div className="text-xs text-muted" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>DRAINAGE UTILIZATION</div>
          <div className="value-lg" style={{ color: 'var(--risk-critical)' }}>135%</div>
          <div className="text-xs" style={{ color: 'var(--risk-critical)' }}>Over Capacity</div>
        </div>
      </div>

      <div className="stat-card">
        <Activity size={24} color="var(--accent-blue)" />
        <div>
          <div className="text-xs text-muted" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>MAX WATER DEPTH</div>
          <div className="value-lg" style={{ color: 'var(--risk-moderate)' }}>42 <span style={{ fontSize: '12px', fontWeight: 'normal' }}>cm</span></div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>(Predicted)</div>
        </div>
      </div>

      <div className="stat-card" style={{ background: '#251010', borderColor: 'var(--risk-critical)' }}>
        <AlertTriangle size={32} color="var(--risk-critical)" />
        <div>
          <div className="text-xs text-muted" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>FLOOD RISK SCORE</div>
          <div className="value-lg" style={{ color: 'var(--risk-critical)' }}>78 / 100</div>
          <div className="text-xs" style={{ color: 'var(--risk-critical)' }}>High Risk</div>
        </div>
      </div>
    </div>
  );
};

export default TopStatsBar;
