const seriesData = [
    {
        name: 'Loop',
        data: [
            2458.0, 2285.0, 2482.0, 2535.0, 2575.0, 2608.0, 2637.0, 2686.0,
            2694.0, 2685.0, 2659.0, 2737.0, 2719.0, 2682.0, 2723.0, 2721.0,
            2701.0, 2347.0, 2722.0, 2700.0, 2691.0, 2727.0, 2704.0, 2664.0,
            2663.0, 2655.0, 2580.0, 2607.0, 2762.0, 2805.0, 2875.0, 2734.0,
            2689.0, 2649.0, 2491.0, 2423.0, 2286.0, 2258.0, 2242.0, 2171.0,
            2185.0
        ]
    },
    {
        name: 'North',
        data: [
            887.0, 864.0, 897.0, 908.0, 924.0, 985.0, 1003.0, 1214.0, 1663.0,
            1737.0, 1991.0, 2012.0, 2079.0, 2085.0, 2245.0, 2655.0, 2810.0,
            3007.0, 2946.0, 3093.0, 3090.0, 3054.0, 3056.0, 2973.0, 2896.0,
            3043.0, 3013.0, 3029.0, 3005.0, 2995.0, 2955.0, 2972.0, 3005.0,
            2807.0, 2774.0, 2615.0, 2482.0, 2419.0, 2344.0, 2329.0, 2275.0
        ]
    },
    {
        name: 'South',
        data: [
            1015.0, 1257.0, 1251.0, 1432.0, 1467.0, 1483.0, 1571.0, 1665.0,
            1499.0, 1508.0, 1515.0, 1578.0, 1664.0, 2027.0, 2202.0, 2203.0,
            2272.0, 2671.0, 3145.0, 3238.0, 3549.0, 3561.0, 3537.0, 3634.0,
            3749.0, 4280.0, 4541.0, 4609.0, 4805.0, 4965.0, 4989.0, 4993.0,
            4876.0, 4628.0, 4564.0, 4346.0, 4267.0, 4121.0, 3992.0, 3740.0,
            3451.0
        ]
    },
    {
        name: 'West',
        data: [
            287.0, 287.0, 200.0, 197.0, 200.0, 192.0, 196.0, 198.0, 198.0,
            198.0, 195.0, 200.0, 200.0, 197.0, 200.0, 881.0, 1578.0, 1835.0,
            2205.0, 2247.0, 2419.0, 2408.0, 2828.0, 2850.0, 2890.0, 3244.0,
            3466.0, 3788.0, 3933.0, 3935.0, 3915.0, 4125.0, 4079.0, 4004.0,
            3920.0, 3772.0, 3687.0, 3552.0, 3506.0, 3352.0, 3296.0
        ]
    }
];

const shelterCategories = [
    '06-09-2023',
    '06-16-2023',
    '06-23-2023',
    '06-30-2023',
    '07-07-2023',
    '07-14-2023',
    '07-21-2023',
    '07-28-2023',
    '08-04-2023',
    '08-11-2023',
    '08-18-2023',
    '08-25-2023',
    '09-01-2023',
    '09-08-2023',
    '09-15-2023',
    '09-22-2023',
    '09-29-2023',
    '10-06-2023',
    '10-13-2023',
    '10-20-2023',
    '10-27-2023',
    '11-03-2023',
    '11-10-2023',
    '11-17-2023',
    '11-24-2023',
    '12-01-2023',
    '12-08-2023',
    '12-15-2023',
    '12-22-2023',
    '12-29-2023',
    '01-05-2024',
    '01-12-2024',
    '01-19-2024',
    '01-26-2024',
    '02-02-2024',
    '02-09-2024',
    '02-16-2024',
    '02-23-2024',
    '03-01-2024',
    '03-08-2024',
    '03-15-2024'
];

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#155F83', '#C16622', '#58593F'],
    chart: {
        type: 'column'
    },
    title: {
        text: 'Total Migrants at Shelters From June 2023 to March 2024',
        align: 'center'
    },
    subtitle: {
        text: "Source: The 40th Ward Office's <a href=https://40thward.org/cirr/new-arrivals/new-arrivals-data-dashboard/>New Arrivals Data Dashboard</a> ",
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
        x: 100,
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
        categories: shelterCategories.map((date) => {
            return Highcharts.dateFormat('%b %d, %Y', new Date(date).getTime());
        }),
        type: 'datetime'
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
