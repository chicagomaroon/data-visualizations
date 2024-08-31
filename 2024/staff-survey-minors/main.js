let collegeDivisions = [
    {
        name: 'Humanities',
        y: 17,
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

// Calculate total majors represented and create percentages
let totalMinorsRepresented = 0;
collegeDivisions.map((d) => {
    totalMinorsRepresented += d.y;
});
collegeDivisions = collegeDivisions.map((d) => {
    d.y /= totalMinorsRepresented;
    d.y *= 100;
    return d;
});

// Calculate percentages for each college division
function calculatePercentagesForDivisions(d) {
    d[1] /= totalMinorsRepresented;
    d[1] *= 100;
    return d;
}
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

    legend: {
        enabled: false
    },

    title: {
        text: 'The Maroon Staff Survey 2024: Represented Minors',
        align: 'center'
    },

    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: {point.y:.1f}% of minors in the Maroon'
    },

    subtitle: {
        text: 'Click The Divisions To See The Individual Minors',
        align: 'center'
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Percentage of Represented Minors'
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
