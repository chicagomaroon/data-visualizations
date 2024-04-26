Highcharts.chart('chart-div', {
    colors: [
        '#800000',
        '#FFA319',
        '#8F3931',
        '#5c071e',
        '#C16622',
        '#f2ca46',
        '#4b2163',
        '#de986d'
    ],
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Employment by Industry'
    },
    tooltip: {
        valueSuffix: '%'
    },
    subtitle: {
        text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>'
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
                    format: '{point.percentage:.1f}%',
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
                    name: 'Financial Services',
                    y: 30
                },
                {
                    name: 'Management Consulting',
                    y: 15
                },
                {
                    name: 'Tech Industry',
                    y: 12
                },
                {
                    name: 'Science (Industry and Research)',
                    y: 12
                },
                {
                    name: 'Education',
                    y: 11
                },
                {
                    name: 'Arts',
                    y: 6
                },
                {
                    name: 'Healthcare',
                    y: 5
                },
                {
                    name: 'Startups',
                    y: 4
                }
            ]
        }
    ]
});
