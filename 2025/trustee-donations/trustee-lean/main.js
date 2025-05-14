// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
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
    'Debra Cafaro',
    'Thomas Ricketts',
    'Mary Tolan',
    'Katherine Adams',
    'Hilary Krane',
    'Rachel Kohler',
    'Frank Baker II'
];

const demData = [
    851455, 1289700, 138758, 2167045, 142468, 7299, 852285, 1051006, 767442, 0,
    0, 616776, 450149, 443108, 383400
];

const repData = [
    5142641, 3887200, 1829400, 16250, 1558029, 1530667, 208055, 3000, 56501,
    649800, 645400, 2900, 13400, 19700, 0
];

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#155F83', '#800000'],

    // All code for your chart goes here
    title: {
        text: `Political Lean of 15 Largest Trustees' Donations`,
        align: 'center'
    },
    subtitle: {
        text: `While the Board's donation pattern as a whole leans to the right, individual trustees tend to be more liberal`,
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
        align: 'center',
        verticalAlign: 'bottom'
    },

    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat:
            '{series.name}: ${point.y:,.0f}<br/>Total: ${point.stackTotal:,.0f}'
    },

    plotOptions: {
        bar: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                format: '${y:,.0f}'
            }
        }
    },

    series: [
        {
            name: 'Democratic Donations',
            data: demData
        },
        {
            name: 'Republican Donations',
            data: repData
        }
    ]
});
