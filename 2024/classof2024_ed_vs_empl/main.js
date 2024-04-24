Highcharts.chart('chart-div', {
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
        type: 'column'
    },
    title: {
        text: 'Student Plans After Graduation',
        align: 'left'
    },
    subtitle: {
        text:
            'Source: <a target="_blank" ' +
            'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
        align: 'left'
    },
    xAxis: {
        categories: ['2004', '2023', '2024'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Percentage'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Employment',
            data: [27.5, 77, 77]
        },
        {
            name: 'Further Education (professional degrees, PhDs, and academic masters programs)',
            data: [72.5, 22, 22]
        }
    ]
});