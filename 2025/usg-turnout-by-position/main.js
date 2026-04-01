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
        '#FFA319',
        '#800000',
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
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Student Body Turnout for the 2025 Spring USG Election by Position',
        align: 'center'
    },
    xAxis: {
        categories: [
            'Executive Slate',
            'Trustee',
            'VP of Advocacy',
            'VP of Campus Life',
            'VP of Student Affairs'
        ]
    },
    yAxis: {
        min: 0,
        max: 100,
        labels: {
            enabled: false
        },
        gridLineColor: 'transparent',
        title: {
            text: ''
        }
    },
    stackLabels: {
        enabled: true
    },
    legend: {
        enabled: true
    },
    plotOptions: {
        bar: {
            stacking: 'normal',
            dataLabels: {
                enabled: false
            }
        }
    },
    tooltip: {
        formatter: function () {
            return `<b>${
                this.y
            }%</b> ${this.series.name.toLowerCase()}<br>for <b>${this.key}</b>`;
        }
    },
    series: [
        {
            name: 'Did not vote',
            label: {
                enabled: false
            },
            color: '#dddddd',
            legendIndex: 2,
            data: [88, 88, 88, 88, 88]
        },
        {
            name: 'Abstained',
            label: {
                enabled: false
            },
            legendIndex: 1,
            data: [1, 4, 5, 5, 8]
        },
        {
            name: 'Voted',
            label: {
                enabled: false
            },
            legendIndex: 0,
            data: [11, 8, 7, 7, 4]
        }
    ]
});
