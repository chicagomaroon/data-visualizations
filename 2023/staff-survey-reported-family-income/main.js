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
        text: 'The Maroon Staff Survey 2023: Reported Family Income',
        align: 'center'
    },

    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat:
            '<span>{point.name}</span>: {point.y:.1f}% of Maroon members'
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
            name: 'Reported Family Income',
            colorByPoint: true,
            data: [
                {
                    name: '< $65,000',
                    y: 2.0
                },
                {
                    name: '$65,000 To $100,000',
                    y: 4.0
                },
                {
                    name: '$100,000 To $150,000',
                    y: 2.0
                },
                {
                    name: '$150,000 To $200,000',
                    y: 12.0
                },
                {
                    name: '$200,000 To $250,000',
                    y: 7.0
                },
                {
                    name: '$250,000 To $500,000',
                    y: 19.0
                },
                {
                    name: 'More Than $500,000',
                    y: 19.0
                },
                {
                    name: 'Prefer Not To Disclose',
                    y: 35.0
                }
            ]
        }
    ]
});
