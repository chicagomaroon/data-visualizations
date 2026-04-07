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
 * Group data and define all traces for categorical plot (pie or bar)
 * Cite: https://stackoverflow.com/questions/65044430/plotly-create-a-scatter-with-categorical-x-axis-jitter-and-multi-level-axis
 * @param  {json} data Data loaded in a previous step
 * @param  {Array} variable Variable(s) to group by
 * @return {Array} traces List of traces (data) as input to a plotly graph
 */
function groupData(data, variable) {
    // console.log('processing', data);

    const valueSums = data.reduce((acc, obj) => {
        acc[obj[variable]] =
            (acc[obj[variable]] || 0) + obj['amount_thousands'];
        return acc;
    }, {});

    const groupedData = data.map((obj) => ({
        ...obj,
        x: valueSums[obj[variable]]
    }));
    const unique = [
        ...new Map(groupedData.map((item) => [item[variable], item])).values()
    ];

    return unique;
}

// ------------------ PLOTS ------------------

function createWaypoint(div, offset = '70%') {
    new Waypoint({
        element: document.getElementById(div),
        handler: function (direction) {
            var myPlot = document.getElementById('chart-div');

            if (direction === 'down') {
                // scrolling down, so call next action in sequence
                downHandler = sequence[div];
                downHandler();
            } else {
                // scrolling up, so call previous action in sequence
                let orderedKeys = [];
                for (var key in sequence) {
                    orderedKeys.push(key);
                }

                previousIndex = orderedKeys.indexOf(div) - 1;
                previousKey = orderedKeys[previousIndex];

                upHandler = sequence[previousKey];
                upHandler();
            }

            myPlot.on('plotly_click', open_url);
        },
        offset: offset
    });
}

/**
 * layout used for all plots. As opposed to the data object, this should contain parameters that are constant across the entire graph, not variable across traces or groups
 * Cite: https://community.plotly.com/t/date-tick-formatting/11081/5
 */
function createLayout(title = '', caption = '', showlegend = false) {
    return {
        title: {
            text: title,
            x: 'center',
            y: isMobileLike ? 0.82 : 0.93, // vertical position (1 = top, 0 = bottom)
            font: {
                size: titleFontSize
            },
            subtitle: {
                text: subtitle,
                font: {
                    size: subtitleFontSize
                }
            }
        },
        annotations: [
            {
                text: caption,
                xref: 'paper',
                yref: 'paper',
                x: 1, // right align
                y: -0.08 - isMobileLike * 0.02, // move below the x-axis
                showarrow: false,
                xanchor: 'right',
                yanchor: 'top',
                font: { size: annotationFontSize, color: 'gray' },
                align: 'right'
            }
        ],
        barmode: 'stack',
        font: {
            family: 'Georgia',
            size: bodyFontSize
        },
        xaxis: {
            showgrid: false,
            showline: false,
            showticklabels: false,
            tickfont: {
                size: axisFontSize
            },
            fixedrange: true
        },
        yaxis: {
            showgrid: false,
            showline: false,
            showticklabels: false,
            tickfont: {
                size: axisFontSize
            },
            fixedrange: true
        },
        hovermode: 'closest',
        hoverlabel: {
            bordercolor: '#dddddd', // border color
            bgcolor: 'white',
            opacity: 1,
            alpha: 1,
            font: {
                family: 'Playfair',
                size: bodyFontSize,
                color: 'black' // text color
            },
            align: 'left'
        },
        showlegend: showlegend,
        legend: {
            x: 0.9, // Position the legend inside the graph (horizontal position)
            y: 0.9, // Position the legend inside the graph (vertical position)
            xanchor: 'center', // Anchor the legend horizontally at its center
            yanchor: 'top' // Anchor the legend vertically at the top
        },
        margin: {
            l: 25,
            r: isMobileLike ? 25 : 0,
            b: isMobileLike ? 50 : 100
        },
        dragmode: 'pan'
    };
}

