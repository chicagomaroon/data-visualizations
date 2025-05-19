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

const pacs = [
    'Democratic National<br/>Committee',
    'Joe Biden',
    'Hilary Clinton',
    'DSCC',
    'Kamala Harris'
];

const demData = [1936650, 1043975, 899716, 838259, 582206];

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#155F83'],

    // All code for your chart goes here
    title: {
        text: 'Top Democrats and Democratic Organizations Donated to by Current Trustees Since 1979',
        align: 'center'
    },

    chart: {
        type: 'bar'
    },
    legend: {
        enabled: false
    },

    xAxis: {
        categories: pacs,
        title: {
            text: ''
        },
        crosshair: true
    },

    yAxis: {
        title: {
            text: ''
        },
        tickInterval: 500000,
        labels: {
            formatter: function () {
                return this.value >= 1000000
                    ? '$' +
                          Highcharts.numberFormat(this.value / 1000000, 1) +
                          'M'
                    : '$' + Highcharts.numberFormat(this.value / 1000, 0) + 'K';
            }
        }
    },

    tooltip: {
        pointFormat: '<b>${point.y:,.0f}</b>',
        shared: true
    },

    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    return '$' + Highcharts.numberFormat(this.y, 0, '.', ',');
                },
                color: '#FFFFFF',
                align: 'right',
                inside: true,
                style: {
                    textOutline: 'none',
                    fontWeight: 'bold'
                }
            }
        },
        series: {
            groupPadding: 0,
            pointPadding: 0.05
        }
    },

    series: [
        {
            name: 'Democratic Donations',
            data: demData
        }
    ]
});
