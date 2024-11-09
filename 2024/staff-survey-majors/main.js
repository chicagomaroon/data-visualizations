let collegeDivisions = [
    {
        name: 'Social Sciences',
        y: 91,
        drilldown: 'Social Sciences'
    },
    {
        name: 'Humanities',
        y: 39,
        drilldown: 'Humanities'
    },
    {
        name: 'Physical Sciences',
        y: 30,
        drilldown: 'Physical Sciences'
    },
    {
        name: 'Biological Sciences',
        y: 5,
        drilldown: 'Biological Sciences'
    }
];
let biologicalSciences = [['Biological Sciences', 5]];
let humanities = [
    ['Classical Studies', 2],
    ['Comparative Literature', 5],
    ['Creative Writing', 5],
    ['English Literature and Language', 9],
    ['Fundamentals: Issues and Texts', 2],
    ['Linguistics', 5],
    ['Media Arts and Design', 2],
    ['Music', 2],
    ['Romance Languages and Literatures', 2],
    ['Russian and East European Studies', 2],
    ['Visual Arts', 2]
];
let physicalSciences = [
    ['Astrophysics', 5],
    ['Biological Chemistry', 2],
    ['Chemistry', 2],
    ['Computational and Applied Mathematics', 2],
    ['Computer Science', 14],
    ['Data Science', 5]
];
let socialSciences = [
    ['Economics', 30],
    ['History', 18],
    ['Human Rights', 2],
    ['Latin American and Caribbean Studies', 2],
    ['Law, Letters, and Society', 7],
    ['Political Science', 14],
    ['Psychology', 2],
    ['Public Policy Studies', 16]
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
        text: 'Represented Majors by Division',
        align: 'center'
    },
    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="color:{point.color}"><b>{point.name}</b></span>: {point.y}%'
    },

    subtitle: {
        text: 'Click each division to see individual majors',
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
                name: 'Biological Sciences',
                id: 'Biological Sciences',
                data: biologicalSciences
            },
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
