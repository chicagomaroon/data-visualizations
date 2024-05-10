// For API and chart documentation please look here:
// https://www.highcharts.com/demo

Highcharts.chart('chart-div', {
    colors: ['#800000', '#FFA319'],

    title: {
        text: 'Undergraduate Population',
        align: 'center'
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

    yAxis: {
        title: {
            text: 'Number of Students'
        }
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 1979
        }
    },

    series: [
        {
            name: 'Total Enrollment',
            data: [
                2715, 2755, 2867, 2870, 2920, 2981, 2977, 3166, 3254, 3332, 3433, 3478, 3447, 3425, 3435, 3478, 3554, 3616, 3756, 3852, 3917, 3996, 4064, 4216, 4344, 4515, 4642, 4780, 4894, 5026, 5098, 5252, 5369, 5607, 5692, 5724, 5860, 5971, 6286, 6595, 6790, 7001, 7550, 7496, 7535, 7398


            ]
        },
        
    ]
});
