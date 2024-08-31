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
        text: 'The Maroon Staff Survey 2024: Is Maroon Membership Helpful on Job Applications?',
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
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat: '<span>{point.name}</span>: {point.y} Maroon member(s)'
    },

    series: [
        {
            name: 'Is Maroon Membership Helpful on Job Applications?',
            colorByPoint: true,
            data: [
                {
                    name: 'Not Helpful At All',
                    y: 2
                },
                {
                    name: 'Not Helpful',
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
                    name: 'Very Helpful',
                    y: 8
                }
            ]
        }
    ]
});
