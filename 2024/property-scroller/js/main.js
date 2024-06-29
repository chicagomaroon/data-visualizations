// make sticky map stop for some text
// https://jsfiddle.net/qm3KZ/26/

// explore map funciton like
    // allowed to pan,
    // max and min area 
    // popup for buildings
    // hid story text
    // stop scrolling 
// change filter of layers 
// [
//     "all",     
//    [">=", ['get', 'startDate1'], startDate2],
//    ["<=", ['get', 'endDate1'], endDate2]
// ]

// ------------------ DATA ------------------
dataPath = 'data/with_era.geojson';

d3.json(dataPath, function (df) {
    sessionStorage.setItem('data', JSON.stringify(df));
});
const dataAll = JSON.parse(sessionStorage.getItem('data'));
    
let dataFirst = structuredClone(dataAll);
dataFirst.features = dataFirst.features.filter(
    (d) => d.properties.year_start <= 1925
);


const uChiLocation = [-87.59974479675293, 41.78955289156096];
const ChiLocation = [-87.63211524853163, 41.862161325588076];
const hydeParkLocation = [-87.59654429195592, 41.79504596867451];

const fullOpacity = 0.6;

// -------- MAP FUNCTIONS ---------

function createLayer(name, data, map, is_show = true) {
    sourceName = name + 'Source';

    layerName = name + 'Layer';

    if (is_show) {
        opacity = fullOpacity;
    } else {
        opacity = 0;
    }

    map.addSource(sourceName, {
        type: 'geojson',
        data: data
    });

    map.addLayer({
        id: layerName + 'Fill',
        type: 'fill',
        source: sourceName,
        layout: {},
        paint: {
            'fill-color': '#800000',
            'fill-opacity': opacity,
            //'fill-opacity-transition': { duration: 500 }
        }
    });
    map.addLayer({
        id: layerName + 'Line',
        type: 'line',
        source: sourceName,
        layout: {},
        paint: {
            'line-color': '#800000',
            'line-width': 2,
            'line-opacity': opacity
        }
    });
}

function changeLayerOpacity(map, layerName, show) {
    if (show == 'show') {
        opacity = fullOpacity;
    } else {
        opacity = 0;
    }
    map.setPaintProperty(layerName + 'Fill', 'fill-opacity', opacity);
    map.setPaintProperty(layerName + 'Line', 'line-opacity', opacity);
}

function createMap(div, startCoords = uChiLocation, zoomStart = 17) {
    var map = new maplibregl.Map({
        container: div,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // stylesheet locatio
        center: startCoords, // starting position [lng, lat]
        zoom: zoomStart, // starting zoom
        scrollZoom: false,
        boxZoom: false,
        doubleClickZoom: false
    });
    map.on('load', () => {
        createLayer('first', dataFirst, map, true);
        createLayer('all', dataAll, map, false);
    });

    return map;
}

//  ------------ CONFIG TEXT ------------
// function to take config file and turn into html
const config = JSON.parse(sessionStorage.getItem('config'));

function processConfig(config) {
    // config file is an  object with each chapter is an attribute
    for (const chapter of config) {
        //console.log(config[chapter])
        processChapter(chapter);
    }
}

function processChapter(chapter) {
    // a chapter is object with title:str and subsection:array of objects
    // create title div
    //console.log(chapter.title);
    let title_div = document.createElement('div');
    title_div.className = 'scroller chapter';
    title_div.id = 'chapter' + chapter.id;

    let title_text_div = document.createElement('div');
    title_text_div.innerHTML =
        '<p>Chapter ' +
        chapter.id +
        '</p>' +
        '<hr>' +
        '<p>' +
        chapter.chapterTitle +
        '</p>';
    title_text_div.className = 'chapter-title';

    let title_image_div = document.createElement('img');
    title_image_div.src = chapter.image;

    title_div.appendChild(title_text_div);
    title_div.appendChild(title_image_div);

    document.getElementById('chapters-container').appendChild(title_div);

    // create subsection divs
    for (const subsection of chapter.subsections) {
        //const subsection = chapter.subsections[subsection]
        let subsection_div = document.createElement('div');
        subsection_div.className = 'scroller';
        subsection_div.id = subsection.id;
        subsection_div.textContent = subsection.text;
        document
            .getElementById('chapters-container')
            .appendChild(subsection_div);
    }
}

