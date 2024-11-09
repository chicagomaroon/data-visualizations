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
                    y: 7
                },
                {
                    name: 'African/Afro-Caribbean/Afro-Latin',
                    y: 5
                },
                {
                    name: 'Ashkenazi Jewish',
                    y: 2
                },
                {
                    name: 'East Asian',
                    y: 26
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
                    y: 50
                },
                {
                    name: 'Prefer not to disclose',
                    y: 5
                }
            ]
        }
    ]
});
