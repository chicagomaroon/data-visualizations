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
        text: 'The Maroon Staff Survey 2024: U.S. Generation Status',
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
            name: 'U.S. Generation Status',
            colorByPoint: true,
            data: [
                {
                    name: 'First-generation (immigrant)',
                    y: 9
                },
                {
                    name: 'Second-generation (at least one foreign-born parent)',
                    y: 14
                },
                {
                    name: 'Third-generation and beyond (two U.S. native parents)',
                    y: 19
                }
            ]
        }
    ]
});
