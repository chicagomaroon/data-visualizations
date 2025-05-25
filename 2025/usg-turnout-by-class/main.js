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
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Ballots Cast for the 2025 Spring USG Election by Class',
        align: 'center'
    },
    xAxis: {
        categories: [
            'First-Years',
            'Second-Years',
            'Third-Years',
            'Fourth-Years'
        ]
    },
    yAxis: {
        min: 0,
        max: 350,
        labels: {
            enabled: true,
            step: 2
        },
        title: {
            text: ''
        }
    },
    stackLabels: {
        enabled: false
    },
    legend: {
        enabled: false
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
            return `<b>${this.y}</b> ballots cast by <b>${this.key}</b>`;
        }
    },
    series: [
        {
            name: 'Ballots cast',
            label: {
                enabled: false
            },
            data: [335, 189, 274, 94]
        }
    ]
});
