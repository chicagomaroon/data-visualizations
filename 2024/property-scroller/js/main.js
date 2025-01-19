//TODO
// must
//      mobile
//      confirm timeline years
//       red is > year_start and (< end or currently own)
//       > year_end and currently exists and currently own is false, then grey (sold)

//nice to have
//      scroll to continue at the top
//      max and min area
//     separate out js files
//      edit basemap to take out stuff we dont want https://basemaps.cartocdn.com/gl/positron-gl-style/style.json

//maybe
//      hover options
//      https://docs.mapbox.com/help/tutorials/create-interactive-hover-effects-with-mapbox-gl-js/

// ------------------ DATA ------------------
dataPath = 'data/properties.geojson';
otherPath = 'data/other_geoms.geojson';
let config = [];

// -------- CONSTANTS --------

const uChiLocation = [-87.59974479675293, 41.78955289156096];
const uChiLocationMobile = [-87.59977046881636, 41.7896449092535];
const ChiLocation = [-87.63211524853163, 41.862161325588076];
const hydeParkLocation = [-87.5965, 41.795];
const hpLocationSide = [-87.606, 41.795];
const uChiLocationSide = [-87.606, 41.78955];

const isMobile = window.innerWidth < 900;

const zoomSpeed = 5000;
PRIMARY_COLOR = '#800000';
SECONDARY_COLOR = 'black';
let currentCenter = [];
let currentZoom = 0;
let activePopups = [];

const fullOpacity = 0.6;
const nav = new maplibregl.NavigationControl();

let flashingInterval = '';

// hihglight ids
const ids_1_3 = ['157655073', '156128082'];
const ids_gothic = ['1953426', '151173253'];
const ids_dorms = ['153266965', '2087203', '10657061', '11687839'];

// ------- LISTENERS --------
document.getElementById('map-slider').addEventListener('input', (e) => {
    mapBody.setFilter('layerSlider', [
        'any',
        [
            'all',
            ['<=', ['get', 'year_start'], Number(e.target.value)],
            ['>', ['get', 'year_end'], Number(e.target.value)]
        ],
        [
            'all',
            ['<=', ['get', 'year_end'], Number(e.target.value)],
            ['==', ['get', 'currently_exists'], true]
        ]
    ]);
    mapBody.setPaintProperty('layerSlider', 'fill-color', [
        'case',
        [
            'all',
            ['<', ['get', 'year_end'], Number(e.target.value)],
            ['==', ['get', 'currently_owned'], false]
        ],
        'black', // sold
        PRIMARY_COLOR
    ]);
    document.getElementById('slider-year').innerText = e.target.value;
});

// -------- HELPER FUNCTIONS --------

function highlightPopup(ids, layer = null) {
    if (!layer) {
        activeLayer = findActiveLayerName(mapBody);
    } else {
        activeLayer = layer;
    }

    const features = mapBody.queryRenderedFeatures({ layers: [activeLayer] });

    // Filter features based on ID
    const selectedFeatures = features.filter((feature) =>
        ids.includes(feature.properties.id)
    );

    // Show popup for each selected feature
    selectedFeatures.forEach((feature) => {
        const description =
            "<div class='popup'>" +
            "<div class = 'popup-label'>BUILDING NAME</div>" +
            '<h6>' +
            feature.properties.name +
            '</h6>' +
            "<div class = 'popup-label'> YEAR BUILT</div>" +
            '<h6>' +
            feature.properties.year_start +
            '</h6>';
        //'<p>' +
        //feature.properties.id +
        //'</p>' +
        ('</div>');
        // TODO centeriod of polygon instead of first point

        const coordinates = feature.geometry.coordinates[0][0];
        // hacky way to fix dorm popup overlap
        if (['153266965', '2087203'].includes(feature.properties.id)) {
            anchor = 'right';
        } else if (['10657061', '11687839'].includes(feature.properties.id)) {
            anchor = 'left';
        } else {
            anchor = 'top';
        }
        const popup = new maplibregl.Popup({
            closeButton: false,
            className: 'popup-highlight',
            anchor: anchor
        })
            .setLngLat(coordinates)
            .setHTML(description)
            .setMaxWidth('250px')
            .addTo(mapBody);
        activePopups.push(popup);
    });
}

function removePopups() {
    activePopups.forEach((popup) => popup.remove());
    activePopups = [];
}

function findActiveLayerName(map) {
    layers = map.getStyle().layers;
    activeLayer = layers.filter(
        (layer) =>
            layer.paint &&
            layer.paint['fill-opacity'] > 0 &&
            layer.id.includes('layer')
    );
    // if length of active layer is 0

    return activeLayer.length != 0 ? activeLayer[0].id : null;
}

function exploreMap() {
    const active = document.querySelector('#explore-button').dataset.active;

    if (active == 'Story') {
        // update current map location to return to
        currentZoom = mapBody.getZoom();
        currentCenter = mapBody.getCenter();
        // exploring map

        //remove existing popups
        removePopups();

        // change text and flag
        document.querySelector('#explore-button').dataset.active = 'Explore';
        document.querySelector('#explore-button').innerHTML = 'Return to Story';

        // disable scroll;
        document.body.classList.add('stop-scrolling');

        // hide scrollers
        document
            .querySelectorAll('.scroller')
            .forEach((o) => (o.style.visibility = 'hidden'));

        // allow map panning
        mapBody.dragPan.enable();
        mapBody.scrollZoom.enable();
        mapBody.boxZoom.enable();
        mapBody.doubleClickZoom.enable();
        mapBody.addControl(nav, 'top-right');
    } else {
        // change text and flag
        document.querySelector('#explore-button').dataset.active = 'Story';
        document.querySelector('#explore-button').innerHTML = 'Explore Map';

        // show scrollers
        document
            .querySelectorAll('.scroller')
            .forEach((o) => (o.style.visibility = 'visible'));

        // enable scroll
        document.body.classList.remove('stop-scrolling');

        // return to where we were
        //location = [center, zoom]
        mapBody.flyTo({
            center: currentCenter,
            zoom: currentZoom,
            duration: 2000
        });

        // disable map stuff
        mapBody.dragPan.disable();
        mapBody.scrollZoom.disable();
        mapBody.boxZoom.disable();
        mapBody.doubleClickZoom.disable();
        mapBody.removeControl(nav);

        // remove popups
        removePopups();
    }
}
// find value in config file
function findConfigValue(id, value) {
    for (chapter of config) {
        for (subsection of chapter.subsections) {
            if (subsection.id == id) {
                return subsection[value];
            }
        }
    }
}

