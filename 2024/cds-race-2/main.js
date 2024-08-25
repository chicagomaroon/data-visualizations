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
        text: "UChicago class of '28 racial/ethnic distribution",
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
        title: {
            text: 'Students'
        }
    },

    legend: {
        enabled: false
    },

    series: [
        {
            name: 'Enrolled students',
            data: [
                { name: 'White, non-Hispanic', y: 520 },
                { name: 'Asian, non-Hispanic', y: 333 },
                { name: 'Hispanic/Latino', y: 313 },
                { name: 'International', y: 302 },
                { name: 'Two or more races, non-Hispanic', y: 119 },
                { name: 'Black or African American, non-Hispanic', y: 115 },
                { name: 'Race and/or ethnicity unknown', y: 46 },
                {
                    name: 'American Indian or Alaska Native, non-Hispanic',
                    y: 1
                },
                {
                    name: 'Native Hawaiian or other Pacific Islander, non-Hispanic',
                    y: 0
                }
            ]
        }
    ],

    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.category}, {point.y:.0f}.'
        }
    }
});
