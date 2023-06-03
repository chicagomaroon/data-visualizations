// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        '#58593F',
        '#8A9045',
        '#FFA319',
        '#8F3931',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    // All code for your chart goes here
    chart: {
        type: 'area'
    },
    title: {
        text: 'Global Market Sizing and Growth Estimates for 2023'
    },
    xAxis: {
        categories: ['2012', '2022', '2032']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Market Share'
        }
    },
    legend: {
        reversed: true
    },
    tooltip: {
        pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.0f}%</b><br/>',
        shared: true
    },
    plotOptions: {
        area: {
            stacking: 'percent',
            marker: {
                enabled: false
            }
        }
    },
    series: [
        {
            name: 'Secondhand',
            data: [3, 9, 18]
        },
        {
            name: 'All Other Categories',
            data: [97, 91, 82]
        }
    ]
});
