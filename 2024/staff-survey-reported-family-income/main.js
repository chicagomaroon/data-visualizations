// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FD4C4C', '#C16622', '#FC0000', '#7D2525', '#C90000','#FFA319'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },

    title: {
        text: 'Reported Family Income',
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
            name: 'Reported Family Income',
            colorByPoint: true,
            data: [
                {
                    name: '< $65K',
                    y: 5
                },
                {
                    name: '$65K to $100K',
                    y: 10
                },
                {
                    name: '$100K to $150K',
                    y: 20
                },
                {
                    name: '$150K to $200K',
                    y: 5
                },
                {
                    name: '$200K to $250K',
                    y: 10
                },
                {
                    name: '$250K to $500K',
                    y: 20
                },
                {
                    name: 'More than $500K',
                    y: 30
                }
            ]
        }
    ]
});
