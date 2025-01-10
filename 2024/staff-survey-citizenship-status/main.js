// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FD4C4C', '#FFA319', '#FC0000', '#7D2525', '#C90000'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },

    title: {
        text: 'Citizenship Status',
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
            name: 'Citizenship Status',
            colorByPoint: true,
            data: [
                {
                    name: 'Citizen of another country',
                    y: 18
                },
                {
                    name: 'U.S. citizen only',
                    y: 61
                },
                {
                    name: 'U.S. dual citizen',
                    y: 21
                }
            ]
        }
    ]
});
