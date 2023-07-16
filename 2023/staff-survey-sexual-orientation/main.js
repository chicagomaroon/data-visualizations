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
        text: 'The Maroon Staff Survey 2023: Sexual Orientation',
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
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">Sexual Orientation:</span><br>',
        pointFormat:
            '<span style="display: flex; justify-content: center;">{point.y} members identify as {point.name}</span>'
    },

    series: [
        {
            name: 'Sexual Orientation',
            colorByPoint: true,
            data: [
                {
                    name: 'Aromantic/Asexual',
                    y: 9
                },
                {
                    name: 'Bisexual',
                    y: 14
                },
                {
                    name: 'Gay',
                    y: 2
                },
                {
                    name: 'Lesbian',
                    y: 1
                },
                {
                    name: 'Queer',
                    y: 5
                },
                {
                    name: 'Questioning Or Unsure',
                    y: 3
                },
                {
                    name: 'Straight (Heterosexual)',
                    y: 24
                },
                {
                    name: 'Prefer Not To Disclose',
                    y: 1
                }
            ]
        }
    ]
});
