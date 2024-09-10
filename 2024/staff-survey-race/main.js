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
        text: 'The Maroon Staff Survey 2024: Race',
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
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat: '<span>{point.name}</span>: {point.y} Maroon member(s)'
    },

    series: [
        {
            name: '',
            colorByPoint: true,
            data: [
                {
                    name: 'African American or Black',
                    y: 3
                },
                {
                    name: 'African/Afro-Caribbean/Afro-Latin',
                    y: 2
                },
                {
                    name: 'Ashkenazi Jewish',
                    y: 1
                },
                {
                    name: 'East Asian',
                    y: 11
                },
                {
                    name: 'South Asian',
                    y: 5
                },
                {
                    name: 'Southeast Asian',
                    y: 2
                },
                {
                    name: 'White',
                    y: 21
                },
                {
                    name: 'Prefer not to disclose',
                    y: 2
                }
            ]
        }
    ]
});
