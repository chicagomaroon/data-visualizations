const STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
// 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';
const chiLocation = [-87.9, 41.85];
const hpLocation = [-87.7, 41.9];

const bounds = [
    [-88.489213, 41.5], // west south
    [-87, 42.3]
];
const isMobile = window.innerWidth < 768;

const communities = [
    ['albany_park', 'Albany Park'],
    ['archer_heights', 'Archer Heights'],
    ['armour_square', 'Armour Square'],
    ['ashburn', 'Ashburn'],
    ['auburn_gresham', 'Auburn Gresham'],
    ['austin', 'Austin'],
    ['avalon_park', 'Avalon Park'],
    ['avondale', 'Avondale'],
    ['belmont_cragin', 'Belmont Cragin'],
    ['beverly', 'Beverly'],
    ['bridgeport', 'Bridgeport'],
    ['brighton_park', 'Brighton Park'],
    ['burnside', 'Burnside'],
    ['calumet_heights', 'Calumet Heights'],
    ['chatham', 'Chatham'],
    ['chicago_lawn', 'Chicago Lawn'],
    ['clearing', 'Clearing'],
    ['douglas', 'Douglas'],
    ['dunning', 'Dunning'],
    ['east_garfield_park', 'East Garfield Park'],
    ['east_side', 'East Side'],
    ['edgewater', 'Edgewater'],
    ['edison_park', 'Edison Park'],
    ['englewood', 'Englewood'],
    ['forest_glen', 'Forest Glen'],
    ['fuller_park', 'Fuller Park'],
    ['gage_park', 'Gage Park'],
    ['garfield_ridge', 'Garfield Ridge'],
    ['grand_boulevard', 'Grand Boulevard'],
    ['greater_grand_crossing', 'Greater Grand Crossing'],
    ['hegewisch', 'Hegewisch'],
    ['hermosa', 'Hermosa'],
    ['humboldt_park', 'Humboldt Park'],
    ['hyde_park', 'Hyde Park'],
    ['irving_park', 'Irving Park'],
    ['jefferson_park', 'Jefferson Park'],
    ['kenwood', 'Kenwood'],
    ['lake_view', 'Lake View'],
    ['lincoln_park', 'Lincoln Park'],
    ['lincoln_square', 'Lincoln Square'],
    ['logan_square', 'Logan Square'],
    ['loop', 'Loop'],
    ['lower_west_side', 'Lower West Side'],
    ['mckinley_park', 'Mckinley Park'],
    ['montclare', 'Montclare'],
    ['morgan_park', 'Morgan Park'],
    ['mount_greenwood', 'Mount Greenwood'],
    ['near_north_side', 'Near North Side'],
    ['near_south_side', 'Near South Side'],
    ['near_west_side', 'Near West Side'],
    ['new_city', 'New City'],
    ['north_center', 'North Center'],
    ['north_lawndale', 'North Lawndale'],
    ['north_park', 'North Park'],
    ['norwood_park', 'Norwood Park'],
    ['oakland', 'Oakland'],
    ['ohare', 'Ohare'],
    ['portage_park', 'Portage Park'],
    ['pullman', 'Pullman'],
    ['riverdale', 'Riverdale'],
    ['rogers_park', 'Rogers Park'],
    ['roseland', 'Roseland'],
    ['south_chicago', 'South Chicago'],
    ['south_deering', 'South Deering'],
    ['south_lawndale', 'South Lawndale'],
    ['south_shore', 'South Shore'],
    ['uptown', 'Uptown'],
    ['washington_heights', 'Washington Heights'],
    ['washington_park', 'Washington Park'],
    ['west_elsdon', 'West Elsdon'],
    ['west_englewood', 'West Englewood'],
    ['west_garfield_park', 'West Garfield Park'],
    ['west_lawn', 'West Lawn'],
    ['west_pullman', 'West Pullman'],
    ['west_ridge', 'West Ridge'],
    ['west_town', 'West Town'],
    ['woodlawn', 'Woodlawn']
];

