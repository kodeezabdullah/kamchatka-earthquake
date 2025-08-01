// Main script for Kamchatka Earthquake Map
// Initialize map and all interactive features

let map;
let earthquakeMarker;
let bufferCircles = [];
let affectedMarkers = [];
let tsunamiLayers = [];
let infrastructureMarkers = [];
let layersVisible = true;

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
});

// Initialize the Leaflet map
function initializeMap() {
    // Create map centered on Kamchatka Peninsula
    map = L.map('map', {
        center: [54.8, 162.0],
        zoom: 7,
        zoomControl: false,
        attributionControl: false
    });

    // Add improved visibility map layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // Add custom zoom control
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Add scale control
    L.control.scale({
        position: 'bottomright',
        metric: true,
        imperial: false
    }).addTo(map);

    // Load all map data
    addEpicenter();
    addBufferZones();
    addAffectedAreas();
    addTsunamiAreas();
    addInfrastructureDamage();
    addMonitoringStations();
    
    // Setup event listeners
    setupEventListeners();
}

// Add earthquake epicenter marker
function addEpicenter() {
    const epicenter = earthquakeData.epicenter;
    
    // Custom epicenter icon
    const epicenterIcon = L.divIcon({
        className: 'epicenter-marker',
        html: `
            <div style="
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, #dc2626 0%, #991b1b 70%);
                border: 3px solid #ffffff;
                border-radius: 50%;
                position: relative;
                animation: pulse 2s infinite;
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: white;
                    font-weight: bold;
                    font-size: 10px;
                ">M${epicenter.magnitude}</div>
            </div>
            <style>
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
                    70% { box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
                }
            </style>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    earthquakeMarker = L.marker([epicenter.lat, epicenter.lng], {
        icon: epicenterIcon
    }).addTo(map);

    // Epicenter popup
    earthquakeMarker.bindPopup(`
        <div style="color: #1f2937; font-family: 'Segoe UI', sans-serif;">
            <h3 style="margin: 0 0 10px 0; color: #dc2626; font-size: 16px;">
                🔴 Earthquake Epicenter
            </h3>
            <div style="font-size: 14px; line-height: 1.5;">
                <strong>Magnitude:</strong> ${epicenter.magnitude}<br>
                <strong>Depth:</strong> ${epicenter.depth} km<br>
                <strong>Location:</strong> ${epicenter.lat}°N, ${epicenter.lng}°E<br>
                <strong>Time:</strong> ${new Date(epicenter.time).toLocaleString()}<br>
                <strong>Region:</strong> ${epicenter.location}
            </div>
        </div>
    `);
}

// Add buffer zones (damage assessment circles)
function addBufferZones() {
    const epicenter = earthquakeData.epicenter;
    
    bufferZones.forEach((zone, index) => {
        const circle = L.circle([epicenter.lat, epicenter.lng], {
            radius: zone.radius * 1000, // Convert km to meters
            color: zone.color,
            fillColor: zone.fillColor,
            fillOpacity: zone.fillOpacity,
            weight: zone.weight,
            dashArray: zone.dashArray
        }).addTo(map);

        // Zone popup
        circle.bindPopup(`
            <div style="color: #1f2937; font-family: 'Segoe UI', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: ${zone.color}; font-size: 16px;">
                    ${zone.label}
                </h3>
                <div style="font-size: 14px; line-height: 1.5;">
                    <strong>Radius:</strong> ${zone.radius} km<br>
                    <strong>Risk Level:</strong> ${zone.label.split(' ')[0]}<br>
                    <strong>Expected Impact:</strong> ${zone.description}
                </div>
            </div>
        `);

        bufferCircles.push(circle);
    });
}

// Add affected areas (cities and settlements)
function addAffectedAreas() {
    affectedAreas.forEach(area => {
        const iconColor = getDamageColor(area.damage.level);
        
        const areaIcon = L.divIcon({
            className: 'area-marker',
            html: `
                <div style="
                    width: 20px;
                    height: 20px;
                    background: ${iconColor};
                    border: 2px solid #ffffff;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: white;
                    font-weight: bold;
                ">${getAreaIcon(area.icon)}</div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });

        const marker = L.marker([area.lat, area.lng], {
            icon: areaIcon
        }).addTo(map);

        // Area popup
        marker.bindPopup(`
            <div style="color: #1f2937; font-family: 'Segoe UI', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: ${iconColor}; font-size: 16px;">
                    ${getAreaEmoji(area.icon)} ${area.name}
                </h3>
                <div style="font-size: 14px; line-height: 1.5;">
                    <strong>Population:</strong> ${area.population.toLocaleString()}<br>
                    <strong>Damage Level:</strong> ${area.damage.level}<br>
                    <strong>Buildings Damaged:</strong> ${area.damage.buildingsDamaged}<br>
                    <strong>Injured:</strong> ${area.damage.injured}<br>
                    <strong>Power:</strong> ${area.damage.powerOutage ? '❌ Outage' : '✅ Normal'}<br>
                    <br>
                    <em>${area.damage.description}</em>
                </div>
            </div>
        `);

        affectedMarkers.push(marker);
    });
}