function donutChart(data) {
    const groupedData = groupData(data, 'recategorized');

    trace = {
        type: 'pie',
        hole: 0.5,
        values: groupedData.map((d) => d.x),
        text: groupedData.map((d) => d.recategorized),
        textfont: {
            color: 'white'
        },
        texttemplate: '%{text}<br>%{percent:.1%}', // Format percentage to 1 decimal place
        marker: {
            colors: groupedData.map(
                (d) => colorbook['recategorized'][d.recategorized]
            ),
            line: {
                color: 'white',
                width: 1
            }
        },
        customdata: groupedData.map(
            (d) =>
                '    <br>    ' +
                helper_text[d.recategorized.replaceAll('<br>', ' ')] +
                '    <br>    '
        ),
        hoverinfo: 'text',
        hovertemplate: '%{customdata}<extra></extra>'
    };

    return [trace];
}

function lollipopChart(data) {
    const traces = [];

    for (const year of [2025, 2005]) {
        traces.push({
            type: 'scatter',
            x: data.map((d) => d[year]),
            y: data.map((d) =>
                isMobileLike
                    ? d.recategorized
                    : d.recategorized.replaceAll('<br>', ' ')
            ),
            mode: 'markers',
            name: year,
            marker: {
                color: year > 2010 ? '#800000' : '#BB7663',
                size: axisFontSize + 1
            },
            customdata: data.map(
                (d) =>
                    '    <br>    ' +
                    Math.round(d[year] * 100) +
                    '% of endowment    <br>    categorized as ' +
                    d.recategorized.replaceAll('<br>', ' ') +
                    '    <br>    in ' +
                    year +
                    '   <br>    '
            ),
            text: data.map((d) => d.recategorized),
            hoverinfo: 'text',
            hovertemplate: '%{customdata}<extra></extra>' // extra tag removes
        });
    }

    return traces;
}

/**
Cite: copilot
*/
function circleChart(data, variable) {
    var groupedData = groupData(data, variable);

    // Create a hierarchy for d3.pack
    const pack_root = d3
        .hierarchy({ children: groupedData })
        .sum((d) => d.amount_thousands); // Use the amount_thousands as the value for packing

    // Create the pack layout
    const pack = d3
        .pack()
        .size([400, 400]) // size of packing area
        .padding(2);

    // Apply the pack layout to the hierarchy
    const packedData = pack(pack_root);

    // Extract the packed circles
    const nodes = packedData.leaves();

    traces = [
        {
            type: 'scatter',
            mode: 'markers+text',
            x: nodes.map((val) => val.x),
            y: nodes.map((val) => val.y),
            name: groupedData.map((val) => val[variable]),
            marker: {
                size: groupedData.map(
                    (val) =>
                        Math.sqrt(val.amount_thousands) /
                        (isMobileLike ? 2 : 0.85) // scale by square root for proportionality of area (instead of radius)
                ),
                color: '#800000',
                opacity: 1
            },
            textfont: {
                color: 'white',
                size: bodyFontSize
            },
            text: groupedData.map((val) =>
                val.amount_thousands < 10000
                    ? val[variable]
                    : `${val[variable]}<br>\$${formatThousands(
                          val.amount_thousands * 1000
                      )}`
            ),
            customdata: groupedData.map(
                (val) =>
                    ' <br>    UChicago had invested at least $' +
                    `${formatThousands(val.amount_thousands * 1000)}    <br>` +
                    '    in the <a href="https://finance.yahoo.com/sectors/' +
                    val[variable].replace('<br>', '-') +
                    '">' +
                    val[variable].replace('<br>', ' ').replace('- ', '') +
                    '</a> sector    <br>    as of September 2025, including:    <br>    <br>' +
                    val.hoverinfo +
                    '<br>    '
            ), // extra tag removes trace label; spaces needed for fake padding
            hoverinfo: 'text',
            hovertemplate: '%{customdata}<extra></extra>'
        }
    ];
    return traces;
}

