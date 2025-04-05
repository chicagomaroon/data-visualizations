//TODO

// ------------------ DATA ------------------
// Fetch JSON data

/**
 * Load data from external URL location
 * @return {json} jsonData Data to be cleaned in a later step
 */
async function fetchData() {
    try {
        // get data from external source (github)
        var response = await fetch(
            'https://raw.githubusercontent.com/chicagomaroon/data-visualizations/refs/heads/divestment/2024/divestment-history/data.json'
        );

        var jsonData = await response.json();

        // console.log(jsonData)
        return jsonData;
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

/**
 * Group data and define all traces
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis
 * @param  {json} data Data loaded in a previous step
 * @param  {Array} name_vars Variable(s) to group by
 * @return {Array} traces List of traces (data) as input to a plotly graph
 */
function processData(data, name_var) {
    try {
        traces = [];

        // construct plotly "dataframe"
        x = [];
        names = [];
        text = [];

        data.forEach(function (val) {
            if (val[name_var]) {
                x.push(val['Date of Event']);
                names.push(val[name_var]);
                text.push(
                    '<a href="' +
                        val['Link'] +
                        '" target="_blank">' +
                        val['Source'].replaceAll('\n', '<br>') +
                        '</a>'
                );
            }
        });

        traces.push({
            type: 'box',
            name: names,
            x: x,
            text: text,
            boxpoints: 'all', // show points used in box plot
            jitter: 1, // so points don't overlap
            pointpos: 0, // center points
            marker: {
                size: 15,
                opacity: 0.5,
                cliponaxis: false, // Allow points to extend beyond the axis boundaries
            },
            transforms: [
                {
                    type: 'groupby',
                    groups: names,
                    // assign color based on group (cite: GPT)
                    styles: names.map((group, i) => ({
                        target: group,
                        value: {
                            marker: { color: colorbook[name_var][group] }
                        }
                    }))
                }
            ],
            fillcolor: 'rgba(0,0,0,0)', // remove box part of boxplot
            line: { color: 'rgba(0,0,0,0)' }, // remove box part of boxplot
            hoverinfo: 'text',
            hovertemplate: '%{text}<extra></extra>', // the <extra> tag removes any excess formatting
        });

        // console.log(traces)
        return traces;
    } catch (error) {
        console.error('Error processing data: ', error);
    }
}

/**
 * Waypoints (scroll interactions) for article body.
 * Cite:
 * @param  {str} Name of HTML div to attach waypoint to
 * @param  {json} mapping Maps div name to the proper zoom ranges
 */
function createWaypoint(div, mapping) {
    function handler(direction) {
        graphDiv = document.getElementById('chart-div');

        let orderedKeys = [];
        for (var key in mapping) {
            orderedKeys.push(key);
        }

        // https://stackoverflow.com/questions/9279368/how-to-get-all-css-classes-of-an-element
        let classList = document.getElementById(div).className;

        if (direction == 'down') {
            // go to next key
            Plotly.animate(
                graphDiv,
                {
                    layout: {
                        yaxis: { range: mapping[div]['y'] }
                    }
                },
                { transition: transition }
            );
        } else if (div=='palestine') {
            Plotly.animate(
                graphDiv,
                {
                    layout: {
                        yaxis: { range: mapping['all']['y'] }
                    }
                },
                { transition: transition }
            );
        } else if (!classList.match('first')) {
            // go back to the previous key

            previousIndex = orderedKeys.indexOf(div) - 1;
            previousKey = orderedKeys[previousIndex];

            Plotly.animate(
                graphDiv,
                {
                    layout: {
                        yaxis: { range: mapping[previousKey]['y'] },
                    }
                },
                { transition: transition }
            );
        }
    }

    new Waypoint({
        element: document.getElementById(div),
        handler: handler,
        offset: '75%'
    });
}

/**
 * Waypoints (scroll interactions) for article body.
 * Cite:
 * @param  {str} Name of HTML div to attach waypoint to
 * @param  {json} mapping Maps div name to the proper zoom ranges
 */
function createNewSection(
    div, 
    variable, 
    prev_var,
    offset='80%'
) {

    new Waypoint({
        element: document.getElementById(div),
        handler: function (direction) {
            var myPlot = document.getElementById('chart-div');

            if (direction=='down') {
                
                d3.selectAll('#chart-div')
                    .style('opacity', 100);

                Plotly.newPlot(
                    'chart-div',
                    processData(data, variable),
                    createLayout(),
                    config
                );
            } else if (prev_var == 'Movement') {
                d3.selectAll('#chart-div')
                    .transition()
                    .duration(500)
                    .style('opacity', 0);
                console.log(prev_var);
            } else {
                Plotly.newPlot(
                    'chart-div',
                    processData(data, prev_var),
                    createLayout(),
                    config
                );
            }

            myPlot.on('plotly_click', open_url);
            myPlot.on('plotly_hover', hide_box_hovers);
        },
        offset: offset
    });
}

/**
 * Layout used for all plots. As opposed to the data object, this should contain parameters that are constant across the entire graph, not variable across traces or groups
 * Cite: https://community.plotly.com/t/date-tick-formatting/11081/5
 * @return {json} Layout object for plotly
 */
function createLayout() {
    return {
        title: {
            text: 'Divestment Activism Events at UChicago',
            subtitle: {
                text: 'Click a data point to visit the source article.'
            },
            x: 0.14
        },
        font: {
            family: 'serif'
        },
        xaxis: {
            showgrid: true,
            showline: true,
            range: ['1966-1-1', '2026-1-1'],
            type: 'date',
            dtick: 'M12',
            ticklabelstep: 4
        },
        yaxis: {
            showgrid: false,
            ticktext: 'text'
        },
        hovermode: 'closest',
        hoverlabel: {
            bgcolor: 'white'
        },
        showlegend: false,
        margin: {
            l: 120,
            r: 0
        }
    };
}

/**
 * When you click on a data point, it should open the URL linked in the hover text in a new tab.
 * Cite: GPT
 * @param {json} data Data sensed from plotly hover event
 */
function open_url(data) {
    var info = data.points[0];
    var url = info.text.match(/href="(.*)" /);
    // console.log(url[1])

    window.open(url[1], '_blank').focus();
}

/**
 * For plotly boxplots, hovering over the boxplot will show its summary statistics. Because I am using boxplots only for the built-in jitter function, keeping the points and hiding the box part, I need to disable the summary statistic hover.
 * Cite: GPT
 * @param {json} data Data sensed from plotly hover event
 */
function hide_box_hovers(data) {
    hoverLayer = document.querySelector('.hoverlayer');

    if (data.points.length == 7) {
        hoverLayer.style.display = 'none';
    } else {
        hoverLayer.style.display = 'block';
    }
}

// ------- CONSTANTS ------

config = {
    displayModeBar: false,
    responsive: true
};

transition = {
    duration: 400,
    easing: 'linear'
};

const colorbook = {
    Movement: {
        Palestine: 'rgb(128, 0, 0)',
        // 'rgb(255, 163, 25)',
        'Fossil fuels': 'rgb(193, 102, 34)',
        'Uyghur rights': 'rgb(143, 57, 49)',
        'Labor rights': 'rgb(138, 144, 69)',
        SRIC: 'rgb(88, 89, 63)',
        Sudan: 'rgb(21, 95, 131)',
        'South Africa': 'rgb(53, 14, 32)'
        // 'rgb(71, 181, 255)'
        // 'rgb(255, 51, 153)'
    },
    'Type of Action': {
        'Letter writing': 'rgb(128, 0, 0)',
        Protest: 'rgb(193, 102, 34)',
        Resolution: 'rgb(143, 57, 49)',
        'Legal action': 'rgb(138, 144, 69)',
        'Research report': 'rgb(88, 89, 63)',
        'Public event': 'rgb(21, 95, 131)'
    },
    'Admin Response': {
        Arrest: 'rgb(128, 0, 0)',
        'Disciplinary action': 'rgb(88, 89, 63)',
        Negotiation: 'rgb(193, 102, 34)',
        'Public response': 'rgb(143, 57, 49)',
        'Non-divestment support': 'rgb(138, 144, 69)'
    },
    Administration: {
        Alivisatos: 'rgb(128, 0, 0)',
        Zimmer: 'rgb(193, 102, 34)',
        Randel: 'rgb(143, 57, 49)',
        Gray: 'rgb(138, 144, 69)',
        Wilson: 'rgb(88, 89, 63)',
        Beadle: 'rgb(21, 95, 131)'
    }
};

const zoom_mapping = {
    Movement: {
        palestine: { y: [-0.5, 0.5] },
        'fossil-fuels': { y: [0.5, 1.5] },
        'labor-rights': { y: [1.5, 2.5] },
        'uyghur-rights': { y: [2.5, 3.5] },
        sric: { y: [3.5, 4.5] },
        sudan: { y: [4.5, 5.5] },
        'south-africa': { y: [5.5, 6.5] },
        all: { y: [-0.5, 7.5] }
    },
    'Type of Action': {
        letters: { y: [0.5, 1.5] },
        protest: { y: [-0.5, 0.5] },
        'other-action': { y: [1.5, 5.5] },
        all: { y: [-0.5, 6.5] }
    },
    'Admin Response': {
        meeting: { y: [2.5, 4.5] },
        police: { y: [0.5, 2.5] },
        'other-response': { y: [-0.5, 0.5] },
        all: { y: [-0.5, 4.5] }
    }
};

// -------- MAIN --------
var data;

async function init() {

    window.onbeforeunload = function() {
        window.scrollTo(0,0)
    }

    data = await fetchData();
    // console.log(data);

    quoteWP = new Waypoint({
        element: document.querySelector('#transition'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.selectAll('.attribution')
                    .transition()
                    .duration(1500)
                    .style('opacity', 1);
                console.log('quotes');
            }
        },
        offset: '100%'
    });

    quoteDoneWP = new Waypoint({
        element: document.querySelector('#transition'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.selectAll('#pre-intro')
                    .transition()
                    .duration(500)
                    .style('opacity', 0)
                    .on('end', function () {
                        // After the transition, set display to 'none'
                        d3.selectAll('#pre-intro').style('display', 'none');
                    });
                console.log('hide quotes');
            } else {
                d3.selectAll('#pre-intro')
                    .transition()
                    .duration(500)
                    .style('opacity', 100)
                    .style('display', 'block');
                console.log('show quotes');
            }
        },
        offset: '25%'
    });

    // we will edit this plot throughout the whole article
    createNewSection('bylines', 'Movement', prev_var='Movement', offset='16%')

    // define waypoints (scroll reactions)
    createWaypoint('palestine', zoom_mapping['Movement']);
    createWaypoint('fossil-fuels', zoom_mapping['Movement']);
    createWaypoint('uyghur-rights', zoom_mapping['Movement']);
    createWaypoint('labor-rights', zoom_mapping['Movement']);
    createWaypoint('sric', zoom_mapping['Movement']);
    createWaypoint('sudan', zoom_mapping['Movement']);
    createWaypoint('south-africa', zoom_mapping['Movement']);

    createNewSection('letters', 'Type of Action', (prev_var = 'Movement'));

    createWaypoint('letters', zoom_mapping['Type of Action']);
    createWaypoint('protest', zoom_mapping['Type of Action']);
    createWaypoint('other-action', zoom_mapping['Type of Action']);

    createNewSection('admin', 'Admin Response', (prev_var = 'Type of Action'));

    createWaypoint('meeting', zoom_mapping['Admin Response']);
    createWaypoint('police', zoom_mapping['Admin Response']);
    createWaypoint('other-response', zoom_mapping['Admin Response']);

    finalWP = new Waypoint({
        element: document.getElementById('conclusion'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.selectAll('#chart-div')
                    .transition()
                    .duration(200)
                    .style('opacity', 0)
                    .style('display', 'none');
                console.log('Hiding chart div');
            } else {
                d3.selectAll('#chart-div')
                    .style('display', 'block')
                d3.selectAll('#chart-div')
                    .transition()
                    .duration(200)
                    .style('opacity', 1);
                console.log('Showing chart div');
            }
        },
        offset: '90%'
    });
}

// when page is loaded, define custom JS
document.addEventListener('DOMContentLoaded', function () {
    init();
});
