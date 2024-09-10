// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        '#FD4C4C',
        '#FFA319',
        '#155F83',
        '#FC0000',
        '#7D2525',
        '#C90000',
        '#58593F'
    ],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'The Maroon Staff Survey 2024: U.S. High School Regions',
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
            name: 'High School Location',
            colorByPoint: true,
            data: [
                {
                    name: 'Mid-Atlantic',
                    y: 13
                },
                {
                    name: 'Midwest',
                    y: 6
                },
                {
                    name: 'Northeast',
                    y: 6
                },
                {
                    name: 'Northwest',
                    y: 0
                },
                {
                    name: 'Southeast',
                    y: 0
                },
                {
                    name: 'Southwest',
                    y: 4
                },
                {
                    name: 'West',
                    y: 5
                },
                {
                    name: 'Not in the U.S.',
                    y: 10
                }
            ]
        }
    ]
});
