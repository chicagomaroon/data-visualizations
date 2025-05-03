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
        text: 'Columbia students are more supportive of disruptive protest',
        align: 'center'
    },

    subtitle: {
        text: 'How acceptable would you say it is for students to engage in the following action to protest a campus speaker? ',
        align: 'center'
    },

    caption: {
        text: 'Percentage of students who said the given action was "always" or "sometimes" acceptable is displayed.',
        align: 'center'
    },

    xAxis: {
        categories: [
            'Shouting down a speaker to prevent them from speaking on campus.',
            'Blocking other students from attending a campus speech.',
            'Using violence to stop a campus speech.'
        ]
    },

    yAxis: {
        categories: ['Columbia University', 'University of Chicago']
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
        { name: 'Columbia University', data: [42, 25, 13] },
        { name: 'University of Chicago', data: [36, 17, 12] }
    ]
});
