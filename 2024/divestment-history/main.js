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
function createWaypoint(div, mapping, traceindex) {
    function handler(direction) {
        graphDiv = document.getElementById('chart-div');

        // note: don't try to make this a constant as it needs to be calculated when the user gets to this point
        halfsize = Math.min(400, 50 * window.innerWidth)

        Plotly.restyle(
            graphDiv,
            { 
                visible: true,
            },
            [0]
        );

        if (direction=='down') { // advance 10 years
            if (div=='letters') { 
                Plotly.restyle(
                    graphDiv,
                    { visible: false },
                    [0]
                );
                Plotly.restyle(
                    graphDiv,
                    { visible: true },
                    [1]
                );
            }

            Plotly.animate(graphDiv, {
                layout: {
                    xaxis: {range: mapping[div]['x']},
                    yaxis: {range: mapping[div]['y']},
                    width: halfsize
                }
              }, {
                transition: transition
            })
        } else { // scroll up

            if (div=='palestine') { // top of story
                layout = {
                    xaxis: {range: mapping['all']['x']},
                    yaxis: {range: mapping['all']['y']},
                    width: 1000
                } 

                Plotly.animate(
                    graphDiv, 
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
                            minus10(mapping[div]['x'][0]) + '-1-1',
                            minus10(mapping[div]['x'][1]) + '-1-1'
                        ]
                    },
                    yaxis: {
                        range: [
                            mapping[div]['y'][0]-1,
                            mapping[div]['y'][1]-1
                        ]
                    },
                    width: halfsize
                }

                // console.log(minus10(timerange[1]))
                if (minus10(mapping[div]['x'][1]) < 2028) {
                    Plotly.animate(
                        graphDiv, 
                        { layout: layout }, 
                        { transition: transition }
                    )
                }
            }
        }
    }

    new Waypoint({
        element: document.getElementById(div),
        handler: handler,
        offset: '60%'
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

    Plotly.newPlot(
        'chart-div', 
        processData(data,['Movement','Administration','Type of Action','Admin Response']), 
        createLayout(),
        config
    );

    myPlot.on('plotly_click', open_url);
    myPlot.on('plotly_hover', hide_box_hovers);
    
    // define waypoints (scroll reactions)

    let time_mapping = {
        'palestine': {'x': ['2012-1-1','2026-1-1'],'y': [.5,1.5],},
        'fossil-fuels': {'x': ['2012-1-1','2026-1-1'],'y': [-.5,.5]},
        'uyghur-rights': {'x': ['2014-1-1','2018-1-1'],'y': [1.5,2.5]},
        'labor-rights': {'x': ['2006-1-1','2016-1-1'], 'y': [2.5,3.5]},
        'sric': {'x': ['2006-1-1','2012-1-1'], 'y': [3.5,4.5]},
        'sudan': {'x': ['2004-1-1','2010-1-1'], 'y': [4.5,5.5]},
        'south-africa': {'x': ['1966-1-1','1980-1-1'], 'y': [5.5,6.5]},
        'all': {'x': ['1966-1-1','2026-1-1'], y: [-.5,7.5]}
    }

    createWaypoint('palestine',time_mapping,0)
    createWaypoint('fossil-fuels',time_mapping,0)
    createWaypoint('uyghur-rights',time_mapping,0)
    createWaypoint('labor-rights',time_mapping,0)
    createWaypoint('sric',time_mapping,0)
    createWaypoint('sudan',time_mapping,0)
    createWaypoint('south-africa',time_mapping,0)
    
    let strat_mapping = {
        'letters': {'x': ['1966-1-1','2026-1-1'], 'y': [.5,1.5]},
        'protest': {'x': ['1966-1-1','2026-1-1'], 'y': [-.5,.5]},
        'other': {'x': ['1966-1-1','2026-1-1'], 'y': [1.5,7.5]},
        'all': {'x': ['1966-1-1','2026-1-1'], y: [-.5,7.5]}
    }

    createWaypoint('letters',strat_mapping,1)
    createWaypoint('protest',strat_mapping,1)
    createWaypoint('other',strat_mapping,1)
}

document.addEventListener("DOMContentLoaded", function () {
    init();
});