//fade in opacity
function fadeInLayer(layer, start, end, increment, time) {
    let opacity = start;
    let timer = setInterval(function () {
        if (opacity >= end) {
            clearInterval(timer);
        }
        layer.style.opacity = opacity;
        opacity += increment;
    }, time);
}

function changeTimelineYear(targetYear) {
    if (!targetYear) {
        return;
    }

    pause = 25;

    let currentYearM3 = document.getElementById('timeline-3').innerHTML,
        currentYearM2 = document.getElementById('timeline-2').innerHTML,
        currentYearM1 = document.getElementById('timeline-1').innerHTML,
        currentYear = document.getElementById('timeline-0').innerHTML,
        currentYearP1 = document.getElementById('timeline+1').innerHTML,
        currentYearP2 = document.getElementById('timeline+2').innerHTML,
        currentYearP3 = document.getElementById('timeline+3').innerHTML;

    function incrementCounter() {
        document.getElementById('timeline-3').innerHTML = currentYearM3;
        document.getElementById('timeline-2').innerHTML = currentYearM2;
        document.getElementById('timeline-1').innerHTML = currentYearM1;
        document.getElementById('timeline-0').innerHTML = currentYear;
        document.getElementById('timeline+1').innerHTML = currentYearP1;
        document.getElementById('timeline+2').innerHTML = currentYearP2;
        document.getElementById('timeline+3').innerHTML = currentYearP3;

        if (targetYear > currentYear) {
            if (currentYear++ < targetYear) {
                currentYearM3++;
                currentYearM2++;
                currentYearM1++;
                currentYearP1++;
                currentYearP2++;
                currentYearP3++;
                setTimeout(incrementCounter, pause);
            }
        } else {
            if (currentYear-- > targetYear) {
                currentYearM3--;
                currentYearM2--;
                currentYearM1--;
                currentYearP1--;
                currentYearP2--;
                currentYearP3--;
                setTimeout(incrementCounter, pause);
            }
        }
    }
    incrementCounter();
}

function flashLayer(map, layerId, interval = 1000) {
    let isVisible = true;

    // Create interval for flashing
    return setInterval(() => {
        // Toggle opacity between 0 and 1
        map.setPaintProperty(layerId, 'raster-opacity', isVisible ? 0 : 0.8);
        isVisible = !isVisible;
    }, interval);
}

function updateLayers(addYear, removeLayer = null) {
    // remove layer
    if (!removeLayer) {
        activeLayer = findActiveLayerName(mapBody);
    } else {
        activeLayer = removeLayer;
    }
    // remove layer
    activeLayer ? filterOpacity(mapBody, activeLayer, false) : null;
    // add layer
    filterOpacity(mapBody, 'layer' + String(addYear), true);

    // update timeline
    changeTimelineYear(addYear);
}

// -------- MAP FUNCTIONS ---------

function createOtherGeoms(map) {
    // land_grant
    map.addLayer({
        id: 'land_grant',
        type: 'fill',
        source: 'other',
        layout: {},
        paint: {
            'fill-color': PRIMARY_COLOR,
            'fill-opacity': 0,
            'fill-opacity-transition': { duration: 1000 }
        },
        filter: ['==', ['get', 'name'], 'og_land_grant']
    });

    // shuttles
    map.addLayer({
        id: 'shuttles',
        type: 'line',
        source: 'other',
        layout: {},
        paint: {
            // line color based on color attribute
            'line-color': [
                'case',
                ['==', ['get', 'color'], 'BLUE'],
                '#31C8F1',
                ['==', ['get', 'color'], 'GREEN'],
                '#86E23C',
                ['==', ['get', 'color'], 'DARK GREEN'],
                '#306024',
                ['==', ['get', 'color'], 'RED'],
                '#E13736',
                ['==', ['get', 'color'], 'PURPLE'],
                '#9233B6',
                ['==', ['get', 'color'], 'YELLOW'],
                '#EAD946',
                ['==', ['get', 'color'], 'ORANGE'],
                '#EE9D21',
                ['==', ['get', 'color'], 'PINK'],
                '#ED61BE',
                'black'
            ],
            'line-width': 5,
            'line-opacity': 0
        },
        filter: ['==', ['get', 'shuttle'], '1']
    });

    // police
    map.addLayer({
        id: 'ucpd_bounds_2024_line',
        type: 'line',
        source: 'other',
        layout: {},
        paint: {
            'line-color': 'black',
            'line-width': 2,
            'line-opacity': 0
        },
        filter: ['==', ['get', 'name'], 'Patrol Area']
    });

    map.addLayer({
        id: 'ucpd_bounds_2024_fill',
        type: 'fill',
        source: 'other',
        layout: {},
        paint: {
            'fill-color': 'black',
            'fill-opacity': 0
        },
        filter: ['==', ['get', 'name'], 'Patrol Area']
    });
}

