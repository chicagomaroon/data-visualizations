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
        text: 'Tolerance for right-wing views',
        align: 'center'
    },

    subtitle: {
        text: 'Regardless of your own views on the topic, should your school allow a speaker on campus who previously expressed the following idea? ',
        align: 'center'
    },

    caption: {
        text: 'The percentage of students who said this speaker should "definitely not" or "probably not" be allowed is displayed.',
        align: 'center'
    },

    xAxis: {
        categories: [
            'Transgender people have a mental disorder.',
            'Abortion should be completely illegal.',
            'Black Lives Matter is a hate group.',
            'Collateral damage in Gaza is justified for the sake of Israeli security.'
        ]
    },

    yAxis: {
        categories: ['Columbia University', 'University of Chicago']
    },

    yAxis: {
        min: 0,
        max: 100
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
        { name: 'Columbia University', data: [64, 46, 64, 46] },
        { name: 'University of Chicago', data: [62, 40, 59, 39] }
    ]
});
