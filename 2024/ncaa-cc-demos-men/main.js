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
        text: "NCAA Men's Cross Country Athlete Demographics",
        align: 'center'
    },
    subtitle: {
        text: 'Source: <a href="https://www.ncaa.org/sports/2018/12/13/ncaa-demographics-database.aspx">NCAA Demographics Database</a>',
        align: 'center'
    },
    xAxis: {
        categories: ['2013', '2018', '2023']
    },
    yAxis: {
        allowDecimals: false,
        min: 0,
        max: 100,
        title: {
            text: 'Athlete Demographics (%)'
        }
    },
    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },

    series: [
        {
            name: 'Other',
            data: [16, 16, 17],
            stack: 'All Sports'
        },
        {
            name: 'Black',
            data: [16, 16, 17],
            stack: 'All Sports'
        },
        {
            name: 'White',
            data: [16, 16, 17],
            stack: 'All Sports'
        },
        {
            name: 'Other',
            data: [16, 16, 17],
            stack: 'Cross Country'
        },
        {
            name: 'Black',
            data: [16, 16, 17],
            stack: 'Cross Country'
        },
        {
            name: 'White',
            data: [16, 16, 17],
            stack: 'Cross Country'
        }
    ]
});
