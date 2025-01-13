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
    name_vars,
) {
    try {
        colorbook = {
            'Movement' : {
                'Palestine': 'rgb(128, 0, 0)',
            // 'rgb(255, 163, 25)',
                'Fossil fuels':'rgb(193, 102, 34)',
                'Uyghur rights':'rgb(143, 57, 49)',
                'Labor rights':'rgb(138, 144, 69)',
                'SRIC':'rgb(88, 89, 63)',
                'Sudan':'rgb(21, 95, 131)',
                // 'rgb(53, 14, 32)',
                'South Africa':'rgb(71, 181, 255)',
                // 'rgb(255, 51, 153)'
            },
            'Type of Action': {
                'Letter Writing': 'rgb(128, 0, 0)',
                'Protest': 'rgb(193, 102, 34)',
                'Pledge/Resolution': 'rgb(143, 57, 49)',
                'Legal Action': 'rgb(138, 144, 69)',
                'Research Report': 'rgb(88, 89, 63)',
                'Debate': 'rgb(21, 95, 131)',
                'Forum': 'rgb(71, 181, 255))',
            },
            'Admin Response': {
                'Arrest/punish': 'rgb(128, 0, 0)',
                'Meeting/negotiation': 'rgb(193, 102, 34)',
                'Interview/forum': 'rgb(143, 57, 49)',
                'Non-divestment support': 'rgb(138, 144, 69)',
                'Ignore/refuse': 'rgb(88, 89, 63)',
            }
        }

        traces = []

        // construct plotly "dataframe"
        for (let i=0; i<name_vars.length; i++) {
            x = []
            names = []
            text = []
            name_var = name_vars[i]

            data.forEach(function(val) {
                x.push(val['Date of Event']);
                names.push(val[name_var]);
                text.push('<a href="' + val['Link'] + '" target="_blank">' + val['Source'].replaceAll('\n', '<br>') + '</a>');
            });

            traces.push({
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
                    // assign color based on group (cite: GPT)
                    styles: names.map((group, i) => ({
                        target: group,
                        value: { marker: { color: colorbook[name_var][group] } } 
                    })) 
                }],
                fillcolor: 'rgba(0,0,0,0)', // remove box part of boxplot
                line: {color: 'rgba(0,0,0,0)'}, // remove box part of boxplot
                hoverinfo: 'text',
                hovertemplate: '%{text}<extra></extra>',
                visible: false,
            })
        }

        // console.log(traces)
        return traces;

    } catch (error) {
        console.error('Error processing data: ',error);
    }
}

// async function makeTimeline(

// ) {

// }

