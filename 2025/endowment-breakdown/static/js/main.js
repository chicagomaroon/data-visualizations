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
function createLayout(
    title = '',
    caption = '',
    margin = {
        l: 25,
        r: 0,
        b: 100
    },
    showlegend = false,
    xaxis = {
        showgrid: false,
        showline: false,
        showticklabels: false,
        tickfont: {
            size: 14
        }
    },
    yaxis = {
        showgrid: false,
        showline: false,
        showticklabels: false,
        ticktext: 'text',
        tickfont: {
            size: 14
        }
    }
) {
    return {
        title: {
            text: title,
            x: 0.03,
            font: {
                size: 20
            },
            subtitle: {
                text: subtitle,
                font: {
                    size: 14
                }
            }
        },
        annotations: [
            {
                text: caption,
                xref: 'paper',
                yref: 'paper',
                x: 0,
                y: 0 - margin['b'] / 2000, // move below the x-axis
                showarrow: false,
                xanchor: 'left',
                yanchor: 'top',
                font: { size: 12, color: 'gray' },
                align: 'right'
            }
        ],
        barmode: 'stack',
        font: {
            family: 'Georgia'
        },
        xaxis: xaxis,
        yaxis: yaxis,
        hovermode: 'closest',
        hoverlabel: {
            bgcolor: 'white'
        },
        showlegend: showlegend,
        legend: {
            x: 0.9, // Position the legend inside the graph (horizontal position)
            y: 0.9, // Position the legend inside the graph (vertical position)
            xanchor: 'center', // Anchor the legend horizontally at its center
            yanchor: 'top' // Anchor the legend vertically at the top
        },
        margin: margin
    };
}

function donutChart(data, variable) {
    groupedData = groupData(data, variable);

    // cite: copilot
    const total = groupedData
        .map((d) => d.amount_thousands)
        .reduce((acc, curr) => acc + curr, 0);

    trace = {
        type: 'pie',
        hole: 0.5,
        values: groupedData.map((d) => Math.round((d.x / total) * 100)),
        labels: groupedData.map((d) => d[variable]),
        marker: {
            colors: groupedData.map((d) => colorbook[variable][d[variable]]),
            line: {
                color: 'white',
                width: 1
            }
        },
        textfont: {
            size: 14
        },
        text: groupedData.map((d) => d[variable]),
        customdata:
            'hoverinfo' in groupedData[0]
                ? groupedData.map((d) => d['hoverinfo'])
                : groupedData.map((d) => '$' + formatThousands(d['x'] * 1000)),
        hoverinfo: 'text',
        hoverlabel: hoverlabel,
        hovertemplate: hovertemplates[variable]
    };

    return [trace];
}

function lollipopChart(data) {
    const traces = [];

    for (const year of [2025, 2005]) {
        console.log(year);
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
                size: 15
            },
            customdata: subset.map((d) => d.year),
            text: subset.map((d) => d.recategorized),
            hoverinfo: 'text',
            hoverlabel: hoverlabel,
            hovertemplate:
                ' <br>    %{x:.0%} of endowment    <br>    categorized as %{y} in %{customdata}    <br>    <extra></extra>' // extra tag removes
        });
    }

    return traces;
}

function circleChart(data, variable) {
    const groupedData = groupData(data, variable);

    // cite: d3 and copilot
    // Features of the forces applied to the nodes:
    // Create a force simulation

    groupedData.forEach((d) => {
        d.x = 1000000;
        d.y = 1000000;
    });

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
                size: groupedData.map((val) => val.amount_thousands / 50),
                color: groupedData.map(
                    (val) => colorbook[variable][val[variable]]
                ),
                opacity: 1
            },
            paper_bgcolor: 'rgba(187, 13, 13,1)',
            textfont: { color: 'white', line: { color: 'black' } },
            text: groupedData.map(
                (val) =>
                    `${val[variable]}<br>\$${d3.format(',.1f')(
                        val.amount_thousands / 1000
                    )}M`
            ),
            customdata: groupedData.map(
                (val) =>
                    ' <br>    ' +
                    val[variable] +
                    ': $' +
                    `${formatThousands(val.amount_thousands)}<br>` +
                    '<b>Top five companies by<br>    UChicago-owned shares<br>    March 2025:</b> <br>' +
                    val.hoverinfo +
                    '<br> <extra></extra>'
            ), // extra tag removes trace label; spaces needed for fake padding
            hoverinfo: 'text',
            hoverlabel: hoverlabel,
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
        // name: key,
        // marker: { color: key === 'Private' ? '#800000' : '#B46A55' },
        marker: {
            color: data.map((d) =>
                d.school === 'University of Chicago' ? '#800000' : '#B46A55'
            )
        },
        hoverlabel: hoverlabel,
        hovertemplate:
            '<br /> <br />    %{y} endowment:    <br />    $%{x:,.0f}    <br /> <br /><extra></extra>'
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
        (d) => '<b>' + d.to + '</b><br>$' + d.amount + 'M'
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
            value: sankey_data_filtered.map((d) => d.amount),
            hoverinfo: 'none',
            color: links_color_map[div]
        }
    };

    return [trace];
}

