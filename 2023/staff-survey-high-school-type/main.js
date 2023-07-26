const colors = ['#800000', '#FD4C4C', '#FC0000', '#7D2525', '#C90000'];

// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors

    // All code for your chart goes here
    title: {
        text: 'The Maroon Staff Survey 2023: Type of High School Attended',
        align: 'center'
    },

    chart: {
        type: 'pie'
    },

    plotOptions: {
        pie: {
            shadow: false,
            center: ['50%', '50%']
        }
    },

    tooltip: {
        valueSuffix: '%'
    },

    series: [
        {
            name: 'High School Categories',
            size: '60%',
            dataLabels: {
                distance: 60,
                format: '<b>{point.name}:</b> <span style="opacity: 0.5">{y}%</span>',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 1
                },
                size: '80%',
                innerSize: '60%',
                style: {
                    fontWeight: 'normal'
                }
            },
            data: [
                {
                    name: 'Non-Traditional',
                    y: 2.0,
                    color: colors[0]
                },
                {
                    name: 'Public',
                    y: 33.0,
                    color: colors[1]
                },
                {
                    name: 'Private',
                    y: 65.0,
                    color: colors[2]
                }
            ]
        },
        {
            name: 'High School Types',
            dataLabels: {
                enabled: false
            },
            data: [
                {
                    name: 'Homeschool, Full-Time Online, etc.',
                    y: 2.0,
                    color: colors[0]
                },
                {
                    name: 'Public High School',
                    y: 33.0,
                    color: colors[1]
                },
                {
                    name: 'Charter School',
                    y: 5.0,
                    color: colors[2]
                },
                {
                    name: 'Boarding School',
                    y: 9.0,
                    color: colors[2]
                },
                {
                    name: 'Religious School',
                    y: 11.0,
                    color: colors[2]
                },
                {
                    name: 'Secular Private Day School',
                    y: 40.0,
                    color: colors[2]
                }
            ]
        }
    ]
});
