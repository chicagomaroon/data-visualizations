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
        // '#800000',
        // '#FFA319',
        // '#C16622',
        // '#8F3931',
        // '#8A9045',
        // '#58593F',
        // '#155F83',
        // '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    chart: {
        type: 'dumbbell',
        inverted: true
    },

    title: {
        text: 'Change in Racial/Ethnic Distribution, 2012-2022',
        align: 'center'
    },

    subtitle: {
        text: 'Diversity increased in past ten years, with largest increases in Latino and international students'
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Enrollment share'
        },
        labels: {
            format: '{value}%'
        }
    },

    legend: {
        enabled: false
    },

    annotations: [{
        labels: [{
            point: {y: 410, x: 43},
            text: '2022',
            color: 'black',
            backgroundColor: 'none',
            borderColor: 'none',
            style: {
                fontSize: 14
            }
        },
        {
            point: {y: 740,  x: 43 },
            text: '2012',
            color: 'black',
            backgroundColor: 'none',
            borderColor: 'none',
            style: {
                fontSize: 14
            }
        }]
    }],

    series: [
        {
            name: 'Change in enrollment share compared to 2012',
            data: [
                {
                    name: 'White',
                    low: 49.73,
                    high: 32.59
                },
                {
                    name: 'International',
                    low: 22.16,
                    high: 30.83
                },
                {
                    name: 'Hispanic or Latino',
                    low: 6.15,
                    high: 10.91
                },
                {
                    name: 'Asian',
                    low: 14.14,
                    high: 15.89
                },
                {
                    name: 'Two or More Races',
                    low: 3.10,
                    high: 4.40
                },
                {
                    name: 'Black or African American',
                    low: 4.45,
                    high: 5.29
                },
                {
                    name: 'American Indian or Alaska Native',
                    low: 0.23,
                    high: 0.07
                },
                {
                    name: 'Native Hawaiian or Other Pacific Islanders',
                    low: 0.01,
                    high: 0.02
                }
            ]
        }
    ],

    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.category}, {point.y:.2f}%.'
        }
    },

    tooltip: {
        formatter: function () {
            var high = this.point.high,
                low = this.point.low,
                difference = high - low;

            return (
                '2022: ' +
                high +
                '% <br>' +
                '2012: ' +
                low +
                '% <br>' +
                'Difference: ' +
                difference.toFixed(2) +
                '%'
            );
        }
    }
});
