const uChiLocation = [-87.59974479675293, 41.78955289156096];
const oc = [-87.5859, 41.78534];

dataPath = '../data/display_dataset_1_16_25.geojson';
shuttlePath = '../data/uchi_shuttle_lines.geojson';

var map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // stylesheet locatio
    center: oc, // starting position [lng, lat]
    zoom: 11.5 // starting zoom
});

map.on('load', () => {
    map.addSource('maineSource', {
        type: 'geojson',
        data: dataPath
    });
    // map.addSource('shuttleSource', {
    //     type: 'geojson',
    //     data: shuttlePath
    // });
    map.addLayer({
        id: 'maineLayer',
        type: 'fill',
        source: 'maineSource',
        layout: {},
        paint: {
            'fill-color': '#800000',
            'fill-opacity': 1,
            'fill-opacity-transition': { duration: 1000 }
        }
    });

    // map.addLayer({
    //     id: 'shuttleLayer',
    //     type: 'line',
    //     source: 'shuttleSource',
    //     layout: {},
    //     paint: {
    //         'line-color': [
    //             'match',
    //             ['get', 'color'],
    //             'RED',
    //             '#E23B3A',
    //             'GREEN',
    //             '#86E348',
    //             'BLUE',
    //             '#3AC6ED',
    //             'PURPLE',
    //             '#9738B8',
    //             'ORANGE',
    //             '#EE9E35',
    //             'PINK',
    //             '#ED62BE',
    //             'YELLOW',
    //             '#EAD851',
    //             'black'
    //         ],
    //         'line-width': 4,
    //         'line-opacity': 0.8
    //     }
    // });
    // map.addSource('pic', {
    //     type: 'image',
    //     url: 'south.png',
    //     coordinates: [
    //         [-87.60604239816492, 41.78587818193077],
    //         [-87.5914718984645, 41.78608103456102],
    //         [-87.5914379346819, 41.784228542224554],
    //         [-87.60600462554439, 41.78406161624358]
    //     ]
    // });

    //convenants;
    // map.addSource('south', {
    //     type: 'image',
    //     url: 'south_1968.jpg',
    //     coordinates: [
    //         [-87.606042, 41.78644],
    //         [-87.58968, 41.7867],
    //         [-87.58961, 41.7843],
    //         [-87.606, 41.784]
    //     ]
    // });

    // // south_1968
    // map.addSource('covenants', {
    //     type: 'image',
    //     url: 'covenant_edit.png',
    //     coordinates: [
    //         [-87.77, 41.9102],
    //         [-87.5246834044871, 41.914], //
    //         [-87.5246834044871, 41.702], //
    //         [-87.76566748604431, 41.7]
    //     ]
    // });

    // // urban renewal
    // map.addSource('pic', {
    //     type: 'image',
    //     url: 'urban_renewal_1960.jpg',
    //     coordinates: [
    //         [-87.6069, 41.80970913038894],
    //         [-87.574, 41.80970913038894], //
    //         [-87.574, 41.78770955793823],
    //         [-87.6065, 41.78770955793823]
    //     ]
    // });

    // urban renewal 1955
    // map.addSource('pic', {
    //     type: 'image',
    //     url: 'ur_1955.jpg',
    //     coordinates: [
    //         [-87.6067, 41.81],
    //         [-87.5795, 41.8105], //
    //         [-87.5795, 41.78770955793823],
    //         [-87.6062, 41.78770955793823]
    //     ]
    // });

    // map.addLayer({
    //     id: 'pic-layer',
    //     type: 'raster',
    //     source: 'pic',
    //     paint: {
    //         'raster-opacity': 0.5
    //     }
    // });

    // map.addSource('south_campus_plan', {
    //     type: 'image',
    //     url: 'south_campus_plan.jpg',
    //     coordinates: [
    //         [-87.60165, 41.786],
    //         [-87.59755, 41.78605], //
    //         [-87.5975, 41.78355],
    //         [-87.60158, 41.78353]
    //     ]
    // });

    // [-87.63899174851709, 41.849],
    //         [-87.481, 41.849], //
    //         [-87.47, 41.75057371953466],
    //         [-87.63899174851709, 41.75057371953466]

    // map.addSource('EAHP', {
    //     type: 'image',
    //     url: 'EAHP.png',
    //     coordinates: [
    //         [-87.63899174851709, 41.849],
    //         [-87.481, 41.849], //
    //         [-87.481, 41.75057371953466],
    //         [-87.63899174851709, 41.75057371953466]
    //     ]
    // });

    // map.addLayer({
    //     id: 'EAHP',
    //     type: 'raster',
    //     source: 'EAHP',
    //     paint: {
    //         'raster-opacity': 0.9
    //     }
    // });

    // map.addSource('opc_plan', {
    //     type: 'image',
    //     url: 'opc_plan.jpg',
    //     coordinates: [
    //         [-87.58883159578394, 41.7881],
    //         [-87.58299929754422, 41.7881], //
    //         [-87.58299929754422, 41.78193744932196],
    //         [-87.5888, 41.78193744932196]
    //     ]
    // });

    // map.addLayer({
    //     id: 'opc_plan',
    //     type: 'raster',
    //     source: 'opc_plan',
    //     paint: {
    //         'raster-opacity': 1
    //     }
    // });

    map.on('click', 'maineLayer', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        console.log(e.features[0].properties);
        console.log(e.features[0].properties.era);
    });
});

function zoomToFeature() {
    map.zoomTo(14, {
        duration: 2000
    });
}

document.getElementById('myRange').addEventListener('input', (e) => {
    map.setFilter('maineLayer', ['<', 'year_start', Number(e.target.value)]);
    document.getElementById('year').innerText = e.target.value;
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

let play_state = false;
document.getElementById('play-button').addEventListener('click', async (e) => {
    // change year every one second
    console.log('play');
    if (play_state) {
        e.target.innerText = 'Play';
        play_state = false;
        return;
    } else {
        e.target.innerText = 'Pause';
        play_state = true;
    }
    for (let i = 1890; i <= 2025; i++) {
        document.getElementById('year').innerText = i;
        map.setFilter('maineLayer', ['<', 'year_start', Number(i)]);
        await sleep(10);
    }
    await sleep(1000);
    for (let i = 2025; i >= 1890; i--) {
        document.getElementById('year').innerText = i;
        map.setFilter('maineLayer', ['<', 'year_start', Number(i)]);
        year--;
        await sleep(10);
    }
});

document.getElementById('fade').addEventListener('click', () => {
    const fader = document.getElementById('fade');

    const fadeText = fader.textContent;
    if (fadeText === 'Fade Out') {
        document.querySelector('#fade').textContent = 'Fade In';
        map.setPaintProperty('maineLayer', 'fill-opacity', 0);
    } else {
        document.querySelector('#fade').textContent = 'Fade Out';
        map.setPaintProperty('maineLayer', 'fill-opacity', 1);
    }
});

new Waypoint({
    element: document.getElementById('step1'),
    handler: function (direction) {
        if (direction == 'down') {
            console.log('waypoint1');
            map.setPaintProperty('maineLayer', 'fill-opacity', 0);
        } else {
            map.setPaintProperty('maineLayer', 'fill-opacity', 1);
        }
    },
    offset: '1%'
});

new Waypoint({
    element: document.getElementById('step2'),
    handler: function (direction) {
        if (direction == 'down') {
            console.log('waypoint1');
            map.setPaintProperty('maineLayer', 'fill-opacity', 1);
        } else {
            map.setPaintProperty('maineLayer', 'fill-opacity', 0);
        }
    },
    offset: '1%'
});