const HOURS = {
    normal: {
        dates: 'October 21 through November 5',
        hours: [
            'Weekdays: 9 a.m. - 6 p.m.',
            'Saturday: 9 a.m- 5 p.m.',
            'Sunday: 10 a.m - 4 p.m.',
            'Election Day: 6 a.m - 7 p.m. (November 5)'
        ]
    },
    elections: {
        dates: 'October 28 through November 4',
        hours: [
            'Weekdays: 9 a.m. – 7 p.m.',
            'Saturday: 9 a.m. – 5 p.m.',
            'Sunday: 10 a.m. – 4 p.m.',
            '<b>NOT open on Election Day</b>'
        ]
    },
    supersite: {
        dates: 'October 28 through November 4',
        hours: [
            'Weekdays: 9 a.m. – 7 p.m.',
            'Saturday: 9 a.m. – 5 p.m.',
            'Sunday: 10 a.m. – 4 p.m.',
            '<b>OPEN on Election Day</b>'
        ]
    },
    school: {
        dates: 'October 30 through November 1',

        hours: ['10 a.m. to 5 p.m.']
    }
};

// add options to selector
for (const comm of communities) {
    // add an option to selector
    let selector = document.querySelector('#ca-zoom');
    let option = document.createElement('option');
    option.value = comm[0];
    option.text = comm[1];
    selector.appendChild(option);
}

let zoomer = document.querySelector('#ca-zoom');
// zoom on change
zoomer.addEventListener('change', (e) => {
    fetch(map.getSource('votingLocations')._data)
        .then((response) => response.json())
        .then((data) => {
            zoomToCA(data, e.target.value);
        });
});

var map = new maplibregl.Map({
    container: 'map',
    style: STYLE,
    center: isMobile ? hpLocation : chiLocation, // starting position [lng, lat]
    maxZoom: 17,
    minZoom: 9.5,
    zoom: 9.5, // starting zoom
    maxBounds: bounds,
    pitchWithRotate: false,
    dragRotate: false,
    touchZoomRotate: false
});

map.addControl(new maplibregl.NavigationControl({ showCompass: false }));

map.on('load', async () => {
    // Add an image to use as a custom marker
    const vote = await map.loadImage('style/democracy.png');
    map.addImage('vote', vote.data);

    const school = await map.loadImage('style/school.png');
    map.addImage('school', school.data);

    const bank = await map.loadImage('style/bank.png');
    map.addImage('bank', bank.data);

    map.addSource('votingLocations', {
        type: 'geojson',
        data: 'data/voting_locations.geojson'
    });

    map.addLayer({
        id: 'votingLocations',
        type: 'symbol',
        source: 'votingLocations',
        layout: {
            'icon-image': [
                'case',
                ['==', ['get', 'type'], 'normal'],
                'vote',
                ['==', ['get', 'type'], 'supersite'],
                'bank',
                ['==', ['get', 'type'], 'elections'],
                'bank',
                ['==', ['get', 'type'], 'school'],
                'school',
                'vote'
            ],
            'icon-allow-overlap': true,
            'icon-size': [
                'interpolate',
                // Set the exponential rate of change to 1.5
                ['exponential', 1.5],
                ['zoom'],
                // When zoom is 9, icon will be 3% size.
                9,
                0.03,
                // When zoom is 11, icon will be 6% size.
                11,
                0.06
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

    map.on('click', 'votingLocations', (e) => {
        showDetails(e);
    });

    map.on('mouseleave', 'votingLocations', () => {
        map.getCanvas().style.cursor = '';
    });
});

// ----- functions -----

function convertToCapitalCase(text) {
    return text
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function showDetails(e) {
    var name = e.features[0].properties.name;
    var dates = HOURS[e.features[0].properties.type].dates;
    var hours = HOURS[e.features[0].properties.type].hours;
    var street = e.features[0].properties.street;
    var language = e.features[0].properties.language;

    var description = `<h3>${name}</h3>
        <h4>${street}</h4>
        <p>Vote ${dates}:</p>
        <ul>${hours.map((hour) => `<li>${hour}</li>`).join('')}</ul>
        <p>Language assistance available in ${language}.</p>`;

    details = document.getElementById('details-text');

    details.classList.remove('fade-in');
    details.offsetHeight;
    details.classList.add('fade-in');
    details.innerHTML = description;
}

function zoomToCA(data, CA) {
    // filter name of feature
    selection = data.features.filter(
        (feature) => feature.properties.name == convertToCapitalCase(CA)
    )[0];
    // filter by the feature

    map.flyTo({
        center: [
            selection.properties.center_lon - (isMobile ? 0 : 0.02),
            selection.properties.center_lat + (isMobile ? 0.02 : 0)
        ],
        zoom: 12
    });
}
