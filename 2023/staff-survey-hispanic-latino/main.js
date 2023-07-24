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
        text: 'The Maroon Staff Survey 2023: Hispanic and Latino Members',
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
                format: '<b>{point.name}</b>: {point.percentage:.1f}%'
            }
        }
    },
    series: [
        {
            name: 'Hispanic and Latino Membership',
            colorByPoint: true,
            data: [
                {
                    name: 'Both Hispanic and Latino',
                    y: 9.0
                },
                {
                    name: 'Hispanic, Not Latino',
                    y: 2.0
                },
                {
                    name: 'Latino, Not Hispanic',
                    y: 2.0
                },
                {
                    name: 'Neither Hispanic Nor Latino',
                    y: 87.0
                }
            ]
        }
    ]
});
