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
            x: isMobileLike ? 0.035 : 0.025,
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
                y: -0.05 - isMobileLike * 0.03, // move below the x-axis
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
                size: subtitleFontSize,
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
    groupedData = groupData(data, 'recategorized');

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
        hoverinfo: 'text',
        hovertemplate: groupedData.map(
            (d) =>
                '    <br>    ' +
                helper_text[d.recategorized.replaceAll('<br>', ' ')] +
                '    <br>    <extra></extra>'
        )
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

function circleChart(data, variable) {
    const groupedData = groupData(data, variable);

    // cite: d3 and copilot
    // Create a force simulation
    const simulation = d3
        .forceSimulation(groupedData)
        .force('charge', d3.forceManyBody().strength(-100)) // Repulsion between nodes
        .force(
            'collide',
            d3.forceCollide().radius((d) => d.amount_thousands) // Avoid overlapping nodes
        );

    // Run the simulation synchronously - otherwise weird thing with rendering order
    for (let i = 0; i < 5; i++) {
        simulation.tick();
    }
    traces = [
        {
            type: 'scatter',
            mode: 'markers+text',
            x: groupedData.map((val) => val.x),
            y: groupedData.map((val) => val.y),
            name: groupedData.map((val) => val[variable]),
            marker: {
                size: groupedData.map(
                    (val) => val.amount_thousands / (isMobileLike ? 400 : 200)
                ),
                color: '#800000',
                opacity: 1
            },
            textfont: {
                color: groupedData.map((val) =>
                    val.amount_thousands < 10000 ? 'black' : 'white'
                ),
                size: bodyFontSize
            },
            text: groupedData.map((val) =>
                val.amount_thousands < 10000
                    ? val[variable]
                    : `${val[variable]}<br>\$${formatThousands(
                          val.amount_thousands * 1000
                      )}`
            ),
            textposition: groupedData.map((val) =>
                val.amount_thousands < 10000 ? 'top center' : 'center center'
            ),
            customdata: groupedData.map(
                (val) =>
                    ' <br>    UChicago invested at least $' +
                    `${formatThousands(val.amount_thousands * 1000)}    <br>` +
                    '    in the <b>' +
                    val[variable].replace('<br>', ' ').replace('- ', '') +
                    '</b> sector    <br>    as of September 2025, including:    <br>    <br>' +
                    val.hoverinfo +
                    '<br> <extra></extra>'
            ), // extra tag removes trace label; spaces needed for fake padding
            hoverinfo: 'text',
            hovertemplate: '%{customdata}'
        }
    ];
    return traces;
}

function facetChart(data) {
    traces = [];

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
                        ? Math.sqrt(d.TransactionDollars) / 20
                        : 10
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
            hovertemplate: '%{customdata}'
        });
    });
    return traces;
}

function barChart(data) {
    // cite: copilot because groupby transform is not working for some reason
    // const privateData = data.filter((d) => d.private);
    // const publicData = data.filter((d) => !d.private);
    // const allSchools = data.map((d) => d.school);
    // const allData = { Private: privateData, Public: publicData };

    data = data.sort((a, b) => a.endowment_dollars - b.endowment_dollars);

    const traces = [];

    traces.push({
        type: 'bar',
        orientation: 'h',
        text: data.map((d) => d.school),
        y: data.map((d) => d.school),
        x: data.map((d) => d.endowment_dollars),
        textposition: isMobileLike ? 'outside' : 'inside',
        marker: {
            color: data.map((d) =>
                d.school === 'University of Chicago' ? '#800000' : '#BB7663'
            )
        },
        textfont: {
            size: axisFontSize,
            color: 'white'
        },
        customdata: data.map(
            (d) =>
                '<br /> <br />    ' +
                d.school.replace('Univ.', 'University') +
                ' endowment: $' +
                formatThousands(d.endowment_dollars) +
                '    <br /> <br /><extra></extra>'
        ),
        hovertemplate: '%{customdata}'
    });

    return traces;
}

