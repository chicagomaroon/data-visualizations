const uChiLocation = [-87.59974479675293, 41.78955289156096];

dataPath = '../data/with_era.geojson';

var map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // stylesheet locatio
    center: uChiLocation, // starting position [lng, lat]
    zoom: 13 // starting zoom
});

map.on('load', () => {
    map.addSource('maineSource', {
        type: 'geojson',
        data: dataPath
    });
    map.addLayer({
        id: 'maineLayer',
        type: 'fill',
        source: 'maineSource',
        layout: {},
        paint: {
            'fill-color': '#800000',
            'fill-opacity': 0,
            'fill-opacity-transition': { duration: 1000 }
        }
    });
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
    map.addSource('covenants', {
        type: 'image',
        url: 'covenant_edit.png',
        coordinates: [
            [-87.77, 41.9102],
            [-87.5246834044871, 41.914], //
            [-87.5246834044871, 41.702], //
            [-87.76566748604431, 41.7]
        ]
    });

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

    // // urban renewal 1955
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
    //         'raster-opacity': 0.9
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

    map.addLayer({
        id: 'pic',
        type: 'raster',
        source: 'pic',
        paint: {
            'raster-opacity': 0.5
        }
    });

    setFilter('collisions', ['==', ['number', ['get', 'Hour']], hour]);

    map.on('mouseenter', 'maineLayer', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        console.log(e);
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
