import React, { useState } from 'react';
import { LayoutDashboard, Map as MapIcon, Activity, Route, AlertTriangle, PlayCircle, FileText, Settings, Info, Droplets, CloudRain } from 'lucide-react';
import FloodMap from './components/FloodMap';
import TopStatsBar from './components/TopStatsBar';
import NowcastPanel from './components/NowcastPanel';
import AlertsPanel from './components/AlertsPanel';
import DrainageStatusPanel from './components/DrainageStatusPanel';
import SaferRoutePanel from './components/SaferRoutePanel';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timelineHour, setTimelineHour] = useState(0); // 0 to 3
  const [showSaferRoute, setShowSaferRoute] = useState(false);
  const [rainfall, setRainfall] = useState(45);

  const navItems = [
    { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { id: 'map', icon: <MapIcon size={18} />, label: 'Flood Map' },
    { id: 'drainage', icon: <Droplets size={18} />, label: 'Drainage Network' },
    { id: 'routes', icon: <Route size={18} />, label: 'Safer Route' },
    { id: 'alerts', icon: <AlertTriangle size={18} />, label: 'Alerts & Warnings' },
    { id: 'sim', icon: <PlayCircle size={18} />, label: 'Simulation' },
    { id: 'reports', icon: <FileText size={18} />, label: 'Reports' },
    { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
    { id: 'about', icon: <Info size={18} />, label: 'About' },
  ];

  return (
    <div className="app-layout">
      {/* --- Sidebar --- */}
      <aside className="sidebar">
        <div style={{ padding: '0 24px 24px 24px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }}>
            <Droplets size={28} />
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: 700, letterSpacing: '1px', color: 'var(--text-main)' }}>
              SAFER
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>Smart AI Flood Early Response</p>
        </div>
        
        <nav style={{ flex: 1, overflowY: 'auto' }}>
          {navItems.map(item => (
            <div 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
          <div className="text-xs text-muted mb-2" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>SYSTEM STATUS</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--risk-low)' }} />
            All Systems Operational
          </div>
          
          <div style={{ marginTop: '24px' }}>
            <div className="text-xs" style={{ color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '4px' }}>Prototype Notice</div>
            <p className="text-xs text-muted">
              This is a student prototype with simulated data. In production, real-time rainfall, radar, DEM and drainage data will be used.
            </p>
          </div>
        </div>
      </aside>

      {/* --- Main Dashboard Area --- */}
      <main className="main-content">
        
        {/* Top Header */}
        <header className="top-header">
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0, letterSpacing: '0.5px' }}>URBAN FLOOD NOWCASTING SYSTEM</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
              <MapIcon size={12} /> New Town, Kolkata
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '24px', borderRight: '1px solid var(--border-color)' }}>
              <div style={{ background: 'rgba(14, 165, 233, 0.1)', color: 'var(--accent-blue)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px' }}>
                SIMULATION MODE
              </div>
              <div className="text-xs text-muted mt-1">Prototype / Demo Data</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CloudRain size={24} color="var(--text-muted)" />
              <div>
                <div className="text-xs text-muted">Heavy Rain</div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>
                  <input 
                    type="number" 
                    value={rainfall}
                    onChange={(e) => setRainfall(Number(e.target.value))}
                    style={{ width: '40px', background: 'transparent', border: 'none', color: 'white', fontWeight: 600, fontSize: '14px', outline: 'none' }}
                  /> mm/hr
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Activity size={24} color="var(--text-muted)" />
              <div>
                <div className="text-xs text-muted">Last Updated</div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>16:42:10 IST</div>
              </div>
            </div>
          </div>
        </header>

        {/* Middle Section (Stats, Map, Right Panels) */}
        <div className="middle-section">
          
          <div className="map-area">
            <TopStatsBar rainfall={rainfall} />
            <FloodMap timelineHour={timelineHour} showSaferRoute={showSaferRoute} rainfall={rainfall} />
          </div>

          <div className="right-sidebar">
            <NowcastPanel timelineHour={timelineHour} setTimelineHour={setTimelineHour} />
            <AlertsPanel />
          </div>

        </div>

        {/* Bottom Section */}
        <div className="bottom-row">
          <DrainageStatusPanel />
          <SaferRoutePanel showSaferRoute={showSaferRoute} setShowSaferRoute={setShowSaferRoute} />
        </div>

      </main>
    </div>
  );
}

export default App;