function facetChart(data) {
    traces = [];
    const markerSize = isMobileLike ? 40 : 20;

    // Add a white line trace to cover the last gridline - cite: copilot
    const whiteLineTrace = {
        type: 'scatter',
        mode: 'lines',
        x: [2012, 2025], // Adjust based on your x-axis range
        y: ['', ''], // Position at the last gridline
        line: {
            color: 'white', // White line to cover the gridline
            width: 20 // Adjust the width to fully cover the gridline
        },
        hoverinfo: 'none' // Disable hover for this trace
    };

    // Add size legend - cite: copilot
    const sizeLegendValues = [100000, 100000, 500000, 1000000];
    const sizeLegendTrace = {
        type: 'scatter',
        mode: 'markers+text',
        x: isMobileLike
            ? [2010, 2014.5, 2018, 2022]
            : [2015.8, 2018.4, 2020.6, 2023],
        y: sizeLegendValues.map(() => ''),
        marker: {
            size: sizeLegendValues.map((val) => Math.sqrt(val) / markerSize),
            color: ['#BBBBBB', '#800000', '#800000', '#800000'],
            opacity: 1
        },
        text: ['undisclosed', '$100K', '$500K', '$1M'],
        textposition: 'right',
        hoverinfo: 'none'
    };

    uniqueGroups = [...new Set(data.map((d) => d.NameOfInterested))];

    uniqueGroups.forEach((group) => {
        const subset = data.filter((d) => d.NameOfInterested === group);

        traces.push({
            type: 'scatter',
            mode: 'markers',
            x: subset.map((d) => d.Year),
            y: subset.map((d) => d.NameOfInterested),
            name: subset.map((d) => d.Person),
            marker: {
                size: subset.map((d) =>
                    d.TransactionDollars > 0
                        ? Math.sqrt(d.TransactionDollars) / markerSize
                        : bodyFontSize
                ),
                color: subset.map((d) =>
                    d.TransactionDollars > 0 ? '#800000' : '#BBBBBB'
                ),
                opacity: 1
            },
            textfont: {
                size: bodyFontSize
            },
            customdata: subset.map(
                (d) =>
                    ' <br>    UChicago paid ' +
                    `${
                        d.TransactionDollars > 0
                            ? '$' + formatThousands(d.TransactionDollars)
                            : 'an undisclosed amount'
                    }    <br>` +
                    '    to <b>' +
                    d.NameOfInterested.replace('<br>', '<br>    ') +
                    '</b>,    <br>    of which Trustee ' +
                    d.Person +
                    ' was    <br>    ' +
                    d.Relationship +
                    ',    <br>    to manage its endowment in ' +
                    d.Year +
                    '    <br> <extra></extra>'
            ), // extra tag removes trace label; spaces needed for fake padding
            hoverinfo: 'text',
            hovertemplate: '%{customdata}<extra></extra>'
        });
    });

    traces.push(whiteLineTrace);
    traces.push(sizeLegendTrace);

    return traces;
}

function barChart(data) {
    data = data.sort((a, b) => a.endowment_dollars - b.endowment_dollars);

    const traces = [];

    traces.push({
        type: 'bar',
        orientation: 'h',
        text: data.map((d) => d.school),
        y: data.map((d) => d.school),
        x: data.map((d) => d.endowment_dollars),
        textposition: 'outside',
        marker: {
            color: data.map((d) =>
                d.school === 'University of Chicago' ? '#800000' : '#BB7663'
            )
        },
        textfont: {
            size: axisFontSize,
            color: 'black'
        },
        customdata: data.map(
            (d) =>
                '<br /> <br />    ' +
                d.school.replace('Univ.', 'University') +
                ' endowment: $' +
                formatThousands(d.endowment_dollars) +
                '    <br /> <br />'
        ),
        hovertemplate: '%{customdata}<extra></extra>'
    });

    return traces;
}

