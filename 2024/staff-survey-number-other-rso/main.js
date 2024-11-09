// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FD4C4C', '#FFA319', '#7D2525', '#FC0000'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'RSO Memberships or Commitments',
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
            name: 'RSO Memberships or Commitments',
            colorByPoint: true,
            data: [
                {
                    name: 'Only the Maroon',
                    y: 2
                },
                {
                    name: '1 other RSO',
                    y: 21
                },
                {
                    name: '2 other RSOs',
                    y: 35
                },
                {
                    name: '3 other RSOs',
                    y: 33
                },
                {
                    name: '4 other RSOs',
                    y: 9
                }
            ]
        }
    ]
});
