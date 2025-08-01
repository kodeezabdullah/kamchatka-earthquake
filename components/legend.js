// Legend Component for Kamchatka Earthquake Map
// Handles interactive legend functionality and layer visibility

class EarthquakeLegend {
    constructor() {
        this.legendVisible = true;
        this.layerStates = {
            bufferZones: true,
            affectedAreas: true,
            tsunamiAreas: true,
            infrastructure: true,
            monitoring: true
        };
        this.init();
    }

    init() {
        this.createLegendControls();
        this.attachEventListeners();
    }

    // Create interactive legend controls
    createLegendControls() {
        const legendContainer = document.querySelector('.p-6:last-child');
        
        if (legendContainer) {
            // Add toggle checkboxes for each layer type
            const interactiveControls = document.createElement('div');
            interactiveControls.className = 'mt-4 space-y-2';
            interactiveControls.innerHTML = `
                <div class="text-xs text-gray-400 mb-3 border-t border-gray-600 pt-3">
                    Layer Controls
                </div>
                
                <label class="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                    <input type="checkbox" id="bufferZonesToggle" checked class="form-checkbox h-4 w-4 text-red-500 bg-gray-700 border-gray-600">
                    <span class="text-sm">Buffer Zones</span>
                </label>
                
                <label class="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                    <input type="checkbox" id="affectedAreasToggle" checked class="form-checkbox h-4 w-4 text-yellow-500 bg-gray-700 border-gray-600">
                    <span class="text-sm">Affected Areas</span>
                </label>
                
                <label class="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                    <input type="checkbox" id="tsunamiAreasToggle" checked class="form-checkbox h-4 w-4 text-blue-500 bg-gray-700 border-gray-600">
                    <span class="text-sm">Tsunami Areas</span>
                </label>
                
                <label class="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                    <input type="checkbox" id="infrastructureToggle" checked class="form-checkbox h-4 w-4 text-orange-500 bg-gray-700 border-gray-600">
                    <span class="text-sm">Infrastructure</span>
                </label>
                
                <label class="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 p-2 rounded">
                    <input type="checkbox" id="monitoringToggle" checked class="form-checkbox h-4 w-4 text-purple-500 bg-gray-700 border-gray-600">
                    <span class="text-sm">Monitoring Stations</span>
                </label>
            `;
            
            legendContainer.appendChild(interactiveControls);
        }
    }

    // Attach event listeners to legend controls
    attachEventListeners() {
        // Buffer zones toggle
        const bufferZonesToggle = document.getElementById('bufferZonesToggle');
        if (bufferZonesToggle) {
            bufferZonesToggle.addEventListener('change', (e) => {
                this.toggleBufferZones(e.target.checked);
            });
        }

        // Affected areas toggle
        const affectedAreasToggle = document.getElementById('affectedAreasToggle');
        if (affectedAreasToggle) {
            affectedAreasToggle.addEventListener('change', (e) => {
                this.toggleAffectedAreas(e.target.checked);
            });
        }

        // Tsunami areas toggle
        const tsunamiAreasToggle = document.getElementById('tsunamiAreasToggle');
        if (tsunamiAreasToggle) {
            tsunamiAreasToggle.addEventListener('change', (e) => {
                this.toggleTsunamiAreas(e.target.checked);
            });
        }

        // Infrastructure toggle
        const infrastructureToggle = document.getElementById('infrastructureToggle');
        if (infrastructureToggle) {
            infrastructureToggle.addEventListener('change', (e) => {
                this.toggleInfrastructure(e.target.checked);
            });
        }

        // Monitoring stations toggle
        const monitoringToggle = document.getElementById('monitoringToggle');
        if (monitoringToggle) {
            monitoringToggle.addEventListener('change', (e) => {
                this.toggleMonitoring(e.target.checked);
            });
        }
    }

    // Toggle buffer zones visibility
    toggleBufferZones(visible) {
        this.layerStates.bufferZones = visible;
        
        if (typeof bufferCircles !== 'undefined') {
            bufferCircles.forEach(circle => {
                if (visible) {
                    circle.addTo(map);
                } else {
                    map.removeLayer(circle);
                }
            });
        }
    }

