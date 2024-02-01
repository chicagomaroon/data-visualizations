Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#FFA319', '#C16622', '#800000'],
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
    legend: {
        enabled: false
    },
    yAxis: {
        allowDecimals: false,
        min: 0,
        max: 100,
        title: {
            text: 'Athlete Demographics (%)'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        series: {
            pointStart: 2014
        },
        column: {
            stacking: 'normal'
        }
    },
    series: [
        {
            name: 'Other',
            data: [16, 17, 18, 19, 20, 20, 20, 21, 21, 21]
        },
        {
            name: 'Black',
            data: [8, 8, 8, 9, 9, 9, 9, 8, 8, 8]
        },
        {
            name: 'White',
            data: [76, 75, 74, 73, 71, 71, 71, 71, 71, 71]
        }
    ]
});
