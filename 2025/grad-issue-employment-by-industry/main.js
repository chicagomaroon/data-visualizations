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
        '#8F3931',
        '#5c071e',
        '#800000',
        '#C16622',
        '#f2ca46',
        '#a33737',
        '#de986d',
        '#4b2163',
        '#961d1d'
    ],
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Employment by Industry',
        style: {
            color: '#000000'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },

    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [
                {
                    enabled: true,
                    distance: 20
                },
                {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage}%',
                    style: {
                        fontSize: '0.8em',
                        textOutline: 'none',
                        opacity: 1
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }
            ]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Arts and Entertainment',
                    y: 5
                },
                {
                    name: 'Consulting',
                    y: 13
                },
                {
                    name: 'Corporate/Business',
                    y: 6
                },
                {
                    name: 'Education',
                    y: 6
                },
                {
                    name: 'Financial Services',
                    y: 35
                },
                {
                    name: 'Government/Public Policy and Administration',
                    y: 4
                },
                {
                    name: 'Healthcare',
                    y: 6
                },
                {
                    name: 'Law',
                    y: 4
                },
                {
                    name: 'Marketing, Advertising, and Media',
                    y: 3
                },
                {
                    name: 'Non-Profit and Social Services',
                    y: 3
                },
                {
                    name: 'Science and Technology',
                    y: 15
                }
            ]
        }
    ]
});