    // Toggle affected areas visibility
    toggleAffectedAreas(visible) {
        this.layerStates.affectedAreas = visible;
        
        if (typeof affectedMarkers !== 'undefined') {
            affectedMarkers.forEach(marker => {
                if (visible) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
        }
    }

    // Toggle tsunami areas visibility
    toggleTsunamiAreas(visible) {
        this.layerStates.tsunamiAreas = visible;
        
        if (typeof tsunamiLayers !== 'undefined') {
            tsunamiLayers.forEach(layer => {
                if (visible) {
                    layer.addTo(map);
                } else {
                    map.removeLayer(layer);
                }
            });
        }
    }

    // Toggle infrastructure visibility
    toggleInfrastructure(visible) {
        this.layerStates.infrastructure = visible;
        
        if (typeof infrastructureMarkers !== 'undefined') {
            infrastructureMarkers.forEach(marker => {
                if (visible) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
        }
    }

    // Toggle monitoring stations visibility
    toggleMonitoring(visible) {
        this.layerStates.monitoring = visible;
        
        // This would toggle monitoring station markers if they were stored in a global array
        // For now, we'll handle this in the main script
        if (typeof window.monitoringMarkers !== 'undefined') {
            window.monitoringMarkers.forEach(marker => {
                if (visible) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
        }
    }

    // Update legend based on current map state
    updateLegend(damages) {
        const legendContainer = document.querySelector('.space-y-3');
        
        if (legendContainer && damages) {
            // Update casualty numbers
            const casualtySection = document.querySelector('.grid-cols-2');
            if (casualtySection) {
                const deathsElement = casualtySection.querySelector('.text-green-400');
                const injuredElement = casualtySection.querySelector('.text-yellow-400');
                
                if (deathsElement) deathsElement.textContent = damages.casualties.deaths;
                if (injuredElement) injuredElement.textContent = damages.casualties.injured;
            }
        }
    }

    // Get legend statistics
    getLegendStats() {
        return {
            totalAffectedAreas: affectedAreas ? affectedAreas.length : 0,
            totalInfrastructure: infrastructureDamage ? infrastructureDamage.length : 0,
            totalTsunamiAreas: tsunamiAreas ? tsunamiAreas.length : 0,
            visibleLayers: Object.values(this.layerStates).filter(state => state).length
        };
    }

    // Show/hide entire legend
    toggleLegendVisibility() {
        const legendContainer = document.querySelector('.p-6:last-child');
        
        if (legendContainer) {
            this.legendVisible = !this.legendVisible;
            legendContainer.style.display = this.legendVisible ? 'block' : 'none';
        }
    }

    // Reset all layers to visible
    showAllLayers() {
        Object.keys(this.layerStates).forEach(layerType => {
            this.layerStates[layerType] = true;
            const checkbox = document.getElementById(`${layerType}Toggle`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });

        // Re-enable all layers
        this.toggleBufferZones(true);
        this.toggleAffectedAreas(true);
        this.toggleTsunamiAreas(true);
        this.toggleInfrastructure(true);
        this.toggleMonitoring(true);
    }

    // Hide all layers except epicenter
    hideAllLayers() {
        Object.keys(this.layerStates).forEach(layerType => {
            this.layerStates[layerType] = false;
            const checkbox = document.getElementById(`${layerType}Toggle`);
            if (checkbox) {
                checkbox.checked = false;
            }
        });

        // Disable all layers
        this.toggleBufferZones(false);
        this.toggleAffectedAreas(false);
        this.toggleTsunamiAreas(false);
        this.toggleInfrastructure(false);
        this.toggleMonitoring(false);
    }

    // Export legend configuration
    exportConfig() {
        return {
            layerStates: this.layerStates,
            legendVisible: this.legendVisible,
            timestamp: new Date().toISOString()
        };
    }

    // Import legend configuration
    importConfig(config) {
        if (config && config.layerStates) {
            this.layerStates = { ...config.layerStates };
            
            // Update checkboxes
            Object.entries(this.layerStates).forEach(([layerType, visible]) => {
                const checkbox = document.getElementById(`${layerType}Toggle`);
                if (checkbox) {
                    checkbox.checked = visible;
                }
                
                // Apply visibility
                switch(layerType) {
                    case 'bufferZones':
                        this.toggleBufferZones(visible);
                        break;
                    case 'affectedAreas':
                        this.toggleAffectedAreas(visible);
                        break;
                    case 'tsunamiAreas':
                        this.toggleTsunamiAreas(visible);
                        break;
                    case 'infrastructure':
                        this.toggleInfrastructure(visible);
                        break;
                    case 'monitoring':
                        this.toggleMonitoring(visible);
                        break;
                }
            });
        }
    }
}

// Initialize legend when DOM is ready
let earthquakeLegend;

document.addEventListener('DOMContentLoaded', function() {
    // Wait for map to be initialized first
    setTimeout(() => {
        earthquakeLegend = new EarthquakeLegend();
    }, 1000);
});

// Export for global access
if (typeof window !== 'undefined') {
    window.EarthquakeLegend = EarthquakeLegend;
}