// cite: translated from highcharts with chatgpt
function sankeyChart(div) {
    let sankey_data_filtered = sankey_data;

    // Map node names to indices
    const nodeIndex = {};
    let labels = sankey_data_filtered.map((d) => d.to);
    labels.forEach((label, i) => (nodeIndex[label] = i));
    labels = sankey_data_filtered.map(
        (d) =>
            '<b>' +
            d.to +
            '</b> $' +
            formatThousands(d.amount_millions * 1000000)
    );

    const x = sankey_data_filtered.map((d) =>
        div === 'what-is-endowment1' ? d.x * 2.5 : d.x
    );
    const y = sankey_data_filtered.map((d) => d.y);

    // Define colors for nodes based on the div and node content
    const nodes_color_map = {
        'what-is-endowment': x.map(() => '#BB7663'),
        tuition: sankey_data_filtered.map((d) =>
            d.to.includes('tuition') ? '#800000' : '#BB7663'
        ),
        endowment: sankey_data_filtered.map((d) =>
            d.to.includes('endowment') ? '#800000' : '#BB7663'
        ),
        restricted: sankey_data_filtered.map((d) =>
            d.to.includes('Restricted') || d.to == 'Private gifts'
                ? '#800000'
                : '#BB7663'
        )
    };

    const links_color_map = {
        'what-is-endowment': x.map(() => '#EEEEEE'),
        tuition: sankey_data_filtered.map((d) =>
            d.to.includes('tuition') ? '#CCCCCC' : '#EEEEEE'
        ),
        endowment: sankey_data_filtered.map((d) =>
            d.to.includes('endowment') ? '#CCCCCC' : '#EEEEEE'
        ),
        restricted: sankey_data_filtered.map((d) =>
            d.to.includes('Restricted') || d.to == 'Private gifts'
                ? '#CCCCCC'
                : '#EEEEEE'
        )
    };

    const trace = {
        type: 'sankey',
        orientation: 'h',
        node: {
            x: x,
            y: y,
            label: labels,
            pad: 15,
            thickness: 20,
            line: { width: 0 },
            hoverinfo: 'text',
            color: nodes_color_map[div],
            customdata: sankey_data_filtered.map((d) => d.hover),
            hovertemplate: '%{customdata}<extra></extra>'
        },
        link: {
            source: sankey_data_filtered.map((d) => nodeIndex[d.from]),
            target: sankey_data_filtered.map((d) => nodeIndex[d.to]),
            value: sankey_data_filtered.map((d) => d.amount_millions),
            hoverinfo: 'none',
            color: links_color_map[div]
        }
    };

    return [trace];
}

function drawFlowchart(show = [], hide = []) {
    // make sure everything loads before returning
    Promise.all([d3.xml('static/chart.svg'), d3.xml('static/coi.svg')]).then(
        ([controlChart, coiChart]) => {
            // check that we don't already have the chart up
            if (d3.select('#control-flowchart').empty()) {
                d3.select('#chart-div').html(''); // clear previous chart

                d3.select('#chart-div')
                    .node()
                    .append(controlChart.documentElement);
                d3.select('#chart-div').node().append(coiChart.documentElement);
            }

            show.forEach(function (id) {
                d3.select('#' + id + '-flowchart').style('display', 'block');
            });

            hide.forEach(function (id) {
                d3.select('#' + id + '-flowchart').style('display', 'none');
            });

            if (isMobileLike) {
                d3.selectAll('#chart-div svg')
                    .attr('width', '100%')
                    .attr('height', '43vh');

                d3.selectAll('#coi-flowchart')
                    .attr('width', '100%')
                    .attr('height', '45vh')
                    .style('margin-top', '3vh');
            }
        }
    );
}

function hideChart() {
    d3.select('#chart-container')
        .transition()
        .duration(300)
        .style('opacity', 0)
        .style('display', 'none');
}

function showChart() {
    d3.select('#chart-container').style('display', 'block');
    d3.select('#chart-container')
        .transition()
        .duration(300)
        .style('opacity', 1);
}