function createOverlayMapLayers(map) {
    // add all image overlay
    // urban renewal 1955
    map.addSource('south_campus_plan', {
        type: 'image',
        url: './static/images/south_campus_plan.jpg',
        coordinates: [
            [-87.60165, 41.786],
            [-87.59755, 41.78605], //
            [-87.5975, 41.78355],
            [-87.60158, 41.78353]
        ]
    });

    map.addLayer({
        id: 'south_campus_plan',
        type: 'raster',
        source: 'south_campus_plan',
        paint: {
            'raster-opacity': 0,
            'raster-opacity-transition': { duration: 2000 }
        }
    });

    map.addSource('covenants', {
        type: 'image',
        url: './static/images/covenant_edit.png',
        coordinates: [
            [-87.77, 41.9102],
            [-87.5246834044871, 41.914], //
            [-87.5246834044871, 41.702], //
            [-87.76566748604431, 41.7]
        ]
    });

    map.addLayer({
        id: 'covenants',
        type: 'raster',
        source: 'covenants',
        paint: {
            'raster-opacity': 0,
            'raster-opacity-transition': { duration: 2000 }
        }
    });

    // urban renewal
    map.addSource('urban_renewal_1960', {
        type: 'image',
        url: './static/images/urban_renewal_1960.jpg',
        coordinates: [
            [-87.6069, 41.80970913038894],
            [-87.574, 41.80970913038894], //
            [-87.574, 41.78770955793823],
            [-87.6065, 41.78770955793823]
        ]
    });

    map.addLayer({
        id: 'urban_renewal_1960',
        type: 'raster',
        source: 'urban_renewal_1960',
        paint: {
            'raster-opacity': 0,
            'raster-opacity-transition': { duration: 2000 }
        }
    });

    map.addSource('south_roads', {
        type: 'image',
        url: './static/images/south_1968.jpg',
        coordinates: [
            [-87.606042, 41.78644],
            [-87.58968, 41.7867],
            [-87.58961, 41.7843],
            [-87.606, 41.784]
        ]
    });

    map.addLayer({
        id: 'south_roads',
        type: 'raster',
        source: 'south_roads',
        paint: {
            'raster-opacity': 0,
            'raster-opacity-transition': { duration: 2000 }
        }
    });

    map.addSource('EAHP', {
        type: 'image',
        url: './static/images/EAHP.png',
        coordinates: [
            [-87.63899174851709, 41.849],
            [-87.481, 41.849], //
            [-87.481, 41.75057371953466],
            [-87.63899174851709, 41.75057371953466]
        ]
    });

    map.addLayer({
        id: 'EAHP',
        type: 'raster',
        source: 'EAHP',
        paint: {
            'raster-opacity': 0
        }
    });

    map.addSource('opc_plan', {
        type: 'image',
        url: './static/images/opc_plan.jpg',
        coordinates: [
            [-87.58883159578394, 41.7881],
            [-87.58299929754422, 41.7881], //
            [-87.58299929754422, 41.78193744932196],
            [-87.5888, 41.78193744932196]
        ]
    });

    map.addLayer({
        id: 'opc_plan',
        type: 'raster',
        source: 'opc_plan',
        paint: {
            'raster-opacity': 0
        }
    });
}

function createLayerYears(map_name, layerName, year) {
    /*
    create the base source and layers that we will filter
    */
    map_name.addLayer({
        id: layerName,
        type: 'fill',
        source: 'buildings',
        layout: {},
        paint: {
            'fill-color': [
                'case',
                [
                    'all',
                    ['<', ['get', 'year_end'], year],
                    ['==', ['get', 'currently_owned'], false]
                ],
                'black', // sold
                PRIMARY_COLOR
            ],
            'fill-opacity': 0,
            'fill-opacity-transition': {
                duration: map_name == mapIntro ? 5000 : 1000
            }
        },
        filter: [
            'any',
            [
                'all',
                ['<=', ['get', 'year_start'], parseInt(year)],
                ['>', ['get', 'year_end'], parseInt(year)]
            ],
            [
                'all',
                ['<', ['get', 'year_end'], year],
                ['==', ['get', 'currently_exists'], true]
            ]
        ]
    });
}

let bodyLayers = [];

function allLayers(map, type) {
    if (type == 'intro') {
        map.addLayer({
            id: 'startLayer',
            type: 'fill',
            source: 'buildings',
            layout: {},
            paint: {
                'fill-color': PRIMARY_COLOR,
                'fill-opacity': 0,
                'fill-opacity-transition': {
                    duration: map == mapIntro ? 5000 : 1000
                }
            },
            filter: ['==', ['get', 'quad_flag'], true]
        });
        map.addLayer({
            id: 'endLayer',
            type: 'fill',
            source: 'buildings',
            layout: {},
            paint: {
                'fill-color': [
                    'case',
                    ['==', ['get', 'currently_owned'], false],
                    'black',
                    PRIMARY_COLOR
                ],
                'fill-opacity': 0,
                'fill-opacity-transition': {
                    duration: map == mapIntro ? 5000 : 1000
                }
            },
            filter: [
                'any',
                ['==', ['get', 'currently_exists'], true],
                ['==', ['get', 'currently_owned'], true]
            ]
        });
    } else if (type == 'body') {
        for (let year = 1890; year <= 2025; year += 5) {
            layerName = 'layer' + String(year);

            bodyLayers.push(layerName);
            createLayerYears(map, layerName, year);
        }

        // add 2024 layer for now
        map.addLayer({
            id: 'layer2024',
            type: 'fill',
            source: 'buildings',
            layout: {},
            paint: {
                'fill-color': [
                    'case',
                    [
                        'all',
                        ['<', ['get', 'year_end'], 2024],
                        ['==', ['get', 'currently_owned'], false]
                    ],
                    'black', // sold
                    PRIMARY_COLOR
                ],
                'fill-opacity': 0,
                'fill-opacity-transition': {
                    duration: map == mapIntro ? 5000 : 1000
                }
            },
            filter: [
                'any',
                [
                    'all',
                    ['<=', ['get', 'year_start'], 2024],
                    ['>=', ['get', 'year_end'], 2024]
                ],
                [
                    'all',
                    ['<', ['get', 'year_end'], 2024],
                    ['==', ['get', 'currently_exists'], true]
                ]
            ]
        });
        bodyLayers.push('layer2024');

        map.addLayer({
            id: 'layerSlider',
            type: 'fill',
            source: 'buildings',
            layout: {},
            paint: {
                'fill-color': [
                    'case',
                    [
                        'all',
                        ['<', ['get', 'year_end'], 2024],
                        ['==', ['get', 'currently_owned'], false]
                    ],
                    'black', // sold
                    PRIMARY_COLOR
                ],
                'fill-opacity': 0,
                'fill-opacity-transition': {
                    duration: map == mapIntro ? 5000 : 1000
                }
            },
            filter: [
                'any',
                [
                    'all',
                    ['<=', ['get', 'year_start'], 2024],
                    ['>=', ['get', 'year_end'], 2024]
                ],
                [
                    'all',
                    ['<', ['get', 'year_end'], 2024],
                    ['==', ['get', 'currently_exists'], true]
                ]
            ]
        });

        bodyLayers.push('layerSlider');

        createOtherGeoms(map);

        createOverlayMapLayers(map);
    }
}

