const seriesData = [
    {
        name: 'Landing Zone',
        data: [
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 0.0, 0.0, 139.0, 2.0, 11.0, 0.0, 29.0, 16.0, 0.0,
            6.0, 3.0, 40.0
        ]
    },
    {
        name: "O'Hare Airport",
        data: [
            11.0, 11.0, 56.0, 0.0, 32.0, 34.0, 95.0, 37.0, 31.0, 100.0, 170.0,
            292.0, 418.0, 472.0, 466.0, 502.0, 483.0, 828.0, 449.0, 660.0,
            536.0, 503.0, 580.0, 575.0, 276.0, 155.0, 176.0, 228.0, 216.0,
            240.0, 245.0, 263.0, 216.0, 188.0, 67.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            0.0
        ]
    },
    {
        name: 'Midway Airport',
        data: [
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 0.0, 0.0, 0.0, 8.0, 0.0, 0.0,
            21.0, 0.0, 8.0, 22.0, 28.0, 3.0, 10.0, 0.0, 1.0, 0.0, 3.0, 0.0, 0.0,
            0.0, 0.0, 0.0, 1.0, 0.0, 3.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0,
            0.0, 0.0
        ]
    },
    {
        name: 'Police Districts (All)',
        data: [
            459.0, 387.0, 460.0, 687.0, 760.0, 772.0, 860.0, 795.0, 695.0,
            932.0, 1100.0, 1347.0, 1576.0, 1539.0, 1641.0, 1496.0, 1741.0,
            2526.0, 3115.0, 3014.0, 2808.0, 2724.0, 1947.0, 1640.0, 1237.0,
            877.0, 399.0, 111.0, 35.0, 12.0, 17.0, 1.0, 12.0, 3.0, 2.0, 0.0,
            10.0, 4.0, 6.0, 4.0, 3.0
        ]
    }
];

const stagingCategories = [
    '6/9/2023',
    '6/16/2023',
    '6/23/2023',
    '6/30/2023',
    '7/7/2023',
    '7/14/2023',
    '7/21/2023',
    '7/28/2023',
    '8/4/2023',
    '8/11/2023',
    '8/18/2023',
    '8/25/2023',
    '9/1/2023',
    '9/8/2023',
    '9/15/2023',
    '9/22/2023',
    '9/29/2023',
    '10/6/2023',
    '10/13/2023',
    '10/20/2023',
    '10/27/2023',
    '11/3/2023',
    '11/10/2023',
    '11/17/2023',
    '11/24/2023',
    '12/1/2023',
    '12/8/2023',
    '12/15/2023',
    '12/22/2023',
    '12/29/2023',
    '1/5/2024',
    '1/12/2024',
    '1/19/2024',
    '1/26/2024',
    '2/2/2024',
    '2/9/2024',
    '2/16/2024',
    '2/23/2024',
    '3/1/2024',
    '3/8/2024',
    '3/15/2024'
];

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
    colors: ['#155F83', '#C16622', '#58593F', '#800000'],
    chart: {
        type: 'column'
    },
    title: {
        text: 'Total Migrants in Staging Areas from June 2023 to March 2024',
        align: 'center'
    },
    subtitle: {
        text: "Source: The 40th Ward Office's <a href=https://40thward.org/cirr/new-arrivals/new-arrivals-data-dashboard/>New Arrivals Data Dashboard</a>",
        align: 'center'
    },

    yAxis: {
        min: 0,
        title: {
            text: ''
        },
        labels: {
            formatter: function () {
                return Highcharts.numberFormat(this.value, 0, '', ',');
            }
        },
        stackLabels: {
            enabled: false
        }
    },
    legend: {
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 60,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false,
        layout: 'vertical'
    },
    xAxis: {
        categories: stagingCategories.map((date) => {
            return Highcharts.dateFormat('%b %d, %Y', new Date(date).getTime());
        })
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false
            }
        }
    },
    series: seriesData
});
