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

const names = [
    'Greg Wendt',
    'Antonio Gracias',
    'Donald Wilson Jr.',
    'John Rogers Jr.',
    'Byron Trott',
    'John Liew',
    'Michael Polsky',
    'Daniel Doctoroff',
    'Debra Cafaro'
];

const totals = [
    6042796, 5181900, 3016458, 2306795, 1729747, 1557966, 1093340, 1090606,
    1089193
];

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#350E20'],

    // All code for your chart goes here
    title: {
        text: `Top Lifetime Political Contributors Among Current Trustees`,
        align: 'center'
    },

    chart: {
        type: 'bar'
    },

    xAxis: {
        categories: names,
        tickInterval: 1,
        title: {
            text: ''
        },
        labels: {
            enabled: true,
            autoRotation: [-45],
            style: {
                fontSize: '11px'
            }
        }
    },

    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        tickInterval: 1000000,
        stackLabels: {
            enabled: false
        },
        labels: {
            formatter: function () {
                return (
                    '$' + Highcharts.numberFormat(this.value / 1000000, 0) + 'M'
                );
            }
        }
    },

    legend: {
        enabled: false
    },

    tooltip: {
        pointFormat: '${point.y:,.0f}'
    },

    plotOptions: {
        bar: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                format: '${y:,.0f}'
            }
        },
        series: {
            groupPadding: 0,
            pointPadding: 0.05
        }
    },

    series: [
        {
            name: 'Total Lifetime Contributions',
            data: totals
        }
    ]
});
