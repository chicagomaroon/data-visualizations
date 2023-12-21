Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FFA319'],

    title: {
        text: 'Undergraduates Taught by Types of Instructor',
        align: 'center'
    },
    subtitle: {
        text: 'For the the Academic Year of 2020 ',
        align: 'center'
    },
    chart: {
        type: 'column'
    },
    xAxis: {
        categories: [
            'Tenure and Tenure-Track Faculty',
            'Union Lecturers',
            'Lecturers',
            'Students',
            'Col. Asst. Professors/Instructors',
            'Other'
        ],
        accessibility: {
            description: 'Instructor Types'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percentage of Undergraduates (%)'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },

    series: [
        {
            name: 'Undergraduate Student Population',
            label: {
                enabled: false
            },
            data: [44, 23, 12, 9, 7, 4]
        },
        {
            name: 'Undergraduate Classes',
            label: {
                enabled: false
            },
            data: [38, 27, 11, 12, 7, 6]
        }
    ]
});
