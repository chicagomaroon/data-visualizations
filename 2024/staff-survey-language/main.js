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
        text: 'The Maroon Staff Survey 2024: Languages Spoken',
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
            text: 'Members in Category'
        }
    },

    tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b>: {point.y} Maroon member(s)'
    },

    series: [
        {
            name: 'Language Spoken',
            colorByPoint: true,
            data: [
                {
                    name: 'Cantonese',
                    y: 3
                },
                {
                    name: 'Chinese',
                    y: 2
                },
                {
                    name: 'Dutch',
                    y: 1
                },
                {
                    name: 'English',
                    y: 37
                },
                {
                    name: 'French',
                    y: 6
                },
                {
                    name: 'German',
                    y: 2
                },
                {
                    name: 'Greek',
                    y: 1
                },
                {
                    name: 'Hindi',
                    y: 1
                },
                {
                    name: 'Hungarian',
                    y: 1
                },
                {
                    name: 'Italian',
                    y: 1
                },
                {
                    name: 'Japanese',
                    y: 2
                },
                {
                    name: 'Korean',
                    y: 1
                },
                {
                    name: 'Mandarin',
                    y: 6
                },
                {
                    name: 'Portuguese',
                    y: 1
                },
                {
                    name: 'Spanish',
                    y: 10
                }
            ]
        }
    ]
});
