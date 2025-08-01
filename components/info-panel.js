// Info Panel Component for Kamchatka Earthquake Map
// Handles sidebar interactions, updates, and data display

class EarthquakeInfoPanel {
    constructor() {
        this.updateInterval = null;
        this.lastUpdate = new Date();
        this.isCollapsed = false;
        this.activeSection = null;
        this.init();
    }

    init() {
        this.setupRealTimeUpdates();
        this.addInteractiveElements();
        this.setupSectionToggling();
        this.startStatusUpdates();
    }

    // Setup real-time data updates
    setupRealTimeUpdates() {
        // Update timestamp every minute
        this.updateInterval = setInterval(() => {
            this.updateTimestamp();
            this.simulateDataUpdates();
        }, 60000); // Update every minute

        // Initial update
        this.updateTimestamp();
    }

    // Add interactive elements to info panels
    addInteractiveElements() {
        this.addEarthquakeDetailsInteraction();
        this.addDamageAssessmentInteraction();
        this.addExpandCollapseButtons();
        this.addExportButtons();
    }

    // Add interaction to earthquake details section
    addEarthquakeDetailsInteraction() {
        const earthquakeSection = document.querySelector('.p-6.border-b');
        
        if (earthquakeSection) {
            const detailsButton = document.createElement('button');
            detailsButton.className = 'w-full mt-3 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors';
            detailsButton.innerHTML = '📊 View Detailed Seismic Data';
            
            detailsButton.addEventListener('click', () => {
                this.showDetailedSeismicData();
            });
            
            earthquakeSection.appendChild(detailsButton);
        }
    }

