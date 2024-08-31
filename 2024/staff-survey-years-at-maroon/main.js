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
        text: 'The Maroon Staff Survey 2024: Years Served at The Maroon',
        align: 'center'
    },

    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat:
            '<span>{point.name} Years</span>: {point.y:.1f}% of Maroon members'
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
                format: '<b>{point.name} Year(s)</b>: {point.percentage:.1f}%'
            }
        }
    },
    series: [
        {
            name: 'Years Served at The Maroon',
            colorByPoint: true,
            data: [
                {
                    name: '≤1',
                    y: 17
                },
                {
                    name: '2',
                    y: 10
                },
                {
                    name: '3',
                    y: 12
                },
                {
                    name: '≥4',
                    y: 5
                }
            ]
        }
    ]
});
