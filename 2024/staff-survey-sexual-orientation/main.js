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
        text: 'The Maroon Staff Survey 2024: Sexual Orientation',
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
            text: 'Members in Category'
        }
    },

    tooltip: {
        headerFormat: '',
        pointFormat: '{point.y} Maroon member(s) {point.pointText}'
    },

    series: [
        {
            name: 'Sexual Orientation',
            colorByPoint: true,
            data: [
                {
                    name: 'Aromantic/Asexual',
                    pointText: 'identify as <b>Aromantic/Asexual</b>',
                    y: 5
                },
                {
                    name: 'Bisexual',
                    pointText: 'identify as <b>Bisexual</b>',
                    y: 14
                },
                {
                    name: 'Gay',
                    pointText: 'identify as <b>Gay</b>',
                    y: 2
                },
                {
                    name: 'Lesbian',
                    pointText: 'identify as <b>Lesbian</b>',
                    y: 2
                },
                {
                    name: 'Queer',
                    pointText: 'identify as <b>Queer</b>',
                    y: 5
                },
                {
                    name: 'Questioning Or Unsure',
                    pointText: 'are <b>Questioning or Unsure</b>',
                    y: 4
                },
                {
                    name: 'Straight (Heterosexual)',
                    pointText: 'identify as <b>Straight/Heterosexual</b>',
                    y: 21
                },
                {
                    name: 'Prefer Not To Disclose',
                    pointText: 'prefer not to disclose',
                    y: 1
                }
            ]
        }
    ]
});
