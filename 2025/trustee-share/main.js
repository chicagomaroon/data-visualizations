// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

const years = [
    '1989-90',
    '1991-92',
    '1993-94',
    '1995-96',
    '1997-98',
    '1999-00',
    '2001-02',
    '2003-04',
    '2005-06',
    '2007-08',
    '2009-10',
    '2011-12',
    '2013-14',
    '2015-16',
    '2017-18',
    '2019-20',
    '2021-22',
    '2023-24'
];

const demData = [
    97.81, 80.24, 93.1, 92.44, 88.53, 75.05, 87.23, 77.47, 67.9, 73.07, 42.32,
    39.5, 40.64, 53.65, 43.59, 63.32, 37.36, 17.18
];

const repData = [
    2.19, 19.76, 6.9, 7.56, 11.47, 24.95, 12.77, 22.53, 32.1, 26.93, 57.68,
    60.5, 59.36, 46.35, 56.41, 36.68, 62.64, 82.82
];
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#155F83', '#800000'],

    // All code for your chart goes here
    chart: {
        type: 'column'
    },
    title: {
        text: `Percent Share of Trustees' Partisan Political Contributions by Election Cycle`,
        align: 'center'
    },

    subtitle: {
        text: `UChicago trustees' share of donations to Republican candidates increased considerably in the last 30 years.`,
        align: 'center'
    },
    xAxis: {
        categories: years
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            format: '{value}%'
        },
        min: 0,
        max: 100,
        stackLabels: {
            enabled: false,
            style: {
                fontWeight: 'bold'
            }
        }
    },
    legend: {
        align: 'center',
        verticalAlign: 'bottom'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false
            }
        }
    },
    tooltip: {
        formatter: function () {
            return `<b>${this.series.name}</b>: ${this.y.toFixed(0)}%`;
        }
    },
    series: [
        {
            name: 'Democratic candidates and organizations',
            data: demData
        },
        {
            name: 'Republican candidates and organizations',
            data: repData
        }
    ]
});
