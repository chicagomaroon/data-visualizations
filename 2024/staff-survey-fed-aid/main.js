// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FD4C4C', '#7D2525', '#FC0000', '#FFA319', '#C90000'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },

    title: {
        text: 'Amount of Federal Aid Received',
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
            name: 'Federal Aid',
            colorByPoint: true,
            data: [
                {
                    name: '75-100% of tuition',
                    y: 3
                },
                {
                    name: '50-75% of tuition',
                    y: 3
                },
                {
                    name: '25-50% of tuition',
                    y: 0
                },
                {
                    name: '0-25% of tuition',
                    y: 0
                },
                {
                    name: 'Do not receive federal aid',
                    y: 94
                }
            ]
        }
    ]
});
