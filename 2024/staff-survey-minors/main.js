let collegeDivisions = [
    {
        name: 'Humanities',
        y: 6,
        drilldown: 'Humanities'
    },
    {
        name: 'Physical Sciences',
        y: 4,
        drilldown: 'Physical Sciences'
    },
    {
        name: 'Social Sciences',
        y: 3,
        drilldown: 'Social Sciences'
    }
];

let humanities = [
    ['Classical Studies', 1],
    ['Creative Writing', 2],
    ['Music', 1],
    ['Theater And Performance Studies', 2]
];
let physicalSciences = [
    ['Astrophysics', 1],
    ['Computer Science', 1],
    ['Data Science', 1],
    ['Statistics', 1]
];
let socialSciences = [
    ['Democracy Studies', 1],
    ['Education and Society', 2]
];

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
        text: 'The Maroon Staff Survey 2024: Represented Minors',
        align: 'center'
    },

    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: {point.y} Maroon members'
    },

    subtitle: {
        text: 'Click each division to see individual minors',
        align: 'center'
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
            data: collegeDivisions
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
                name: 'Humanities',
                id: 'Humanities',
                data: humanities
            },
            {
                name: 'Physical Sciences',
                id: 'Physical Sciences',
                data: physicalSciences
            },
            {
                name: 'Social Sciences',
                id: 'Social Sciences',
                data: socialSciences
            }
        ]
    }
});
