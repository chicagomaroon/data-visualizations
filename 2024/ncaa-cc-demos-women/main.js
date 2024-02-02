Highcharts.chart('chart-div', {
    colors: ['#767676', '#FFA319', '#800000'],
    chart: {
        type: 'column'
    },
    title: {
        text: "NCAA Women's Cross Country Athlete Demographics",
        align: 'center'
    },
    subtitle: {
        text: 'Source: <a href="https://www.ncaa.org/sports/2018/12/13/ncaa-demographics-database.aspx">NCAA Demographics Database</a>',
        align: 'center'
    },
    xAxis: {
        categories: ['2013', '2018', '2023'],
        title: {
            text: "All Women's Sports Compared Against Women's Cross Country for a Given Year"
        }
    },
    yAxis: {
        allowDecimals: false,
        min: 0,
        max: 100,
        title: {
            text: 'Athlete Demographics (%)'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },
    tooltip: {
        formatter: function () {
            const stackName = this.series.userOptions.stack;

            return (
                '<b>' +
                stackName +
                ' in ' +
                this.x +
                '</b><br/><b>' +
                this.series.name +
                '</b>: ' +
                this.y +
                '%'
            );
        }
    },
    series: [
        {
            name: 'Other',
            data: [16, 20, 23],
            stack: 'All Sports'
        },
        {
            name: 'Black',
            data: [11, 11, 10],
            stack: 'All Sports'
        },
        {
            name: 'White',
            data: [73, 69, 67],
            stack: 'All Sports'
        },
        {
            name: 'Other',
            data: [16, 19, 20],
            stack: 'Cross Country'
        },
        {
            name: 'Black',
            data: [8, 8, 7],
            stack: 'Cross Country'
        },
        {
            name: 'White',
            data: [76, 74, 73],
            stack: 'Cross Country'
        }
    ]
});
