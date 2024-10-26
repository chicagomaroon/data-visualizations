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
        text: 'Amount of Federal Aid Received',
        align: 'center'
    },

    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="font-size:11px;font-weight:bold;">{point.name}</span>: {point.percentage:.1f}% of Maroon members ({point.y})'
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
            name: 'Federal Aid',
            colorByPoint: true,
            data: [
                {
                    name: '75-100% of tuition',
                    y: 1
                },
                {
                    name: '50-75% of tuition',
                    y: 1
                },
                {
                    name: '25-50% of tuition',
                    y: 0
                },
                {
                    name: '0-25% of tuition',
                    y: 0
                },
                {
                    name: 'Prefer not to disclose',
                    y: 4
                },
                {
                    name: 'Do not receive federal aid',
                    y: 36
                }
            ]
        }
    ]
});
