let collegeDivisions = [
    {
        name: 'Humanities',
        y: 14,
        drilldown: 'Humanities'
    },
    {
        name: 'Physical Sciences',
        y: 9,
        drilldown: 'Physical Sciences'
    },
    {
        name: 'Social Sciences',
        y: 7,
        drilldown: 'Social Sciences'
    }
];

let humanities = [
    ['Classical Studies', 2],
    ['Creative Writing', 5],
    ['Music', 2],
    ['Theater And Performance Studies', 5]
];
let physicalSciences = [
    ['Astrophysics', 2],
    ['Computer Science', 2],
    ['Data Science', 2],
    ['Statistics', 2]
];
let socialSciences = [
    ['Democracy Studies', 2],
    ['Education and Society', 5]
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
        text: 'Represented Minors by Division',
        align: 'center'
    },

    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="color:{point.color}"><b>{point.name}</b></span>: {point.y}%'
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
            text: 'Percent of Responses'
        }
    },

    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}%'
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
