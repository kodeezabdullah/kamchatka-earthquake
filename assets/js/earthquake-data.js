// Kamchatka Earthquake M8.8 - July 30, 2025
// Main earthquake data and affected areas

// Main earthquake epicenter
const earthquakeData = {
    epicenter: {
        lat: 54.8,
        lng: 162.0,
        magnitude: 8.8,
        depth: 29,
        time: "2025-07-30T18:10:00Z",
        location: "Off Kamchatka Peninsula, Russia"
    },
    
    // Damage statistics
    damage: {
        casualties: {
            deaths: 0,
            injured: 12
        },
        infrastructure: {
            buildingsDamaged: 47,
            roadsAffected: 8, // km
            powerOutages: 15000
        },
        tsunami: {
            maxWaveHeight: 4.2, // meters
            affectedCoastline: 150, // km
            warningStatus: "Lifted"
        }
    }
};

// Buffer zones for impact assessment (in kilometers)
const bufferZones = [
    {
        radius: 50,
        color: '#dc2626',
        fillColor: '#dc2626',
        fillOpacity: 0.1,
        weight: 2,
        dashArray: '5, 5',
        label: 'High Damage Zone',
        description: 'Severe structural damage expected'
    },
    {
        radius: 150,
        color: '#f59e0b',
        fillColor: '#f59e0b',
        fillOpacity: 0.08,
        weight: 2,
        dashArray: '10, 5',
        label: 'Medium Risk Zone',
        description: 'Moderate damage and strong shaking'
    },
    {
        radius: 300,
        color: '#10b981',
        fillColor: '#10b981',
        fillOpacity: 0.05,
        weight: 1,
        dashArray: '15, 10',
        label: 'Low Risk Zone',
        description: 'Light damage and noticeable shaking'
    }
];

// Affected settlements and damage points
const affectedAreas = [
    {
        name: "Petropavlovsk-Kamchatsky",
        lat: 53.0446,
        lng: 158.6500,
        population: 179000,
        damage: {
            level: "moderate",
            buildingsDamaged: 23,
            injured: 8,
            powerOutage: true,
            description: "Main city affected by strong shaking. Several buildings damaged, power restored."
        },
        icon: "city"
    },
    {
        name: "Elizovo",
        lat: 53.1833,
        lng: 158.3833,
        population: 39000,
        damage: {
            level: "moderate",
            buildingsDamaged: 12,
            injured: 3,
            powerOutage: true,
            description: "Airport city with moderate damage to residential buildings."
        },
        icon: "town"
    },
    {
        name: "Vilyuchinsk",
        lat: 52.9311,
        lng: 158.4019,
        population: 22000,
        damage: {
            level: "light",
            buildingsDamaged: 8,
            injured: 1,
            powerOutage: false,
            description: "Naval base with minor structural damage reported."
        },
        icon: "town"
    },
    {
        name: "Ust-Kamchatsk",
        lat: 56.2167,
        lng: 162.4667,
        population: 4500,
        damage: {
            level: "severe",
            buildingsDamaged: 4,
            injured: 0,
            powerOutage: true,
            description: "Coastal settlement severely affected by tsunami waves."
        },
        icon: "village"
    }
];

// Tsunami affected coastline areas
const tsunamiAreas = [
    {
        name: "Avacha Bay",
        coordinates: [
            [52.8, 158.2],
            [52.9, 158.4],
            [53.1, 158.6],
            [53.2, 158.8]
        ],
        maxWaveHeight: 3.8,
        damage: "moderate"
    },
    {
        name: "Kronotsky Bay",
        coordinates: [
            [54.2, 161.8],
            [54.5, 162.1],
            [54.8, 162.4],
            [55.0, 162.6]
        ],
        maxWaveHeight: 4.2,
        damage: "severe"
    },
    {
        name: "Kamchatsky Bay",
        coordinates: [
            [55.8, 162.8],
            [56.1, 163.0],
            [56.4, 163.2],
            [56.6, 163.4]
        ],
        maxWaveHeight: 2.9,
        damage: "light"
    }
];

// Infrastructure damage points
const infrastructureDamage = [
    {
        type: "bridge",
        name: "Avacha River Bridge",
        lat: 53.0234,
        lng: 158.6789,
        status: "damaged",
        description: "Major bridge connecting Petropavlovsk - structural assessment ongoing"
    },
    {
        type: "power",
        name: "Thermal Power Plant",
        lat: 53.0567,
        lng: 158.7123,
        status: "offline",
        description: "Main power facility - emergency shutdown, restoration in progress"
    },
    {
        type: "airport",
        name: "Elizovo Airport",
        lat: 53.1681,
        lng: 158.4536,
        status: "operational",
        description: "Airport operational - minor runway damage, flights resumed"
    },
    {
        type: "port",
        name: "Petropavlovsk Port",
        lat: 53.0178,
        lng: 158.6431,
        status: "damaged",
        description: "Harbor facilities damaged by tsunami - commercial operations suspended"
    },
    {
        type: "hospital",
        name: "Regional Hospital",
        lat: 53.0445,
        lng: 158.6234,
        status: "operational",
        description: "Emergency operations active - treating earthquake injuries"
    }
];

// Seismic monitoring stations
const monitoringStations = [
    {
        name: "PET - Petropavlovsk",
        lat: 53.0230,
        lng: 158.6500,
        intensity: 7.2,
        status: "active"
    },
    {
        name: "ESS - Esso",
        lat: 55.9333,
        lng: 158.7000,
        intensity: 5.8,
        status: "active"
    },
    {
        name: "TLK - Talakovo",
        lat: 57.3167,
        lng: 159.9500,
        intensity: 4.9,
        status: "active"
    }
];

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        earthquakeData,
        bufferZones,
        affectedAreas,
        tsunamiAreas,
        infrastructureDamage,
        monitoringStations
    };
}