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
        'Total assets<br>(excluding hospital)', // 0
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
        [
            'Total assets<br>(excluding hospital)',
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
        0.2, // Revenue with restrictions
        0.9, // Endowment payout with restrictions
        0.9, // Private gifts
        0.2, // Revenue without restrictions
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

// Group and sum elements by type (cite: copilot)
function groupAndSum(data, groupByKey) {
    console.log('grouping by', groupByKey, data);
    const groupedData = data.reduce((acc, curr) => {
        const key = curr[groupByKey]; // Group by the specified key
        if (!acc[key]) {
            // If the group doesn't exist, initialize it with the current object
            acc[key] = { ...curr, amount_thousands: 0 };
        }
        // Sum the values for the group
        acc[key].amount_thousands += curr.amount_thousands;
        return acc;
    }, {});

    // Convert the grouped object back into an array
    const groupedArray = Object.values(groupedData);

    // sort by value
    groupedArray.sort((a, b) => b.amount_thousands - a.amount_thousands);

    let total_thousands = 0;
    groupedArray.forEach((d) => (total_thousands += d.amount_thousands));

    // Make cumulative x position variable
    let cumulativeSum = 0;
    groupedArray.forEach((item) => {
        item.x = cumulativeSum;
        item.width = item.amount_thousands / total_thousands;
        cumulativeSum += item.width;

        item.label =
            item[groupByKey] + ' (' + Math.round(item.width * 100) + '%)';

        console.log(
            `Category: ${item[groupByKey]}, x: ${item.x}, width: ${item.width}`
        );
    });

    return groupedArray;
}

/**
 * Group data and define all traces
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis
 * @param  {json} data Data loaded in a previous step
 * @param  {Array} name_vars Variable(s) to group by
 * @return {Array} traces List of traces (data) as input to a plotly graph
 */
function processData(data, variable = 'fund_type') {
    console.log('processing', data);
    const groupedData = groupAndSum(data, variable);

    console.log('grouped', groupedData);
    try {
        traces = [];

        // construct plotly "dataframe"

        traces.push({
            type: 'bar',
            x: groupedData.map((d) => d.y),
            y: groupedData.map((d) => d.x),
            width: groupedData.map((d) => d.width * 1.35),
            name: groupedData.map((d) => d[variable]),
            marker: {
                color: groupedData.map((d) => colorbook[variable][d[variable]])
            },
            text: groupedData.map((d) => d.label),
            orientation: 'h',
            hoverinfo: 'text',
            hoverlabel: {
                // bgcolor: '#222', // background color
                bordercolor: '#f1f1f1', // border color
                font: {
                    family: 'Playfair',
                    size: 16,
                    color: 'black' // text color
                }
            }
        });

        if ('hoverinfo' in groupedData[0]) {
            traces[0]['customdata'] = groupedData.map((d) => d.hoverinfo);
            traces[0]['hovertemplate'] =
                ' <br>    Sector: %{text}<br>    <b>Top five companies by<br>    UChicago-owned shares<br>    March 2025:</b> <br>%{customdata}<br> <extra></extra>'; // extra tag removes trace label; spaces needed for fake padding
        }

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
 */
function createWaypoint(div, offset = '80%') {
    function handler(direction) {
        myPlot = document.getElementById('chart-div');

        // https://stackoverflow.com/questions/9279368/how-to-get-all-css-classes-of-an-element
        let classList = document.getElementById(div).className;

        if (direction == 'down') {
            // go to next key
            console.log(div);
        } else if (div == 'palestine') {
            console.log('first key');
        } else if (!classList.match('first')) {
            // go back to the previous key

            let orderedKeys = [];

            previousIndex = orderedKeys.indexOf(div) - 1;
            previousKey = orderedKeys[previousIndex];

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
 */
function createNewSection(div, data, variable, prev_var, offset = '80%') {
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

                console.log('New section created at: ' + div);
            } else if (prev_var == 'Top') {
                // if going back to intro, hide chart
                hideChart();
            } else {
                // go to last key of previous section

                let orderedKeys = [];
                for (var key in [prev_var]) {
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
                        l: 25,
                        r: 300
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
        l: 25,
        r: 300
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

// -------- MAIN --------
var data;

async function init() {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
    // hideChart((all = true));

    fs = await fetchData('financial-statement-2023.json');
    console.log(fs);

    sec = await fetchData('sec-sectors-2025.json');
    console.log(sec);

    // we will edit this plot throughout the whole article
    createNewSection(
        'what-is-it',
        fs,
        (variable = 'fund_type'),
        (prev_var = 'Top'),
        (offset = '70%')
    );
    // showChart();

    // createWaypoint('what-is-it');

    new Waypoint({
        element: document.getElementById('withdraw'),
        handler: function (direction) {
            if (direction == 'down') {
                sankeyChart();
            }
        }
    });

    new Waypoint({
        element: document.getElementById('breakdown'),
        handler: function (direction) {
            myPlot = document.getElementById('chart-div');

            if (direction == 'down') {
                Plotly.newPlot(
                    'chart-div',
                    processData(fs, (variable = 'recategorized')),
                    layout,
                    config
                );
            }
        }
    });

    new Waypoint({
        element: document.getElementById('categories'),
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
                    {
                        transition: {
                            duration: 1000, // Increase duration for smoother transition
                            easing: 'cubic-in-out' // Use a smoother easing function
                        }
                    }
                );
            } else {
                Plotly.animate(
                    myPlot,
                    {
                        layout: {
                            xaxis: {
                                showticklabels: false
                            },
                            margin: {
                                l: 25,
                                r: 300
                            }
                        }
                    },
                    {
                        transition: {
                            duration: 1000, // Increase duration for smoother transition
                            easing: 'cubic-in-out' // Use a smoother easing function
                        }
                    }
                );
            }
        }
    });

    createNewSection(
        'irs',
        sec,
        'sector',
        (prev_var = 'Top'),
        (offset = '70%')
    );

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
        offset: '90%'
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
