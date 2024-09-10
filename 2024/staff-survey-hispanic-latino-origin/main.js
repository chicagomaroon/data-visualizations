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
        text: 'The Maroon Staff Survey 2024: Hispanic/Latino Origin',
        align: 'center'
    },

    tooltip: {
        headerFormat: '',
        pointFormat:
            '<b>{point.name}</b>: {point.percentage:.1f}% of Maroon members ({point.y})'
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
            name: 'Hispanic/Latino Origin',
            colorByPoint: true,
            data: [
                {
                    name: 'Both Hispanic and Latino',
                    y: 2
                },
                {
                    name: 'Hispanic, not Latino',
                    y: 1
                },
                {
                    name: 'Latino, not Hispanic',
                    y: 1
                },
                {
                    name: 'Neither Hispanic nor Latino',
                    y: 39
                },
                {
                    name: 'Prefer Not to Disclose',
                    y: 4
                }
            ]
        }
    ]
});
