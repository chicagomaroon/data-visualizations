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
        text: 'Reported Family Income',
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
            name: 'Reported Family Income',
            colorByPoint: true,
            data: [
                {
                    name: '< $65K',
                    y: 4
                },
                {
                    name: '$65K to $100K',
                    y: 7
                },
                {
                    name: '$100K to $150K',
                    y: 14
                },
                {
                    name: '$150K to $200K',
                    y: 4
                },
                {
                    name: '$200K to $250K',
                    y: 7
                },
                {
                    name: '$250K to $500K',
                    y: 14
                },
                {
                    name: 'More than $500K',
                    y: 21
                },
                {
                    name: 'Prefer not to disclose',
                    y: 29
                }
            ]
        }
    ]
});