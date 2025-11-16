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

    // console.log('grouped', groupedData);
    traces = [];
    console.log(unique.map((d) => colorbook[variable][d[variable]]));

    try {
        // construct plotly "dataframe"

        const formatThousands = d3.format(',.0f');

        if (variable === 'sector') {
            unique.forEach(function (val) {
                traces.push({
                    type: 'bar',
                    x: ['Data'],
                    y: [val['x']],
                    name: [val[variable]],
                    marker: {
                        color: colorbook[variable][val[variable]]
                    },
                    text: [
                        `${val[variable]}: \$${formatThousands(
                            val['x'] * 1000
                        )}`
                    ],
                    customdata:
                        'hoverinfo' in groupedData[0]
                            ? [val['hoverinfo']]
                            : ['none'],
                    hoverinfo: 'hoverinfo' in groupedData[0] ? 'text' : 'none',
                    hoverlabel: hoverlabel,
                    hovertemplate: hovertemplates[variable]
                });
            });
        } else {
            traces.push({
                type: 'pie',
                hole: 0.5,
                values: unique.map((d) => Math.round((d.x / total) * 100)),
                labels: unique.map((d) => d[variable]),
                marker: {
                    colors: unique.map((d) => colorbook[variable][d[variable]])
                },
                text: unique.map((d) => d[variable]),
                customdata:
                    'hoverinfo' in groupedData[0]
                        ? unique.map((d) => d['hoverinfo'])
                        : unique.map(() => ''),
                hoverinfo: 'hoverinfo' in groupedData[0] ? 'text' : 'none',
                hoverlabel: hoverlabel,
                hovertemplate: hovertemplates[variable]
            });
        }

        // console.log(traces);
        return traces;
    } catch (error) {
        console.error('Error processing data: ', error);
    }
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
function createLayout(title = '', caption = '', margin_r = 0) {
    return {
        title: {
            text: title,
            x: 0.03,
            // font: {
            //     size: 20
            // },
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
                y: -0.02, // move below the x-axis
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
            r: margin_r
        }
    };
}

function barChart(data) {
    const trace = {
        type: 'bar',
        orientation: 'h',
        y: data.map((d) => d.school),
        x: data.map((d) => d.endowment_dollars),
        name: data.map((d) => d.school),
        text: data.map((d) => d.school),
        // pad: 15,
        // thickness: 20,
        // hoverinfo: 'none',
        marker: {
            line: {
                color: '#d51d1dff',
                width: data.map((d) =>
                    d.school === 'University of Chicago' ? 5 : 0
                )
            },
            color: data.map((d) =>
                d.private === true ? '#800000' : 'rgb(193, 102, 34)'
            )
        }
    };

    return [trace];
}