// Add tsunami affected areas
function addTsunamiAreas() {
    tsunamiAreas.forEach(area => {
        const tsunamiPolygon = L.polygon(area.coordinates, {
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.3,
            weight: 2
        }).addTo(map);

        tsunamiPolygon.bindPopup(`
            <div style="color: #1f2937; font-family: 'Segoe UI', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: #3b82f6; font-size: 16px;">
                    🌊 ${area.name}
                </h3>
                <div style="font-size: 14px; line-height: 1.5;">
                    <strong>Max Wave Height:</strong> ${area.maxWaveHeight} m<br>
                    <strong>Damage Level:</strong> ${area.damage}<br>
                    <strong>Status:</strong> Tsunami Warning Lifted
                </div>
            </div>
        `);

        tsunamiLayers.push(tsunamiPolygon);
    });
}

// Add infrastructure damage points
function addInfrastructureDamage() {
    infrastructureDamage.forEach(infrastructure => {
        const statusColor = getInfrastructureColor(infrastructure.status);
        
        const infraIcon = L.divIcon({
            className: 'infrastructure-marker',
            html: `
                <div style="
                    width: 16px;
                    height: 16px;
                    background: ${statusColor};
                    border: 2px solid #ffffff;
                    border-radius: 2px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    color: white;
                    font-weight: bold;
                ">${getInfrastructureIcon(infrastructure.type)}</div>
            `,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        const marker = L.marker([infrastructure.lat, infrastructure.lng], {
            icon: infraIcon
        }).addTo(map);

        marker.bindPopup(`
            <div style="color: #1f2937; font-family: 'Segoe UI', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: ${statusColor}; font-size: 16px;">
                    ${getInfrastructureEmoji(infrastructure.type)} ${infrastructure.name}
                </h3>
                <div style="font-size: 14px; line-height: 1.5;">
                    <strong>Type:</strong> ${infrastructure.type}<br>
                    <strong>Status:</strong> ${infrastructure.status}<br>
                    <br>
                    <em>${infrastructure.description}</em>
                </div>
            </div>
        `);

        infrastructureMarkers.push(marker);
    });
}

// Add seismic monitoring stations
function addMonitoringStations() {
    monitoringStations.forEach(station => {
        const stationIcon = L.divIcon({
            className: 'station-marker',
            html: `
                <div style="
                    width: 12px;
                    height: 12px;
                    background: #8b5cf6;
                    border: 1px solid #ffffff;
                    border-radius: 50%;
                "></div>
            `,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });

        const marker = L.marker([station.lat, station.lng], {
            icon: stationIcon
        }).addTo(map);

        marker.bindPopup(`
            <div style="color: #1f2937; font-family: 'Segoe UI', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: #8b5cf6; font-size: 16px;">
                    📡 ${station.name}
                </h3>
                <div style="font-size: 14px; line-height: 1.5;">
                    <strong>Intensity:</strong> ${station.intensity}<br>
                    <strong>Status:</strong> ${station.status}
                </div>
            </div>
        `);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Toggle layers button
    document.getElementById('toggleLayer').addEventListener('click', toggleLayers);
    
    // Fullscreen button
    document.getElementById('fullscreen').addEventListener('click', toggleFullscreen);
}

// Toggle map layers visibility
function toggleLayers() {
    layersVisible = !layersVisible;
    
    const opacity = layersVisible ? 1 : 0.3;
    
    bufferCircles.forEach(circle => {
        circle.setStyle({ fillOpacity: layersVisible ? circle.options.fillOpacity : 0 });
    });
    
    affectedMarkers.forEach(marker => {
        marker.setOpacity(opacity);
    });
    
    infrastructureMarkers.forEach(marker => {
        marker.setOpacity(opacity);
    });
    
    tsunamiLayers.forEach(layer => {
        layer.setStyle({ fillOpacity: layersVisible ? 0.3 : 0.1 });
    });
}

// Toggle fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Hide loading screen
function hideLoadingScreen() {
    const loading = document.getElementById('loading');
    loading.style.opacity = '0';
    setTimeout(() => {
        loading.style.display = 'none';
    }, 500);
}

// Utility functions
function getDamageColor(level) {
    switch(level) {
        case 'severe': return '#dc2626';
        case 'moderate': return '#f59e0b';
        case 'light': return '#10b981';
        default: return '#6b7280';
    }
}

function getAreaIcon(type) {
    switch(type) {
        case 'city': return '🏙';
        case 'town': return '🏘';
        case 'village': return '🏠';
        default: return '📍';
    }
}

function getAreaEmoji(type) {
    switch(type) {
        case 'city': return '🏙️';
        case 'town': return '🏘️';
        case 'village': return '🏠';
        default: return '📍';
    }
}

function getInfrastructureColor(status) {
    switch(status) {
        case 'operational': return '#10b981';
        case 'damaged': return '#f59e0b';
        case 'offline': return '#dc2626';
        default: return '#6b7280';
    }
}

function getInfrastructureIcon(type) {
    switch(type) {
        case 'bridge': return '🌉';
        case 'power': return '⚡';
        case 'airport': return '✈️';
        case 'port': return '🚢';
        case 'hospital': return '🏥';
        default: return '🏗️';
    }
}

function getInfrastructureEmoji(type) {
    switch(type) {
        case 'bridge': return '🌉';
        case 'power': return '⚡';
        case 'airport': return '✈️';
        case 'port': return '🚢';
        case 'hospital': return '🏥';
        default: return '🏗️';
    }
}