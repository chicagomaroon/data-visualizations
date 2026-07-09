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
        text: 'UChicago students believe college administration will defend offensive speech',
        align: 'center'
    },

    subtitle: {
        text: "If a controversy over offensive speech were to occur on your campus, how likely is it that your college's administration would defend the speaker's right to express their views?",
        align: 'center'
    },

    xAxis: {
        categories: [
            'Not at all likely',
            'Not very likely',
            'Somewhat likely',
            'Very likely',
            'Extremely likely'
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
        { name: 'Columbia University', data: [13, 30, 43, 8, 7] },
        { name: 'University of Chicago', data: [4, 14, 36, 34, 13] }
    ]
});