function filterOpacity(map, layer, show = true, opacity_max = 0.6) {
    if (show) {
        opacity = opacity_max;
    } else {
        opacity = 0;
    }
    map.setPaintProperty(layer, 'fill-opacity', opacity);
}

function createMap(div, type, startCoords = uChiLocation, zoomStart = 17) {
    let map = new maplibregl.Map({
        container: div,
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json', // stylesheet locatio
        center: startCoords, // starting position [lng, lat]
        zoom: zoomStart, // starting zoom
        scrollZoom: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragPan: false,
        pitchWithRotate: false,
        dragRotate: false,
        touchZoomRotate: false,
        attributionControl: { compact: true }
        // TODO
        // maxBounds: bounds
    });

    map.on('load', () => {
        map.addSource('buildings', {
            type: 'geojson',
            data: dataPath
        });

        map.addSource('other', {
            type: 'geojson',
            data: otherPath
        });

        allLayers(map, type);
        popupStuff(map);
    });

    return map;
}

function popupStuff(map_name) {
    // Create a popup, but don't add it to the map yet.

    // fix popup stuff, only on popup on turn on layer
    // mapBody.getLayer('layer1900').paint._values['fill-opacity'].value.value

    const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // do all of this for all the layers :(
    for (l of bodyLayers) {
        map_name.on('mouseover', l, (e) => {
            const active =
                document.querySelector('#explore-button').dataset.active;
            if (
                (active == 'Explore') & // only show popup if in explore mode
                (e.features[0].layer.paint['fill-opacity'] > 0) // only show popup if layer is visible
            ) {
                // Change the cursor style as a UI indicator.
                map_name.getCanvas().style.cursor = 'pointer';

                const description =
                    "<div class='popup'>" +
                    "<div class = 'popup-label'>BUILDING NAME</div>" +
                    '<h6>' +
                    e.features[0].properties.name +
                    '</h6>' +
                    "<div class = 'popup-label'> YEAR BUILT</div>" +
                    '<h6>' +
                    e.features[0].properties.year_start +
                    '</h6>' +
                    '</div>';

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(e.lngLat).setHTML(description).addTo(map_name);
            }
        });

        map_name.on('mouseleave', l, () => {
            map_name.getCanvas().style.cursor = '';
            popup.remove();
        });
    }
}

//  ------------ CONFIG TEXT ------------
// function to take config file and turn into html

function processConfig(config) {
    // config file is an  object with each chapter is an attribute
    for (const chapter of config) {
        processChapter(chapter);
    }
}

function processChapter(chapter) {
    // a chapter is object with title:str and subsection:array of objects
    // create title div

    let title_div = document.createElement('div');
    title_div.className = 'scroller chapter';
    title_div.id = 'chapter' + chapter.id;

    let title_text_div = document.createElement('div');
    title_text_div.innerHTML =
        '<p class = "num-chapter">Chapter ' +
        chapter.id +
        '</p>' +
        '<div class = "chapter-phoenix"> <img src="static/images/phoenix.svg" alt="Phoenix Logo" class = "chapter-phoenix"/></div>' +
        // '<hr class = "line-chapter">' +
        '<p>' +
        chapter.chapterTitle +
        '</p>';
    title_text_div.className = 'chapter-title';

    let title_img_credit = document.createElement('div');
    title_img_credit.innerHTML = chapter.img_credit;
    title_img_credit.className = 'chapter-img-credit';

    let title_image_div = document.createElement('img');
    title_image_div.src = chapter.image;
    title_image_div.className = 'chapter-image';

    title_div.appendChild(title_text_div);
    title_div.appendChild(title_image_div);
    title_div.appendChild(title_img_credit);

    document.getElementById('chapters-container').appendChild(title_div);

    // create subsection divs
    for (const subsection of chapter.subsections) {
        //const subsection = chapter.subsections[subsection]
        let subsection_div = document.createElement('div');
        // if there is a photo add it above text in a new div

        if (subsection.image) {
            if (subsection.id == '3.2') {
                let comparison_div = document.createElement('div');
                let image_comparison = `
                    <img-comparison-slider class="slider-with-animated-handle">
                        <figure slot="first" class="before">
                            <img width="100%" src="./static/images/before_55.jpg" />
                            <figcaption>1950</figcaption>
                        </figure>
                        <figure slot="second" class="after">
                            <img width="100%" src="./static/images/after_55.jpg" />
                            <figcaption>1961</figcaption>
                        </figure>
                        <svg
                            slot="handle"
                            class="custom-animated-handle"
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            viewBox="-8 -3 16 6"
                        >
                            <path
                                stroke="#fff"
                                d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2"
                                stroke-width="1"
                                fill="#fff"
                                vector-effect="non-scaling-stroke"
                            ></path>
                        </svg>
                    </img-comparison-slider>
                `;
                comparison_div.innerHTML = image_comparison;
                subsection_div.appendChild(comparison_div);
            } else {
                let image_div = document.createElement('img');
                image_div.src = subsection.image;
                image_div.className = 'scroller-image';
                subsection_div.appendChild(image_div);
            }
            let credit = document.createElement('p');
            credit.className = 'credit';
            credit.innerHTML = subsection.image_credit;
            subsection_div.appendChild(credit);
        }

        if (subsection.quote) {
            let quote_div = document.createElement('p');
            quote_div.className = 'quote';
            let quoteText = document.createElement('p');
            quoteText.innerHTML = subsection.quote;
            quoteText.className = 'quoteText';
            let quoteAuthor = document.createElement('p');
            quoteAuthor.className = 'quoteAuthor';
            quoteAuthor.innerHTML = '-' + subsection.quoteAuthor;

            quote_div.appendChild(quoteText);
            quote_div.appendChild(quoteAuthor);
            subsection_div.appendChild(quote_div);

            let credit = document.createElement('p');
            credit.className = 'credit';
            credit.innerHTML = subsection.quoteSource;
            subsection_div.appendChild(credit);
        }

        subsection_div.className = 'scroller';
        subsection_div.id = subsection.id;
        let sText = document.createElement('div');
        sText.innerHTML = subsection.text;
        subsection_div.appendChild(sText);
        document
            .getElementById('chapters-container')
            .appendChild(subsection_div);
    }
    // last scroller for spacing
    let last = document.createElement('div');
    last.className = 'scroller';
    last.id = 'last-scroller';

    document.getElementById('chapters-container').appendChild(last);

    // fix for img comparison image in 3.2

    let image_comparison = `
        <img-comparison-slider class="slider-with-animated-handle">
            <figure slot="first" class="before">
                <img width="100%" src="before_55.jpg" />
                <figcaption>1950</figcaption>
            </figure>
            <figure slot="second" class="after">
                <img width="100%" src="after_55.jpg" />
                <figcaption>1961</figcaption>
            </figure>
            <svg
                slot="handle"
                class="custom-animated-handle"
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                viewBox="-8 -3 16 6"
            >
                <path
                    stroke="#fff"
                    d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2"
                    stroke-width="1"
                    fill="#fff"
                    vector-effect="non-scaling-stroke"
                ></path>
            </svg>
        </img-comparison-slider>
    `;
}

