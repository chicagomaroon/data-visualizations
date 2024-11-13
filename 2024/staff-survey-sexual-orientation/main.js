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
        text: 'Sexual Orientation',
        align: 'center'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        accessibility: {
            description: 'Sexual Orientation'
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
        pointFormat: '{point.y}% {point.pointText}'
    },

    series: [
        {
            name: 'Sexual Orientation',
            colorByPoint: true,
            data: [
                {
                    name: 'Aromantic/Asexual',
                    pointText: 'identify as <b>Aromantic/Asexual</b>',
                    y: 11
                },
                {
                    name: 'Bisexual',
                    pointText: 'identify as <b>Bisexual</b>',
                    y: 32
                },
                {
                    name: 'Gay',
                    pointText: 'identify as <b>Gay</b>',
                    y: 5
                },
                {
                    name: 'Lesbian',
                    pointText: 'identify as <b>Lesbian</b>',
                    y: 5
                },
                {
                    name: 'Straight (Heterosexual)',
                    pointText: 'identify as <b>Straight/Heterosexual</b>',
                    y: 48
                },
                {
                    name: 'Queer',
                    pointText: 'identify as <b>Queer</b>',
                    y: 11
                },
                {
                    name: 'Questioning or unsure',
                    pointText: 'are <b>Questioning or Unsure</b>',
                    y: 9
                },
                {
                    name: 'Prefer not to disclose',
                    pointText: 'prefer not to disclose',
                    y: 2
                }
            ]
        }
    ]
});
