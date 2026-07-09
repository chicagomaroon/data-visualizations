Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    colors: [
        '#FFA319',
        '#800000',
        '#C16622',
        '#8F3931',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    // All code for your chart goes here
    chart: {
        type: 'bar'
    },

    title: {
        text: 'UChicago students believe free speech is supported on campus',
        align: 'center'
    },

    subtitle: {
        text: 'How clear is it to you that your college administration protects free speech on campus?',
        align: 'center'
    },

    xAxis: {
        categories: [
            'Not at all clear',
            'Not very clear',
            'Somewhat clear',
            'Very clear',
            'Extremely clear'
        ]
    },

    yAxis: {
        categories: ['Columbia University', 'University of Chicago'],
        title: {
            text: null
        }
    },

    yAxis: {
        min: 0,
        max: 50
    },

    yAxis: {
        labels: {
            format: '{value}%'
        },
        title: {
            text: ""
        }
    },

    tooltip: {
        valueSuffix: '%'
    },

    series: [
        { name: 'Columbia University', data: [23, 34, 23, 13, 7] },
        { name: 'University of Chicago', data: [8, 10, 33, 31, 19] }
    ]
});
