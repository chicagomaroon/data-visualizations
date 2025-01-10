// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FD4C4C', '#FC0000', '#7D2525', '#C90000'],

    // All code for your chart goes here
    chart: {
        type: 'column'
    },

    legend: {
        enabled: false
    },

    title: {
        text: 'The Maroon Staff Survey 2024: Represented Majors',
        align: 'center'
    },
    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: {point.y} Maroon members'
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Members in Category'
        }
    },

    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
            }
        }
    },

    series: [
        {
            name: 'Collegiate Divisions',
            colorByPoint: true,
            data: [
                {
                    name: 'Social Sciences',
                    y: 40
                },
                {
                    name: 'Humanities',
                    y: 17
                },
                {
                    name: 'Physical Sciences',
                    y: 13
                },
                {
                    name: 'Biological Sciences',
                    y: 2
                }
            ]
        }
    ]
});
