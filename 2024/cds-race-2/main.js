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
        text: "Class of '28 Racial/Ethnic Distribution",
        align: 'center'
    },

    subtitle: {
        text: ''
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: false,
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
                { name: 'White, non-Hispanic', y: 29.7 },
                { name: 'Asian, non-Hispanic', y: 19.0 },
                { name: 'Hispanic/Latino', y: 17.9 },
                { name: 'International', y: 17.3 },
                { name: 'Two or more races, non-Hispanic', y: 6.8 },
                { name: 'Black or African American, non-Hispanic', y: 6.6 },
                { name: 'Race and/or ethnicity unknown', y: 2.6 },
                {
                    name: 'American Indian or Alaska Native, non-Hispanic',
                    y: 0.1
                },
                {
                    name: 'Native Hawaiian or other Pacific Islander, non-Hispanic',
                    y: 0
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
