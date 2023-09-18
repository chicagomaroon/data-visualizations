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
        text: 'The Maroon Staff Survey 2023: Race and Ethnicity',
        align: 'center'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        accessibility: {
            description: 'Race and Ethnicity'
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
            '<span style="font-size:11px;font-weight:bold;">Race and Ethnicity:</span><br>',
        pointFormat:
            '<span style="display: flex; justify-content: center;">{point.y} members identify as {point.name}</span>'
    },

    series: [
        {
            name: 'Race and Ethnicity',
            colorByPoint: true,
            data: [
                {
                    name: 'Black Or African American',
                    y: 4
                },
                {
                    name: 'East Asian (Korea, Japan, China, Etc.)',
                    y: 11
                },
                {
                    name: 'South Asian (India, Pakistan, Bangladesh, Etc.)',
                    y: 8
                },
                {
                    name: 'Southeast Asian (Vietnam, Malaysia, Philippines, Etc.)',
                    y: 2
                },
                {
                    name: 'White',
                    y: 23
                }
            ]
        }
    ]
});
