// ------------------ DATA ------------------
dataPath = "data/with_era.geojson"

d3.json(dataPath, function (df) {
  sessionStorage.setItem("data", JSON.stringify(df));
});

const dataAll = JSON.parse(sessionStorage.getItem("data"))

const dataFirst = dataAll.features.filter(d => d.properties.year_start <= 1925)

 // -------- MAP FUNCTIONS ---------
 //fead in layer
 function fadeInLayerLeaflet(layer, startOpacity, finalOpacity, opacityStep, delay) {
    let opacity = startOpacity;
    let timer = setTimeout(function changeOpacity() {
      if (opacity < finalOpacity) {
        layer.setStyle({
          opacity: opacity,
          fillOpacity: opacity
        });
        opacity = opacity + opacityStep
      }
      
      timer = setTimeout(changeOpacity, delay);
    }, delay)
  }
 

//create map styles
const buildingStyle = {
    "color": "#800000",
    "weight": 2,
    "opacity": 0,
    "fillOpacity": 0
    
};

// create map
let map;

function createMap() {

    map = L.map('map',{
        zoomControl: false,
        scrollWheelZoom: false
        }).setView([41.78955289156096,-87.59974479675293], 17);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

    // disable everything
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();
    document.getElementById('map').style.cursor='default';

    // add all layers with opacity 0
    buildingLayer1 = L.geoJSON(dataAll, {style: buildingStyle}).addTo(map);
    
    buildingLayer2 = L.geoJSON(dataFirst, {style: buildingStyle}).addTo(map);
  };


//  ------------ CONFIG TEXT ------------
// function to take config file and turn into html
const config = JSON.parse(sessionStorage.getItem("config"))

function processConfig(config) {
  // config file is an  object with each chapter is an attribute
  for (const chapter in config) {
    //console.log(config[chapter])
    processChapter(config[chapter])
  }
};

function processChapter(chapter) {
    // a chapter is object with title:str and subsection:array of objects
    // create title div
    console.log(chapter.title)
    let title_div = document.createElement("div");
    title_div.className = "scroller chapter";
    title_div.id = chapter.id;
    title_div.id = "scroller chapter";
    title_div.textContent = chapter.title;
    document.getElementById("chapters-container").appendChild(title_div);

    // create subsection divs
    for (const subsection of chapter.subsections) {
      //const subsection = chapter.subsections[subsection]
      let subsection_div = document.createElement("div");
      subsection_div.className = "scroller";
      subsection_div.id = subsection.id;
      subsection_div.textContent = subsection.text;
      document.getElementById("chapters-container").appendChild(subsection_div);
    }
}


// ------------ WAYPOINTS ------------
// create all waypoint triggers
function waypoints() {
    let offset = "50%";

    new Waypoint({
        element: document.getElementById("step1"),
        handler: function (direction) {
            if (direction == "down") {
                console.log("waypoint1")
                fadeInLayerLeaflet(buildingLayer2, 0,.5, 0.005, 5)
            } else {
                map.removeLayer(buildingLayer2)
                map.flyTo([41.79139,-87.60000], 15.5);
            }
            },
        offset: offset,
      });

      new Waypoint({
        element: document.getElementById("step2"),
        handler: function () {
            console.log("waypoint2")
            map.removeLayer(buildingLayer2)
            fadeInLayerLeaflet(buildingLayer1, 0,.5, 0.005, 5)
            map.flyTo([41.79139,-87.60000], 15);
            },
        offset: offset,
      });
};


// ------------ MAIN ------------
// combine all into one function
function main() {
    processConfig(config);
    createMap();
    waypoints();
    };


// run everything
main();


