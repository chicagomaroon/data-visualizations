let collegeDivisions = [
    {
        name: 'Social Sciences',
        y: 41,
        drilldown: 'Social Sciences'
    },
    {
        name: 'Humanities',
        y: 20,
        drilldown: 'Humanities'
    },
    {
        name: 'Physical Sciences',
        y: 13,
        drilldown: 'Physical Sciences'
    },
    {
        name: 'Biological Sciences',
        y: 1,
        drilldown: 'Biological Sciences'
    },
    {
        name: 'Undecided',
        y: 1,
        drilldown: null
    }
];
let biologicalSciences = [['Biological Sciences', 1]];
let humanities = [
    ['Cinema and Media Studies', 1],
    ['Comparative Literature', 1],
    ['Creative Writing', 2],
    ['English Literature and Language', 9],
    ['Fundamentals: Issues and Texts', 1],
    ['Linguistics', 1],
    ['Music', 1],
    ['Romance Languages and Literatures', 2],
    ['Russian and East European Studies', 1],
    ['Visual Arts', 1]
];
let physicalSciences = [
    ['Astrophysics', 1],
    ['Biological Chemistry', 1],
    ['Chemistry', 1],
    ['Computer Science', 4],
    ['Data Science', 1],
    ['Environmental Science', 2],
    ['Mathematics', 1],
    ['Physics', 1],
    ['Statistics', 1]
];
let socialSciences = [
    ['Critical Race and Ethnic Studies', 1],
    ['Economics', 12],
    ['Global Studies', 3],
    ['History', 5],
    ['Human Rights', 2],
    ['Law, Letters, and Society', 4],
    ['Political Science', 4],
    ['Psychology', 1],
    ['Public Policy Studies', 4],
    ['Sociology', 4],
    ['Urban Studies', 1]
];

// Calculate total majors represented and create percentages
let totalMajorsRepresented = 0;
collegeDivisions.map((d) => {
    totalMajorsRepresented += d.y;
});
collegeDivisions = collegeDivisions.map((d) => {
    d.y /= totalMajorsRepresented;
    d.y *= 100;
    return d;
});

// Calculate percentages for each college division
function calculatePercentagesForDivisions(d) {
    d[1] /= totalMajorsRepresented;
    d[1] *= 100;
    return d;
}
biologicalSciences = biologicalSciences.map(calculatePercentagesForDivisions);
humanities = humanities.map(calculatePercentagesForDivisions);
physicalSciences = physicalSciences.map(calculatePercentagesForDivisions);
socialSciences = socialSciences.map(calculatePercentagesForDivisions);

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
        text: 'The Maroon Staff Survey 2023: Represented Majors',
        align: 'center'
    },
    subtitle: {
        text: 'Click The Divisions To See The Individual Majors',
        align: 'center'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total Students with Major'
        }
    },
    legend: {
        enabled: false
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

    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: {point.y:.1f}% of majors in the Maroon'
    },

    series: [
        {
            name: 'Collegiate Divisions',
            colorByPoint: true,
            data: collegeDivisions
        }
    ],

    // Total represented majors

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
