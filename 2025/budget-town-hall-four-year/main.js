// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    },
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        // '#FFA319',
        // '#C16622',
        // '#8F3931',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    title: {
        text: 'Four-Year Plan to Slow Expense Growth and Increase Revenue Growth',
        align: 'center'
    },

    // subtitle: {
    //     text: 'Administration plans to increase',
    //     align: 'center',
    //     style: {
    //         fontSize: '15px'
    //     }
    // },

    tooltip: {
        valueDecimals: 1,
        valuePrefix: '$',
        valueSuffix: 'B'
    },

    accessibility: {
        valuePrefix: '$',
        valueSuffix: 'B'
    },

    legend: {
        enabled: false
    },
    
    plotOptions: {
        series: {
            lineWidth: 3,
            states: {
                hover: {
                    lineWidth: 5
                }
            }
        },
        line: {
            marker: {
                enabled: false
            }
        }
    },

    xAxis: {
        // https://www.highcharts.com/docs/chart-concepts/plot-bands-and-plot-lines
        plotBands: [{
            color: '#fefefe', // Color value
            from: 2025, // Start of the plot band
            to: 2028 // End of the plot band
        }],
    },

    yAxis: {
        labels: {
            format: '${text}B',
            style: {
                fontSize: '16px'
            }
        },
        showFirstLabel: false,
        showLastLabel: false,
        title: {
            enabled: false
        },
        tickPositions: [1.2, 1.5, 2, 2.5, 3, 3.5, 4, 4.2]
    },

    series: [
        {
            name: 'Revenue',
            data: [
                [2016, 2.1],
                [2017, 2.2],
                [2018, 2.3],
                [2019, 2.4],
                [2020, 2.4],
                [2021, 2.5],
                [2022, 2.75],
                [2023, 2.8],
                [2024, 3],
                [2025, 3.25],
                [2026, 3.4],
                [2027, 3.6],
                [2028, 3.8]
            ],
            label: {
                enabled: true,
                style: {
                    fontSize: '17px'
                }
            },
        },
        {
            name: 'Operating Expenses',
            data: [
                [2016, 2.25],
                [2017, 2.35],
                [2018, 2.5],
                [2019, 2.55],
                [2020, 2.6],
                [2021, 2.5],
                [2022, 2.8],
                [2023, 3.1],
                [2024, 3.3],
                [2025, 3.45],
                [2026, 3.6],
                [2027, 3.7],
                [2028, 3.8]
            ],
            label: {
                enabled: true,
                style: {
                    fontSize: '17px'
                }
            }
        }
    ]
});
