// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

// Highcharts.chart('chart-div', {
//     // Setting default colors
//     colors: [
//         '#800000',
//         '#FFA319',
//         '#C16622',
//         '#8F3931',
//         '#8A9045',
//         '#58593F',
//         '#155F83',
//         '#350E20',
//         '#47B5FF',
//         '#FF3399'
//     ],

function sankeyChart() {
    Highcharts.chart('chart-div', {
        title: {
            // text: 'UChicago Budget, Fiscal Year 2024'
            text: 'Revenue, Fiscal Year 2024'
        },
        subtitle: {
            text: 'For clarity, assets from hospital services ($4.2 billion) are excluded. Net assets (total assets minus total liabilities) for FY24 were $245.9 million.'
        },
        accessibility: {
            point: {
                valueDescriptionFormat:
                    '{index}. {point.from} to {point.to}, ' + '{point.weight}.'
            }
        },
        tooltip: {
            headerFormat: null,
            pointFormat:
                '{point.fromNode.name} to {point.toNode.name}: ${point.weight:.1f}' +
                'M',
            nodeFormat: '{point.name}: ${point.sum:.1f}M'
        },

        series: [
            {
                keys: ['to', 'from', 'weight'],

                // nodes: [
                //     {
                //         id: 'Total assets',
                //         color: '#800000',
                //     },
                //     {
                //         id: 'Total assets',
                //         color: '#800000',
                //     },
                //     {
                //         id: 'Total assets',
                //         color: '#800000',
                //     },
                //     {
                //         id: 'Total assets',
                //         color: '#800000',
                //     },
                //     {
                //         id: 'Total assets',
                //         color: '#800000',
                //     },
                //     {
                //         id: 'Total assets',
                //         color: '#800000',
                //     },
                //     {
                //         id: 'Total assets',
                //         color: '#800000',
                //     },
                //     {
                //         id: 'Total assets',
                //         color: '#800000',
                //     },
                // ]

                data: [
                    [
                        'Total assets<br>(excluding hospital)',
                        'Revenue with restrictions',
                        338.2
                    ],
                    [
                        'Revenue with restrictions',
                        'Endowment payout with restrictions',
                        0.9
                    ],
                    ['Revenue with restrictions', 'Private gifts', 406.4],
                    [
                        'Revenue with restrictions',
                        'Investment return with restrictions',
                        136.9
                    ],

                    // ['Budget', 'Revenue without restrictions', 7638.3],
                    [
                        'Total assets<br>(excluding hospital)',
                        'Revenue without restrictions<br>(excluding hospital)',
                        3387.2
                    ],
                    // ['Revenue without restrictions', 'Total operating revenue', 7536.9],
                    [
                        'Revenue without restrictions<br>(excluding hospital)',
                        'Total operating revenue',
                        3285.9
                    ],
                    ['Total operating revenue', 'Net tuition', 611.3],
                    [
                        'Total operating revenue',
                        'Government grants and contracts',
                        561.3
                    ],
                    [
                        'Total operating revenue',
                        'Private gifts, grants, and contracts',
                        293.2
                    ],
                    [
                        'Total operating revenue',
                        'Endowment payout without restrictions',
                        565.7
                    ],
                    // ['Total operating revenue', 'Net patient services', 4251.0],
                    [
                        'Total operating revenue',
                        'Other operating revenue',
                        1254.4
                    ],
                    // ['Revenue without restrictions', 'Total nonoperating revenue', 101.4],
                    [
                        'Revenue without restrictions<br>(excluding hospital)',
                        'Total nonoperating revenue',
                        101.4
                    ],
                    [
                        'Total nonoperating revenue',
                        'Investment return without restrictions',
                        66.0
                    ],
                    [
                        'Total nonoperating revenue',
                        'Other nonoperating revenue',
                        35.4
                    ]

                    // ['Budget', 'Expenses', 7730.6], // negative
                    // ['Expenses', 'Total operating expenses', 7730.6],
                    // ['Total operating expenses', 'Salaries and benefits', 4212.9],
                    // ['Total operating expenses', 'Other expenses', 3517.7],
                ],
                type: 'sankey',
                name: 'Budget'
            }
        ]
    });
}

