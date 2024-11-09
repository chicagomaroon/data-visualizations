// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#7D2525', '#FD4C4C', '#C90000', '#800000', '#FFA319', '#FC0000'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },

    title: {
        text: 'Hispanic/Latino Origin',
        align: 'center'
    },

    tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b>: {point.y}%'
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
            name: 'Hispanic/Latino Origin',
            colorByPoint: true,
            data: [
                {
                    name: 'Both Hispanic and Latino',
                    y: 4
                },
                {
                    name: 'Hispanic, not Latino',
                    y: 2
                },
                {
                    name: 'Latino, not Hispanic',
                    y: 2
                },
                {
                    name: 'Neither Hispanic nor Latino',
                    y: 83
                },
                {
                    name: 'Prefer not to disclose',
                    y: 9
                }
            ]
        }
    ]
});