// cite: translated from highcharts with chatgpt
function sankeyChart(div) {
    let sankey_data_filtered = sankey_data;
    // if (div === 'what-is-endowment') {
    //     sankey_data_filtered = sankey_data.filter((d) => d.x < 0.9);
    // }

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

    // console.log(
    //     labels.map((label) =>
    //         label.includes('endowment') ? label + '#DDDDDD' : '#EEEEEE'
    //     )
    // );

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
            hovertemplate: '%customdata'
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
    var url = info.text.match(/href="(.*)" /);
    // console.log(url[1])

    window.open(url[1], '_blank').focus();
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

// TODO: add legend to facet graph
// TODO: cite admin arguments
// TODO: cite moral responsibility section
// TODO: finish editing text and transfer to code
// TODO: get quote permissions
// TODO: get copyedits and transfor to code
// TODO: add animation between graphs maybe and on sankey
// TODO: hover define the sankey terms
// TODO: funds in trust + private categories are listed as externally managed
// TODO: Top 5 companies that UChicago owns shares in,
// TODO: contextualize 990T is only a vague image because we dont have better information. explain what a management firm is and relationship to the funds as investment portfolios of unknown companies and unknown uchicago endowment distribution/amounts
// TODO: translate table bullets to sentences. add information about PIMCO: X company based in Y, history, trustee info such as when they joined UChicago and when they joined the company

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
        'Private<br>equities<br>(stocks)': 'rgb(169, 67, 30)',
        Bonds: 'rgb(19, 48, 28)',
        'Hedge<br>funds': 'rgb(53, 14, 32)',
        Other: 'rgb(21, 95, 131)'
    }
};

const sankeyTitle = 'Revenue, Fiscal Year 2025';
const sankeyCaption =
    'For clarity, assets from hospital services ($4.7 billion) are excluded. Net assets (total assets minus total liabilities) for FY25 were $633.8 million.<br>Source: <a href="https://mc-1b49d921-43a2-4264-88fd-647979-cdn-endpoint.azureedge.net/-/media/project/uchicago-tenant/intranet/fna/financial-services/accounting-and-treasury/audited-financial-statements/2024-2025-the-university-of-chicago-financial-statements.pdf?rev=b42148936ffe46d1a43b3c5f915e0edb&hash=F87C26EADBC74DC974DBB5A899324C1F">University of Chicago financial statement for fiscal year 2025</a>';
