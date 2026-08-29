// Mock data for SAFER Dashboard Prototype - Kolkata Context

export const MAP_CENTER = [22.5950, 88.4500]; // New Town, Kolkata (Between Eco Park and Sector V)
export const MAP_ZOOM = 13;

export const generateMockRoads = (rainfallIntensity = 45) => {
  // Higher rainfall = worse risks
  const severityMultiplier = rainfallIntensity / 45;

  const getRisk = (baseDepth, timeMult) => {
    const depth = baseDepth * severityMultiplier;
    let level = "Low";
    if (depth > 1.5) level = "Critical";
    else if (depth > 0.8) level = "High";
    else if (depth > 0.3) level = "Moderate";
    
    return { 
      level, 
      depth: depth.toFixed(1), 
      timeToImpact: level === 'Critical' ? 'Now' : level === 'High' ? `${Math.max(10, Math.round(60 * timeMult / severityMultiplier))} min` : null 
    };
  };

  return [
    {
      id: "r1",
      name: "Major Arterial Road (Eco Park Stretch)",
      coordinates: [[22.6250, 88.4680], [22.6100, 88.4600], [22.5950, 88.4550]],
      risksByHour: [
        getRisk(0.8, 1), // Now
        getRisk(1.2, 0.8), // +1
        getRisk(1.6, 0.5), // +2
        getRisk(2.0, 0.1)  // +3
      ],
      stress: '136%'
    },
    {
      id: "r2",
      name: "Street No. 111 (Sector V Connect)",
      coordinates: [[22.5950, 88.4550], [22.5800, 88.4450], [22.5700, 88.4350]],
      risksByHour: [
        getRisk(0.3, 2),
        getRisk(0.6, 1.5),
        getRisk(1.0, 1),
        getRisk(1.2, 0.8)
      ],
      stress: '95%'
    },
    {
      id: "r3",
      name: "New Town Ring Road",
      coordinates: [[22.6150, 88.4800], [22.5900, 88.4700], [22.5750, 88.4500]],
      risksByHour: [
        getRisk(0.1, 3),
        getRisk(0.2, 2.5),
        getRisk(0.4, 2),
        getRisk(0.6, 1.5)
      ],
      stress: '60%'
    },
    {
      id: "r4",
      name: "Action Area II Cross Road",
      coordinates: [[22.6000, 88.4400], [22.5900, 88.4600]],
      risksByHour: [
        getRisk(1.5, 0.5),
        getRisk(1.8, 0.2),
        getRisk(2.2, 0.1),
        getRisk(2.5, 0.1)
      ],
      stress: '150%'
    }
  ];
};

export const generateDrainageNodes = () => {
  return [
    { id: "d1", name: "Chinar Park Outfall (NT-04)", lat: 22.6180, lng: 88.4580, status: "Overloaded", util: 135 },
    { id: "d2", name: "Sector V Pump Station", lat: 22.5720, lng: 88.4380, status: "Warning", util: 92 },
    { id: "d3", name: "Eco Space Node", lat: 22.6050, lng: 88.4750, status: "Normal", util: 45 },
    { id: "d4", name: "Action Area 1 Drain", lat: 22.5850, lng: 88.4500, status: "Overloaded", util: 110 },
  ];
};

// Start: Eco Park, End: Sector V
export const safeRouteCoords = [
  [22.6200, 88.4660], // Eco park
  [22.6150, 88.4800], // Via Ring road (low risk)
  [22.5900, 88.4700], 
  [22.5750, 88.4500], 
  [22.5700, 88.4350]  // Sector V
];

export const mockAlerts = [
  { id: 1, type: "Critical", time: "16:40", message: "High flood risk predicted in 38 minutes", detail: "Major Arterial Underpass. Avoid direct route." },
  { id: 2, type: "Warning", time: "16:38", message: "Drainage capacity likely to be exceeded", detail: "Utilization 135% at Chinar Park Outfall (NT-04)." },
  { id: 3, type: "Warning", time: "16:36", message: "Waterlogging expected at 12 locations", detail: "Avoid low-lying roads and underpasses." }
];

export const getRiskColor = (level) => {
  switch(level) {
    case 'Low': return 'var(--risk-low)';
    case 'Moderate': return 'var(--risk-moderate)';
    case 'High': return 'var(--risk-high)';
    case 'Critical': return 'var(--risk-critical)';
    default: return 'var(--text-muted)';
  }
};
