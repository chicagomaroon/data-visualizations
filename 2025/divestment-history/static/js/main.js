// ------------------ DATA ------------------

/**
 * Load data from external URL location
 * @return {json} jsonData Data to be cleaned in a later step
 */
async function fetchData() {
    try {
        // get data from external source (github)
        var response = await fetch('data/data.json');

        var jsonData = await response.json();

        // console.log(jsonData)
        return jsonData;
    } catch (error) {
        console.error('Error fetching JSON:', error);
    }
}

function hideChart() {
    d3.selectAll('#chart-div')
        .transition()
        .duration(300)
        .style('opacity', 0)
        .style('display', 'none');
}

function showChart() {
    d3.selectAll('#chart-div').style('display', 'block');
    d3.selectAll('#chart-div').transition().duration(300).style('opacity', 1);
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
                        '</a>' +
                        '<br>' +
                        val['Year']
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
                cliponaxis: false // Allow points to extend beyond the axis boundaries
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
            hovertemplate: '%{text}<extra></extra>' // the <extra> tag removes any excess formatting
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
function createWaypoint(div, mapping, offset = '80%') {
    function handler(direction) {
        myPlot = document.getElementById('chart-div');

        Plotly.relayout(myPlot, {
            shapes: [], // clear shapes from admin section
            annotations: [] // clear notes from admin section
        });

        // https://stackoverflow.com/questions/9279368/how-to-get-all-css-classes-of-an-element
        let classList = document.getElementById(div).className;

        if (direction == 'down') {
            // go to next key
            Plotly.animate(
                myPlot,
                {
                    layout: {
                        yaxis: { range: mapping[div]['y'] }
                    }
                },
                { transition: transition }
            );
            console.log(div);
        } else if (div == 'palestine') {
            Plotly.animate(
                myPlot,
                {
                    layout: {
                        yaxis: { range: mapping['all']['y'] }
                    }
                },
                { transition: transition }
            );
            console.log('first key');
        } else if (!classList.match('first')) {
            // go back to the previous key

            let orderedKeys = [];
            for (var key in mapping) {
                orderedKeys.push(key);
            }

            previousIndex = orderedKeys.indexOf(div) - 1;
            previousKey = orderedKeys[previousIndex];

            Plotly.animate(
                myPlot,
                {
                    layout: {
                        yaxis: { range: mapping[previousKey]['y'] }
                    }
                },
                { transition: transition }
            );
            console.log('prev key');
        }
    }

    new Waypoint({
        element: document.getElementById(div),
        handler: handler,
        offset: offset
    });
}

/**
 * Waypoints (scroll interactions) for article body.
 * Cite:
 * @param  {str} Name of HTML div to attach waypoint to
 * @param  {json} mapping Maps div name to the proper zoom ranges
 */
function createNewSection(div, variable, prev_var, mapping, offset = '80%') {
    new Waypoint({
        element: document.getElementById(div),
        handler: function (direction) {
            var myPlot = document.getElementById('chart-div');

            shapes = [];
            annotes = [];

            if (variable == 'Admin Response') {
                for (var president in history) {
                    start = new Date(history[president]['x'][0]);
                    end = new Date(history[president]['x'][1]);
                    shapes.push({
                        type: 'rect',
                        x0: start,
                        y0: -1,
                        x1: end,
                        y1: 7,
                        line: {
                            width: 1,
                            color: '#aaaaaa'
                        },
                        fillcolor: 'rgba(0,0,0,0)'
                        // layer: 'below',
                        // opacity: .1
                    });
                    mid = new Date(
                        start.getFullYear() +
                            (end.getFullYear() - start.getFullYear()) / 2,
                        6,
                        1
                    );
                    annotes.push({
                        x: mid,
                        y: -0.5,
                        text: president,
                        showarrow: false,
                        font: {
                            color: '#8a8a8a'
                        }
                    });
                }
            }

            if (direction == 'down') {
                showChart();

                Plotly.newPlot(
                    'chart-div',
                    processData(data, variable),
                    layout,
                    config
                );

                Plotly.animate(
                    myPlot,
                    {
                        layout: {
                            yaxis: { range: mapping[variable]['all']['y'] },
                            shapes: shapes,
                            annotations: annotes
                        }
                    },
                    { transition: transition }
                );

                console.log('New section created at: ' + div);
            } else if (prev_var == 'Top') {
                // if going back to intro, hide chart
                hideChart();
            } else {
                // go to last key of previous section

                let orderedKeys = [];
                for (var key in mapping[prev_var]) {
                    orderedKeys.push(key);
                }

                Plotly.newPlot(
                    'chart-div',
                    processData(data, prev_var),
                    layout,
                    config
                );

                Plotly.animate(
                    myPlot,
                    {
                        layout: {
                            yaxis: {
                                range: mapping[prev_var][orderedKeys.at(-1)][
                                    'y'
                                ]
                            }
                        }
                    },
                    { transition: transition }
                );

                console.log('Going to previous section: ' + prev_var);
            }

            myPlot.on('plotly_click', open_url);
            myPlot.on('plotly_hover', hide_box_hovers);
        },
        offset: offset
    });
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

/**
 * layout used for all plots. As opposed to the data object, this should contain parameters that are constant across the entire graph, not variable across traces or groups
 * Cite: https://community.plotly.com/t/date-tick-formatting/11081/5
 */
const layout = {
    title: {
        text: 'Divestment Activism Events at UChicago',
        x: 0.14,
        font: {
            size: 20
        },
        subtitle: {
            text: 'Click a data point to visit the source article.',
            font: {
                size: 14
            }
        }
    },
    font: {
        family: 'Georgia'
    },
    xaxis: {
        showgrid: true,
        showline: true,
        range: ['1964-6-1', '2026-1-1'],
        type: 'date',
        dtick: 'M60',
        ticklabelstep: 1,
        tickfont: {
            size: 14
        }
    },
    yaxis: {
        showgrid: false,
        ticktext: 'text',
        tickfont: {
            size: 14
        }
    },
    hovermode: 'closest',
    hoverlabel: {
        bgcolor: 'white'
    },
    showlegend: false,
    margin: {
        l: 120,
        r: 15
    }
};

const config = {
    displayModeBar: false,
    responsive: true
};

const transition = {
    duration: 400,
    easing: 'linear'
};

const colorbook = {
    Movement: {
        Palestine: 'rgb(128, 0, 0)',
        'Fossil fuels': 'rgb(193, 102, 34)',
        'Uyghur rights': 'rgb(143, 57, 49)',
        'Labor rights': 'rgb(138, 144, 69)',
        SRIC: 'rgb(88, 89, 63)',
        Sudan: 'rgb(21, 95, 131)',
        'South Africa': 'rgb(53, 14, 32)'
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
        'Non-<br>divestment<br>support': 'rgb(138, 144, 69)'
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
        all: { y: [-0.5, 6.5] },
        palestine: { y: [-0.25, 0.25] },
        'fossil-fuels': { y: [0.5, 1.5] },
        'labor-rights': { y: [1.25, 2.75] },
        'uyghur-rights': { y: [2.25, 3.75] },
        sric: { y: [3.5, 4.5] },
        sudan: { y: [4.75, 5.25] },
        'south-africa': { y: [5.75, 6.25] }
    },
    'Type of Action': {
        all: { y: [-0.5, 5.5] },
        letters: { y: [0.75, 1.25] },
        protest: { y: [-0.25, 0.25] },
        'other-action': { y: [1.5, 5.5] }
    },
    'Admin Response': {
        all: { y: [-0.75, 4.5] },
        meeting: { y: [2.3, 4.75] },
        police: { y: [0.3, 2.75] },
        'other-response': { y: [-1, 0.75] }
    }
};

const history = {
    Beadle: { x: ['1963-1-1', '1968-1-1'] },
    Levi: { x: ['1968-1-1', '1975-1-1'] },
    Wilson: { x: ['1975-1-1', '1978-8-1'] },
    Gray: { x: ['1978-8-1', '1993-1-1'] },
    Sonnenschein: { x: ['1993-1-1', '2000-1-1'] },
    Randel: { x: ['2000-1-1', '2006-1-1'] },
    Zimmer: { x: ['2006-1-1', '2021-1-1'] },
    Alivisatos: { x: ['2021-1-1', '2026-6-1'] }
};

// -------- MAIN --------
var data;

async function init() {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };

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
                // console.log('quotes');
            }
        },
        offset: '90%'
    });

    quoteDoneWP = new Waypoint({
        element: document.querySelector('#transition'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.selectAll('#pre-intro').style('position', 'relative');
                console.log('hide quotes');
            }
        },
        offset: '70%'
    });

    // we will edit this plot throughout the whole article
    createNewSection(
        'causes',
        'Movement',
        (prev_var = 'Top'),
        (mapping = zoom_mapping),
        (offset = '70%')
    );

    // define waypoints (scroll reactions)
    createWaypoint('palestine', zoom_mapping['Movement']);
    createWaypoint('fossil-fuels', zoom_mapping['Movement']);
    createWaypoint('uyghur-rights', zoom_mapping['Movement']);
    createWaypoint('labor-rights', zoom_mapping['Movement']);
    createWaypoint('sric', zoom_mapping['Movement']);
    createWaypoint('sudan', zoom_mapping['Movement']);
    createWaypoint('south-africa', zoom_mapping['Movement']);

    createNewSection(
        'actions',
        'Type of Action',
        (prev_var = 'Movement'),
        (mapping = zoom_mapping)
    );

    createWaypoint('letters', zoom_mapping['Type of Action']);
    createWaypoint('protest', zoom_mapping['Type of Action']);
    createWaypoint('other-action', zoom_mapping['Type of Action']);

    createNewSection(
        'admin',
        'Admin Response',
        (prev_var = 'Type of Action'),
        (mapping = zoom_mapping)
    );

    createWaypoint('meeting', zoom_mapping['Admin Response']);
    createWaypoint('police', zoom_mapping['Admin Response']);
    createWaypoint('other-response', zoom_mapping['Admin Response']);

    finalWP = new Waypoint({
        element: document.getElementById('conclusion'),
        handler: function (direction) {
            if (direction == 'down') {
                hideChart();
                console.log('Hiding chart div');
            } else {
                showChart();
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
