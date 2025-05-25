Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        '#FFA319',
        '#C16622',
        '#8F3931',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    title: {
        text: 'USG Spring Election Turnout Rate Over Time',
        style: { color: 'black' }
    },

    legend: {
        enabled: false
    },

    yAxis: {
        title: {
            text: 'Turnout Rate (% of undergrad. pop.)',
            style: { color: 'black' }
        },
        labels: {
            enabled: true,
            format: `{text}%`
        },
        plotLines: [
            {
                color: 'gray',
                fontColor: 'gray',
                width: 1,
                value: 73,
                label: {
                    text: '73% turnout (2016)',
                    align: 'center',
                    x: 10,
                    y: -5
                }
            },
            {
                color: 'gray',
                width: 1,
                value: 12,
                label: {
                    text: '12% turnout (2025)',
                    align: 'right',
                    x: -10,
                    y: 15
                }
            }
        ]
    },

    xAxis: {
        title: {
            text: 'Election Year',
            style: { color: 'black' }
        },
        breaks: [
            {
                from: 2009,
                to: 2013,
                breakSize: 0
            }
        ],
        tickPositions: [
            2006, 2007, 2008, 2009, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
            2021, 2022, 2023, 2024, 2025
        ],
        labels: {
            rotation: -30
        },
        plotBands: [
            {
                from: 2013,
                to: 2014,
                color: '#eeeeee',
                label: {
                    rotation: 90,
                    style: {
                        color: '#888888'
                    },
                    text: 'Data unavailable for 2010-2013',
                    verticalAlign: 'middle',
                    x: -4.2,
                    y: 0
                }
            }
        ]
    },

    plotOptions: {
        series: {
            pointStart: 2006,
            marker: {
                enabled: false
            },
            lineWidth: 3
        }
    },

    tooltip: {
        formatter: function () {
            return `<b>${this.y}%</b> turnout in <b>${this.key}</b>`;
        }
    },

    series: [
        {
            name: 'Turnout Rate',
            label: {
                enabled: false
            },
            data: [
                41,
                41,
                37,
                32,
                null,
                null,
                null,
                null,
                23,
                39,
                73,
                18,
                21,
                44,
                21,
                17,
                12,
                15,
                19,
                12
            ]
        }
    ]
});
