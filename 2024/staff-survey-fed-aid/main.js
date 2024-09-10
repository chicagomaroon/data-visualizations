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
        text: 'The Maroon Staff Survey 2024: Amount of Federal Aid Received',
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
            name: 'Amount of Federal Aid Received',
            colorByPoint: true,
            data: [
                {
                    name: '75-100% of Tuition',
                    y: 1
                },
                {
                    name: '50-75% of Tuition',
                    y: 1
                },
                {
                    name: '25-50% of Tuition',
                    y: 0
                },
                {
                    name: '0-25% of Tuition',
                    y: 0
                },
                {
                    name: 'Prefer Not to Disclose',
                    y: 4
                },
                {
                    name: 'Do Not Receive Federal Aid',
                    y: 36
                }
            ]
        }
    ]
});