// ------------ WAYPOINTS ------------
// create all waypoint triggers
function waypoints() {
    let offset = '50%';

    new Waypoint({
        element: document.getElementById('step1'),
        handler: function (direction) {
            if (direction == 'down') {
                console.log('waypoint1');
            } else {
                changeLayerOpacity(mapIntro, 'firstLayer', 'show');
                changeLayerOpacity(mapIntro, 'allLayer', 'hide');
                mapIntro.flyTo({
                    center: uChiLocation,
                    zoom: 15.5,
                    duration: 2000
                });
            }
        },
        offset: '10%'
    });

    new Waypoint({
        element: document.getElementById('step2'),
        handler: function () {
            console.log('waypoint2');

            changeLayerOpacity(mapIntro, 'firstLayer', 'hide');
            changeLayerOpacity(mapIntro, 'allLayer', 'show');

            mapIntro.flyTo({
                center: hydeParkLocation,
                zoom: 14,
                duration: 3500
            });
        },
        offset: '90%'
    });

    new Waypoint({
        element: document.getElementById('1.1'),
        handler: function () {
            console.log('waypoint 1.1');
            mapBody.setPaintProperty('firstLayer', 'fill-opacity', 0.8);
            mapBody.setPaintProperty('allLayer', 'fill-opacity', 0);

            mapBody.flyTo({ center: uChiLocation, zoom: 15.5, duration: 4000 });
        },
        offset: '99%'
    });

    //   for (const chapter of config) {
    //     for (const subsection of chapter.subsections) {
    //     //console.log(config[chapter])
    //         new Waypoint({
    //         element: document.getElementById(subsection.id),
    //         handler: function (direction) {
    //             if (direction == "down") {

    //                 const data = dataAll.features.filter(d => d.properties.year_start >= subsection.start_year && d.properties.year_start <= subsection.end_year)
    //                 //bodyAllBuildings.clearLayers();
    //                 layers[subsection.id] = L.geoJSON(data, {style: buildingStyleShow}).addTo(mapBody);
    //                     mapBody.flyTo(uChiLocation, subsection.zoom, {
    //                         animate: true,
    //                         duration: 3
    //                         });
    //                 fadeInLayerLeaflet(layers[subsection.id], 0,.5, 0.005, 5)
    //             } else {
    //                 mapBody.removeLayer(layers[subsection.id])
    //             }},
    //         offset: offset,
    //     });
    //   }}
}

// ------------ MAIN ------------
// combine all into one function
function main() {
    processConfig(config);
    mapIntro = createMap('map-intro', uChiLocation, 16);
    mapBody = createMap('map-body', ChiLocation, 12);

    waypoints();
}

// run everything
main();


// ------------ TESTING ------------

(function () {
    function setElementPosition(element, styles) {
        for (let key in styles) {
            element.style[key] = styles[key];
        }
    }

    function follow(event) {
        const { settings, element } = event.data;
        const elHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        const screenTop = window.scrollY;
        const screenBottom = screenTop + windowHeight;
        const elTop = element.getBoundingClientRect().top + screenTop;
        const elBottom = elTop + elHeight;

        const isShorterThanScreen = elHeight < windowHeight;
        const isFollowTopPxVisible = screenTop <= settings.topPixel;
        const isFollowBottomPxVisible = screenBottom >= settings.bottomPixel;

        if (elHeight < settings.bottomPixel - settings.topPixel) {
            if (isShorterThanScreen) {
                if (isFollowTopPxVisible) {
                    setElementPosition(element, {
                        top: `${settings.topPixel - screenTop}px`,
                        bottom: ''
                    });
                } else if (
                    isFollowBottomPxVisible &&
                    settings.bottomPixel - screenTop < elHeight
                ) {
                    setElementPosition(element, {
                        top: '',
                        bottom: `${screenBottom - settings.bottomPixel}px`
                    });
                } else {
                    setElementPosition(element, { top: '0', bottom: '' });
                }
            } else {
                if (isFollowBottomPxVisible) {
                    setElementPosition(element, {
                        top: '',
                        bottom: `${screenBottom - settings.bottomPixel}px`
                    });
                } else if (isFollowTopPxVisible) {
                    setElementPosition(element, {
                        top: `${settings.topPixel - screenTop}px`,
                        bottom: ''
                    });
                } else {
                    const prevScreenTop = element.dataset.followScreen || 0;
                    const scrollDistance = screenTop - prevScreenTop;

                    if (scrollDistance < 0) {
                        if (Math.abs(scrollDistance) > screenTop - elTop) {
                            setElementPosition(element, {
                                top: '0',
                                bottom: ''
                            });
                        } else {
                            setElementPosition(element, {
                                top: `${
                                    element.getBoundingClientRect().top -
                                    (distance || 0)
                                }px`,
                                bottom: ''
                            });
                        }
                    } else {
                        if (
                            Math.abs(scrollDistance) >
                            elBottom - screenBottom
                        ) {
                            setElementPosition(element, {
                                top: '',
                                bottom: '0'
                            });
                        } else {
                            setElementPosition(element, {
                                top: `${
                                    element.getBoundingClientRect().top -
                                    (distance || 0)
                                }px`,
                                bottom: ''
                            });
                        }
                    }
                }
            }
        }

        element.dataset.followScreen = screenTop;
    }

    Element.prototype.followScreen = function (options) {
        const settings = Object.assign(
            { topPixel: 0, bottomPixel: Infinity },
            options
        );

        this.style.position = 'fixed';
        const data = { element: this, settings };

        const onScroll = () => follow({ data });
        window.addEventListener('scroll', onScroll);

        follow({ data });
    };

    document.addEventListener('DOMContentLoaded', () => {
        const topPxOfFooter = document
            .querySelector('#title-container')
            .getBoundingClientRect().top; //+ window.scrollY;

        document.querySelectorAll('#map-intro').forEach((element) => {
            element.followScreen({ topPixel: 0, bottomPixel: topPxOfFooter });
        });
    });
})();

function popupStuff() {
    // Create a popup, but don't add it to the map yet.
    const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'firstLayer', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';
        // Copy coordinates array.
        const description = e.features[0].properties.name;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
    });

    map.on('mouseleave', 'firstLayer', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
}