const statementCaption =
    'Source: <a href="https://mc-1b49d921-43a2-4264-88fd-647979-cdn-endpoint.azureedge.net/-/media/project/uchicago-tenant/intranet/fna/financial-services/accounting-and-treasury/audited-financial-statements/2024-2025-the-university-of-chicago-financial-statements.pdf?rev=b42148936ffe46d1a43b3c5f915e0edb&hash=F87C26EADBC74DC974DBB5A899324C1F">University of Chicago financial statement for fiscal year 2025</a>';

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
                width: isMobileLike ? 700 : null
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
                width: isMobileLike ? 700 : null
            },
            {
                ...config,
                responsive: false
            }
        );

        // // Animate the last layer of nodes
        // const lastLayerIndices = sankey_data
        //     .map((d, i) => (d.x === 1 ? i : null))
        //     .filter((i) => i !== null);

        // const animationFrames = [];
        // for (let step = 0; step <= 10; step++) {
        //     const newX = x.map((val, i) =>
        //         lastLayerIndices.includes(i) ? val + step * 0.05 : val
        //     );
        //     animationFrames.push({
        //         data: [
        //             {
        //                 node: {
        //                     x: newX
        //                 }
        //             }
        //         ]
        //     });
        // }

        // Plotly.animate('chart-div', animationFrames, {
        //     frame: { duration: 500, redraw: true },
        //     transition: { duration: 300 }
        // });
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
                font: {
                    size: bodyFontSize,
                    family: 'Georgia',
                    color: sankey_data.map((d) =>
                        d.to.includes('endowment') ? '#000000' : '#DDDDDD'
                    )
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
                width: isMobileLike ? 700 : null
            },
            {
                ...config,
                responsive: false
            }
        );
    },
    'compare-schools': function () {
        const layout = createLayout(
            (title =
                'Top 20 largest college endowments in the U.S., Fiscal Year 2024'),
            (caption =
                'University systems consisting of multiple schools are excluded. Source: <a href="https://www.forbes.com/sites/michaeltnietzel/2025/02/12/college-endowments-saw-112-returns-in-fy-24-harvard-still-1/">College Endowments Saw 11.2% Return In FY 2024</a>'),
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
                    b: isMobileLike ? 50 : 150
                },
                xaxis: {
                    showgrid: true,
                    showline: true,
                    showticklabels: true,
                    fixedrange: true,
                    tickfont: {
                        size: axisFontSize
                    },
                    tickvals: [10e9, 20e9, 30e9, 40e9, 50e9],
                    ticktext: ['$10B', '$20B', '$30B', '$40B', '$50B'],
                    title: {
                        text: ''
                    },
                    range: [0, 60e9]
                }
            },
            config
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
                    l: isMobileLike ? 20 : 0,
                    r: isMobileLike ? 0 : 20,
                    b: isMobileLike ? 45 : 85
                },
                autosize: isMobileLike ? false : true,
                width: isMobileLike ? 390 : null,
                annotations: [
                    layout['annotations'][0], // keep caption
                    {
                        font: {
                            size: titleFontSize
                        },
                        showarrow: false,
                        text: 'Total in endowment<br>$10.9 billion',
                        x: 0.5,
                        y: 0.5
                    } // add title in center
                ]
            },
            config
        );
    },
    sec: function () {
        d3.select('.plotly').style('margin-top', '0px');
        const layout = createLayout(
            (title =
                'Domestic industries invested in by the University, with known amounts'),
            (caption =
                'Source: University of Chicago <a href="https://www.sec.gov/Archives/edgar/data/314957/000110465925107518/infotable.xml">SEC 13-F filing</a> for quarter ending September 30, 2025')
        );
        annotations = layout['annotations'];
        Plotly.newPlot(
            'chart-div',
            circleChart(sec, 'sector'),
            {
                ...layout,
                margin: {
                    l: isMobileLike ? 15 : 25,
                    r: isMobileLike ? 20 : 25,
                    b: isMobileLike ? 40 : 75
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
                    fixedrange: true
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
                        x: -160000,
                        y: -80000
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
            arrowsize: 1.5,
            arrowwidth: 1,
            arrowcolor: '#BB7663',
            standoff: 15
        }));

        var layout = createLayout(
            (title =
                'Change in proportion of endowment by asset type, 2005-2025'),
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
                    l: isMobileLike ? 110 : 200,
                    r: isMobileLike ? 25 : 0,
                    b: isMobileLike ? 40 : 100
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
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
    },
    'board-of-trustees': function () {
        console.log('board of trustees');
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        d3.selectAll(
            '#flowchart-board-of-trustees, #flowchart-graduate-council, #flowchart-faculty-senate,#flowchart-advisory-councils'
        ).style('fill', '#643335');
    },
    'office-of-investments': function () {
        console.log('office of investments');
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        d3.selectAll(
            '#flowchart-office-of-investments, #flowchart-asset-management-firms'
        ).style('fill', '#643335');
    },
    president: function () {
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        d3.select('#flowchart-university-president').style('fill', '#643335');
    },
    donors: function () {
        drawFlowchart((show = ['control']), (hide = ['coi']));
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        d3.selectAll('#flowchart-donors').style('fill', '#643335');
    },
    conflicts: function () {
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        drawFlowchart((show = ['control', 'coi']));
    },
    'conflicts-detail': function () {
        showChart();
        d3.select('#chart-div').html(''); // clear previous chart
        traces = facetChart(coi_data);
        console.log(traces);
        layout = createLayout(
            (title =
                'Payments to investment managers with conflicts of interest'),
            (caption =
                'Source: University of Chicago <a href="https://projects.propublica.org/nonprofits/organizations/362177139">IRS Form 990</a> filings')
        );
        Plotly.newPlot(
            'chart-div',
            traces,
            {
                ...layout,
                // grid: {
                //     rows: traces.length,
                //     columns: 1,
                //     pattern: 'independent',
                //     roworder: 'bottom to top'
                // },
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
                    l: isMobileLike ? 50 : 200,
                    r: isMobileLike ? 25 : 0
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
    // window.onbeforeunload = function () {
    //     window.scrollTo(0, 0);
    // };
    // hideChart();

    isMobileLike = detectMobile();

    annotationFontSize = isMobileLike ? 8 : 12;
    axisFontSize = isMobileLike ? 9 : 14;
    bodyFontSize = isMobileLike ? 10 : 16;
    subtitleFontSize = isMobileLike ? 11 : 17;
    titleFontSize = isMobileLike ? 12 : 20;

    statements = await fetchData('financial-statement-2025.json');
    sec = await fetchData('sec-sectors-2025.json');
    endowments = await fetchData('largest-endowments-2023.json');
    types_time = await fetchData('types-over-time.json');
    sankey_data = await fetchData('sankey.json');
    helper_text = await fetchData('definitions.json');
    coi_data = await fetchData('conflicts-of-interest.json');

    // part I
    createWaypoint('what-is-endowment');
    createWaypoint('tuition');
    createWaypoint('endowment');
    createWaypoint('restricted');
    createWaypoint('compare-schools');

    // part II
    createWaypoint('breakdown');
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