function hideChart(div = '#chart-div') {
    d3.select(div)
        .transition()
        .duration(300)
        .style('opacity', 0)
        .style('display', 'none');
}

function showChart(div = '#chart-div') {
    d3.selectAll(div).style('display', 'block');
    d3.selectAll(div).transition().duration(300).style('opacity', 1);
}

// cite: copilot
function createTable(firm_name) {
    const filtered = coi.filter(
        // first word when lowercased matches provided firm_name
        (d) => d.firm_name.split(' ')[0].toLowerCase() === firm_name
    );

    const skip_first_col = filtered.map(({ firm_name, ...rest }) => rest);

    // Get column headers and values
    const rows = skip_first_col.map((obj) => Object.values(obj));
    const full_name = filtered[0]['firm_name'];

    // Generate the HTML table
    chartDiv = document.getElementById('chart-div');
    chartDiv.innerHTML = '';

    d3.select('#chart-div')
        .append('div')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center')
        .style('height', '100%')
        .style('margin', '30px')
        .attr('id', 'table-div');

    // table title
    d3.select('#table-div')
        .style('display', 'flex') // Use flexbox for layout
        .style('flex-direction', 'column') // Stack children vertically
        .append('h3')
        .text(
            firm_name === 'carlyle'
                ? `Top ${rows.length} out of ??? funds managed by ${full_name}`
                : `Funds managed by ${full_name}`
        )
        .style('text-align', 'center')
        .style('font-family', 'Georgia, serif')
        .style('margin-bottom', '20px');

    // table
    const table = d3
        .select('#table-div')
        .append('table')
        .style('width', '100%')
        .style('border-collapse', 'collapse')
        .attr('border', 1);

    // table header
    const thead = table.append('thead');
    const headerRow = thead.append('tr');
    headerRow
        .selectAll('th')
        .data(['Fund name', 'Industry', 'Regions'])
        .enter()
        .append('th')
        .text((d) => d);

    // table body
    const tbody = table.append('tbody');
    rows.forEach((row) => {
        const tr = tbody.append('tr');
        tr.selectAll('td')
            .data(row)
            .enter()
            .append('td')
            .text((d) => d);
    });

    // Select the first column and give it a class
    d3.select('#table-div')
        .selectAll('tr') // Select all rows
        .select('td:first-child') // Select the first <td> in each row
        .attr('class', 'first-column'); // Add the class "first-column"

    // table footnote
    d3.select('#table-div')
        .append('figcaption')
        .html(
            'Sources: University of Chicago <a href="https://projects.propublica.org/nonprofits/download-xml?object_id=202421349349306107">IRS Form 990 filing</a> for fiscal year 2024, Schedule L; Pitchbook'
        )
        .style('width', '100%')
        .style('margin-top', '15px')
        .attr('class', 'caption');
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

const formatThousands = d3.format(',.0f');

// ------- CONSTANTS ------

// TODO: add animation
// TODO: why are sankey hovers transparent
// TODO: MOBILE ACCESSIBILITY
// TODO: data editor style review
// TODO: finish writingg
// TODO: round amounts for sector graph (approximate amounts)
// TODO: line break for long captions?
// TODO: hover define the sankey terms
// TODO: run through colorblind checker
// TODO: recategorized should match colors of before
// TODO: try to see if you can have the arrow label thing for stacked bar small bars
// TODO: indicate where stacked bar fits in the pie chart (could be in the text: this is $X of the $Y endowment or Z%)
// TODO: Top 5 companies that UChicago owns shares in,
// TODO: contextualize 990T is only a vague image because we dont have better information. explain what a management firm is and relationship to the funds as investment portfolios of unknown companies and unknown uchicago endowment distribution/amounts
// TODO: diversified -> unspecified or information not available
// TODO: translate table bullets to sentences. add information about PIMCO: X company based in Y, history, trustee info such as when they joined UChicago and when they joined the company

const hoverlabel = {
    bordercolor: '#f1f1f1', // border color
    bgcolor: 'white',
    opacity: 1,
    alpha: 1,
    font: {
        family: 'Playfair',
        size: 14,
        color: 'black' // text color
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
    recategorized:
        ' <br>    %{text}    <br>    %{customdata}    <br> <extra></extra>', // extra tag removes trace label; spaces needed for fake padding,
    lollipopChart:
        ' <br>    %{x:.0%} of endowment    <br>    categorized as %{y} in %{customdata}    <br>    <extra></extra>' // extra tag removes
};

const colorbook = {
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

const sankeyTitle = 'Revenue, Fiscal Year 2024';
const sankeyCaption =
    'For clarity, assets from hospital services ($4.2 billion) are excluded. Net assets (total assets minus total liabilities) for FY24 were $245.9 million.<br>Source: <a href="https://mc-1b49d921-43a2-4264-88fd-647979-cdn-endpoint.azureedge.net/-/media/project/uchicago-tenant/intranet/fna/financial-services/accounting-and-treasury/audited-financial-statements/2024-2025-the-university-of-chicago-financial-statements.pdf?rev=b42148936ffe46d1a43b3c5f915e0edb&hash=F87C26EADBC74DC974DBB5A899324C1F">University of Chicago financial statement for fiscal year 2025</a>';
const statementCaption =
    'Source: <a href="https://mc-1b49d921-43a2-4264-88fd-647979-cdn-endpoint.azureedge.net/-/media/project/uchicago-tenant/intranet/fna/financial-services/accounting-and-treasury/audited-financial-statements/2024-2025-the-university-of-chicago-financial-statements.pdf?rev=b42148936ffe46d1a43b3c5f915e0edb&hash=F87C26EADBC74DC974DBB5A899324C1F">University of Chicago financial statement for fiscal year 2025</a>';

// ------------------ SEQUENCE OF ACTIONS ------------------

// this defines the sequence of actions in order
// calling createWaypoint will call each action depending on whether user is scrolling down (next action) or up (previous action)
const sequence = {
    first: function () {
        hideChart('#chart-div');
    },
    // 'what-is-endowment': function () {
    //     showChart('#chart-div');

    //     Plotly.newPlot(
    //         'chart-div',
    //         lineChart(),
    //         createLayout((title = sankeyTitle), (caption = sankeyCaption)),
    //         config
    //     );
    // },
    tuition: function () {
        showChart('#chart-div');
        Plotly.newPlot(
            'chart-div',
            sankeyChart('tuition'),
            createLayout((title = sankeyTitle), (caption = sankeyCaption)),
            config
        );
    },
    endowment: function () {
        Plotly.newPlot(
            'chart-div',
            sankeyChart('endowment'),
            createLayout((title = sankeyTitle), (caption = sankeyCaption)),
            config
        );
    },
    restricted: function () {
        Plotly.newPlot(
            'chart-div',
            sankeyChart('restricted'),
            createLayout((title = sankeyTitle), (caption = sankeyCaption)),
            config
        );
    },
    breakdown: function () {
        layout = createLayout((title = ''), (caption = statementCaption));
        Plotly.newPlot(
            'chart-div',
            donutChart(statements, 'recategorized'),
            {
                ...layout,
                annotations: [
                    {
                        font: {
                            size: 20
                        },
                        showarrow: false,
                        text: 'Total in endowment<br>$11 billion',
                        x: 0.5,
                        y: 0.5
                    }
                ]
            },
            config
        );
    },
    'compare-schools': function () {
        Plotly.newPlot(
            'chart-div',
            barChart(endowments),
            createLayout(
                (title =
                    'Top 20 largest college endowments in the U.S., Fiscal Year 2023'),
                (caption =
                    'Source: <a href="https://www.usnews.com/education/best-colleges/the-short-list-college/articles/universities-with-the-biggest-endowments">2025 U.S. News Best Colleges</a>'),
                (margin = {
                    l: 25,
                    r: 0,
                    b: 150
                }),
                (showlegend = false),
                (xaxis = {
                    showgrid: true,
                    showline: true,
                    showticklabels: true,
                    tickfont: {
                        size: 14
                    },
                    tickvals: [10e9, 20e9, 30e9, 40e9, 50e9],
                    ticktext: ['$10B', '$20B', '$30B', '$40B', '$50B'],
                    title: {
                        text: ''
                    }
                })
            ),
            config
        );
    },
    amnesty: function () {
        Plotly.newPlot(
            'chart-div',
            lollipopChart(types_time),
            createLayout(
                (title =
                    'Change in fund types in the endowment in the last 20 years'),
                (caption =
                    'Source: <a href="https://intranet.uchicago.edu/tools-and-resources/financial-resources/accounting-and-financial-reporting/financial-statements">University of Chicago financial statements</a>'),
                (margin = {
                    l: 200,
                    r: 0,
                    b: 100
                }),
                (showlegend = true),
                (xaxis = {
                    range: [0.01, 1],
                    tickformat: '.0%',
                    ticks: 'outside',
                    tickwidth: 2,
                    showgrid: false,
                    showline: true,
                    showticklabels: true,
                    tickfont: {
                        size: 14
                    },
                    title: {
                        text: ''
                    }
                }),
                (yaxis = {
                    showgrid: true,
                    showline: false,
                    showticklabels: true
                })
            ),
            config
        );
    },
    sec: function () {
        layout = createLayout(
            (title = 'Industry sectors'),
            (caption =
                'Source: University of Chicago <a href="https://www.sec.gov/Archives/edgar/data/314957/000110465925045961/xslForm13F_X02/primary_doc.xml">SEC 13-F filing</a> for quarter ending March 2025'),
            (margin = {
                l: 25,
                r: 25,
                b: 75
            })
        );
        Plotly.newPlot(
            'chart-div',
            circleChart(sec, 'sector'),
            { ...layout, plot_bgcolor: 'rgba(187, 13, 13,1)' },
            config
        );
    },
    // TODO: let's do a summary instead of just 1 year?
    lake: function () {
        createTable('lake');
    },
    pimco: function () {
        createTable('pimco');
    },
    carlyle: function () {
        hideChart('#flowchart');
        showChart('#chart-div');

        createTable('carlyle');
    },
    control: function () {
        hideChart('#chart-div');
        showChart('#flowchart');

        d3.select('#flowchart-trustees').style('fill', '#800000');
        d3.select('#flowchart-graduate').style('fill', '#800000');
        d3.select('#flowchart-faculty').style('fill', '#800000');
        d3.select('#flowchart-advisory').style('fill', '#800000');
    },
    'board-of-trustees': function () {
        d3.select('#flowchart-trustees').style('fill', '#d51d1dff');
        d3.select('#flowchart-graduate').style('fill', '#d51d1dff');
        d3.select('#flowchart-faculty').style('fill', '#d51d1dff');
        d3.select('#flowchart-advisory').style('fill', '#d51d1dff');

        d3.select('#flowchart-office').style('fill', '#800000');
        d3.select('#flowchart-firm').style('fill', '#800000');
    },
    'office-of-investments': function () {
        d3.select('#flowchart-office').style('fill', '#d51d1dff');
        d3.select('#flowchart-firm').style('fill', '#d51d1dff');

        d3.select('#flowchart-trustees').style('fill', '#800000');
        d3.select('#flowchart-graduate').style('fill', '#800000');
        d3.select('#flowchart-faculty').style('fill', '#800000');
        d3.select('#flowchart-advisory').style('fill', '#800000');
        d3.select('#flowchart-president').style('fill', '#800000');
    },
    president: function () {
        d3.select('#flowchart-president').style('fill', '#d51d1dff');

        d3.select('#flowchart-office').style('fill', '#800000');
        d3.select('#flowchart-firm').style('fill', '#800000');
        d3.select('#flowchart-donors').style('fill', '#800000');
    },
    donors: function () {
        showChart('#flowchart');

        d3.select('#flowchart-donors').style('fill', '#d51d1dff');

        d3.select('#flowchart-president').style('fill', '#800000');
    },
    conclusion: function () {
        hideChart('#flowchart');
    }
};

// -------- MAIN --------
var data;

async function init() {
    // window.onbeforeunload = function () {
    //     window.scrollTo(0, 0);
    // };
    // hideChart((all = true));

    statements = await fetchData('financial-statement-2025.json');
    // console.log(statements);

    sec = await fetchData('sec-sectors-2025.json');
    // console.log(sec);

    coi = await fetchData('conflicts-of-interest-2024.json');
    // console.log(coi);

    endowments = await fetchData('largest-endowments-2023.json');

    types_time = await fetchData('types-over-time.json');
    // console.log('types over time', types_time);

    // TODO: another one for endowment size over time
    // createWaypoint('what-is-endowment');

    createWaypoint('tuition');
    createWaypoint('endowment');
    createWaypoint('restricted');

    createWaypoint('breakdown');
    createWaypoint('compare-schools');
    createWaypoint('amnesty');

    createWaypoint('sec');
    createWaypoint('lake');
    createWaypoint('pimco');
    createWaypoint('carlyle');

    createWaypoint('control');
    createWaypoint('board-of-trustees');
    createWaypoint('office-of-investments');
    createWaypoint('president');
    createWaypoint('donors');

    createWaypoint('conclusion', (offset = '90%'));
}

// when page is loaded, define custom JS
document.addEventListener('DOMContentLoaded', function () {
    init();
});
