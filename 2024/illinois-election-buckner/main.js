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
        type: 'pie'
    },
    title: {
        text: 'Campaign Donation Sources for Kambium Buckner',
        align: 'center'
    },
    subtitle: {
        text: 'Kambium Buckner raised a total of $543,076.',
        align: 'center'
    },
    tooltip: {
        valuePrefix: '$',
        valueSuffix: '.00'
    },

    plotOptions: {
        series: {
            dataLabels: [
                {
                    enabled: true,
                    distance: 20
                },
                {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.0f}%',
                    style: {
                        fontSize: '0.7em',
                        textOutline: 'none',
                        opacity: 1
                    }
                }
            ]
        }
    },
    series: [
        {
            name: 'Contribution',
            colorByPoint: true,
            data: [
                {
                    name: 'Carpentry Advancement PAC',
                    y: 68500
                },
                {
                    name: 'Aggregated Unitemized Contributions',
                    y: 34143
                },
                {
                    name: 'Liuna Chicago Laborers District Council PAC',
                    y: 34000
                },
                {
                    name: 'United Food and Commercial Workers\nInternational Union Federation',
                    y: 30000
                },
                {
                    name: 'Kam Buckner Campaign (Likely Previous Election Funds)',
                    y: 12000
                }
            ]
        }
    ]
});