// ------------------ DATA ------------------

/**
 * Load data from external URL location
 * @return {json} jsonData Data to be cleaned in a later step
 */
async function fetchData(path) {
    try {
        // get data from external source (github)
        var response = await fetch('data/' + path);

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
function processData(data, variable = 'type') {
    xs = [];
    ys = [];
    widths = [];
    names = [];
    colors = [];
    texts = [];
    try {
        traces = [];

        // construct plotly "dataframe"

        data.forEach(function (val) {
            xs.push(val['x'] / 100);
            ys.push(100);
            widths.push(val['amount_thousands'] / val['total_thousands']);
            names.push(val[variable]);
            colors.push(colorbook['Fund type'][val[variable]]);
            texts.push(
                val[variable] +
                    ' (' +
                    Math.round(
                        (val['amount_thousands'] / val['total_thousands']) * 100
                    ) +
                    '%)'
            );
            // traces.push({
            //     type: 'bar',
            //     name: val['type'],
            //     x: [100 / val['amount_thousands']],
            //     y: [100],
            //     width: (val['amount_thousands'] / val['total_thousands']) * 10
            // });
        });

        traces.push({
            // stackgroup: 'one',
            type: 'bar',
            // name: val['type'],
            // x: [val['type']],
            // y: [100],
            y: xs,
            x: ys,
            width: widths,
            name: names,
            marker: {
                color: colors
            },
            text: texts,
            orientation: 'h',
            // width: [(val['amount_thousands'] / val['total_thousands']) * 10],
            // text:
            //     val['amount_thousands'] +
            //     '(' +
            //     Math.round(
            //         (val['amount_thousands'] / val['total_thousands']) * 100
            //     ) +
            //     '%)'
            // transforms: [
            //     {
            //         type: 'groupby',
            //         groups: names,
            //         // assign color based on group (cite: GPT)
            //         styles: names.map((group, i) => ({
            //             target: group,
            //             value: {
            //                 marker: { color: colorbook[name_var][group] }
            //             }
            //         }))
            //     }
            // ],
            hoverinfo: 'text'
            // hovertemplate: '%{text}<extra></extra>' // the <extra> tag removes any excess formatting
        });

        console.log(traces);
        return traces;
    } catch (error) {
        console.error('Error processing data: ', error);
    }
}

function hideChart(all = false) {
    d3.selectAll('#chart-div')
        .transition()
        .duration(300)
        .style('opacity', 0)
        .style('display', 'none');
    if (all) {
        d3.selectAll('#flowchart')
            .transition()
            .duration(300)
            .style('opacity', 0)
            .style('display', 'none');
    }
}

function showChart(all = false) {
    d3.selectAll('#chart-div').style('display', 'block');
    d3.selectAll('#chart-div').transition().duration(300).style('opacity', 1);
    if (all) {
        d3.selectAll('#flowchart').style('display', 'block');
        d3.selectAll('#flowchart')
            .transition()
            .duration(300)
            .style('opacity', 1);
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

        // https://stackoverflow.com/questions/9279368/how-to-get-all-css-classes-of-an-element
        let classList = document.getElementById(div).className;

        if (direction == 'down') {
            // go to next key
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

            if (direction == 'down') {
                showChart();

                Plotly.newPlot('chart-div', processData(data), layout, config);

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

                console.log('Going to previous section: ' + prev_var);
            }

            Plotly.animate(myPlot, {
                layout: {
                    xaxis: {
                        showticklabels: false
                    },
                    margin: {
                        l: 200,
                        r: 200
                    },
                    width: 0.2
                }
            });

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
        text: '',
        x: 0.14,
        font: {
            size: 20
        },
        subtitle: {
            text: '',
            font: {
                size: 14
            }
        }
    },
    font: {
        family: 'Georgia'
    },
    xaxis: {
        showgrid: false,
        showline: false,
        showticklabels: false,
        tickfont: {
            size: 14
        }
    },
    yaxis: {
        showgrid: false,
        showticklabels: false,
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
        l: 200,
        r: 200
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
    'Fund type': {
        'Global public equities': 'rgb(128, 0, 0)',
        'Private equity': 'rgb(193, 102, 34)',
        'Absolute return': 'rgb(143, 57, 49)',
        'Fixed income': 'rgb(138, 144, 69)',
        'Natural resources': 'rgb(88, 89, 63)',
        'Real estate': 'rgb(21, 95, 131)',
        'Private debt': 'rgb(53, 14, 32)',
        'Cash equivalents': 'rgb(100, 100, 100)',
        'Funds in trust': 'rgb(0, 0, 0)'
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

    data = await fetchData('financial-statement-2023.json');
    console.log(data);

    // we will edit this plot throughout the whole article
    createNewSection(
        'causes',
        'Movement',
        (prev_var = 'Top'),
        (mapping = zoom_mapping),
        (offset = '70%')
    );

    // createWaypoint('what-is-it');

    new Waypoint({
        element: document.getElementById('breakdown'),
        handler: function (direction) {
            myPlot = document.getElementById('chart-div');

            if (direction == 'down') {
                Plotly.animate(
                    myPlot,
                    {
                        layout: {
                            xaxis: {
                                showticklabels: true,
                                range: [0, 100]
                            },
                            margin: {
                                l: 50,
                                r: 0
                            }
                        }
                    },
                    { transition: transition }
                );
            } else {
                Plotly.animate(myPlot, {
                    layout: {
                        xaxis: {
                            showticklabels: false
                        },
                        margin: {
                            l: 200,
                            r: 200
                        }
                    }
                });
            }
        }
    });

    new Waypoint({
        element: document.getElementById('control'),
        handler: function (direction) {
            if (direction == 'down') {
                console.log('Showing flow chart');
                hideChart((all = true));

                d3.selectAll('#flowchart').style('display', 'block');
            } else {
                console.log('Showing chart div');
                showChart();
            }
        },
        offset: '90%'
    });

    new Waypoint({
        element: document.getElementById('board-of-trustees'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.select('#flowchart-trustees').style('fill', '#A42323');
                d3.select('#flowchart-graduate').style('fill', '#A42323');
                d3.select('#flowchart-faculty').style('fill', '#A42323');
                d3.select('#flowchart-advisory').style('fill', '#A42323');
            } else {
                d3.select('#flowchart-trustees').style('fill', '#800000');
                d3.select('#flowchart-graduate').style('fill', '#800000');
                d3.select('#flowchart-faculty').style('fill', '#800000');
                d3.select('#flowchart-advisory').style('fill', '#800000');
            }
        },
        offset: '90%'
    });

    new Waypoint({
        element: document.getElementById('office-of-investments'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.select('#flowchart-office').style('fill', '#A42323');
                d3.select('#flowchart-firm').style('fill', '#A42323');
                d3.select('#flowchart-trustees').style('fill', '#800000');
                d3.select('#flowchart-graduate').style('fill', '#800000');
                d3.select('#flowchart-faculty').style('fill', '#800000');
                d3.select('#flowchart-advisory').style('fill', '#800000');
            } else {
                d3.select('#flowchart-office').style('fill', '#800000');
                d3.select('#flowchart-firm').style('fill', '#800000');
            }
        },
        offset: '90%'
    });

    new Waypoint({
        element: document.getElementById('president'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.select('#flowchart-president').style('fill', '#A42323');
                d3.select('#flowchart-office').style('fill', '#800000');
                d3.select('#flowchart-firm').style('fill', '#800000');
            } else {
                d3.select('#flowchart-president').style('fill', '#800000');
            }
        },
        offset: '90%'
    });

    new Waypoint({
        element: document.getElementById('donors'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.select('#flowchart-donors').style('fill', '#A42323');
                d3.select('#flowchart-president').style('fill', '#800000');
            } else {
                d3.select('#flowchart-donors').style('fill', '#800000');
            }
        },
        offset: '90%'
    });

    finalWP = new Waypoint({
        element: document.getElementById('conclusion'),
        handler: function (direction) {
            if (direction == 'down') {
                hideChart((all = true));
                console.log('Hiding chart div');
            } else {
                showChart((all = true));
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
