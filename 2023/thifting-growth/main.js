const defaultColors = [
    '#800000',
    '#FFA319',
    '#C16622',
    '#8F3931',
    '#8A9045',
    '#58593F',
    '#155F83',
    '#350E20'
];

// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-cohort', {
    // Setting default colors
    colors: defaultColors,

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Secondhand Growth by Shopping Cohort through 2027',
        align: 'center'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [
        {
            name: 'Shoppers',
            colorByPoint: true,
            data: [
                {
                    name: 'New',
                    y: 60.0,
                    selected: true
                },
                {
                    name: 'Existing',
                    y: 40.0
                }
            ]
        }
    ]
});

Highcharts.chart('chart-generation', {
    // Setting default colors
    colors: defaultColors,

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Secondhand Growth by Generation through 2027',
        align: 'center'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [
        {
            name: 'Generation',
            colorByPoint: true,
            data: [
                {
                    name: 'Millennial',
                    y: 33,
                    selected: true
                },
                {
                    name: 'Gen X',
                    y: 26
                },
                {
                    name: 'Gen Z',
                    y: 28
                },
                {
                    name: 'Gen Alpha',
                    y: 1
                },
                {
                    name: 'Baby Boomer',
                    y: 12
                }
            ]
        }
    ]
});
