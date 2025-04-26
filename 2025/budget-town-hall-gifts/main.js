// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        },
        type: 'column'
    },
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        // '#FFA319',
        // '#C16622',
        // '#8F3931',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    title: {
        text: 'Progress on FY25 Budget: Gifts and Contributions Revenue',
        align: 'center'
    },

    // subtitle: {
    //     text: 'Administration plans to increase',
    //     align: 'center',
    //     style: {
    //         fontSize: '15px'
    //     }
    // },

    tooltip: {
        valueDecimals: 0,
        valuePrefix: '$',
        valueSuffix: 'M'
    },

    accessibility: {
        valuePrefix: '$',
        valueSuffix: 'M'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        categories: ['FY25 Final', 'FY25 Budget', 'FY25 Projected']
    },

    yAxis: {
        labels: {
            format: '${text}M',
            style: {
                fontSize: '16px'
            }
        },
        title: {
            enabled: false
        },
        tickPositions: [0, 200, 400]
    },

    series: [
        {
            name: 'Revenue',
            data: [264, 265, 308],
            dataLabels: {
                enabled: true,
                format: '${point.y}M'
            }
        }
    ]
});
