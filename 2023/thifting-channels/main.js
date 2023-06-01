// For API and chart documentation please look here:
// https://www.highcharts.com/demo
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
        type: 'column'
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
    tooltip: {
        pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [
        {
            name: 'Off Price',
            data: [11, 16, 19]
        },
        {
            name: 'Secondhand',
            data: [3, 9, 18]
        },
        {
            name: 'Mid-Priced Specialty',
            data: [25, 16, 12]
        },
        {
            name: 'Direct to Consumer',
            data: [4, 11, 12]
        },
        {
            name: 'Value Chains',
            data: [12, 14, 10]
        },
        {
            name: 'Fast Fashion',
            data: [8, 9, 9]
        },
        {
            name: 'Other Retailers',
            data: [15, 11, 9]
        },
        {
            name: 'Department Stores',
            data: [20, 10, 5]
        },
        {
            name: 'Amazon Fashion',
            data: [1, 3, 5]
        },
        {
            name: 'Rental and Subscription',
            data: [1, 1, 1]
        }
    ]
});
