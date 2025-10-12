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

function pieChart() {
    Highcharts.chart('chart-div', {
        chart: {
            type: 'pie'
        },

        // Setting default colors
        colors: [
            '#C76363',
            '#C04A49',
            '#A42323',
            '#7F1416',
            '#571612',
            '#3D3D3D',
            '#392F83',
            '#184F26'
        ],

        // All code for your chart goes here
        title: {
            text: 'Investments, Fiscal Year 2024'
        },

        subtitle: {
            text: ''
        },

        legend: {
            enabled: false
        },

        xAxis: {
            type: 'datetime'
        },

        yAxis: {
            title: {
                text: 'Value (in millions of dollars)'
            }
        },

        // plotOptions: {
        //     series: {
        //         pointStart: 1999
        //     }
        // },

        // accessibility: {
        //     point: {
        //         valueDescriptionFormat: '{index}. {point.from} to {point.to}, ' +
        //             '{point.weight}.'
        //     }
        // },

        tooltip: {
            formatter: function () {
                return (
                    Highcharts.dateFormat('%Y-%m-%d', this.x) +
                    '</b>: <b>$' +
                    Math.round(this.y) +
                    'M</b>'
                );
            }
        },

        series: [
            {
                name: 'SEC Investments',
                label: {
                    enabled: false
                },
                innerSize: '75%',
                data: [
                    {
                        name: 'Cash equivalents',
                        y: 198124
                    },
                    { name: 'Global public equities', y: 3262557 },
                    { name: 'Private equity', y: 3210498 },
                    { name: 'Funds in trust', y: 300116 },
                    { name: 'Fixed income', y: 861458 },
                    { name: 'Real assets', y: 572065 },
                    { name: 'Real estate', y: 529025 },

                    { name: 'Equity oriented', y: 1014774 },
                    { name: 'Diversifying', y: 1533315 }
                ]
            }
        ]
    });
}

Highcharts.chart('chart-div3', {
    chart: {
        type: 'pie'
    },

    // Setting default colors
    colors: [
        '#C76363',
        '#C04A49',
        '#A42323',
        '#7F1416',
        '#571612',
        '#3D3D3D',
        '#392F83',
        '#184F26'
    ],

    // All code for your chart goes here
    title: {
        text: 'Investments, Fiscal Year 2002'
    },

    subtitle: {
        text: ''
    },

    legend: {
        enabled: false
    },

    xAxis: {
        type: 'datetime'
    },

    yAxis: {
        title: {
            text: 'Value (in millions of dollars)'
        }
    },

    // plotOptions: {
    //     series: {
    //         pointStart: 1999
    //     }
    // },

    // accessibility: {
    //     point: {
    //         valueDescriptionFormat: '{index}. {point.from} to {point.to}, ' +
    //             '{point.weight}.'
    //     }
    // },

    tooltip: {
        formatter: function () {
            return (
                Highcharts.dateFormat('%Y-%m-%d', this.x) +
                '</b>: <b>$' +
                Math.round(this.y) +
                'M</b>'
            );
        }
    },

    series: [
        {
            name: 'SEC Investments',
            label: {
                enabled: false
            },
            innerSize: '75%',

            data: [
                { name: 'Cash equivalents', y: 87124 },
                { name: 'Global public equities', y: 684615 + 541500 },
                { name: 'Private equity', y: 584054 },
                { name: 'Funds in trust', y: 342324 },
                { name: 'Fixed income', y: 739785 },
                { name: 'Real assets', y: 274593 },
                { name: 'High yield bonds', y: 233478 },
                { name: 'Absolute return', y: 505807 }
            ]
        }
    ]
});

Highcharts.chart('chart-div4', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Data available about the endowment, Fiscal Year 2024',
        align: 'left'
    },
    xAxis: {
        categories: [
            'Global public equities',
            'Private equity',
            // 'Bonds',
            'Diversifying',
            'Equity oriented',
            'Fixed income',
            'Real estate',
            'Real assets',
            'Cash equivalents'
        ]
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [
        {
            name: 'Known',
            data: [
                423832, // Global public equities
                0, // Private equity
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            name: 'Unknown',
            data: [
                3262557 - 423832, // Global public equities
                3210498, // Private equity
                1533315,
                1014774,
                861458,
                572065,
                529025,
                198124
            ]
        }
    ]
});

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

        bars = d3.selectAll('.bc-bar-inner');

        // https://stackoverflow.com/questions/9279368/how-to-get-all-css-classes-of-an-element
        let classList = document.getElementById(div).className;

        if (direction == 'down') {
            // go to next key
            d3.selectAll('.bc-bar-inner.dw-rect').style(
                'background',
                'rgb(100, 0, 100) !important'
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
                            yaxis: { range: mapping[variable]['all']['y'] }
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
        showgrid: true,
        showline: true,
        range: ['1964-6-1'],
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

    // data = await fetchData();
    // console.log(data);

    // we will edit this plot throughout the whole article
    createNewSection(
        'causes',
        'Movement',
        (prev_var = 'Top'),
        (mapping = zoom_mapping),
        (offset = '70%')
    );

    createWaypoint('what-is-it');
    createWaypoint('protest');
    createWaypoint('other-action');

    flowchartWP = new Waypoint({
        element: document.getElementById('flowchart'),
        handler: function (direction) {
            if (direction == 'down') {
                console.log('Showing flow chart');
                flowChart();
            } else {
                showChart();
                console.log('Showing chart div');
            }
        },
        offset: '90%'
    });

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