    // Add interaction to damage assessment section
    addDamageAssessmentInteraction() {
        const damageSection = document.querySelector('.p-6.border-b:nth-child(2)');
        
        if (damageSection) {
            const updateButton = document.createElement('button');
            updateButton.className = 'w-full mt-3 px-3 py-2 bg-blue-700 hover:bg-blue-600 rounded text-sm transition-colors';
            updateButton.innerHTML = '🔄 Refresh Damage Data';
            
            updateButton.addEventListener('click', () => {
                this.refreshDamageData();
            });
            
            damageSection.appendChild(updateButton);

            // Add expand/collapse for damage cards
            const damageCards = damageSection.querySelectorAll('.bg-gray-700');
            damageCards.forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', () => {
                    this.toggleDamageCard(card);
                });
            });
        }
    }

    // Add expand/collapse buttons to sections
    addExpandCollapseButtons() {
        const sections = document.querySelectorAll('.p-6.border-b');
        
        sections.forEach((section, index) => {
            const header = section.querySelector('h2');
            if (header) {
                const toggleButton = document.createElement('button');
                toggleButton.className = 'ml-2 text-gray-400 hover:text-white text-sm';
                toggleButton.innerHTML = '▼';
                toggleButton.setAttribute('data-section', index);
                
                toggleButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleSection(section, toggleButton);
                });
                
                header.appendChild(toggleButton);
            }
        });
    }

    // Add export functionality
    addExportButtons() {
        const sidebar = document.querySelector('aside');
        
        if (sidebar) {
            const exportContainer = document.createElement('div');
            exportContainer.className = 'p-6 border-t border-gray-700 bg-gray-800';
            exportContainer.innerHTML = `
                <h3 class="text-sm font-semibold mb-3 text-gray-300">Export Data</h3>
                <div class="flex space-x-2">
                    <button id="exportJSON" class="flex-1 px-3 py-2 bg-green-700 hover:bg-green-600 rounded text-xs transition-colors">
                        📄 JSON
                    </button>
                    <button id="exportCSV" class="flex-1 px-3 py-2 bg-orange-700 hover:bg-orange-600 rounded text-xs transition-colors">
                        📊 CSV
                    </button>
                    <button id="exportPDF" class="flex-1 px-3 py-2 bg-red-700 hover:bg-red-600 rounded text-xs transition-colors">
                        📋 PDF
                    </button>
                </div>
            `;
            
            sidebar.appendChild(exportContainer);
            
            // Attach export event listeners
            document.getElementById('exportJSON')?.addEventListener('click', () => this.exportData('json'));
            document.getElementById('exportCSV')?.addEventListener('click', () => this.exportData('csv'));
            document.getElementById('exportPDF')?.addEventListener('click', () => this.exportData('pdf'));
        }
    }

    // Setup section toggling functionality
    setupSectionToggling() {
        const sidebar = document.querySelector('aside');
        
        if (sidebar) {
            // Add collapse/expand button for entire sidebar
            const collapseButton = document.createElement('button');
            collapseButton.className = 'absolute top-4 right-4 z-10 w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors';
            collapseButton.innerHTML = '◀';
            collapseButton.title = 'Collapse Sidebar';
            
            collapseButton.addEventListener('click', () => {
                this.toggleSidebar();
            });
            
            sidebar.style.position = 'relative';
            sidebar.appendChild(collapseButton);
        }
    }

    // Start status updates (simulated real-time)
    startStatusUpdates() {
        // Simulate periodic status updates
        setInterval(() => {
            this.updateEmergencyStatus();
        }, 30000); // Update every 30 seconds
    }

    // Update timestamp display
    updateTimestamp() {
        const timestampElement = document.querySelector('header .text-white:last-child');
        if (timestampElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                timeZone: 'UTC' 
            }) + ' UTC';
            timestampElement.textContent = timeString;
        }
    }

    // Simulate real-time data updates
    simulateDataUpdates() {
        // Randomly update some statistics to simulate real-time data
        const injuredElement = document.querySelector('.text-yellow-400');
        const buildingsDamagedElement = document.querySelector('.text-red-400');
        
        if (injuredElement && Math.random() > 0.7) {
            const currentInjured = parseInt(injuredElement.textContent);
            const newInjured = currentInjured + Math.floor(Math.random() * 3);
            injuredElement.textContent = newInjured;
            this.flashElement(injuredElement);
        }
        
        if (buildingsDamagedElement && Math.random() > 0.8) {
            const currentDamaged = parseInt(buildingsDamagedElement.textContent);
            const newDamaged = currentDamaged + Math.floor(Math.random() * 2);
            buildingsDamagedElement.textContent = newDamaged;
            this.flashElement(buildingsDamagedElement);
        }
    }

    // Show detailed seismic data modal
    showDetailedSeismicData() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-white">Detailed Seismic Analysis</h3>
                    <button class="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>
                <div class="space-y-4 text-sm">
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-semibold text-yellow-400">Earthquake Parameters</h4>
                            <div class="mt-2 space-y-1 text-gray-300">
                                <div>Magnitude: <span class="text-white">8.8 Mw</span></div>
                                <div>Depth: <span class="text-white">29 km</span></div>
                                <div>Fault Type: <span class="text-white">Megathrust</span></div>
                                <div>Strike: <span class="text-white">45°</span></div>
                                <div>Dip: <span class="text-white">23°</span></div>
                                <div>Rake: <span class="text-white">87°</span></div>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold text-blue-400">Intensity Distribution</h4>
                            <div class="mt-2 space-y-1 text-gray-300">
                                <div>MMI IX: <span class="text-red-400">Epicenter area</span></div>
                                <div>MMI VIII: <span class="text-orange-400">0-50 km</span></div>
                                <div>MMI VII: <span class="text-yellow-400">50-100 km</span></div>
                                <div>MMI VI: <span class="text-green-400">100-200 km</span></div>
                                <div>MMI V: <span class="text-blue-400">200+ km</span></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-purple-400">Aftershock Sequence</h4>
                        <div class="mt-2 text-gray-300">
                            <div>Largest aftershock: <span class="text-white">M 7.2</span></div>
                            <div>Total aftershocks (M>4.0): <span class="text-white">23</span></div>
                            <div>Expected duration: <span class="text-white">Several weeks</span></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Close modal functionality
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.textContent === '×') {
                document.body.removeChild(modal);
            }
        });
        
        document.body.appendChild(modal);
    }

    // Refresh damage data with animation
    refreshDamageData() {
        const button = event.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '🔄 Updating...';
        button.disabled = true;
        
        // Simulate data refresh
        setTimeout(() => {
            this.simulateDataUpdates();
            button.innerHTML = '✅ Updated';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }, 1500);
    }

    // Toggle damage card expansion
    toggleDamageCard(card) {
        const isExpanded = card.getAttribute('data-expanded') === 'true';
        
        if (!isExpanded) {
            const details = document.createElement('div');
            details.className = 'mt-3 pt-3 border-t border-gray-600 text-xs text-gray-300';
            details.innerHTML = `
                <div class="space-y-1">
                    <div>Last updated: ${new Date().toLocaleTimeString()}</div>
                    <div>Confidence: High</div>
                    <div>Data source: Emergency response teams</div>
                </div>
            `;
            card.appendChild(details);
            card.setAttribute('data-expanded', 'true');
        } else {
            const details = card.querySelector('.mt-3.pt-3');
            if (details) {
                card.removeChild(details);
            }
            card.setAttribute('data-expanded', 'false');
        }
    }

    // Toggle section visibility
    toggleSection(section, button) {
        const content = section.querySelector('.space-y-3, .space-y-4, .grid, .bg-gray-700');
        
        if (content) {
            const isHidden = content.style.display === 'none';
            content.style.display = isHidden ? 'block' : 'none';
            button.innerHTML = isHidden ? '▼' : '▶';
        }
    }

    // Toggle entire sidebar
    toggleSidebar() {
        const sidebar = document.querySelector('aside');
        const button = sidebar.querySelector('button:last-child');
        
        if (sidebar) {
            this.isCollapsed = !this.isCollapsed;
            
            if (this.isCollapsed) {
                sidebar.style.width = '60px';
                sidebar.style.overflow = 'hidden';
                button.innerHTML = '▶';
                button.title = 'Expand Sidebar';
            } else {
                sidebar.style.width = '320px';
                sidebar.style.overflow = 'auto';
                button.innerHTML = '◀';
                button.title = 'Collapse Sidebar';
            }
        }
    }

    // Update emergency status
    updateEmergencyStatus() {
        const statusElement = document.querySelector('.text-red-400');
        if (statusElement && statusElement.textContent === 'Active Emergency') {
            // Simulate status changes over time
            const statuses = ['Active Emergency', 'Response Active', 'Assessment Phase'];
            const currentIndex = statuses.indexOf(statusElement.textContent);
            
            if (Math.random() > 0.9 && currentIndex < statuses.length - 1) {
                statusElement.textContent = statuses[currentIndex + 1];
                this.flashElement(statusElement);
            }
        }
    }

    // Flash element to indicate update
    flashElement(element) {
        element.style.transition = 'background-color 0.3s';
        element.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
        
        setTimeout(() => {
            element.style.backgroundColor = 'transparent';
        }, 1000);
    }

    // Export data functionality
    exportData(format) {
        const data = {
            earthquake: earthquakeData,
            affectedAreas: affectedAreas,
            infrastructure: infrastructureDamage,
            tsunami: tsunamiAreas,
            exportTime: new Date().toISOString()
        };
        
        switch(format) {
            case 'json':
                this.downloadJSON(data);
                break;
            case 'csv':
                this.downloadCSV(data);
                break;
            case 'pdf':
                this.generatePDFReport(data);
                break;
        }
    }

    // Download JSON data
    downloadJSON(data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kamchatka_earthquake_data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Download CSV data
    downloadCSV(data) {
        let csv = 'Location,Latitude,Longitude,Population,Damage Level,Buildings Damaged,Injured\n';
        
        data.affectedAreas.forEach(area => {
            csv += `"${area.name}",${area.lat},${area.lng},${area.population},"${area.damage.level}",${area.damage.buildingsDamaged},${area.damage.injured}\n`;
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kamchatka_earthquake_damage.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Generate PDF report (simplified)
    generatePDFReport(data) {
        alert('PDF report generation would be implemented with a PDF library like jsPDF in a real application.');
    }

    // Cleanup
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

// Initialize info panel when DOM is ready
let earthquakeInfoPanel;

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        earthquakeInfoPanel = new EarthquakeInfoPanel();
    }, 1500);
});

// Export for global access
if (typeof window !== 'undefined') {
    window.EarthquakeInfoPanel = EarthquakeInfoPanel;
}