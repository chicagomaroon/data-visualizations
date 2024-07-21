function filterLayer (map, startYear, endYear) {
    /*
    filter the layer set for the map
    */

    
    //map.setPaintProperty('layerLine', 'line-opacity', 0)

    map.setFilter('layerFill',  ["all", [ '>', 'year_start', Number(startYear)],
                             ["<", 'year_start', Number(endYear)]
 ])
    map.setPaintProperty('layerFill', 'fill-opacity', 0)
    //  map.setFilter('layerLine', ['all',[">=", ['get', 'year_start'], startYear],
    //                                 ["<=", ['get', 'year_start'], endYear]]
    // )
    setTimeout(() => {map.setPaintProperty('layerFill', 'fill-opacity', fullOpacity)
                        map.setPaintProperty('layerLine', 'line-opacity', fullOpacity)
    }, 1000);

    }



// map.setPaintProperty(layer, property, filter, matchValue, styleValue, fallbackStyleValue)

// //colors for speed categories
// const colors = ['#ff335f', '#aebdcf', '#7b89a1', '#4F5273'];

// //filters for speeds
// const noSpeed = ['==', ['get', 'speed_down'], 0];
// const speedSlow = ['<', ['get', 'speed_down'], 25];
// const speedMedium = ['<', ['get', 'speed_down'], 100];
// const speedFast = ['<', ['get', 'speed_down'], 200];
// const speedBlazing = ['>=', ['get', 'speed_down'], 200];

// const circleColor = [
//     'case', 
//     speedSlow, colors[0],
//     speedMedium, colors[1],
//     speedFast, colors[2],
//     speedBlazing, colors[3],
//     '#333'
// ]

// map.setPaintProperty(
//     'isp-data',
//     'circle-color',
//     ['case', 
//         ['all', 
//             ['>', 
//                 ['number', 
//                     ['get', 'median_household_income']
//                 ], 
//                 parseInt(selectedOption.getAttribute("data-min"))
//             ],
//             ['<', 
//                 ['number', 
//                     ['get', 'median_household_income']
//                 ], 
//                 parseInt(selectedOption.getAttribute("data-max"))
//             ]
//         ],
//         circleColor, //value when true
//         blankColor //fallback value
//     ]          
// );



// function changeLayerOpacity(map, layerName, show) {
//     if (show == 'show') {
//         opacity = fullOpacity;
//     } else {
//         opacity = 0;
//     }
//     map.setPaintProperty(layerName + 'Fill', 'fill-opacity', opacity);
//     map.setPaintProperty(layerName + 'Line', 'line-opacity', opacity);
// }

    // map.addLayer({
    //     id: 'layerLine',
    //     type: 'line',
    //     source: sourceName,
    //     layout: {},
    //     paint: {
    //         'line-color': '#800000',
    //         'line-width': 2,
    //         'line-opacity': 0,
    //     },
    //     "filter": ['<', 'year_start', 1910]
    // });