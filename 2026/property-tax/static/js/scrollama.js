/* scrollama set-up */

var main = d3.select('main');
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');
var scroller = scrollama();

// detect mobile
var isMobile = window.innerWidth < 800;

// add mobile coordinates
var group1 = { center: isMobile ? [-87.594196, 41.795186] : [-87.6079, 41.7942], 
                zoom: isMobile ? 12.5 : 13.5, pitch: 0, bearing: 0 }
var group2 = { center: isMobile ? [-87.594196, 41.795186] : [-87.6086, 41.7942], 
                zoom: 12.5, pitch: 0, bearing: 0 }
var group3 = { center: isMobile ? [-87.600578, 41.794210] : [-87.6012, 41.7944], 
                zoom: isMobile ? 16 : 16, pitch: 0, bearing: 0 }
var group4 = { center: isMobile ? [-87.587142, 41.789127] : [-87.589, 41.7896], 
                zoom: isMobile ? 16 : 16, pitch: 0, bearing: 0 }
var group5 = { center: isMobile ? [-87.854289, 41.631216] : [-87.8567, 41.6312], 
                zoom: isMobile ? 16 : 16, pitch: 0, bearing: 0 }




// add steps
var stepLocations = {
    0: group1, 1: group1, 2: group1, 3: group1, 4: group1, 5: group1,

    6: group2, 7: group2, 8: group2, 9: group2,

    10: { center: isMobile ? [-87.594196, 41.795186] : [-87.6086, 41.7942], 
                zoom: isMobile ? 12.5 : 13.5, pitch: 0, bearing: 0 },

    11: group3, 12: group3, 13: group3,

    14: { center: isMobile ? [-87.599623, 41.789554] : [-87.6018, 41.7898], 
                zoom: isMobile ? 15 : 16, pitch: 0, bearing: 0 },

    15: group4, 16: group4,
    
    17: group5, 18: group5, 19: group5
};

function setupStickyfill() {
    d3.selectAll('.sticky').each(function () {
        Stickyfill.add(this);
    });
}

// resize handler
function handleResize() {
    var figureHeight = window.innerHeight;
    var figureMarginTop = 0;

    figure
        .style('height', figureHeight + 'px')
        .style('top', figureMarginTop + 'px');

    scroller.resize();
}

// enter handlers
function handleStepEnter(response) {
    step.classed('is-active', function (d, i) {
        return i === response.index;
    });

    // fly map to the step’s coordinates
    const loc = stepLocations[response.index];
    if (loc) {
        map.flyTo({
            center: loc.center,
            zoom: loc.zoom,
            pitch: loc.pitch || 0,
            bearing: loc.bearing || 0,
            speed: 0.7,
            curve: 1,
            easing: (t) => 1 - (1 - t) * (1 - t)
        });
    }

    if (response.index === 0) {
        // Show all property parcels, hide exempt parcels, clear any filters
        map.setPaintProperty('property-parcels', 'fill-opacity', 0.8);
        map.setPaintProperty('property-parcels', 'fill-color', '#A52519'); 
        map.setPaintProperty('exempt-parcels', 'fill-opacity', 0);
        map.setPaintProperty('non-exempt-parcels', 'fill-opacity', 0);
        map.setFilter('property-highlight', ['==', 'Name', '']);
        map.setFilter('property-highlight-nonexempt', ['==', 'Name', '']);


        // switch from full to tax-exempt properties
    } else if (
        response.index === 1 ||
        response.index === 2 ||
        response.index === 3 ||
        response.index === 4 ||
        response.index === 5 ||
        response.index === 6 ||
        response.index === 7 ||
        response.index === 8 ||
        response.index === 9 ||
        response.index === 10
    ) {
        map.setPaintProperty('property-parcels', 'fill-opacity', 0);
        map.setPaintProperty('non-exempt-parcels', 'fill-opacity', 0.8);
        map.setPaintProperty('non-exempt-parcels', 'fill-color', 'rgb(154, 154, 154)');

        map.setPaintProperty('exempt-parcels', 'fill-opacity', 0.8);
        map.setPaintProperty('exempt-parcels', 'fill-color', '#A52519');

        map.setFilter('property-highlight', ['==', 'Name', '']);
        map.setFilter('property-highlight-nonexempt', ['==', 'Name', '']);

        // highlight parcel with roux
    } else if (
        response.index === 11 ||
        response.index === 12 ||
        response.index === 13
    ) {
        map.setPaintProperty('non-exempt-parcels', 'fill-opacity', 0);
        map.setPaintProperty('property-parcels', 'fill-opacity', 0);
        map.setPaintProperty('exempt-parcels', 'fill-opacity', 0);

        map.setFilter('property-highlight', [
            'match',
            ['get', 'Name'],
            [
                '20141040070000',
                '20141040010000',
                '20141040050000',
                '20141040060000'
            ],
            true,
            false
        ]);

        // highlight parcel with reynolds, saieh and uchicago bookstore
    } else if (response.index === 14) {
        map.setPaintProperty('non-exempt-parcels', 'fill-opacity', 0);
        map.setPaintProperty('property-parcels', 'fill-opacity', 0);
        map.setPaintProperty('exempt-parcels', 'fill-opacity', 0);

        map.setFilter('property-highlight', [
            'match',
            ['get', 'Name'],
            ['20141160170000', '20141150140000', '20141110010000'],
            true,
            false
        ]);

        // highlight parcel with bright horizon
    } else if (response.index === 15 || response.index === 16) {
        map.setPaintProperty('non-exempt-parcels', 'fill-opacity', 0);
        map.setPaintProperty('property-parcels', 'fill-opacity', 0);
        map.setPaintProperty('exempt-parcels', 'fill-opacity', 0);

        map.setFilter('property-highlight-nonexempt', [
            'match',
            ['get', 'Name'],
            ['20142230300000'],
            true,
            false
        ]);

        // highlight uchicgo medicine orlando park
    } else if (
        response.index === 17 ||
        response.index === 18 ||
        response.index === 19
    ) {
        map.setPaintProperty('non-exempt-parcels', 'fill-opacity', 0);
        map.setPaintProperty('property-parcels', 'fill-opacity', 0);
        map.setPaintProperty('exempt-parcels', 'fill-opacity', 0);

        map.setFilter('property-highlight-nonexempt', [
            'match',
            ['get', 'Name'],
            ['27044200858003'],
            true,
            false
        ]);
    } else {
        map.setPaintProperty('non-exempt-parcels', 'fill-opacity', 0);
        map.setPaintProperty('property-parcels', 'fill-opacity', 0);
        map.setPaintProperty('exempt-parcels', 'fill-opacity', 0);
        map.setFilter('property-highlight', ['==', 'Name', '']);
    }
}

function handleStepExit(response) {
    if (response.index === 0 && response.direction === 'up') {
        map.setPaintProperty('non-exempt-parcels', 'fill-opacity', 0);
        map.setPaintProperty('property-parcels', 'fill-opacity', 0);
        map.setPaintProperty('exempt-parcels', 'fill-opacity', 0);
        map.setFilter('property-highlight', ['==', 'Name', '']);
        map.setFilter('property-highlight-nonexempt', ['==', 'Name', '']);
    }
}

// -------------------------------------------------------
/* initialize all Scrollama instances */
function init() {
    setupStickyfill();

    handleResize();

    // Main scrolly
    scroller
        .setup({ step: '#scrolly article .step', offset: 0.5, debug: false })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    // Window resize
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
}

init();
