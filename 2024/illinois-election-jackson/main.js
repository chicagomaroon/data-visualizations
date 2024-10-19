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
        '#155F83',
        '#8A9045',
        '#800000',
        '#FFA319',
        '#C16622',
        '#47B5FF',
        '#8F3931',
        '#FF3399',
        '#58593F',
        '#350E20'
    ],
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Campaign Donation Sources for Jonathan Jackson',
        align: 'center'
    },
    subtitle: {
        text: 'Total Donations: $578,000.00',
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
                    name: 'Act Blue (donations)',
                    y: 124023
                },
                {
                    name: 'Illinois Black Business Political Action Fund',
                    y: 25000
                },
                {
                    name: 'East Lake',
                    y: 13200
                },
                {
                    name: 'James Group International',
                    y: 13200
                },
                {
                    name: 'Robert Knowling',
                    y: 13200
                }
            ]
        }
    ]
});
