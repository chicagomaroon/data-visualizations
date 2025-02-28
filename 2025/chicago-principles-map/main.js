const STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';
const USA = [-98.35, 39.5];
let popup;

// check if mobile
let isMobile = window.innerWidth < 800 ? true : false;

var map = new maplibregl.Map({
    container: 'map',
    style: STYLE,
    // middle of USA
    center: USA,
    zoom: isMobile ? 3 : 3.5, // starting zoom
    pitchWithRotate: false,
    dragRotate: false,
    touchZoomRotate: false
});

// navigation coltrols
map.addControl(new maplibregl.NavigationControl());

map.on('load', async () => {
    // Add an image to use as a custom marker
    map.addSource('unis', {
        type: 'geojson',
        data: 'data/uchi-principle-geo.geojson'
    });

    map.addLayer({
        id: 'unis',
        type: 'circle',
        source: 'unis',
        layout: {},
        paint: {
            'circle-color': '#800000',
            'circle-radius': 7,
            'circle-opacity': 0.6
        },
        filter: ['>=', 'year', 2015]
    });

    //add popup on mouseover and click
    map.on('click', 'unis', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        createPopup(e);
    });

    map.on('mouseenter', 'unis', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        createPopup(e);
    });

    map.on('mouseleave', 'unis', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});

// ----- functions -----

function createPopup(e) {
    if (popup) {
        popup.remove();
    }
    var coordinates = e.features[0].geometry.coordinates.slice();
    var university = e.features[0].properties.university;
    var date = e.features[0].properties.date;
    let type = e.features[0].properties.adoption_type;
    var description = `
    <div class="popup-content">
        <h2 class="popup-title">${university}</h2>
        <hr>
        <p class="popup-date"><b>Date of Adoption</b>: ${date}</p>
        <p class="popup-type"><b>Type of Adoption</b>: ${type}</p>
    </div>`;

    // add class
    popup = new maplibregl.Popup({ closeButton: false, className: 'popup' })
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
}

document.getElementById('map-slider').addEventListener('input', (e) => {
    if (popup) {
        popup.remove();
    }
    console.log(e.target.value);
    // mapBody is name of map. 'layerSlider' here is name of the layer
    map.setFilter('unis', ['<=', 'year', Number(e.target.value)]);
    // change text of the year label above slider
    document.getElementById('slider-year').innerText = e.target.value;
});
