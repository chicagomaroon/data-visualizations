// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    },
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
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
        type: 'column'
    },

    title: {
        text: 'Revenue from Non-Degree Programs, FY23',
        align: 'center'
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.point.name + '</b>' + ': $' + this.y + 'M';
        },
        valuePrefix: '$'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        labels: {
            format: '${text}M',
            style: {
                fontSize: '16px'
            }
        },
        showLastLabel: false,
        title: {
            enabled: false
        },
        tickPositions: [0, 100, 200, 300, 400, 500, 600]
    },

    plotOptions: {
        series: {
            groupPadding: 0,
            pointPadding: 0.05
        }
    },

    series: [
        {
            name: 'Revenue',
            label: {
                enabled: false
            },
            data: [
                { name: 'Harvard', y: 544 },
                { name: 'Cornell', y: 200 },
                { name: 'UPenn', y: 163 },
                { name: 'Northwestern', y: 160 },
                { name: 'Stanford', y: 138 },
                { name: 'UChicago', y: 23 }
            ]
        }
    ]
});
