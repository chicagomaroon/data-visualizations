// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#FD4C4C', '#800000', '#FFA319', '#FC0000', '#7D2525', '#C90000'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'The Maroon Staff Survey 2023: First-Generation, Low Income Status',
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
            name: 'First-Generation, Low Income Status',
            colorByPoint: true,
            data: [
                {
                    name: 'Prefer Not To Disclose',
                    y: 2.0
                },
                {
                    name: 'Low Income',
                    y: 2.0
                },
                {
                    name: 'First-Generation',
                    y: 4.0
                },
                {
                    name: 'First-Generation and Low Income',
                    y: 2.0
                },
                {
                    name: 'Neither',
                    y: 90.0
                }
            ]
        }
    ]
});