// cite: translated from highcharts with chatgpt
function sankeyChart(div) {
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

    const trace = {
        type: 'sankey',
        orientation: 'h',
        node: {
            x: x,
            y: y,
            label: labels,
            // pad: 15,
            thickness: 20,
            // line: { color: 'black', width: 0.5 },
            hoverinfo: 'none',
            color: highlights[div]
        },
        link: {
            source: sources,
            target: targets,
            value: values,
            color: 'rgba(0,0,0,0.1)',
            hovertemplate: '%{target.label}: $%{value:.00f}M<extra></extra>'
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
function createTable(div, prev) {
    new Waypoint({
        element: document.getElementById(div),
        handler: function (direction) {
            if ((prev === 'none') & (direction === 'up')) {
                hideChart('#chart-div');
                return;
            }
            showChart();

            // if scrolling up then use previous firm
            const firm_name = direction == 'down' ? div : prev;

            const filtered = coi.filter(
                // first word when lowercased matches provided firm_name
                (d) => d.firm_name.split(' ')[0].toLowerCase() === firm_name
            );

            const skip_first_col = filtered.map(
                ({ firm_name, ...rest }) => rest
            );

            // Get column headers and values
            // const headers = Object.keys(skip_first_col[0]);
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
                    'Sources: University of Chicago <a href="https://projects.propublica.org/nonprofits/download-xml?object_id=202421349349306107">Tax Form 990 filing</a> for fiscal year 2023, Schedule L; Pitchbook'
                )
                .style('width', '100%')
                .style('margin-top', '15px')
                .attr('class', 'caption');

            // Insert the table into the specified div
            // d3.select('#table-div').append(tableHTML);
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

// TODO: hover define the sankey terms
// TODO: run through colorblind checker
// TODO: recategorized should match colors of before
// TODO: try to see if you can have the arrow label thing for stacked bar small bars
// TODO: indicate where stacked bar fits in the pie chart (could be in the text: this is $X of the $Y endowment or Z%)
// TODO: Top 5 companies that UChicago owns shares in,
// TODO: contextualize 990T is only a vague image because we dont have better information. explain what a management firm is and relationship to the funds as investment portfolios of unknown companies and unknown uchicago endowment distribution/amounts
// TODO: sourceS, specify which comes from where
// TODO: diversified -> unspecified or information not available
// TODO: translate table bullets to sentences. add information about PIMCO: X company based in Y, history, trustee info such as when they joined UChicago and when they joined the company

const hoverlabel = {
    bordercolor: '#f1f1f1', // border color
    font: {
        family: 'Playfair',
        size: 16,
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
    fund_type: 'none',
    recategorized:
        ' <br>    %{text}    <br>    %{customdata}    <br> <extra></extra>', // extra tag removes trace label; spaces needed for fake padding,
    sector: ' <br>    %{text}<br>    <b>Top five companies by<br>    UChicago-owned shares<br>    March 2025:</b> <br>%{customdata}<br> <extra></extra>' // extra tag removes trace label; spaces needed for fake padding
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
    }
};

const highlights = {
    tuition: [
        '#800000',
        '#800000',
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
        '#800000',
        '#800000'
    ],
    endowment: [
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
    ],
    restricted: [
        '#800000',
        '#d51d1dff',
        '#d51d1dff',
        '#d51d1dff',
        '#800000',
        '#800000',
        '#800000',
        '#800000',
        '#800000',
        '#d51d1dff',
        '#800000',
        '#800000',
        '#800000',
        '#800000',
        '#800000'
    ]
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
    'For clarity, assets from hospital services ($4.2 billion) are excluded. Net assets (total assets minus total liabilities) for FY24 were $245.9 million.<br>Source: <a href="https://mc-1b49d921-43a2-4264-88fd-647979-cdn-endpoint.azureedge.net/-/media/project/uchicago-tenant/intranet/fna/financial-services/accounting-and-treasury/audited-financial-statements/2022-2023-the-university-of-chicago-financial-statements.pdf?rev=b42148936ffe46d1a43b3c5f915e0edb&hash=F87C26EADBC74DC974DBB5A899324C1F">University of Chicago financial statement for fiscal year 2023</a>';
const statementCaption =
    'Source: <a href="https://mc-1b49d921-43a2-4264-88fd-647979-cdn-endpoint.azureedge.net/-/media/project/uchicago-tenant/intranet/fna/financial-services/accounting-and-treasury/audited-financial-statements/2022-2023-the-university-of-chicago-financial-statements.pdf?rev=b42148936ffe46d1a43b3c5f915e0edb&hash=F87C26EADBC74DC974DBB5A899324C1F">University of Chicago financial statement for fiscal year 2023</a>';

// ------------------ SEQUENCE OF ACTIONS ------------------

// this defines the sequence of actions in order
// calling createWaypoint will call each action depending on whether user is scrolling down (next action) or up (previous action)
const sequence = {
    first: function () {
        hideChart('#chart-div');
    },
    'what-is-endowment': function () {
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
            sankeyChart('tuition'),
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
    'what-is-it': function () {
        Plotly.newPlot(
            'chart-div',
            processData(statements, (variable = 'fund_type')),
            createLayout(
                (title = "Types of investments making up UChicago's endowment"),
                (caption = statementCaption)
            ),
            config
        );
    },
    breakdown: function () {
        Plotly.newPlot(
            'chart-div',
            processData(statements, (variable = 'recategorized')),
            createLayout(
                (title = 'Fund types (simplified)'),
                (caption = statementCaption)
            ),
            config
        );
    },
    'compare-schools': function () {
        Plotly.newPlot(
            'chart-div',
            barChart(endowments),
            createLayout(
                (title =
                    '20 largest college endowments in the U.S., Fiscal Year 2023'),
                (caption =
                    'Source: <a href="https://www.usnews.com/education/best-colleges/the-short-list-college/articles/universities-with-the-biggest-endowments">2025 U.S. News Best Colleges</a>')
            ),
            config
        );
    },
    sec: function () {
        showChart('#chart-div');
        Plotly.newPlot(
            'chart-div',
            processData(sec, (variable = 'sector')),
            createLayout(
                (title = 'Industry sectors'),
                (caption =
                    'Source: University of Chicago <a href="https://www.sec.gov/Archives/edgar/data/314957/000110465925045961/xslForm13F_X02/primary_doc.xml">SEC 13-F filing</a> for quarter ending March 2025'),
                (margin_r = 400)
            ),
            config
        );

        d3.selectAll('#flowchart').style('display', 'none');
    },
    // TODO: add title and source
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

    statements = await fetchData('financial-statement-2023.json');
    // console.log(statements);

    sec = await fetchData('sec-sectors-2025.json');
    // console.log(sec);

    coi = await fetchData('conflicts-of-interest-2023.json');
    // console.log(coi);

    endowments = await fetchData('largest-endowments-2023.json');
    console.log(endowments);

    // TODO: another one for endowment size over time
    createWaypoint('what-is-endowment');

    createWaypoint('endowment');

    createWaypoint('restricted');

    createWaypoint('what-is-it');

    createWaypoint('breakdown');

    createWaypoint('compare-schools');

    createWaypoint('sec');

    createTable('lake', (prev = 'none'));
    createTable('pimco', (prev = 'lake'));
    createTable('carlyle', (prev = 'pimco'));

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
