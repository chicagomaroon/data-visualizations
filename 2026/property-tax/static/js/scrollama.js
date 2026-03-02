/* scrollama set-up */

var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

var scroller = scrollama();

// add steps 
var stepLocations = {
    0: { center: [-87.6086, 41.7942], zoom: 13, pitch: 0, bearing: 0 },
    1: { center: [-87.6086, 41.7942], zoom: 13, pitch: 0, bearing: 0 },
    2: { center: [-87.6086, 41.7942], zoom: 13, pitch: 0, bearing: 0 },
    3: { center: [-87.6086, 41.7942], zoom: 13, pitch: 0, bearing: 0 },
    4: { center: [-87.6086, 41.7942], zoom: 13, pitch: 0, bearing: 0 },
    5: { center: [-87.6086, 41.7942], zoom: 13, pitch: 0, bearing: 0 },
    6: { center: [-87.6086, 41.7942], zoom: 12, pitch: 0, bearing: 0 },
    7: { center: [-87.6086, 41.7942], zoom: 12, pitch: 0, bearing: 0 },
    8: { center: [-87.6086, 41.7942], zoom: 12, pitch: 0, bearing: 0 },
    9: { center: [-87.6086, 41.7942], zoom: 12, pitch: 0, bearing: 0 },
    10: { center: [-87.6086, 41.7942], zoom: 14, pitch: 0, bearing: 0 },
    11: { center: [-87.6005, 41.7950], zoom: 16, pitch: 0, bearing: 0 },
    12: { center: [-87.6005, 41.7950], zoom: 16, pitch: 0, bearing: 0 },
    13: { center: [-87.6005, 41.7950], zoom: 16, pitch: 0, bearing: 0 },
    14: { center: [-87.5997, 41.7895], zoom: 16, pitch: 0, bearing: 0 },
    15: { center: [-87.5872, 41.7896], zoom: 16, pitch: 0, bearing: 0 },
    16: { center: [-87.5872, 41.7896], zoom: 16, pitch: 0, bearing: 0 },
    17: { center: [-87.8541, 41.6311], zoom: 16, pitch: 0, bearing: 0 },
    18: { center: [-87.8541, 41.6311], zoom: 16, pitch: 0, bearing: 0 },
    19: { center: [-87.8541, 41.6311], zoom: 16, pitch: 0, bearing: 0 },
};

function setupStickyfill() {
    d3.selectAll(".sticky").each(function() {
        Stickyfill.add(this);
    });
}

// resize handler
function handleResize() {
    
    var figureHeight = window.innerHeight;
    var figureMarginTop = 0;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    scroller.resize();
}

// enter handlers
function handleStepEnter(response) {

    step.classed("is-active", function(d, i) {
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
        speed: 0.5,
        curve: 1,
        easing: t => 1 - (1-t)*(1-t) 
        });
    }

    // switch from full to tax-exempt properties
    if(response.index === 1 || response.index === 2 || response.index === 3 ||
       response.index === 4 || response.index === 5 || response.index === 6 ||
       response.index === 7 || response.index === 8 || response.index === 9 || 
       response.index === 10
    )
       {
        map.setPaintProperty("property-parcels", "fill-opacity", 0.3);
        map.setPaintProperty("exempt-parcels", "fill-opacity", 1);

    // highlight parcel with roux
    } else if (response.index === 11 || response.index === 12 ||
               response.index === 13 
    ) { 
        map.setPaintProperty("property-parcels", "fill-opacity", 0);
        map.setPaintProperty("exempt-parcels", "fill-opacity", 0);

        map.setFilter("property-highlight", [
            "match",
            ["get", "Name"],
            ["20141040070000","20141040010000",
            "20141040050000","20141040060000"],
            true,
            false
        ]);
    
    // highlight parcel with reynolds, saieh and uchicago bookstore
    } else if (response.index === 14 
    ) { 
        map.setPaintProperty("property-parcels", "fill-opacity", 0);
        map.setPaintProperty("exempt-parcels", "fill-opacity", 0);

        map.setFilter("property-highlight", [
            "match",
            ["get", "Name"],
            ["20141160170000","20141150140000",
            "20141110010000"],
            true,
            false
        ]);

    // highlight parcel with bright horizon
    } else if (response.index === 15 || response.index === 16 
    ) { 
        map.setPaintProperty("property-parcels", "fill-opacity", 0);
        map.setPaintProperty("exempt-parcels", "fill-opacity", 0);

        map.setFilter("property-highlight-nonexempt", [
            "match",
            ["get", "Name"],
            ["20142230300000"],
            true,
            false
        ]);

    // highlight uchicgo medicine orlando park
    } else if (response.index === 17 || response.index === 18 ||
               response.index === 19 
    ) { 
        map.setPaintProperty("property-parcels", "fill-opacity", 0);
        map.setPaintProperty("exempt-parcels", "fill-opacity", 0);

        map.setFilter("property-highlight-nonexempt", [
            "match",
            ["get", "Name"],
            ["27044200858003"],
            true,
            false
        ]);

    } else {
        map.setPaintProperty("property-parcels", "fill-opacity", 0.9);
        map.setPaintProperty("exempt-parcels", "fill-opacity", 0);
        map.setFilter("property-highlight", ["==", "Name", ""]);
    }
}

// -------------------------------------------------------
/* initialize all Scrollama instances */
function init() {
    
   setupStickyfill(); 

   handleResize();

  // Main scrolly
  scroller
    .setup({step: "#scrolly article .step",
            offset: 0.5,
            debug: false })
    .onStepEnter(handleStepEnter);


  // Window resize
  window.addEventListener("load", handleResize);
  window.addEventListener("resize", handleResize);
}

init();

