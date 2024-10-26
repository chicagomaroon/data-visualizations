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
        title: {
            text: 'Members in Category'
        }
    },

    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="font-weight:bold;">{point.name}</span>: {point.y} Maroon member(s)'
    },

    series: [
        {
            name: 'Is Maroon membership helpful on job applications?',
            colorByPoint: true,
            data: [
                {
                    name: 'Not helpful at all',
                    y: 2
                },
                {
                    name: 'Not helpful',
                    y: 4
                },
                {
                    name: 'Neutral',
                    y: 14
                },
                {
                    name: 'Helpful',
                    y: 14
                },
                {
                    name: 'Very helpful',
                    y: 8
                }
            ]
        }
    ]
});
