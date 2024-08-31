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
        text: 'The Maroon Staff Survey 2024: Recognized Student Organization Membership',
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
            name: 'RSO Memberships or Commitments',
            colorByPoint: true,
            data: [
                {
                    name: 'Only the Maroon',
                    y: 1
                },
                {
                    name: '1 Other RSO',
                    y: 9
                },
                {
                    name: '2 Other RSOs',
                    y: 15
                },
                {
                    name: '3 Other RSOs',
                    y: 14
                },
                {
                    name: '4 Other RSOs',
                    y: 4
                }
            ]
        }
    ]
});
