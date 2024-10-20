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
        text: 'Total Donations by Candidate and Race',
        align: 'center'
    },

    subtitle: {
        text: 'Candidates with known donation information raised $464K on average',
        align: 'center',
        style: {
            fontSize: '18px'
        }
    },

    tooltip: {
        formatter: function () {
            return (
                '<b>' +
                this.point.name +
                '</b>' +
                ': ' +
                '$' +
                Highcharts.numberFormat(this.y, 0, ',')
            );
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
            format: '${text}',
            style: {
                fontSize: '16px'
            }
        },
        tickPositions: [
            0, 100000, 200000, 300000, 400000, 500000, 600000, 650000
        ],
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
            name: 'Total donations',
            label: {
                enabled: false
            },
            data: [
                { name: 'Jonathan Jackson (U.S. House)', y: 578000 },
                { name: 'Kambium Buckner (IL House)', y: 543076 },
                { name: 'Robert Peters (IL Senate)', y: 271134 }
            ]
        }
    ]
});
