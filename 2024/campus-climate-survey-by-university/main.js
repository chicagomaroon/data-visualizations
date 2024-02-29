// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
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

    // All code for your chart goes here
    chart: {
        type: 'column'
    },

    title: {
        text: 'Comparative Response Rates in University Campus Climate Surveys',
        align: 'center'
    },

    caption: {
        text: '*Stanford reported a 29-31% response rate from students.',
        align: 'center'
    },

    xAxis: {
        categories: ['UChicago', 'MIT', 'Stanford*', 'Brown'],
        crosshair: true
    },

    yAxis: {
        min: 0,
        title: {
            text: 'Response rate (%)'
        }
    },

    tooltip: {
        valueSuffix: '%'
    },

    series: [
        {
            name: 'Students',
            type: 'column',
            data: [21, 39, 30, 16]
        },
        {
            name: 'Academics/Faculty',
            type: 'column',
            data: [41, 69, 38, 33]
        },
        {
            name: 'Staff',
            type: 'column',
            data: [42, 49, 44, 62]
        }
    ]
});
