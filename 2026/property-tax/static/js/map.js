/* map set-up */

// add main map
    var map = new maplibregl.Map({
        container: 'map',  
        style: 'https://tiles.openfreemap.org/styles/positron',
        center: [-87.6086, 41.7942],  
        zoom: 13,
        interactive: false
    });

// -------------------------------------------------------
// load data for the main map 

Promise.all([
    // all university-owned properties
    d3.json("../data/clean_uni_prop_gdf.json"),
    // tax-exempt properties
    d3.json("../data/parcels.json")
    ]).then(([parcelData, exemptData]) => { 

    map.on("load", async () => {

            map.addSource("properties", {
                type: "geojson",
                data: parcelData
            });

            map.addSource("tax-exempt", {
                type: "geojson",
                data: exemptData
            });

            // all properties
            map.addLayer({
                id: "property-parcels", 
                type: "fill",
                source: "properties", 
                paint: {
                    "fill-color": [
                        "match", 
                        ["get", "mailing_name"],
                            'University of Chicago', "#A52519",  
                            'DePaul University', '#003DA5',
                            'Loyola University', "#BE9112",   
                            'Northwestern University', "#833FE8",
                            'University of Illinois', '#FF5F05',
                                                    '#99999901'
                    ], 
                    "fill-opacity": 0
                }
            });

            // tax-exempt properties
            map.addLayer({
                id: "exempt-parcels",
                type: "fill",
                source: "tax-exempt",
                paint: {
                    "fill-color": [
                        "match",
                        ["get","owner_name"],
                        "University of Chicago","#A52519",
                        "#99999901"
                    ],
                    "fill-opacity": 0
                }
             });

            // highlight tax-exempt properties
            map.addLayer({
                id: "property-highlight",
                type: "fill", 
                source: "tax-exempt", 
                paint: {
                    "fill-color": "#A52519",
                    "fill-opacity": 0.9,
                },
                filter: ["==", "Name", ""]
            });

            // highlight non-exempt properties
            map.addLayer({
                id: "property-highlight-nonexempt",
                type: "fill", 
                source: "properties", 
                paint: {
                    "fill-color": "#A52519",
                    "fill-opacity": 0.9,
                },
                filter: ["==", "Name", ""]
            });

    })
    });

