// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

// cite: translated from highcharts with chatgpt
function sankeyChart() {
    // Node labels
    const labels = [
        'Total assets<br>(excluding<br>hospital)', // 0
        'Revenue with restrictions', // 1
        'Endowment payout with restrictions', // 2
        'Private gifts', // 3
        'Revenue<br>without restrictions<br>(excluding hospital)', // 4
        'Total operating revenue', // 5
        'Total nonoperating revenue', // 6
        'Investment return without restrictions', // 7
        'Other nonoperating revenue', // 8
        'Investment return with restrictions', // 9
        'Net tuition', // 10
        'Endowment payout<br>without restrictions', // 11
        'Government grants and contracts', // 12
        'Private gifts, grants, and contracts', // 13
        'Other operating revenue' // 14
    ];

    // Define links as [sourceName, targetName, value]
    const linksData = [
        [
            'Total assets<br>(excluding<br>hospital)',
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
        [
            'Total assets<br>(excluding<br>hospital)',
            'Revenue<br>without restrictions<br>(excluding hospital)',
            3387.2
        ],
        [
            'Revenue<br>without restrictions<br>(excluding hospital)',
            'Total operating revenue',
            3285.9
        ],
        [
            'Revenue<br>without restrictions<br>(excluding hospital)',
            'Total nonoperating revenue',
            101.4
        ],
        [
            'Total nonoperating revenue',
            'Investment return without restrictions',
            66.0
        ],
        ['Total nonoperating revenue', 'Other nonoperating revenue', 35.4],
        ['Total operating revenue', 'Net tuition', 611.3],
        ['Total operating revenue', 'Government grants and contracts', 561.3],
        [
            'Total operating revenue',
            'Private gifts, grants, and contracts',
            293.2
        ],
        [
            'Total operating revenue',
            'Endowment payout<br>without restrictions',
            565.7
        ],
        ['Total operating revenue', 'Other operating revenue', 1254.4]
    ];

    // Manual x/y positions — tuned to avoid crossings
    const x = [
        0.0, // Total assets (source)
        0.16, // Revenue with restrictions
        0.9, // Endowment payout with restrictions
        0.9, // Private gifts
        0.16, // Revenue without restrictions
        0.4, // Total operating revenue
        0.4, // Total nonoperating revenue
        0.9, // Investment return without restrictions
        0.9, // Other nonoperating revenue
        0.9, // Investment return with restrictions
        0.9, // Net tuition
        0.9, // Endowment payout (unrestricted)
        0.9, // Government grants
        0.9, // Private gifts, grants, and contracts
        0.9 // Other operating revenue
    ];

    const y = [
        0.5, // Total assets
        0.8, // Revenue with restrictions
        0.96, // Endowment payout (restricted)
        0.85, // Private gifts (restricted)
        0.3, // Revenue without restrictions
        0.29, // Total operating revenue
        0.65, // Total nonoperating revenue
        0.72, // Investment return (unrestricted)
        0.75, // Other nonoperating revenue
        0.92, // Investment return (restricted)
        0.25, // Net tuition
        0.38, // Endowment payout (unrestricted)
        0.51, // Government grants
        0.61, // Private gifts, grants, and contracts
        0.05 // Other operating revenue
    ];

    // Map node names to indices
    const nodeIndex = {};
    labels.forEach((label, i) => (nodeIndex[label] = i));

    const sources = linksData.map((d) => nodeIndex[d[0]]);
    const targets = linksData.map((d) => nodeIndex[d[1]]);
    const values = linksData.map((d) => d[2]);

    const data = {
        type: 'sankey',
        orientation: 'h',
        node: {
            x: x,
            y: y,
            label: labels,
            pad: 15,
            thickness: 20,
            line: { color: 'black', width: 0.5 },
            hoverinfo: 'none',
            color: [
                // color the endowment related ones and leave the rest
                '#800000',
                '#800000',
                '#d51d1dff',
                '#800000',
                '#800000',
                '#800000',
                '#800000',
                '#800000',
                '#800000',
                '#800000',
                '#800000',
                '#d51d1dff',
                '#800000',
                '#800000',
                '#800000'
            ]
        },
        link: {
            source: sources,
            target: targets,
            value: values,
            hovertemplate: '%{target.label}: $%{value:.00f}M<extra></extra>'
        }
    };

    const layout = {
        title: {
            text: 'Revenue, Fiscal Year 2024'
        },
        annotations: [
            {
                text: 'For clarity, assets from hospital services ($4.2 billion) are excluded. Net assets (total assets minus total liabilities) for FY24 were $245.9 million.<br>Source: <a href="">UChicago financial statement 2023</a>',
                xref: 'paper',
                yref: 'paper',
                x: 0,
                y: -0.05,
                showarrow: false,
                font: { size: 12, color: 'gray' },
                align: 'left'
            }
        ],
        font: { size: 12, color: 'black' }
    };

    Plotly.newPlot('chart-div', [data], layout);
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
 * @param  {Array} variable Variable(s) to group by
 * @return {Array} traces List of traces (data) as input to a plotly graph
 */
function processData(data, variable = 'fund_type') {
    console.log('processing', data);

    // add hoverinfo
    if (variable === 'recategorized') {
        // cite: copilot
        data.forEach(function (d) {
            d['hoverinfo'] = helper_text[d['recategorized']];
        });
    }

    // cite: copilot
    const total = data
        .map((d) => d.amount_thousands)
        .reduce((acc, curr) => acc + curr, 0);
    console.log(total);

    const valueSums = data.reduce((acc, obj) => {
        acc[obj[variable]] =
            (acc[obj[variable]] || 0) +
            Math.round((obj['amount_thousands'] / total) * 100);
        return acc;
    }, {});

    const groupedData = data.map((obj) => ({
        ...obj,
        x: valueSums[obj[variable]]
    }));
    const unique = [
        ...new Map(groupedData.map((item) => [item[variable], item])).values()
    ];

    // console.log('grouped', groupedData);
    traces = [];

    try {
        // construct plotly "dataframe"
        unique.forEach(function (val) {
            traces.push({
                type: 'bar',
                x: ['Data'],
                y: [val['x']],
                name: [val[variable]],
                marker: {
                    color: colorbook[variable][val[variable]]
                },
                customdata:
                    'hoverinfo' in groupedData[0]
                        ? [val['hoverinfo']]
                        : ['none'],
                text: [val[variable] + ': ' + val['x'] + '%'],
                hoverinfo: 'hoverinfo' in groupedData[0] ? 'text' : 'none',
                hoverlabel: {
                    bordercolor: '#f1f1f1', // border color
                    font: {
                        family: 'Playfair',
                        size: 16,
                        color: 'black' // text color
                    }
                },
                hovertemplate: hovertemplates[variable]
            });
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

function addLabels(title = '', caption = '') {
    chart = document.getElementById('chart-div');
    Plotly.animate(
        chart,
        {
            layout: {
                title: {
                    text: title
                },
                annotations: [
                    {
                        text: caption,
                        xref: 'paper',
                        yref: 'paper',
                        x: 0,
                        y: -0.02, // move below the x-axis
                        showarrow: false,
                        xanchor: 'left',
                        yanchor: 'top',
                        font: { size: 12, color: 'gray' }
                    }
                ]
            }
        },
        { transition: transition }
    );
}

function createTable(div, prev) {
    new Waypoint({
        element: document.getElementById(div),
        handler: function (direction) {
            if ((prev === 'none') & (direction === 'up')) {
                hideChart();
                return;
            }
            showChart();

            // if scrolling up then use previous firm
            const firm_name = direction == 'down' ? div : prev;

            const filtered = coi.filter(
                // first word when lowercased matches provided firm_name
                (d) => d.firm_name.split(' ')[0].toLowerCase() === firm_name
            );

            const skip_first = filtered.map(({ firm_name, ...rest }) => rest);
            const values = skip_first.map((obj) => Object.values(obj));

            console.log(values);
            var data = [
                {
                    type: 'table',
                    header: {
                        values: [
                            ['<b>Fund name</b>'],
                            ['<b>Industries</b>'],
                            ['<b>Regions</b>']
                        ],
                        align: 'center',
                        line: { width: 1, color: 'black' },
                        fill: { color: '#800000' },
                        font: { size: 16, color: 'white' }
                    },
                    cells: {
                        values: d3.transpose(values),
                        align: 'center',
                        line: { color: 'black', width: 1 },
                        font: {
                            size: 14,
                            color: ['black']
                        }
                    }
                }
            ];

            Plotly.newPlot('chart-div', data);
        },
        offset: '70%'
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

// ------- CONSTANTS ------

/**
 * layout used for all plots. As opposed to the data object, this should contain parameters that are constant across the entire graph, not variable across traces or groups
 * Cite: https://community.plotly.com/t/date-tick-formatting/11081/5
 */
const layout = {
    title: {
        text: '',
        x: 0.03,
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
    barmode: 'stack',
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
        showline: false,
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
        l: 25,
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

const hovertemplates = {
    fund_type: 'none',
    recategorized:
        ' <br>    Type: %{text}<br>%{customdata}<br> <extra></extra>', // extra tag removes trace label; spaces needed for fake padding,
    sector: ' <br>    Sector: %{text}<br>    <b>Top five companies by<br>    UChicago-owned shares<br>    March 2025:</b> <br>%{customdata}<br> <extra></extra>' // extra tag removes trace label; spaces needed for fake padding
};

const colorbook = {
    fund_type: {
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
    recategorized: {
        'Public equities (stocks)': 'rgb(128, 0, 0)',
        'Private equities (stocks)': 'rgb(193, 102, 34)',
        Bonds: 'rgb(138, 144, 69)',
        'Hedge funds': 'rgb(53, 14, 32)',
        Other: 'rgb(21, 95, 131)'
    },
    sector: {
        Technology: 'rgb(128, 0, 0)',
        'Financial Services': 'rgb(193, 102, 34)',
        'Consumer Cyclical': 'rgb(143, 57, 49)',
        Healthcare: 'rgb(138, 144, 69)',
        'Communication Services': 'rgb(88, 89, 63)',
        Industrials: 'rgb(21, 95, 131)',
        'Consumer Defensive': 'rgb(53, 14, 32)',
        Energy: 'rgb(100, 100, 100)',
        Utilities: 'rgb(0, 0, 0)',
        'Basic Materials': 'rgb(128, 0, 0)',
        'Real Estate': 'rgb(193, 102, 34)'
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

const helper_text = {
    // 'Global public equities': '',
    // 'Private equity': 'rgb(193, 102, 34)',
    // 'Absolute return': 'rgb(143, 57, 49)',
    // 'Fixed income': 'rgb(138, 144, 69)',
    // 'Natural resources': 'rgb(88, 89, 63)',
    // 'Real estate': 'rgb(21, 95, 131)',
    // 'Private debt': 'rgb(53, 14, 32)',
    // 'Cash equivalents': 'rgb(100, 100, 100)',
    // 'Funds in trust': 'rgb(0, 0, 0)',
    'Public equities (stocks)': 'DEFINITION',
    'Private equities (stocks)': 'DEFINITION',
    Bonds: 'DEFINITION',
    'Hedge funds': 'DEFINITION',
    Other: 'DEFINITION'
};

// -------- MAIN --------
var data;

async function init() {
    // window.onbeforeunload = function () {
    //     window.scrollTo(0, 0);
    // };
    // hideChart((all = true));

    statements = await fetchData('financial-statement-2023.json');
    console.log(statements);

    sec = await fetchData('sec-sectors-2025.json');
    console.log(sec);

    coi = await fetchData('conflicts-of-interest-2023.json');
    console.log(coi);

    new Waypoint({
        element: document.getElementById('what-is-it'),
        handler: function (direction) {
            if (direction == 'down') {
                showChart();
                Plotly.newPlot(
                    'chart-div',
                    processData(statements, (variable = 'fund_type')),
                    layout,
                    config
                );
                console.log('showing chart');
                addLabels(
                    (title = 'Fund types'),
                    (caption = 'Source: UChicago financial statements')
                );
            } else {
                hideChart();
            }
        },
        offset: '70%'
    });

    new Waypoint({
        element: document.getElementById('breakdown'),
        handler: function (direction) {
            if (direction == 'down') {
                Plotly.newPlot(
                    'chart-div',
                    processData(statements, (variable = 'recategorized')),
                    layout,
                    config
                );
                addLabels(
                    (title = 'Fund types (simplified)'),
                    (caption = 'Source: UChicago financial statements')
                );
            } else {
                Plotly.newPlot(
                    'chart-div',
                    processData(statements, (variable = 'fund_type')),
                    layout,
                    config
                );
                addLabels(
                    (title = 'Fund types'),
                    (caption = 'Source: UChicago financial statements')
                );
            }
        },
        offset: '70%'
    });

    new Waypoint({
        element: document.getElementById('withdraw'),
        handler: function (direction) {
            if (direction == 'down') {
                showChart();
                sankeyChart();
            } else {
                Plotly.newPlot(
                    'chart-div',
                    processData(statements, (variable = 'recategorized')),
                    layout,
                    config
                );
                addLabels(
                    (title = 'Fund types (simplified)'),
                    (caption = 'Source: UChicago financial statements')
                );
            }
        },
        offset: '70%'
    });

    new Waypoint({
        element: document.getElementById('sec'),
        handler: function (direction) {
            if (direction == 'down') {
                showChart();
                Plotly.newPlot(
                    'chart-div',
                    processData(sec, (variable = 'sector')),
                    layout,
                    config
                );
                addLabels(
                    (title = 'Industry sectors'),
                    (caption = 'Source: UChicago SEC 13-F')
                );
                chart = document.getElementById('chart-div');
                Plotly.animate(
                    chart,
                    {
                        layout: {
                            margin: {
                                l: 15,
                                r: 350
                            }
                        }
                    },
                    { transition: transition }
                );
            } else {
                sankeyChart();
            }
        },
        offset: '70%'
    });

    createTable('lake', (prev = 'none'));

    // addLabels(
    //     (title = 'Associated funds'),
    //     (caption = 'Sources: Pitchbook, UChicago Form 990 filing')
    // );
    createTable('pimco', (prev = 'lake'));
    // addLabels(
    //     (title = 'Associated funds'),
    //     (caption = 'Sources: Pitchbook, UChicago Form 990 filing')
    // );
    createTable('carlyle', (prev = 'pimco'));
    // addLabels(
    //     (title = 'Top 10 of 387 associated funds'),
    //     (caption = 'Sources: Pitchbook, UChicago Form 990 filing')
    // );

    // TODO: add title and caption

    new Waypoint({
        element: document.getElementById('control'),
        handler: function (direction) {
            if (direction == 'down') {
                console.log('Showing flow chart');
                hideChart();

                d3.selectAll('#flowchart').style('display', 'block');
            } else {
                console.log('Hiding flow chart');
                showChart();

                d3.selectAll('#flowchart').style('display', 'none');
            }
        },
        offset: '70%'
    });

    new Waypoint({
        element: document.getElementById('board-of-trustees'),
        handler: function (direction) {
            if (direction == 'down') {
                d3.select('#flowchart-trustees').style('fill', '#d51d1dff');
                d3.select('#flowchart-graduate').style('fill', '#d51d1dff');
                d3.select('#flowchart-faculty').style('fill', '#d51d1dff');
                d3.select('#flowchart-advisory').style('fill', '#d51d1dff');
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
                d3.select('#flowchart-office').style('fill', '#d51d1dff');
                d3.select('#flowchart-firm').style('fill', '#d51d1dff');
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
                d3.select('#flowchart-president').style('fill', '#d51d1dff');
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
                d3.select('#flowchart-donors').style('fill', '#d51d1dff');
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
                d3.selectAll('#flowchart').style('display', 'none');
                console.log('Hiding chart div');
            } else {
                d3.selectAll('#flowchart').style('display', 'block');
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