/**
 * When you click on a data point, it should open the URL linked in the hover text in a new tab.
 * Cite: GPT
 * @param {json} data Data sensed from plotly hover event
 */
function open_url(data) {
    var info = data.points[0];
    if (Array.isArray(info.customdata)) {
        info.customdata = info.customdata[0];
    }
    console.log(info.customdata);

    var url = info.customdata.match(/href="(.*?)"/);
    console.log(url);

    if (!isMobileLike) {
        window.open(url[1], '_blank').focus();
    }
}

function detectMobile() {
    return (
        window.matchMedia('(max-width: 768px)').matches &&
        navigator.maxTouchPoints > 0
    );
}

// cite: Copilot
const formatThousands = (d) => d3.format('.2s')(d).replace('G', 'B');

// ------- CONSTANTS ------

const config = {
    displayModeBar: false,
    responsive: true,
    scrollZoom: false,
    doubleClick: false
};

const transition = {
    duration: 400,
    easing: 'linear'
};

const colorbook = {
    recategorized: {
        'Public<br>equities<br>(stocks)': 'rgb(128, 0, 0)',
        'Private<br>equities': 'rgb(169, 67, 30)',
        Bonds: 'rgb(19, 48, 28)',
        'Hedge<br>funds': 'rgb(53, 14, 32)',
        Other: 'rgb(21, 95, 131)'
    }
};

const sankeyTitle = 'Revenue, Fiscal Year 2025';
const sankeyCaption =
    'Hospital services ($4.7B) are excluded. Net assets (total assets minus total liabilities) for FY25 were $633.8M.<br>Source: <a href="https://mc-1b49d921-43a2-4264-88fd-647979-cdn-endpoint.azureedge.net/-/media/project/uchicago-tenant/intranet/fna/financial-services/accounting-and-treasury/audited-financial-statements/2024-2025-the-university-of-chicago-financial-statements.pdf?rev=b42148936ffe46d1a43b3c5f915e0edb&hash=F87C26EADBC74DC974DBB5A899324C1F">University of Chicago financial statement for fiscal year 2025</a>';
const statementCaption =
    'Investments are more than the amount in the endowment, $10.6B as of November 2025.<br>Source: <a href="https://mc-1b49d921-43a2-4264-88fd-647979-cdn-endpoint.azureedge.net/-/media/project/uchicago-tenant/intranet/fna/financial-services/accounting-and-treasury/audited-financial-statements/2024-2025-the-university-of-chicago-financial-statements.pdf?rev=b42148936ffe46d1a43b3c5f915e0edb&hash=F87C26EADBC74DC974DBB5A899324C1F">University of Chicago financial statement for fiscal year 2025</a>';

// ------------------ SEQUENCE OF ACTIONS ------------------

