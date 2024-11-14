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
        type: 'bar'
    },

    title: {
        text: 'Enrollment in Non-Degree Programs 2023-24',
        align: 'center'
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.point.name + '</b>' + ': ' + this.y + 'K';
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
            formatter: function () {
                return this.value > 0 ? this.value + ',000' : this.value;
            },
            style: {
                fontSize: '16px'
            }
        },
        showLastLabel: false,
        title: {
            enabled: false
        }
    },

    plotOptions: {
        series: {
            groupPadding: 0,
            pointPadding: 0.05
        }
    },

    series: [
        {
            name: 'Enrollment',
            label: {
                enabled: false
            },
            data: [
                { name: 'Harvard', y: 68 },
                { name: 'Northwestern', y: 60 },
                { name: 'Cornell', y: 40 },
                { name: 'UPenn', y: 35 },
                { name: 'Stanford', y: 35 },
                { name: 'UChicago', y: 7 }
            ]
        }
    ]
});
