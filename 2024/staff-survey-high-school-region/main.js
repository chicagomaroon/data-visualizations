// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        '#FD4C4C',
        '#FFA319',
        '#155F83',
        '#FC0000',
        '#7D2525',
        '#C90000',
        '#58593F'
    ],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'U.S. High School Regions',
        align: 'center'
    },
    tooltip: {
        headerFormat: '',
        pointFormat:
            '<b>{point.name}</b>: {point.y}%'
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
                format: '<b>{point.name}</b>: {point.y}%'
            }
        }
    },
    series: [
        {
            name: 'High School Region',
            colorByPoint: true,
            data: [
                {
                    name: 'Mid-Atlantic',
                    y: 30
                },
                {
                    name: 'Midwest',
                    y: 14
                },
                {
                    name: 'Northeast',
                    y: 14
                },
                {
                    name: 'Northwest',
                    y: 0
                },
                {
                    name: 'Southeast',
                    y: 0
                },
                {
                    name: 'Southwest',
                    y: 9
                },
                {
                    name: 'West',
                    y: 11
                },
                {
                    name: 'Not in the U.S.',
                    y: 22
                }
            ]
        }
    ]
});