// this defines the sequence of actions in order
// calling createWaypoint will call each action depending on whether user is scrolling down (next action) or up (previous action)
const sequence = {
    first: function () {
        hideChart();
        d3.select('#chart-div').html(''); // clear previous chart
    },
    'what-is-endowment': function () {
        const layout = createLayout(
            (title = sankeyTitle),
            (caption = sankeyCaption)
        );
        showChart();
        Plotly.newPlot(
            'chart-div',
            sankeyChart('what-is-endowment'),
            {
                ...layout,
                width: isMobileLike ? 700 : null,
                margin: {
                    b: isMobileLike ? 60 : 120
                },
                title: {
                    ...layout.title,
                    x: isMobileLike ? 0.12 : 'center'
                }
            },
            {
                ...config,
                responsive: false
            }
        );
    },
    tuition: function () {
        const layout = createLayout(
            (title = sankeyTitle),
            (caption = sankeyCaption)
        );
        Plotly.newPlot(
            'chart-div',
            sankeyChart('tuition'),
            {
                ...layout,
                width: isMobileLike ? 700 : null,
                margin: {
                    b: isMobileLike ? 60 : 120
                },
                title: {
                    ...layout.title,
                    x: isMobileLike ? 0.12 : 'center'
                }
            },
            {
                ...config,
                responsive: false
            }
        );
    },
    endowment: function () {
        const layout = createLayout(
            (title = sankeyTitle),
            (caption = sankeyCaption)
        );
        Plotly.newPlot(
            'chart-div',
            sankeyChart('endowment'),
            {
                ...layout,
                width: isMobileLike ? 700 : null,
                margin: {
                    b: isMobileLike ? 60 : 120
                },
                title: {
                    ...layout.title,
                    x: isMobileLike ? 0.12 : 'center'
                }
            },
            {
                ...config,
                responsive: false
            }
        );
    },
    restricted: function () {
        const layout = createLayout(
            (title = sankeyTitle),
            (caption = sankeyCaption)
        );
        Plotly.newPlot(
            'chart-div',
            sankeyChart('restricted'),
            {
                ...layout,
                width: isMobileLike ? 700 : null,
                margin: {
                    b: isMobileLike ? 60 : 120
                },
                title: {
                    ...layout.title,
                    x: isMobileLike ? 0.12 : 'center'
                }
            },
            {
                ...config,
                responsive: false
            }
        );
    },
    breakdown: function () {
        const layout = createLayout(
            (title = null),
            (caption = statementCaption)
        );
        Plotly.newPlot(
            'chart-div',
            donutChart(statements),
            {
                ...layout,
                margin: {
                    t: isMobileLike ? 80 : 40,
                    r: isMobileLike ? 0 : 20,
                    b: isMobileLike ? 90 : 140
                },
                autosize: isMobileLike ? false : true,
                width: isMobileLike ? 380 : null,
                annotations: [
                    layout['annotations'][0], // keep caption
                    {
                        font: {
                            size: titleFontSize
                        },
                        showarrow: false,
                        text: 'Total investments<br>$11.8 billion',
                        x: 0.5,
                        y: 0.5
                    } // add title in center
                ]
            },
            config
        );
    },
    'compare-schools': function () {
        const layout = createLayout(
            (title =
                'U.S. college endowments valued at over $10 billion, Fiscal Year 2024'),
            (caption =
                'Source: <a href="https://www.forbes.com/sites/michaeltnietzel/2025/02/12/college-endowments-saw-112-returns-in-fy-24-harvard-still-1/">College Endowments Saw 11.2% Return In FY 2024</a>'),
            (showlegend = false)
        );
        Plotly.newPlot(
            'chart-div',
            barChart(endowments),
            {
                ...layout,
                margin: {
                    l: 25,
                    r: isMobileLike ? 25 : 0,
                    b: isMobileLike ? 40 : 150
                },
                xaxis: {
                    showgrid: true,
                    showline: true,
                    showticklabels: true,
                    fixedrange: true,
                    tickfont: {
                        size: axisFontSize
                    },
                    tickvals: [10e9, 20e9, 30e9, 40e9, 50e9, 60e9],
                    ticktext: ['$10B', '$20B', '$30B', '$40B', '$50B', '$60B'],
                    title: {
                        text: ''
                    },
                    range: [0, 70e9]
                }
            },
            config
        );
    },
    sec: function () {
        d3.select('.plotly').style('margin-top', '0px');
        const layout = createLayout(
            (title =
                'Sectors invested in by the University as of 2025,' +
                (isMobileLike ? '<br>' : ' ') +
                'with approximate known amounts'),
            (caption =
                'Sources: University of Chicago <a href="https://www.sec.gov/Archives/edgar/data/314957/000110465925107518/infotable.xml">SEC 13-F filing</a> for quarter ending September 30, 2025;' +
                (isMobileLike ? '<br>' : ' ') +
                '<a href="https://investor.vanguard.com/investment-products">Vanguard</a> and <a href="https://www.ishares.com/us/products/239726/ivv">IShares</a> holdings')
        );
        annotations = layout['annotations'];
        layout['annotations'][0]['y'] = -0.03; // move caption for this plot specifically
        Plotly.newPlot(
            'chart-div',
            circleChart(sec, 'sector'),
            {
                ...layout,
                margin: {
                    l: isMobileLike ? 15 : 25,
                    r: isMobileLike ? 20 : 25,
                    b: isMobileLike ? 40 : 75,
                    t: isMobileLike ? 100 : 90
                },
                xaxis: {
                    scaleanchor: 'y',
                    scaleratio: 1,
                    showgrid: false,
                    showticks: false,
                    showticklabels: false,
                    zeroline: false,
                    fixedrange: true
                },
                yaxis: {
                    scaleanchor: 'x',
                    scaleratio: 1,
                    showgrid: false,
                    showticks: false,
                    showticklabels: false,
                    zeroline: false,
                    fixedrange: true,
                    range: [0, 400]
                },
                plot_bgcolor: '#e3bfb5',
                annotations: [
                    layout['annotations'][0], // keep caption
                    {
                        font: {
                            size: bodyFontSize,
                            color: 'black'
                        },
                        showarrow: false,
                        text: '  Total in endowment<br>$10.9B',
                        x: isMobileLike ? -60 : -30,
                        y: 200
                    } // add additional annotation
                ]
            },
            config
        );
    },
    'private-equities': function () {
        d3.select('#chart-div').html(''); // clear previous chart

        // Add arrows corresponding to each change
        const arrowAnnotations = types_time.map((d) => ({
            x: d['2025'],
            y: isMobileLike
                ? d.recategorized
                : d.recategorized.replaceAll('<br>', ' '),
            ax: d['2005'],
            ay: isMobileLike
                ? d.recategorized
                : d.recategorized.replaceAll('<br>', ' '),
            xref: 'x',
            yref: 'y',
            axref: 'x',
            ayref: 'y',
            arrowhead: 4,
            arrowsize: 2,
            arrowwidth: 1,
            arrowcolor: '#BB7663',
            standoff: 15
        }));

        var layout = createLayout(
            (title =
                'Change in proportion of endowment by asset type, 2005–2025'),
            (caption =
                'Source: <a href="https://intranet.uchicago.edu/tools-and-resources/financial-resources/accounting-and-financial-reporting/financial-statements">University of Chicago financial statements</a>'),
            (showlegend = true)
        );

        layout.annotations = (layout.annotations || []).concat(
            arrowAnnotations
        );

        Plotly.newPlot(
            'chart-div',
            lollipopChart(types_time),
            {
                ...layout,
                margin: {
                    l: isMobileLike ? 50 : 220,
                    r: isMobileLike ? 25 : 0,
                    b: isMobileLike ? 60 : 100
                },
                xaxis: {
                    range: [0.01, 1],
                    tickformat: '.0%',
                    ticks: 'outside',
                    tickwidth: 2,
                    showgrid: false,
                    showline: true,
                    showticklabels: true,
                    fixedrange: true,
                    tickfont: {
                        size: axisFontSize
                    },
                    title: {
                        text: ''
                    }
                },
                yaxis: {
                    showgrid: true,
                    showline: false,
                    showticklabels: true,
                    fixedrange: true,
                    tickfont: {
                        size: axisFontSize
                    }
                }
            },
            config
        );
    },
    control: function () {
        drawFlowchart((show = ['control']));
        d3.selectAll('#control-flowchart a rect').style('fill', '#643335');
    },
    'board-of-trustees': function () {
        console.log('board of trustees');
        d3.selectAll('#control-flowchart a rect').style('fill', '#643335');
        d3.selectAll(
            '#flowchart-board-of-trustees, #flowchart-graduate-council, #flowchart-faculty-senate,#flowchart-advisory-councils'
        ).style('fill', '#800000');
    },
    'office-of-investments': function () {
        console.log('office of investments');
        d3.selectAll('#control-flowchart a rect').style('fill', '#643335');
        d3.selectAll(
            '#flowchart-office-of-investments, #flowchart-asset-management-firms'
        ).style('fill', '#800000');
    },
    president: function () {
        d3.selectAll('#control-flowchart a rect').style('fill', '#643335');
        d3.select('#flowchart-university-president').style('fill', '#800000');
    },
    donors: function () {
        drawFlowchart((show = ['control']), (hide = ['coi']));
        d3.selectAll('#control-flowchart a rect').style('fill', '#643335');
        d3.selectAll('#flowchart-donors').style('fill', '#800000');
    },
    conflicts: function () {
        d3.selectAll('#control-flowchart a rect').style('fill', '#643335');
        drawFlowchart((show = ['control', 'coi']));
    },
    'conflicts-detail': function () {
        showChart();
        d3.select('#chart-div').html(''); // clear previous chart
        traces = facetChart(coi_data);
        layout = createLayout(
            (title =
                'Payments to investment managers with conflicts of interest'),
            (caption =
                'Data on conflicts of interest was not required to be reported before <a href="https://www.irs.gov/pub/irs-prior/i990sl--2013.pdf">2013</a>.<br>Source: University of Chicago <a href="https://projects.propublica.org/nonprofits/organizations/362177139">IRS Form 990</a> filings')
        );
        Plotly.newPlot(
            'chart-div',
            traces,
            {
                ...layout,
                xaxis: {
                    showgrid: false,
                    showline: true,
                    showticklabels: true,
                    tickfont: {
                        size: axisFontSize
                    }
                },
                yaxis: {
                    showgrid: true,
                    showline: false,
                    showticklabels: true,
                    tickfont: {
                        size: axisFontSize
                    }
                },
                margin: {
                    l: isMobileLike ? 120 : 230,
                    r: isMobileLike ? 25 : 0,
                    b: isMobileLike ? 60 : 110
                },
                title: {
                    ...layout.title,
                    x: isMobileLike ? 0.08 : 0.26,
                    y: isMobileLike ? 0.78 : 0.9 // vertical position (1 = top, 0 = bottom)
                }
            },
            config
        );
    },
    conclusion: function () {
        d3.select('#chart-div').html(''); // clear previous chart
        hideChart();
    }
};

