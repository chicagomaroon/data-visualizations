
const uChiLocation = [-87.59974479675293, 41.78955289156096]

dataPath = "../data/with_era.geojson"

d3.json(dataPath, function (df) {
  sessionStorage.setItem("data", JSON.stringify(df));
});

const dataAll = JSON.parse(sessionStorage.getItem("data"))

let dataFirst = structuredClone(dataAll);
dataFirst.features = dataFirst.features.filter(
    (d) => d.properties.year_start <= 1925);

console.log(dataAll)
console.log(dataFirst)



var map = new maplibregl.Map({
    container: 'map',
    style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // stylesheet locatio
    center: uChiLocation, // starting position [lng, lat]
    zoom: 10 // starting zoom
});  


map.on('load', () => {
    map.addSource('maineSource', {
        'type': 'geojson',
        'data': dataAll
    });
    map.addLayer({
        'id': 'maineLayer',
        'type': 'fill',
        'source': 'maineSource',
        'layout': {},
        'paint': {
            'fill-color': '#800000',
            'fill-opacity': 0.8
        },
        "filter": ['<', 'year_start',1940]
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



