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
        text: 'Do you identify as neurodivergent?',
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
            name: 'Do you identify as neurodivergent?',
            colorByPoint: true,
            data: [
                {
                    name: 'No',
                    y: 32
                },
                {
                    name: 'Yes',
                    y: 5
                },
                {
                    name: 'Unsure',
                    y: 5
                },
                {
                    name: 'Prefer not to answer',
                    y: 2
                }
            ]
        }
    ]
});
