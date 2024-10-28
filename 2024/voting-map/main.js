const STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
// 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const chiLocation = [-88.19756, 41.85];
const hpLocation = [-87.596, 41.795];
const bounds = [
    [-88.489213, 41.5], // west south
    [-87, 42.3]
];

const HOURS = {
    normal: {
        dates: 'October 21 through November 5',
        hours: [
            'Weekdays: 9:00 am - 6:00 pm',
            'Saturday: 9:00 am - 5:00 pm',
            'Sunday: 10:00 am - 4:00 pm',
            'Election Day: 6:00 am - 7:00 pm (November 5)'
        ]
    },
    special: {
        dates: 'October 28 through November 4',
        hours: [
            'Weekdays: 9:00 am – 7:00 pm',
            'Saturday: 9:00 am – 5:00 pm',
            'Sunday: 10:00 am – 4:00 pm',
            '<b>NOT open on Election Day</b>'
        ]
    },
    school: {
        dates: 'October 30 through November 1',
        hours: ['10:00 am to 5:00 pm']
    }
};

var map = new maplibregl.Map({
    container: 'map',
    style: STYLE,
    center: chiLocation, // starting position [lng, lat]
    maxZoom: 17,
    minZoom: 9.5,
    zoom: 9.5, // starting zoom
    maxBounds: bounds,
    pitchWithRotate: false,
    dragRotate: false,
    touchZoomRotate: false
});

map.on('load', async () => {
    map.addSource('votingLocations', {
        type: 'geojson',
        data: 'voting_locations.geojson'
    });

    map.addLayer({
        id: 'votingLocations',
        type: 'circle',
        source: 'votingLocations',
        paint: {
            'circle-radius': [
                'interpolate',
                // Set the exponential rate of change to 0.5
                ['exponential', 0.5],
                ['zoom'],
                // When zoom is 10, buildings will be bigger radius.
                10,
                7,
                // When zoom is 13 or higher, circles get bigger .
                11,
                10
            ],
            'circle-color': [
                'case',
                ['==', ['get', 'type'], 'normal'],
                '#800000',
                ['==', ['get', 'type'], 'special'],
                '#FFA319',
                ['==', ['get', 'type'], 'school'],
                '#155F83',
                '#000'
            ]
        },
        filter: ['!=', 'type', 'bounds']
    });

    map.addLayer({
        id: 'boundary',
        type: 'line',
        source: 'votingLocations',
        paint: {
            'line-color': 'black',
            'line-width': 0.5
        },
        filter: ['==', 'type', 'bounds']
    });
    map.on('mouseenter', 'votingLocations', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        showDetails(e);
    });

    map.on('mouseleave', 'votingLocations', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('hover', 'votingLocations', (e) => {
        showDetails(e);
        map.setPaintProperty('votingLocations', 'circle-radius', 12);
    });
});

var hpZoom = document.getElementById('hp-zoom');
hpZoom.addEventListener('click', () => {
    map.flyTo({
        center: hpLocation,
        zoom: 12
    });
});

// ----- functions -----
function showDetails(e) {
    var name = e.features[0].properties.name;
    var dates = HOURS[e.features[0].properties.type].dates;
    var hours = HOURS[e.features[0].properties.type].hours;
    var street = e.features[0].properties.street;
    var language = e.features[0].properties.language;

    var description = `<h3>${name}</h3>
        <p>Address: ${street}</p>
        <p>${dates}</p>
        <ul>${hours.map((hour) => `<li>${hour}</li>`).join('')}</ul>
        <p>Language assistance available in ${language}</p>`;

    details = document.getElementById('details-text');

    details.classList.remove('fade-in');
    details.offsetHeight;
    details.classList.add('fade-in');
    details.innerHTML = description;
}
