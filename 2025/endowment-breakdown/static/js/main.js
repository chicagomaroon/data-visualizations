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

    // add hoverinfo
    if (variable === 'recategorized') {
        // cite: copilot
        data.forEach(function (d) {
            d['hoverinfo'] = helper_text[d['recategorized']];
        });
    }

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
            x: 0.03,
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
                y: -0.05 - isMobileLike * 0.07, // move below the x-axis
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
            }
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
            b: isMobileLike ? 70 : 100
        },
        dragmode: 'pan'
    };
}

function donutChart(data) {
    groupedData = groupData(data, 'recategorized');

    // cite: copilot
    const total = groupedData
        .map((d) => d.amount_thousands)
        .reduce((acc, curr) => acc + curr, 0);

    trace = {
        type: 'pie',
        hole: 0.5,
        values: groupedData.map((d) => Math.round((d.x / total) * 100)),
        text: groupedData.map((d) => d.recategorized),
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
                helper_text[d.recategorized] +
                '    <br>    <extra></extra>'
        )
    };

    return [trace];
}

function lollipopChart(data) {
    const traces = [];

    for (const year of [2025, 2005]) {
        let subset = data.filter((d) => d.year === year);

        // Sort the subset by amount_thousands in descending order
        subset = subset.sort((a, b) => a.amount_thousands - b.amount_thousands);

        const total = subset.reduce(
            (acc, curr) => acc + curr.amount_thousands,
            0
        );
        traces.push({
            type: 'scatter',
            x: subset.map((d) => d.amount_thousands / total), // proportion
            y: subset.map((d) => d.recategorized),
            mode: 'markers',
            name: year,
            marker: {
                color: year > 2010 ? '#800000' : '#d51d1dff',
                opacity: year > 2010 ? 1 : 0.5,
                size: axisFontSize + 2
            },
            customdata: subset.map((d) => d.year),
            text: subset.map((d) => d.recategorized),
            hoverinfo: 'text',
            hovertemplate:
                ' <br>    %{x:.0%} of endowment    <br>    categorized as %{y} in %{customdata}    <br>    <extra></extra>' // extra tag removes
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
            x: groupedData.map((val) => val.x + 100000),
            y: groupedData.map((val) => val.y + 100000),
            name: groupedData.map((val) => val[variable]),
            marker: {
                size: groupedData.map(
                    (val) => val.amount_thousands / (isMobileLike ? 150 : 50)
                ),
                color: '#800000',
                opacity: 1
            },
            textfont: {
                color: groupedData.map((val) =>
                    val.amount_thousands < 3000 ? 'black' : 'white'
                ),
                size: bodyFontSize
            },
            text: groupedData.map((val) =>
                val.amount_thousands < 3000
                    ? val[variable]
                    : `${val[variable]}<br>\$${val.amount_display}`
            ),
            textposition: groupedData.map((val) =>
                val.amount_thousands < 3000 ? 'top center' : 'center center'
            ),
            customdata: groupedData.map(
                (val) =>
                    ' <br>    ' +
                    val[variable].replace('<br>', ' ').replace('- ', '') +
                    ': $' +
                    `${val.amount_display}    <br>` +
                    '<b>    Top five companies by    <br>    UChicago-owned shares    <br>    March 2025:</b>    <br>' +
                    val.hoverinfo +
                    '<br> <extra></extra>'
            ), // extra tag removes trace label; spaces needed for fake padding
            hoverinfo: 'text',
            hovertemplate: '%{customdata}'
        }
    ];
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
                d.school === 'University of Chicago' ? '#800000' : '#B46A55'
            )
        },
        textfont: {
            size: axisFontSize
        },
        customdata: data.map(
            (d) =>
                '<br /> <br />    ' +
                d.school +
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
        'what-is-endowment': x.map(() => '#B46A55'),
        tuition: sankey_data_filtered.map((d) =>
            d.to.includes('tuition') ? '#800000' : '#B46A55'
        ),
        endowment: sankey_data_filtered.map((d) =>
            d.to.includes('endowment') ? '#800000' : '#B46A55'
        ),
        restricted: sankey_data_filtered.map((d) =>
            d.to.includes('Restricted') || d.to == 'Private gifts'
                ? '#800000'
                : '#B46A55'
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
            hoverinfo: 'none',
            color: nodes_color_map[div]
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

function drawFlowchart(show = [], hide = []) {
    // make sure everything loads before returning
    Promise.all([
        d3.xml('static/chart.svg'),
        d3.xml('static/screen.svg'),
        d3.xml('static/coi.svg'),
        d3.xml('static/arrows.svg')
    ]).then(([controlChart, screenChart, coiChart, arrowChart]) => {
        // check that we don't already have the chart up
        if (d3.select('#control-flowchart').empty()) {
            d3.select('#chart-div').html(''); // clear previous chart

            d3.select('#chart-div').node().append(controlChart.documentElement);
            d3.select('#chart-div').node().append(screenChart.documentElement);
            d3.select('#chart-div').node().append(coiChart.documentElement);
            d3.select('#chart-div').node().append(arrowChart.documentElement);
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
            d3.selectAll('#arrows-flowchart')
                .attr('width', '100%')
                .attr('height', '41vh')
                .style('margin-top', '0');

            d3.selectAll('#coi-flowchart')
                .attr('width', '100%')
                .attr('height', '45vh')
                .style('margin-top', '3vh');
        }
    });
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

// TODO: add animation
// TODO: MOBILE ACCESSIBILITY
// TODO: data editor style review
// TODO: finish writingg
// TODO: hover define the sankey terms
// TODO: run through colorblind checker
// TODO: indicate where stacked bar fits in the pie chart (could be in the text: this is $X of the $Y endowment or Z%)
// TODO: Top 5 companies that UChicago owns shares in,
// TODO: contextualize 990T is only a vague image because we dont have better information. explain what a management firm is and relationship to the funds as investment portfolios of unknown companies and unknown uchicago endowment distribution/amounts
// TODO: diversified -> unspecified or information not available
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
        'Public equities<br>(stocks)': 'rgb(128, 0, 0)',
        'Private equities<br>(stocks)': 'rgb(193, 102, 34)',
        Bonds: 'rgb(138, 144, 69)',
        'Hedge funds': 'rgb(53, 14, 32)',
        Other: 'rgb(21, 95, 131)'
    }
};

const helper_text = {
    'Public equities (stocks)': 'DEFINITION',
    'Private equities (stocks)': 'DEFINITION',
    Bonds: 'DEFINITION',
    'Hedge funds': 'DEFINITION',
    Other: 'DEFINITION'
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
        layout = createLayout((title = sankeyTitle), (caption = sankeyCaption));
        showChart();
        Plotly.newPlot(
            'chart-div',
            sankeyChart('what-is-endowment'),
            {
                ...layout,
                width: isMobileLike ? 1000 : null
            },
            {
                ...config,
                responsive: false
            }
        );
    },
    tuition: function () {
        layout = createLayout((title = sankeyTitle), (caption = sankeyCaption));
        Plotly.newPlot(
            'chart-div',
            sankeyChart('tuition'),
            {
                ...layout,
                width: isMobileLike ? 1000 : null
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
        layout = createLayout((title = sankeyTitle), (caption = sankeyCaption));
        Plotly.newPlot(
            'chart-div',
            sankeyChart('endowment'),
            {
                ...layout,
                width: isMobileLike ? 1000 : null,
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
        layout = createLayout((title = sankeyTitle), (caption = sankeyCaption));
        d3.select('.plotly').style('margin-top', '0');
        Plotly.newPlot(
            'chart-div',
            sankeyChart('restricted'),
            {
                ...layout,
                width: isMobileLike ? 1000 : null
            },
            {
                ...config,
                responsive: false
            }
        );
    },
    'compare-schools': function () {
        d3.select('.plotly').style('margin-top', '0');
        layout = createLayout(
            (title =
                'Top 20 largest college endowments in the U.S., Fiscal Year 2023'),
            (caption =
                'Source: <a href="https://www.usnews.com/education/best-colleges/the-short-list-college/articles/universities-with-the-biggest-endowments">2025 U.S. News Best Colleges</a>'),
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
                    tickvals: [10e9, 20e9, 30e9, 40e9, 50e9, 60e9],
                    ticktext: ['$10B', '$20B', '$30B', '$40B', '$50B', '$60B'],
                    title: {
                        text: ''
                    }
                }
            },
            config
        );
    },
    breakdown: function () {
        layout = createLayout((title = null), (caption = statementCaption));
        d3.select('.plotly').style('margin-top', '-90px');
        Plotly.newPlot(
            'chart-div',
            donutChart(statements),
            {
                ...layout,
                margin: {
                    t: isMobileLike ? 80 : 150,
                    l: isMobileLike ? 40 : 0,
                    r: 20,
                    b: isMobileLike ? 20 : 60
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
                        text: 'Total in endowment<br>$11 billion',
                        x: 0.5,
                        y: 0.5
                    } // add title in center
                ]
            },
            config
        );
    },
    sec: function () {
        d3.select('#chart-div').html(''); // clear previous chart
        layout = createLayout(
            (title = 'Industry sectors'),
            (caption =
                'Source: University of Chicago <a href="https://www.sec.gov/Archives/edgar/data/314957/000110465925045961/xslForm13F_X02/primary_doc.xml">SEC 13-F filing</a> for quarter ending March 2025')
        );
        annotations = layout['annotations'];
        Plotly.newPlot(
            'chart-div',
            circleChart(sec, 'sector'),
            {
                ...layout,
                margin: {
                    l: isMobileLike ? 0 : 25,
                    r: isMobileLike ? 0 : 25,
                    b: isMobileLike ? 50 : 75
                },
                xaxis: {
                    scaleanchor: 'y',
                    scaleratio: 1,
                    showgrid: false,
                    showticks: false,
                    showticklabels: false,
                    fixedrange: true
                },
                yaxis: {
                    scaleanchor: 'x',
                    scaleratio: 1,
                    showgrid: false,
                    showticks: false,
                    showticklabels: false,
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
                        text: '  Total in endowment<br>$11B',
                        x: 50000,
                        y: 70000
                    } // add additional annotation
                ]
            },
            config
        );
    },
    'private-equities': function () {
        layout = createLayout(
            (title =
                'Change in fund types in the endowment in the last 20 years'),
            (caption =
                'Source: <a href="https://intranet.uchicago.edu/tools-and-resources/financial-resources/accounting-and-financial-reporting/financial-statements">University of Chicago financial statements</a>'),
            (showlegend = true)
        );
        Plotly.newPlot(
            'chart-div',
            lollipopChart(types_time),
            {
                ...layout,
                margin: {
                    l: isMobileLike ? 110 : 200,
                    r: isMobileLike ? 25 : 0,
                    b: isMobileLike ? 50 : 100,
                    t: isMobileLike ? 50 : 100
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
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        d3.selectAll(
            '#flowchart-board-of-trustees, #flowchart-graduate-council, #flowchart-faculty-senate,#flowchart-advisory-councils'
        ).style('fill', '#643335');
    },
    'office-of-investments': function () {
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        d3.selectAll(
            '#flowchart-office-of-investments, #flowchart-asset-management-firms'
        ).style('fill', '#643335');
    },
    president: function () {
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        d3.selectAll('#flowchart-university-president').style(
            'fill',
            '#643335'
        );
    },
    donors: function () {
        drawFlowchart((show = ['control']), (hide = ['coi']));
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        d3.selectAll('#flowchart-donors').style('fill', '#643335');
    },
    conflicts: function () {
        d3.selectAll('#control-flowchart a rect').style('fill', '#800000');
        drawFlowchart((show = ['coi']), (hide = ['screen', 'arrows']));
    },
    arrows: function () {
        showChart();
        drawFlowchart((show = ['control', 'coi', 'screen', 'arrows']));
    },
    conclusion: function () {
        d3.select('#chart-div').html(''); // clear previous chart
        hideChart();
    }
};

// -------- MAIN --------

var statements, sec, coi, endowments, types_time, sankey_data;

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
    subtitleFontSize = isMobileLike ? 11 : 18;
    titleFontSize = isMobileLike ? 12 : 20;

    statements = await fetchData('financial-statement-2025.json');
    sec = await fetchData('sec-sectors-2025.json');
    coi = await fetchData('conflicts-of-interest-2024.json');
    endowments = await fetchData('largest-endowments-2023.json');
    types_time = await fetchData('types-over-time.json');
    sankey_data = await fetchData('sankey.json');

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
    createWaypoint('arrows');

    createWaypoint('conclusion', (offset = '90%'));
}

// when page is loaded, define custom JS
document.addEventListener('DOMContentLoaded', function () {
    init();
});
