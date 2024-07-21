
const uChiLocation = [-87.59974479675293, 41.78955289156096]

dataPath = "../data/with_era.geojson"




var map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // stylesheet locatio
    center: uChiLocation, // starting position [lng, lat]
    zoom: 13 // starting zoom
});  


map.on('load', () => {
    map.addSource('maineSource', {
        'type': 'geojson',
        'data': dataPath
    });
    map.addLayer({
        'id': 'maineLayer',
        'type': 'fill',
        'source': 'maineSource',
        'layout': {},
        'paint': {
            'fill-color': '#800000',
            'fill-opacity': 0.8,
            'fill-opacity-transition': { duration: 1000 }
        }
    });

    // todo 
    //map.setFilter('collisions', ['==', ['number', ['get', 'Hour']], hour]);


    map.on('mouseenter', 'maineLayer', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        console.log(e)
    });
});


function zoomToFeature() {
    map.zoomTo(14, {
        duration: 2000,})
}

document.getElementById('myRange').addEventListener('input', (e) => {
    map.setFilter('maineLayer', ['<', 'year_start', Number(e.target.value)]);
    document.getElementById('year').innerText = e.target.value;

})



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


