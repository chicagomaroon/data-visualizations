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
    'Dave McCormick',
    'Nikki Haley',
    'NRSC',
    'Americans for<br/>Prosperity',
    'Donald Trump'
];

const repData = [2134691, 1189980, 1131500, 1100000, 1005000];

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000'],

    // All code for your chart goes here
    title: {
        text: 'Top Republicans and Republican Organizations Donated to by Current Trustees Since 1979',
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
        tickInterval: 1000000,
        labels: {
            formatter: function () {
                return (
                    '$' + Highcharts.numberFormat(this.value / 1000000, 0) + 'M'
                );
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
            name: 'Republican Donations',
            data: repData
        }
    ]
});
