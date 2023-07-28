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
        text: 'The Maroon Staff Survey 2023: Gender',
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
            text: 'Members in Category'
        }
    },

    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">Gender:</span><br>',
        pointFormat:
            '<span style="display: flex; justify-content: center;">{point.y} member(s) {point.pointText}</span>'
    },

    series: [
        {
            name: 'Gender',
            colorByPoint: true,
            data: [
                {
                    name: 'Man',
                    pointText: 'identify as a Man',
                    y: 13
                },
                {
                    name: 'Non-Binary',
                    pointText: 'identify as Non-Binary',
                    y: 3
                },
                {
                    name: 'Woman',
                    pointText: 'identify as a Woman',
                    y: 30
                },
                {
                    name: 'Prefer Not To Disclose',
                    pointText: 'prefers not to disclose',
                    y: 1
                }
            ]
        }
    ]
});
