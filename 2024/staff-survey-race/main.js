// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FD4C4C', '#FC0000', '#7D2525', '#C90000'],

    // All code for your chart goes here
    chart: {
        type: 'column'
    },

    title: {
        text: 'Racial Identity',
        align: 'center'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        accessibility: {
            description: 'Race'
        },
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Percent of Responses'
        }
    },

    tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b>: {point.y}%'
    },

    series: [
        {
            name: 'Race',
            colorByPoint: true,
            data: [
                {
                    name: 'African American or Black',
                    y: 8
                },
                {
                    name: 'African/Afro-Caribbean/Afro-Latin',
                    y: 5
                },
                {
                    name: 'East Asian',
                    y: 28
                },
                {
                    name: 'South Asian',
                    y: 12
                },
                {
                    name: 'Southeast Asian',
                    y: 5
                },
                {
                    name: 'White',
                    y: 52
                }
            ]
        }
    ]
});
