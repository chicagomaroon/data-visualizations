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
        text: 'The Maroon Staff Survey 2024: Reported Family Income',
        align: 'center'
    },

    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat:
            '<span>{point.name}</span>: {point.percentage:.1f}% of Maroon members ({point.y})'
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
                format: '<b>{point.name}</b>: {point.percentage:.1f}% ({point.y})'
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
                    y: 1
                },
                {
                    name: '$65K to $100K',
                    y: 2
                },
                {
                    name: '$100K to $150K',
                    y: 4
                },
                {
                    name: '$150K to $200K',
                    y: 1
                },
                {
                    name: '$200K to $250K',
                    y: 2
                },
                {
                    name: '$250K to $500K',
                    y: 4
                },
                {
                    name: 'More than $500K',
                    y: 6
                },
                {
                    name: 'Prefer Not to Disclose',
                    y: 8
                }
            ]
        }
    ]
});
