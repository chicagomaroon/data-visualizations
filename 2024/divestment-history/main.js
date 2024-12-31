//TODO

// ------------------ DATA ------------------
// Fetch JSON data

/**
 * [bar description]
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
async function fetchData() {
    try {
        // get data from external source (github)
        var response = await fetch('https://raw.githubusercontent.com/chicagomaroon/data-visualizations/refs/heads/divestment/2024/divestment-history/data.json');

        var jsonData = await response.json();

        // console.log(jsonData)
        return jsonData; 

    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

/**
 * [bar description]
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
function processData(
    data,
    name_var,
) {

    try {
        colorbook = {
            'Palestine': 'rgb(128, 0, 0)',
            // 'rgb(255, 163, 25)',
            'Fossil fuels':'rgb(193, 102, 34)',
            'Uyghur rights':'rgb(143, 57, 49)',
            'Labor rights':'rgb(138, 144, 69)',
            'SRIC':'rgb(88, 89, 63)',
            'Sudan':'rgb(21, 95, 131)',
            'South Africa':'rgb(53, 14, 32)',
            // 'rgb(71, 181, 255)',
            // 'rgb(255, 51, 153)'
        }

        x = []
        names = []
        text = []

        data.forEach(function(val) {
            x.push(val['Date of Event']);
            names.push(val[name_var]);
            text.push('<a href="' + val['Link'] + '" target="_blank">' + val['Source'].replaceAll('\n', '<br>') + '</a>');
        });

        // construct plotly "dataframe"
        var trace = {
            type: 'box',
            name: names,
            x: x,
            text: text,
            boxpoints: 'all',
            jitter: 1, // so points don't overlap
            pointpos: 0, // center points
            marker: {
                size: 15,
                opacity: .5
            },
            transforms: [{ 
                type: "groupby", 
                groups: names,
                styles: names.map((group, i) => ({
                    target: group,
                    value: { marker: { color: colorbook[group] } } // Assign color based on group (cite: GPT)
                })) 
            }],
            fillcolor: 'rgba(0,0,0,0)', // remove box part of boxplot
            line: {color: 'rgba(0,0,0,0)'}, // remove box part of boxplot
            hoverinfo: 'text',
            hovertemplate: '%{text}<extra></extra>'
        }

        // console.log(trace)

        return trace;

    } catch (error) {
        console.error('Error processing data: ',error);
    }
}

function timeWaypoint(div, timerange) {
    keys = {
        'palestine': [.5,1.5],
        'fossil-fuels': [-.5,.5],
        'uyghur-rights': [1.5,2.5],
        'labor-rights': [2.5,3.5],
        'sric': [3.5,4.5],
        'sudan': [4.5,5.5],
        'south-africa': [5.5,6.5]
    }

    new Waypoint({
        // you can create a class 'active' with all css elements tied to the class instead of individual elements
        
        element: document.getElementById(div),
        handler: function(direction) {
            graphDiv = document.getElementById('chart-div')
    
            if (direction=='down') {
                Plotly.animate('chart-div', {
                    layout: {
                      yaxis: {range: keys[div]},
                      xaxis: {range: timerange},
                      width: 400
                    }
                  }, {
                    transition: {
                      duration: 400,
                      easing: 'linear'
                    }
                })
            } else {

                if (div=='palestine') {
                    Plotly.animate('chart-div', {
                        layout: {
                            xaxis: {range: ['1966-1-1','2026-1-1']},
                            yaxis: {range: [0,7]},
                            width: 1000
                        }
                      }, {
                        transition: {
                            duration: 400,
                            easing: 'linear'
                        }
                    })

                } else {
                    console.log(parseInt(timerange[1].substring(0, 4)) + 10)
                    if (parseInt(timerange[1].substring(0, 4)) + 10 < 2028) {
                        Plotly.animate('chart-div', {
                            layout: {
                                xaxis: {
                                    range: [
                                        (parseInt(timerange[0].substring(0, 4)) + 10) + '-1-1',
                                        (parseInt(timerange[1].substring(0, 4)) + 10) + '-1-1'
                                    ]
                                },
                                yaxis: {
                                    range: [
                                        keys[div][0]-1,
                                        keys[div][1]-1
                                    ]
                                },
                                width: 400
                            }
                          }, {
                            transition: {
                                duration: 400,
                                easing: 'linear'
                            }
                        })
                    }
                }
            }

            
        },
        offset: '60%'
    })
}

timeWaypoint('palestine',['2012-1-1','2026-1-1'])
timeWaypoint('fossil-fuels',['2012-1-1','2026-1-1'])
timeWaypoint('uyghur-rights',['2014-1-1','2018-1-1'])
timeWaypoint('labor-rights',['2006-1-1','2016-1-1'])
timeWaypoint('sric',['2006-1-1','2012-1-1'])
timeWaypoint('sudan',['2004-1-1','2010-1-1'])
timeWaypoint('south-africa',['1966-1-1','1980-1-1'])

adminWP = new Waypoint({
    // you can create a class 'active' with all css elements tied to the class instead of individual elements
    
    element: document.getElementById('step1'),
    handler: function() {
        // here add the plotly restyle
        // plotly redraw
        document.getElementById('step1').style.backgroundColor='red'
        console.log('hello world')
    },
    offset: '100%'
})

// let config = [];
const zoomSpeed = 5000;
PRIMARY_COLOR = '#800000';
SECONDARY_COLOR = 'black';

// try plotly jitter again
// beeswarm (strip)
// if not, then manually jitter

// -------- CONSTANTS --------

const fullOpacity = 0.6;

// -------- MAIN --------

async function init() {
    var data = await fetchData();
    // console.log(data);  

    var traces = processData(data,'Movement');
    // var admin_traces = processData(data,'Administration');
    // console.log(traces);

    let layout = {
        title: {
            text: 'Test'
        },
        xaxis: {
            showgrid:true,
            showline:true,
            range: ['1966-1-1','2026-1-1'],
            type: 'date',
            // https://community.plotly.com/t/date-tick-formatting/11081/5
            dtick: 'M12',
            ticklabelstep: 4
        },
        yaxis: {
            showgrid:false
        },
        hovermode:'closest',
        hoverlabel:{
            'bgcolor':'white'
        },
        width: 1200,
        height: 400,
        width: 1000,
        showlegend: false,
        margin: {
            l: 100,
            r: 0
        }
    };

    Plotly.newPlot('chart-div', traces, layout);
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});
