// For API and chart documentation please look here:
// https://www.highcharts.com/demo

const data = [
    ['2015-04-01', 1],
    ['2015-05-01', 2],
    ['2015-09-01', 5],
    ['2015-10-01', 6],
    ['2015-11-01', 7],
    ['2015-12-01', 9],
    ['2016-03-01', 11],
    ['2016-04-01', 12],
    ['2016-05-01', 14],
    ['2016-06-01', 15],
    ['2016-08-01', 17],
    ['2016-09-01', 19],
    ['2016-10-01', 21],
    ['2017-02-01', 22],
    ['2017-03-01', 23],
    ['2017-05-01', 26],
    ['2017-06-01', 27],
    ['2017-08-01', 28],
    ['2017-10-01', 30],
    ['2017-12-01', 31],
    ['2018-01-01', 34],
    ['2018-02-01', 35],
    ['2018-04-01', 37],
    ['2018-05-01', 42],
    ['2018-06-01', 44],
    ['2018-07-01', 46],
    ['2018-08-01', 47],
    ['2018-09-01', 48],
    ['2018-10-01', 51],
    ['2018-11-01', 54],
    ['2018-12-01', 56],
    ['2019-01-01', 57],
    ['2019-02-01', 59],
    ['2019-03-01', 61],
    ['2019-04-01', 64],
    ['2019-06-01', 66],
    ['2019-07-01', 67],
    ['2019-09-01', 68],
    ['2019-11-01', 69],
    ['2020-01-01', 70],
    ['2020-02-01', 71],
    ['2020-04-01', 72],
    ['2020-06-01', 74],
    ['2020-08-01', 77],
    ['2020-10-01', 78],
    ['2020-12-01', 79],
    ['2021-03-01', 80],
    ['2021-06-01', 81],
    ['2021-07-01', 82],
    ['2021-09-01', 83],
    ['2022-02-01', 84],
    ['2022-04-01', 86],
    ['2022-05-01', 88],
    ['2022-06-01', 90],
    ['2022-07-01', 92],
    ['2022-08-01', 93],
    ['2022-11-01', 96],
    ['2022-12-01', 97],
    ['2023-01-01', 98],
    ['2023-02-01', 99],
    ['2023-03-01', 102],
    ['2023-06-01', 103],
    ['2023-09-01', 104],
    ['2023-12-01', 105],
    ['2024-01-01', 106],
    ['2024-02-01', 108],
    ['2024-05-01', 110],
    ['2024-08-01', 111],
    ['2024-12-01', 112]
];

Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000'],

    chart: {
        type: 'spline'
    },
    title: {
        text: 'Adoption of Documents Modeled After Chicago Principles',
        align: 'center'
    },
    subtitle: {
        text: 'Over 110 universities across the country have adopted similar documents since 2016.',
        align: 'center',
        style: {
            fontSize: '15px'
        }
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            year: '%Y'
        }
    },

    yAxis: {
        title: {
            text: 'Number of schools'
        },
        min: 0
    },
    plotOptions: {
        spline: {
            lineWidth: 7,
            states: {
                hover: {
                    lineWidth: 8
                }
            },
            marker: {
                enabled: false
            },
            label: {
                enabled: false
            }
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        // valuePrefix: '$',
        xDateFormat: '%b %Y'
    },
    annotations: [
        {
            draggable: '',
            labelOptions: {
                borderRadius: 0,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderWidth: 0,
                borderColor: '#AAA'
            },
            shapes: [
                {
                    type: 'path',
                    points: [
                        {
                            xAxis: 0,
                            yAxis: 0,
                            x:
                                new Date(2016, 5, 1).getTime() -
                                30 * 24 * 3600 * 1000, // 1 month earlier
                            y: 30
                        },
                        {
                            xAxis: 0,
                            yAxis: 0,
                            x: new Date(2016, 5, 1).getTime(),
                            y: 18
                        }
                    ],
                    markerEnd: 'arrow'
                },
                {
                    type: 'path',
                    points: [
                        {
                            xAxis: 0,
                            yAxis: 0,
                            x:
                                new Date(2016, 8, 1).getTime() +
                                6 * 30 * 24 * 3600 * 1000, // 1 month earlier
                            y: 13
                        },
                        {
                            xAxis: 0,
                            yAxis: 0,
                            x: new Date(2016, 10, 1).getTime(),
                            y: 18
                        }
                    ],
                    markerEnd: 'arrow'
                },
                {
                    type: 'path',
                    points: [
                        {
                            xAxis: 0,
                            yAxis: 0,
                            x:
                                new Date(2022, 5, 1).getTime() -
                                8 * 30 * 24 * 3600 * 1000, // 1 month earlier
                            y: 95
                        },
                        {
                            xAxis: 0,
                            yAxis: 0,
                            x: new Date(2022, 2, 1).getTime(),
                            y: 88
                        }
                    ],
                    markerEnd: 'arrow'
                },
                {
                    type: 'path',
                    points: [
                        {
                            xAxis: 0,
                            yAxis: 0,
                            x: new Date(2024, 8, 1).getTime(),
                            y: 93
                        },
                        {
                            xAxis: 0,
                            yAxis: 0,
                            x: new Date(2024, 8, 1).getTime(),
                            y: 108
                        }
                    ],
                    markerEnd: 'arrow'
                }
            ],
            labels: [
                {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: new Date(2016, 5, 1).getTime(),
                        y: 25
                    },
                    style: {
                        fontSize: '14px'
                    },
                    text: 'Claremont McKenna<br>Adoption'
                },
                {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: new Date(2018, 2, 1).getTime(),
                        y: 1
                    },
                    style: {
                        fontSize: '14px'
                    },
                    text: 'Vanderbilt Adoption'
                },
                {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: new Date(2021, 1, 1).getTime(),
                        y: 88
                    },
                    style: {
                        fontSize: '14px'
                    },
                    text: 'American Revised Principles'
                },
                {
                    point: {
                        xAxis: 0,
                        yAxis: 0,
                        x: new Date(2024, 8, 1).getTime(),
                        y: 75
                    },
                    style: {
                        fontSize: '14px'
                    },
                    text: 'Northwestern Adoption'
                }
            ]
        }
    ],
    series: [
        {
            name: 'Number of Schools',
            data: (function () {
                return data.map(function ([date, value]) {
                    return [Date.parse(date), value];
                });
            })()
        }
    ]
});
