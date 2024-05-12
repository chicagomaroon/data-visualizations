Highcharts.chart('chart-div', {
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

    chart: {
        type: 'column'
    },

    title: {
        text: 'Student Plans After Graduation',
        align: 'center'
    },

    xAxis: {
        categories: ['2004', '2014', '2024 (projected)']
    },

    yAxis: {
        allowDecimals: false,
        labels: {
            format: '{text}%'
        },
        min: 0,
        max: 100,
        title: {
            text: 'Percentage of graduating class'
        }
    },

    tooltip: {
        format: '<b>{key}</b><br/>{series.name}: {y}%<br/>'
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },

    series: [
        {
            name: 'Employment',
            data: [79, 82, 78],
            stack: 'Europe'
        },
        {
            name: 'Continuing Education',
            data: [21, 18, 22],
            stack: 'Europe'
        }
    ]
});
