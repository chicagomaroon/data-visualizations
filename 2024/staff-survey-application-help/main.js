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
        text: 'Is Maroon Membership Helpful on Job Applications?',
        align: 'center'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        accessibility: {
            description: 'Helpfulness of Maroon Membership for Job Applications'
        },
        type: 'category'
    },

    yAxis: {
        min: 0,
        title: {
            text: 'Percent of responses'
        }
    },

    tooltip: {
        headerFormat: '',
        pointFormat:
            '<b>{point.name}</b>: {point.y}%'
    },

    series: [
        {
            name: 'Is Maroon membership helpful on job applications?',
            colorByPoint: true,
            data: [
                {
                    name: 'Not helpful at all',
                    y: 5
                },
                {
                    name: 'Not helpful',
                    y: 10
                },
                {
                    name: 'Neutral',
                    y: 33
                },
                {
                    name: 'Helpful',
                    y: 33
                },
                {
                    name: 'Very helpful',
                    y: 19
                }
            ]
        }
    ]
});