/**
 * [bar description]
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis 
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
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

    halfsize = Math.min(400, 50 * window.innerWidth)

    new Waypoint({
        
        element: document.getElementById(div),
        handler: function(direction) {
            graphDiv = document.getElementById('chart-div')
            Plotly.restyle(
                graphDiv,
                { 
                    visible: true,
                },
                [0]
            );

    
            if (direction=='down') { // advance 10 years
                Plotly.animate('chart-div', {
                    layout: {
                      yaxis: {range: keys[div]},
                      xaxis: {range: timerange},
                      width: halfsize
                    }
                  }, {
                    transition: transition
                })
            } else {

                if (div=='palestine') { // top of story
                    layout = {
                        xaxis: {range: ['1966-1-1','2026-1-1']},
                        yaxis: {range: [-.5,7.5]},
                        width: 1000
                    } 

                    Plotly.animate(
                        'chart-div', 
                        { layout: layout }, 
                        { transition: transition }
                    )

                } else { // move back 10 years

                    function minus10(year) {
                        return (parseInt(year.substring(0, 4)) + 10)
                    }

                    layout = {
                        xaxis: {
                            range: [
                                minus10(timerange[0]) + '-1-1',
                                minus10(timerange[1]) + '-1-1'
                            ]
                        },
                        yaxis: {
                            range: [
                                keys[div][0]-1,
                                keys[div][1]-1
                            ]
                        },
                        width: halfsize
                    }

                    // console.log(minus10(timerange[1]))
                    if (minus10(timerange[1]) < 2028) {
                        Plotly.animate(
                            'chart-div', 
                            { layout: layout }, 
                            { transition: transition }
                        )
                    }
                }
            }
        },
        offset: '60%'
    })
}


/**
 * [bar description]
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis 
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
function stratWaypoint(div, strat) {

    keys = {
        'letters': [.5,1.5],
        'protest': [-.5,.5],
        'other': [1.5,7.5],
    }

    new Waypoint({
        element: document.getElementById(div),
        handler: function(direction) {
            graphDiv = document.getElementById('chart-div')

            if (direction=='down') {
                if (div=='letters') { 
                    Plotly.restyle(
                        graphDiv,
                        { 
                            visible: false,
                        },
                        [0]
                    );
                    Plotly.restyle(
                        graphDiv,
                        { 
                            visible: true,
                        },
                        [1]
                    );
                    
                }
                layout = {
                    xaxis: {range: ['1966-1-1','2026-1-1']},
                    yaxis: {range: keys[div]},
                } 

                Plotly.animate(
                    graphDiv, 
                    { layout: layout }, 
                    { transition: transition }
                )
            } else {
                if (div=='letters') { 
                    Plotly.restyle(
                        graphDiv,
                        { 
                            visible: true,
                        },
                        [0]
                    );
                }
                layout = {
                    xaxis: {range: ['1966-1-1','2026-1-1']},
                    yaxis: {range: keys[div]},
                } 

                Plotly.animate(
                    graphDiv, 
                    { layout: layout }, 
                    { transition: transition }
                )
            }
            
        offset: '100%'
    })
}

/**
 * [bar description]
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis 
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
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

/**
 * [bar description]
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis 
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
finalWP = new Waypoint({
    
    element: document.getElementById('further-reading'),
    handler: function(direction) {
        if (direction=='down') {
            d3.selectAll('#chart-div')
                .transition()
                .duration(200)
                .style("opacity", 0);
            console.log('d3')
        } else {
            d3.selectAll('#chart-div')
                .transition()
                .duration(200)
                .style("opacity", 1);
            console.log('d3')
        }        
    },
    offset: '50%'
})

/**
 * [bar description]
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis 
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
function createLayout() {
    return {
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
        height: 400,
        showlegend: false,
        margin: {
            l: 100,
            r: 0
        }
    };
}

/**
 * [bar description]
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis 
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
function open_url(data){
    var info = data.points[0]
    var url = info.text.match(/href="(.*)" /);
    // console.log(url[1])

    window.open(url[1], '_blank').focus();
}

/**
 * [bar description]
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis 
 * @param  {[type]} foo [description]
 * @return {[type]}     [description]
 */
function hide_box_hovers(data) {
    hoverLayer = document.querySelector('.hoverlayer')
    
    if (data.points.length==7) {            
        hoverLayer.style.display = 'none';
    } else {
        hoverLayer.style.display = 'block';
    }
}

// ------- CONSTANTS ------

config = {
    modeBarButtonsToRemove: ['select2d','pan2d','lasso2d','autoscale','zoom2d'],
    responsive: true,
    // scrollZoom: true
}

transition = {
    duration: 400,
    easing: 'linear'
}

// -------- MAIN --------

async function init() {
    var data = await fetchData();
    // console.log(data);  

    var myPlot = document.getElementById('chart-div');
    var hoverInfo = document.getElementById('hoverinfo');

    Plotly.newPlot(
        'chart-div', 
        processData(data,['Movement','Administration','Type of Action','Admin Response']), 
        createLayout(),
        config
    );

    console.log(myPlot);

    myPlot.on('plotly_click', open_url);
    myPlot.on('plotly_hover', hide_box_hovers);
        
    timeWaypoint('palestine',['2012-1-1','2026-1-1'])
    timeWaypoint('fossil-fuels',['2012-1-1','2026-1-1'])
    timeWaypoint('uyghur-rights',['2014-1-1','2018-1-1'])
    timeWaypoint('labor-rights',['2006-1-1','2016-1-1'])
    timeWaypoint('sric',['2006-1-1','2012-1-1'])
    timeWaypoint('sudan',['2004-1-1','2010-1-1'])
    timeWaypoint('south-africa',['1966-1-1','1980-1-1'])
    stratWaypoint('letters')
    stratWaypoint('protest')
    stratWaypoint('other')
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});
