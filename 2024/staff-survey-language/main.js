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
        text: 'Foreign Languages Spoken',
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
            name: 'Language Spoken',
            colorByPoint: true,
            data: [
                {
                    name: 'Cantonese',
                    y: 8
                },
                {
                    name: 'Chinese (dialect unspecified)',
                    y: 5
                },
                {
                    name: 'Dutch',
                    y: 3
                },
                {
                    name: 'French',
                    y: 15
                },
                {
                    name: 'German',
                    y: 5
                },
                {
                    name: 'Greek',
                    y: 3
                },
                {
                    name: 'Hindi',
                    y: 3
                },
                {
                    name: 'Hungarian',
                    y: 3
                },
                {
                    name: 'Italian',
                    y: 3
                },
                {
                    name: 'Japanese',
                    y: 5
                },
                {
                    name: 'Korean',
                    y: 3
                },
                {
                    name: 'Mandarin',
                    y: 15
                },
                {
                    name: 'Portuguese',
                    y: 3
                },
                {
                    name: 'Spanish',
                    y: 26
                }
            ]
        }
    ]
});