// ------------ WAYPOINTS ------------

function introWaypoints() {
    new Waypoint({
        element: document.getElementById('step1'),
        handler: function (direction) {
            if (direction == 'down') {
            } else {
                filterOpacity(mapIntro, 'endLayer', false);
                filterOpacity(mapIntro, 'startLayer', true);

                mapIntro.flyTo({
                    center: uChiLocation,
                    zoom: 15.5,
                    duration: zoomSpeed
                });
            }
        },
        offset: '1%'
    });

    new Waypoint({
        element: document.getElementById('step2'),
        handler: function () {
            filterOpacity(mapIntro, 'startLayer', false);

            filterOpacity(mapIntro, 'endLayer', true);

            mapIntro.flyTo({
                center: hydeParkLocation,
                zoom: 13.5,
                duration: 6000
            });
        },
        offset: '90%'
    });
    new Waypoint({
        element: document.getElementById('intro-text'),
        handler: function (direction) {
            const introDiv = document.getElementById('intro-text');
            if (direction == 'down') {
                fadeInLayer(introDiv, 0, 1, 0.005, 5);
            } else {
                introDiv.style.opacity = 0;
            }
        },
        offset: '50%'
    });
}

function bodyWaypoints() {
    new Waypoint({
        element: document.getElementById('chapters-container'),
        handler: function (direction) {
            chapterDiv = document.getElementById('chapters-container');
            if (direction == 'down') {
                // fade in
                fadeInLayer(chapterDiv, 0, 1, 0.005, 5);
            } else {
                chapterDiv.style.opacity = 0;
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('1.1'),
        handler: function (direction) {
            if (direction == 'down') {
            } else {
                mapBody.flyTo({
                    center: ChiLocation,
                    zoom: 12,
                    duration: zoomSpeed
                });
            }
        },
        offset: '99%'
    });

    new Waypoint({
        element: document.getElementById('1.1'),
        handler: function (direction) {
            if (direction == 'down') {
                document.getElementById('explore-nav').style.visibility =
                    'visible';
            } else {
                document.getElementById('explore-nav').style.visibility =
                    'hidden';
                filterOpacity(mapBody, 'layer1900', false);
            }
        },
        offset: '99%'
    });

    new Waypoint({
        element: document.getElementById('1.2'),
        handler: function (direction) {
            if (direction == 'down') {
                filterOpacity(mapBody, 'land_grant');
                timelineYear = findConfigValue('1.2', 'timeline_year');
                changeTimelineYear(timelineYear);
                mapBody.flyTo({
                    center: isMobile ? uChiLocationMobile : uChiLocationSide,
                    zoom: isMobile ? 14 : 14.5,
                    duration: 7000
                });
            } else {
                updateLayers(1895);
                filterOpacity(mapBody, 'land_grant', true);
                filterOpacity(mapBody, 'layer1895', false);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('1.3'),
        handler: function (direction) {
            if (direction == 'down') {
                filterOpacity(mapBody, 'land_grant', false);
                updateLayers(1895);
            } else {
                timelineYear = findConfigValue('1.2', 'timeline_year');
                changeTimelineYear(timelineYear);
                filterOpacity(mapBody, 'land_grant', true);
                filterOpacity(mapBody, 'layer1895', false);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('1.3a'),
        handler: function (direction) {
            if (direction == 'down') {
                updateLayers(1930);
                // highlight popups
                highlightPopup(ids_1_3);
            } else {
                removePopups();
                updateLayers(1895);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('1.4'),
        handler: function (direction) {
            if (direction == 'down') {
                removePopups();
                timelineYear = findConfigValue('1.4', 'timeline_year');
                updateLayers(1935);

                mapBody.setPaintProperty(
                    'south_campus_plan',
                    'raster-opacity',
                    0.8
                );

                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59949114840359, 41.78503755171042]
                        : [-87.602, 41.7849],
                    zoom: isMobile ? 15.5 : 16,
                    duration: zoomSpeed
                });
            } else {
                mapBody.setPaintProperty(
                    'south_campus_plan',
                    'raster-opacity',
                    0.0
                );
                mapBody.flyTo({
                    center: isMobile ? uChiLocationMobile : uChiLocationSide,
                    zoom: isMobile ? 14 : 14.5,
                    duration: zoomSpeed
                });
                updateLayers(1930);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('1.5'),
        handler: function (direction) {
            if (direction == 'down') {
                mapBody.setPaintProperty(
                    'south_campus_plan',
                    'raster-opacity',
                    0
                );
                mapBody.flyTo({
                    center: isMobile ? uChiLocationMobile : uChiLocationSide,
                    zoom: isMobile ? 14 : 14.5,
                    duration: zoomSpeed
                });
                // timeout then add popup
                setTimeout(() => {
                    highlightPopup(['72']);
                }, 2000);
            } else {
                removePopups();
                mapBody.setPaintProperty(
                    'south_campus_plan',
                    'raster-opacity',
                    0.8
                );

                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59949114840359, 41.78503755171042]
                        : [-87.602, 41.7849],
                    zoom: isMobile ? 15.5 : 16,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('chapter2'),
        handler: function () {
            removePopups();
        }
    });

    new Waypoint({
        element: document.getElementById('demographics'),
        handler: function (direction) {
            if (direction == 'down') {
                removePopups();
            } else {
            }
        },
        offset: '99%'
    });

    new Waypoint({
        element: document.getElementById('2.1'),
        handler: function (direction) {
            if (direction == 'down') {
                mapBody.setPaintProperty('covenants', 'raster-opacity', 0.7);
                updateLayers(1950);
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.62954280979011, 41.812252875663404]
                        : [-87.73, 41.81],
                    zoom: isMobile ? 10 : 10.6,
                    duration: zoomSpeed
                });
            } else {
                mapBody.setPaintProperty('covenants', 'raster-opacity', 0);
                updateLayers(1925);
                mapBody.flyTo({
                    center: isMobile ? uChiLocationMobile : uChiLocationSide,
                    zoom: isMobile ? 14 : 14.5,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('chapter3'),
        handler: function (direction) {
            if (direction == 'down') {
                removePopups();
                mapBody.setPaintProperty('covenants', 'raster-opacity', 0);
                updateLayers(1950);
                mapBody.flyTo({
                    center: isMobile ? uChiLocationMobile : uChiLocationSide,
                    zoom: isMobile ? 14 : 14.5,
                    duration: zoomSpeed
                });
            } else {
                removePopups();
                mapBody.setPaintProperty('covenants', 'raster-opacity', 0.7);
                updateLayers(1950);
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.62954280979011, 41.812252875663404]
                        : [-87.73, 41.81],
                    zoom: isMobile ? 10 : 10.6,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('3.1'),
        handler: function (direction) {
            if (direction == 'down') {
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59299428700159, 41.795720774063426]
                        : [-87.60278337713892, 41.79910939443005],
                    zoom: isMobile ? 13.2 : 14,
                    duration: zoomSpeed
                });
                // add overlay
                mapBody.setPaintProperty(
                    'urban_renewal_1960',
                    'raster-opacity',
                    0.8
                );
            } else {
                mapBody.setPaintProperty(
                    'urban_renewal_1960',
                    'raster-opacity',
                    0.0
                );
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('3.2'),
        handler: function (direction) {
            if (direction == 'down') {
                // fly to A B Zoom in
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59067538770329, 41.79664800370716]
                        : [-87.59551281193906, 41.796688484805856],
                    zoom: 15,
                    duration: zoomSpeed
                });
                updateLayers(1955);
            } else {
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59299428700159, 41.795720774063426]
                        : [-87.60278337713892, 41.79910939443005],
                    zoom: isMobile ? 13.2 : 14,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('3.3'),
        handler: function (direction) {
            if (direction == 'down') {
                // fly to Southwest Hyde Park Redevelopment Corporation
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.60413577508204, 41.79399163751296]
                        : [-87.6082519319518, 41.7935107582129],
                    zoom: 15,
                    duration: zoomSpeed
                });
            } else {
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59067538770329, 41.79664800370716]
                        : [-87.59551281193906, 41.796688484805856],
                    zoom: 15,
                    duration: zoomSpeed
                });
                updateLayers(1955);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('3.4'),
        handler: function (direction) {
            if (direction == 'down') {
                // fly to whole plan
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59299428700159, 41.795720774063426]
                        : [-87.60278337713892, 41.79910939443005],
                    zoom: isMobile ? 13.2 : 14,
                    duration: zoomSpeed
                });
                updateLayers(1960);
            } else {
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.60413577508204, 41.79399163751296]
                        : [-87.6082519319518, 41.7935107582129],
                    zoom: 15,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('3.5'),
        handler: function (direction) {
            if (direction == 'down') {
                // fly to south campus
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59644229579109, 41.784868927190615]
                        : [-87.6028193070742, 41.7851952871184],
                    zoom: 14,
                    duration: zoomSpeed
                });
            } else {
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59299428700159, 41.795720774063426]
                        : [-87.60278337713892, 41.79910939443005],
                    zoom: isMobile ? 13.2 : 14,
                    duration: zoomSpeed
                });
                updateLayers(1960);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('3.5a'),
        handler: function (direction) {
            if (direction == 'down') {
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59299428700159, 41.795720774063426]
                        : [-87.60278337713892, 41.79910939443005],
                    zoom: isMobile ? 13.2 : 14,
                    duration: zoomSpeed
                });
            } else {
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59644229579109, 41.784868927190615]
                        : [-87.6028193070742, 41.7851952871184],
                    zoom: isMobile ? 13.5 : 14,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('chapter4'),
        handler: function (direction) {
            if (direction == 'down') {
                removePopups();
                // remove map
                mapBody.setPaintProperty(
                    'urban_renewal_1960',
                    'raster-opacity',
                    0
                );
                mapBody.flyTo({
                    center: uChiLocationSide,
                    zoom: 13.5,
                    duration: zoomSpeed
                });
            } else {
                removePopups();
                mapBody.flyTo({
                    center: isMobile
                        ? [-87.59299428700159, 41.795720774063426]
                        : [-87.60278337713892, 41.79910939443005],
                    zoom: isMobile ? 13.2 : 14,
                    duration: zoomSpeed
                });
                // add overlay
                mapBody.setPaintProperty(
                    'urban_renewal_1960',
                    'raster-opacity',
                    0.8
                );
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('4.2'),
        handler: function (direction) {
            if (direction == 'down') {
                // show
                mapBody.setPaintProperty('shuttles', 'line-opacity', 0.6);
            } else {
                mapBody.setPaintProperty('shuttles', 'line-opacity', 0);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('4.3'),
        handler: function (direction) {
            if (direction == 'down') {
                updateLayers(1970);

                // rm shuttles
                mapBody.setPaintProperty('shuttles', 'line-opacity', 0);
                mapBody.setPaintProperty('south_roads', 'raster-opacity', 0.7);

                flashingInterval = flashLayer(mapBody, 'south_roads', 2000);
                mapBody.flyTo({
                    center: [-87.605, 41.7849],
                    zoom: 14.5,
                    duration: zoomSpeed
                });
            } else {
                mapBody.flyTo({
                    center: uChiLocationSide,
                    zoom: 13.5,
                    duration: zoomSpeed
                });
                mapBody.setPaintProperty('shuttles', 'line-opacity', 0.6);
                mapBody.setPaintProperty('south_roads', 'raster-opacity', 0);
                clearInterval(flashingInterval);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('4.4'),
        handler: function (direction) {
            if (direction == 'down') {
                updateLayers(1980);

                // rm south roads
                clearInterval(flashingInterval);
                mapBody.setPaintProperty('south_roads', 'raster-opacity', 0);

                mapBody.setPaintProperty(
                    'ucpd_bounds_2024_line',
                    'line-opacity',
                    1
                );
                mapBody.setPaintProperty(
                    'ucpd_bounds_2024_fill',
                    'fill-opacity',
                    0.2
                );

                // zoom out
                mapBody.flyTo({
                    center: [-87.60278, 41.8],
                    zoom: 12.5,
                    duration: zoomSpeed
                });
            } else {
                updateLayers(1970);

                mapBody.setPaintProperty('south_roads', 'raster-opacity', 0.7);
                flashingInterval = flashLayer(mapBody, 'south_roads', 2000);
                mapBody.flyTo({
                    center: [-87.602, 41.7849],
                    zoom: 14.5,
                    duration: zoomSpeed
                });

                mapBody.setPaintProperty(
                    'ucpd_bounds_2024_line',
                    'line-opacity',
                    0
                );
                mapBody.setPaintProperty(
                    'ucpd_bounds_2024_fill',
                    'fill-opacity',
                    0
                );
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('4.5'),
        handler: function (direction) {
            if (direction == 'down') {
                updateLayers(2000);

                mapBody.setPaintProperty(
                    'ucpd_bounds_2024_line',
                    'line-opacity',
                    0
                );
                mapBody.setPaintProperty(
                    'ucpd_bounds_2024_fill',
                    'fill-opacity',
                    0
                );
                mapBody.setPaintProperty('EAHP', 'raster-opacity', 1);
                mapBody.flyTo({
                    center: [-87.62, 41.8],
                    zoom: 11.75,
                    duration: zoomSpeed
                });
            } else {
                mapBody.setPaintProperty('EAHP', 'raster-opacity', 0);
                mapBody.setPaintProperty(
                    'ucpd_bounds_2024_line',
                    'line-opacity',
                    1
                );
                mapBody.setPaintProperty(
                    'ucpd_bounds_2024_fill',
                    'fill-opacity',
                    0.2
                );
                updateLayers(1980);
                // zoom out
                mapBody.flyTo({
                    center: [-87.60278, 41.8],
                    zoom: 12.5,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('4.6'),
        handler: function (direction) {
            if (direction == 'down') {
                updateLayers(2020);
                removePopups();
                mapBody.setPaintProperty('EAHP', 'raster-opacity', 0);
                mapBody.flyTo({
                    center: [-87.6105, 41.78955],
                    zoom: 13.5,
                    duration: zoomSpeed
                });
                // highlight dorms after zoom
                setTimeout(() => {
                    highlightPopup(ids_dorms);
                }, 1000);
            } else {
                removePopups();
                mapBody.zoomTo(11.5, { duration: zoomSpeed });
                mapBody.setPaintProperty('EAHP', 'raster-opacity', 1);
                updateLayers(2000);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('4.7'),
        handler: function (direction) {
            if (direction == 'down') {
                // highlight dorms
                removePopups();
            } else {
                mapBody.flyTo({
                    center: [-87.6105, 41.78955],
                    zoom: 13.5,
                    duration: zoomSpeed
                });
                // highlight dorms after zoom
                setTimeout(() => {
                    highlightPopup(ids_dorms);
                }, 1000);
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('chapter5'),
        handler: function (direction) {
            if (direction == 'down') {
                removePopups();
            } else {
                removePopups();
            }
        }
    });

    // TODO high light buildings idea
    new Waypoint({
        element: document.getElementById('5.2'),
        handler: function (direction) {
            if (direction == 'down') {
                // highlight sold buildings
                activeLayer = findActiveLayerName(mapBody);
                mapBody.flyTo({
                    center: [-87.59975128884997, 41.795],
                    zoom: 14,
                    duration: zoomSpeed,
                    bearing: 0
                });
                mapBody.setPaintProperty(activeLayer, 'fill-color', [
                    'case',
                    ['>=', ['get', 'recent_residential_sales'], 0],
                    'black',
                    PRIMARY_COLOR
                ]);
            } else {
                mapBody.flyTo({
                    center: [-87.6105, 41.78955],
                    zoom: 13.5,
                    duration: zoomSpeed,
                    bearing: 0
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('5.3'),
        handler: function (direction) {
            if (direction == 'down') {
                // highlight arts buildings /WP
                mapBody.flyTo({
                    center: [-87.62238983619335, 41.79449748170734],
                    zoom: 14.5,
                    duration: zoomSpeed,
                    bearing: 0
                });
            } else {
                mapBody.flyTo({
                    center: [-87.62238983619335, 41.79449748170734],
                    zoom: 14,
                    duration: zoomSpeed,
                    bearing: 0
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('5.4'),
        handler: function (direction) {
            if (direction == 'down') {
                mapBody.flyTo({
                    center: [-87.6105, 41.78955],
                    zoom: 13.5,
                    duration: zoomSpeed,
                    bearing: 0
                });
            } else {
                mapBody.flyTo({
                    center: [-87.62238983619335, 41.79449748170734],
                    zoom: 15.5,
                    duration: zoomSpeed,
                    bearing: 0
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('chapter6'),
        handler: function (direction) {
            if (direction == 'down') {
                // reset highlights
                // what layer to remove?
                removePopups();
                updateLayers(2024);
            } else {
                removePopups();
            }
        }
    });

    new Waypoint({
        element: document.getElementById('6.1'),
        handler: function (direction) {
            if (direction == 'down') {
                mapBody.setPaintProperty('opc_plan', 'raster-opacity', 1);
                mapBody.flyTo({
                    center: [-87.5859, 41.78534],
                    zoom: isMobile ? 15.5 : 16.5,
                    bearing: 90,
                    duration: zoomSpeed
                });
            } else {
                mapBody.flyTo({
                    center: [-87.6105, 41.78955],
                    zoom: 13.5,
                    bearing: 0,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('6.2'),
        handler: function (direction) {
            if (direction == 'down') {
                mapBody.setPaintProperty('opc_plan', 'raster-opacity', 0);
                mapBody.flyTo({
                    center: hydeParkLocation,
                    zoom: 13.5,
                    bearing: 0,
                    duration: zoomSpeed
                });
            } else {
                mapBody.setPaintProperty('opc_plan', 'raster-opacity', 1);
                mapBody.flyTo({
                    center: [-87.5859, 41.78534],
                    zoom: isMobile ? 15.5 : 16.5,
                    bearing: 90,
                    duration: zoomSpeed
                });
            }
        },
        offset: '50%'
    });

    new Waypoint({
        element: document.getElementById('final-scroller'),
        handler: function (direction) {
            if (direction == 'down') {
                filterOpacity(mapBody, 'layerSlider', true);
                filterOpacity(mapBody, 'layer2024', false);
                // move up a little
                mapBody.flyTo({
                    center: hydeParkLocation,
                    zoom: 13.5,
                    bearing: 0,
                    duration: zoomSpeed
                });
                // rm timeline and explore map button
                document.getElementById('explore-nav').style.visibility =
                    'hidden';
                document.getElementById('timeline-container').style.visibility =
                    'hidden';
                removePopups();
                document.getElementById('map-overlay-menu').style.visibility =
                    'visible';
                document.getElementById(
                    'map-overlay-methodology'
                ).style.visibility = 'visible';

                // enable popups
                document.querySelector('#explore-button').dataset.active =
                    'Explore';

                // allow map panning
                mapBody.dragPan.enable();
                mapBody.boxZoom.enable();
                mapBody.doubleClickZoom.enable();
                mapBody.addControl(nav, 'top-right');
            } else {
                filterOpacity(mapBody, 'layerSlider', false);
                filterOpacity(mapBody, 'layer2024', true);
                // bring back timeline and explore map button
                document.getElementById('explore-nav').style.visibility =
                    'visible';
                document.getElementById('timeline-container').style.visibility =
                    'visible';
                removePopups();
                document.getElementById('map-overlay-menu').style.visibility =
                    'hidden';
                document.getElementById(
                    'map-overlay-methodology'
                ).style.visibility = 'hidden';

                // reset map
                mapBody.flyTo({
                    center: hydeParkLocation,
                    zoom: 13.5,
                    bearing: 0,
                    duration: zoomSpeed
                });

                // disable popup
                document.querySelector('#explore-button').dataset.active =
                    'Story';

                // disable map stuff
                mapBody.dragPan.disable();
                mapBody.scrollZoom.disable();
                mapBody.boxZoom.disable();
                mapBody.doubleClickZoom.disable();
                mapBody.removeControl(nav);
            }
        },
        offset: '0%'
    });
}

// create all waypoint triggers
function waypoints() {
    introWaypoints();
    bodyWaypoints();
}

// ------------ MAIN ------------

// combine all into one function
function init() {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
    // create html elements from config
    config = JSON.parse(sessionStorage.getItem('config'));
    processConfig(config);

    // create maps
    mapIntro = createMap('map-intro', 'intro', uChiLocation, 16);
    mapBody = createMap('map-body', 'body', ChiLocation, 12);
    popupStuff(mapBody);

    mapIntro.on('style.load', () => {
        const waiting = () => {
            if (!mapIntro.isStyleLoaded()) {
                setTimeout(waiting, 200);
            } else {
                filterOpacity(mapIntro, 'startLayer', true);
            }
        };
        waiting();
    });

    // fade in to start
    intro = document.querySelector('#intro');
    fadeInLayer(intro, 0, 1, 0.002, 5);

    // create waypoints
    waypoints();
}

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

        init();
    });
})();
