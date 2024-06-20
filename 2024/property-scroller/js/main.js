// make sticky map stop for some text
// https://jsfiddle.net/qm3KZ/26/




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
const buildingStyleHide = {
    "color": "#800000",
    "weight": 2,
    "opacity": 0,
    "fillOpacity": 0
    
};

const buildingStyleShow = {
  "color": "#800000",
  "weight": 2,
  "opacity": 1,
  "fillOpacity": .5
  
};

const uChiLocation = [41.78955289156096,-87.59974479675293]
const ChiLocation = [41.862161325588076, -87.63211524853163]


// create map


function createMap(div, startCoords = uChiLocation, zoomStart = 17) {

    let map = L.map(div,{
        zoomControl: false,
        scrollWheelZoom: false
        }).setView(startCoords, zoomStart);

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
    document.getElementById(div).style.cursor='default';

    return map 
  };


//  ------------ CONFIG TEXT ------------
// function to take config file and turn into html
const config = JSON.parse(sessionStorage.getItem("config"))

function processConfig(config) {
  // config file is an  object with each chapter is an attribute
  for (const chapter of config) {
    //console.log(config[chapter])
    processChapter(chapter)
  }
};

function processChapter(chapter) {
    // a chapter is object with title:str and subsection:array of objects
    // create title div
    console.log(chapter.title)
    let title_div = document.createElement("div");
    title_div.className = "scroller chapter";
    title_div.id = "chapter" + chapter.id;

    let title_text_div = document.createElement("div");
    title_text_div.innerHTML = "<p>Chapter " + chapter.id + "</p>" + "<hr>"+ "<p>" + chapter.chapterTitle + "</p>";
    title_text_div.className = "chapter-title";

    let title_image_div = document.createElement("img");
    title_image_div.src = chapter.image;

    title_div.appendChild(title_text_div);
    title_div.appendChild(title_image_div);

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

let layers = {}
// ------------ WAYPOINTS ------------
// create all waypoint triggers
function waypoints() {
    let offset = "50%";

    new Waypoint({
        element: document.getElementById("step1"),
        handler: function (direction) {
            if (direction == "down") {
                console.log("waypoint1")
            } else {
                mapIntro.removeLayer(introAllBuildings)
                mapIntro.flyTo([41.79139,-87.60000], 15.5);
            }
            },
        offset: offset,
      });

      new Waypoint({
        element: document.getElementById("step2"),
        handler: function () {
            console.log("waypoint2")
            mapIntro.removeLayer(introFirstBuildings)
            introAllBuildings = L.geoJSON(dataAll, {style: buildingStyleShow}).addTo(mapIntro);
            mapIntro.flyTo([41.79139,-87.60000], 15, {
                animate: true,
                duration: 2
                });
            },
        offset: offset,
      });

      for (const chapter of config) {
        for (const subsection of chapter.subsections) {
        //console.log(config[chapter])
            new Waypoint({
            element: document.getElementById(subsection.id),
            handler: function (direction) {
                if (direction == "down") {

                    const data = dataAll.features.filter(d => d.properties.year_start >= subsection.start_year && d.properties.year_start <= subsection.end_year)
                    //bodyAllBuildings.clearLayers();
                    layers[subsection.id] = L.geoJSON(data, {style: buildingStyleShow}).addTo(mapBody);
                        mapBody.flyTo(uChiLocation, subsection.zoom, {
                            animate: true,
                            duration: 3
                            });
                    fadeInLayerLeaflet(layers[subsection.id], 0,.5, 0.005, 5)
                } else {
                    mapBody.removeLayer(layers[subsection.id])
                }},
            offset: offset,
        });
      }}
};


// ------------ MAIN ------------
// combine all into one function
function main() {
    processConfig(config);
    mapIntro = createMap('map-intro');
    // add all layers with opacity 0
    introFirstBuildings = L.geoJSON(dataFirst, {style: buildingStyleShow}).addTo(mapIntro);

    mapBody = createMap('map-body',ChiLocation, 12);


    waypoints();
    };


// run everything
main();





// ------------ TESTING ------------

(function() {
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
                  setElementPosition(element, { top: `${settings.topPixel - screenTop}px`, bottom: '' });
              } else if (isFollowBottomPxVisible && (settings.bottomPixel - screenTop < elHeight)) {
                  setElementPosition(element, { top: '', bottom: `${screenBottom - settings.bottomPixel}px` });
              } else {
                  setElementPosition(element, { top: '0', bottom: '' });
              }
          } else {
              if (isFollowBottomPxVisible) {
                  setElementPosition(element, { top: '', bottom: `${screenBottom - settings.bottomPixel}px` });
              } else if (isFollowTopPxVisible) {
                  setElementPosition(element, { top: `${settings.topPixel - screenTop}px`, bottom: '' });
              } else {
                  const prevScreenTop = element.dataset.followScreen || 0;
                  const scrollDistance = screenTop - prevScreenTop;

                  if (scrollDistance < 0) {
                      if (Math.abs(scrollDistance) > (screenTop - elTop)) {
                          setElementPosition(element, { top: '0', bottom: '' });
                      } else {
                          setElementPosition(element, { top: `${element.getBoundingClientRect().top - (distance || 0)}px`, bottom: '' });
                      }
                  } else {
                      if (Math.abs(scrollDistance) > (elBottom - screenBottom)) {
                          setElementPosition(element, { top: '', bottom: '0' });
                      } else {
                          setElementPosition(element, { top: `${element.getBoundingClientRect().top - (distance || 0)}px`, bottom: '' });
                      }
                  }
              }
          }
      }

      element.dataset.followScreen = screenTop;
  }

  Element.prototype.followScreen = function(options) {
      const settings = Object.assign({ topPixel: 0, bottomPixel: Infinity }, options);

      this.style.position = 'fixed';
      const data = { element: this, settings };

      const onScroll = () => follow({ data });
      window.addEventListener('scroll', onScroll);

      follow({ data });
  }

  document.addEventListener('DOMContentLoaded', () => {
      const topPxOfFooter = document.querySelector('#title-container').getBoundingClientRect().top //+ window.scrollY;

      document.querySelectorAll('#map-intro').forEach(element => {
          element.followScreen({ topPixel: 0, bottomPixel: topPxOfFooter });
      });
  });
})();
