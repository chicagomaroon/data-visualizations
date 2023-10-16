let map;

const mapStyles = [
    {
        featureType: 'poi.attraction',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.government',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.medical',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.park',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.place_of_worship',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    },
    {
        featureType: 'poi.school',
        stylers: [
            {
                visibility: 'simplified'
            }
        ]
    },
    {
        featureType: 'poi.sports_complex',
        stylers: [
            {
                visibility: 'off'
            }
        ]
    }
];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: new google.maps.LatLng(41.794295, -87.590701),
        mapTypeId: 'terrain',
        styles: mapStyles
    });

    // Create a <script> tag and set the USGS URL as the source.
    const script = document.createElement('script');

    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src =
        'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
    for (let i = 0; i < results.features.length; i++) {
        const coords = results.features[i].geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);

        new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
};

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;
