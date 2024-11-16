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
        text: 'Gender Identity',
        align: 'center'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        accessibility: {
            description: 'Gender'
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
        pointFormat: '{point.y}{point.pointText}'
    },

    series: [
        {
            name: 'Gender',
            colorByPoint: true,
            data: [
                {
                    name: 'Man',
                    pointText: '% identify as a <b>Man</b>',
                    y: 35
                },
                {
                    name: 'Woman',
                    pointText: '% identify as a <b>Woman</b>',
                    y: 56
                },
                {
                    name: 'Nonbinary',
                    pointText: '% identify as <b>Nonbinary</b>',
                    y: 7
                },
                {
                    name: 'Agender',
                    pointText: '% identify as <b>Agender</b>',
                    y: 2
                }
            ]
        }
    ]
});