// -------- MAIN --------

var statements, sec, endowments, types_time, sankey_data, helper_text;

var isMobileLike = false;
var annotationFontSize,
    axisFontSize,
    bodyFontSize,
    subtitleFontSize,
    titleFontSize;

async function init() {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
    hideChart();

    isMobileLike = detectMobile();

    annotationFontSize = isMobileLike ? 9 : 16;
    axisFontSize = isMobileLike ? 10 : 20;
    bodyFontSize = isMobileLike ? 11 : 18;
    subtitleFontSize = isMobileLike ? 12 : 22;
    titleFontSize = isMobileLike ? 12 : 23;

    statements = await fetchData('financial-statement-2025.json');
    sec = await fetchData('sec-sectors-2025.json');
    endowments = await fetchData('largest-endowments-2024.json');
    types_time = await fetchData('types-over-time.json');
    sankey_data = await fetchData('sankey.json');
    helper_text = await fetchData('definitions.json');
    coi_data = await fetchData('conflicts-of-interest.json');

    // part I
    createWaypoint('what-is-endowment', (offset = '90%'));
    createWaypoint('tuition');
    createWaypoint('endowment');
    createWaypoint('restricted');
    createWaypoint('breakdown');

    // part II
    createWaypoint('compare-schools');
    createWaypoint('sec');
    createWaypoint('private-equities');

    // part III
    createWaypoint('control');
    createWaypoint('board-of-trustees');
    createWaypoint('office-of-investments');
    createWaypoint('president');
    createWaypoint('donors');
    createWaypoint('conflicts');
    createWaypoint('conflicts-detail');

    createWaypoint('conclusion', (offset = '90%'));
}

// when page is loaded, define custom JS
document.addEventListener('DOMContentLoaded', function () {
    init();
});
