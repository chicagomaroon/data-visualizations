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
        text: 'The Maroon Staff Survey 2023: Type of High School Attended',
        align: 'center'
    },
    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: {point.y:.1f}% of Maroon members'
    },

    subtitle: {
        text: 'Click The High School Type To See The Individual Breakdown',
        align: 'center'
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Percentage of High School Types'
        }
    },

    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    series: [
        {
            name: 'High School Types',
            colorByPoint: true,
            data: [
                {
                    name: 'Non-Traditional',
                    y: 2.0,
                    drilldown: null
                },
                {
                    name: 'Public',
                    y: 33.0,
                    drilldown: null
                },
                {
                    name: 'Private',
                    y: 65.0,
                    drilldown: 'Private High Schools'
                }
            ]
        }
    ],

    drilldown: {
        breadcrumbs: {
            position: {
                align: 'right'
            }
        },
        series: [
            {
                name: 'Private High Schools',
                id: 'Private High Schools',
                data: [
                    {
                        name: 'Charter School',
                        y: 5.0
                    },
                    {
                        name: 'Boarding School',
                        y: 9.0
                    },
                    {
                        name: 'Religious School',
                        y: 11.0
                    },
                    {
                        name: 'Secular Private Day School',
                        y: 40.0
                    }
                ]
            }
        ]
    }
});
