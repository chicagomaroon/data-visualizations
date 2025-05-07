Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
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

    // All code for your chart goes here
    title: {
        text: 'USG Spring Election Turnout Rate Over Time'
    },

    legend: {
        enabled: false
    },

    yAxis: {
        title: {
            text: 'Turnout Rate (% of undergrad. pop.)'
        },
        gridLineColor: 'transparent',
        labels: {
            enabled: false
        },
        plotLines: [{
            color: 'gray',
            fontColor: 'gray',
            width: 1,
            value: 73,
            label: {
                text: '73% turnout (2016)',
                align: 'center',
                x: 80,
                y: -5
            }
        },
        {
            color: 'gray',
            width: 1,
            value: 20,
            label: {
                text: '20% turnout',
                align: 'left',
                x: 10,
                y: -5
            }
        },
        {
            color: 'gray',
            width: 1,
            value: 12,
            label: {
                text: '12% turnout (2025)',
                align: 'right',
                x: -10,
                y: 15
            }
        }]
    },

    xAxis: {
        title: {
            text: 'Election year'
        }
    },

    plotOptions: {
        series: {
            pointStart: 2006,
            marker: {
                enabled: false
            },
            lineWidth: 3
        }
    },

    tooltip: {
        formatter: function () {
            return `<b>${this.y}%</b> turnout in <b>${this.key}</b>`;
        }
    },

    series: [
        {
            name: 'Turnout Rate',
            label: {
                enabled: false
            },
            data: [41,
                41,
                37,
                32,
                null,
                null,
                null,
                null,
                23,
                39,
                73,
                18,
                21,
                44,
                21,
                17,
                12,
                15,
                19,
                12,]
        }
    ],
});
