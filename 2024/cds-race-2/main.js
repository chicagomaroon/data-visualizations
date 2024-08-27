// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    colors: [
        '#800000',
        '#FFA319',
        '#C16622',
        '#8F3931',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    chart: {
        type: 'bar',
        inverted: true
    },

    title: {
        text: '2023-24 Racial/Ethnic Distribution',
        align: 'center'
    },

    subtitle: {
        text: ''
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Share of all undergraduates',
            margin: 10
        },
        labels: {
            format: '{value}%'
        }
    },

    legend: {
        enabled: false
    },

    series: [
        {
            name: 'Share',
            data: [
                { name: 'White, non-Hispanic', y: 30.82 },
                { name: 'Asian, non-Hispanic', y: 19.7 },
                { name: 'Hispanic/Latino', y: 17.07 },
                { name: 'International', y: 16.17 },
                { name: 'Two or more races, non-Hispanic', y: 7.06 },
                { name: 'Black or African American, non-Hispanic', y: 6.94 },
                { name: 'Race and/or ethnicity unknown', y: 2.2 },
                {
                    name: 'American Indian or Alaska Native, non-Hispanic',
                    y: 0.03
                },
                {
                    name: 'Native Hawaiian or other Pacific Islander, non-Hispanic',
                    y: 0.01
                }
            ]
        }
    ],

    tooltip: {
        pointFormat: '{point.y:.1f}%'
    },

    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.category}, {point.y:.0f}.'
        }
    }
});
