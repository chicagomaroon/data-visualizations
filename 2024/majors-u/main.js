// For API and chart documentation please look here:
// https://www.highcharts.com/demo

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div', {
    colors: ['#800000', '#FFA319'],

    title: {
        text: 'Percentage of Economics and Computer Science Students',
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
            text: 'Percentage of Students'
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
            name: 'Economics Students',
            connectNulls: true,
            data: [
                16.2, 16.4, 17.9, 17.5, null, 16.3, null, null, 16.3, 14.9, 14.5, 14.1, 14.2, 13.8, 14.2, 15.4, 15.2, 17.1, null, 17.1, 17.2, 16.6, 15.1, 12.8, 13.7, 9.6, 10.1, 9.2, 11.1, 11.7, 11.3, 11.7, 10.8, 11.6, 13.3, 14.0, 13.3, 13.2, 13.5, 15.1, 17.2, 17.9, 18.3, 18.0, 18.9, 21.6
            ]
        },
        {
            name: 'Computer Science Students',
            connectNulls: true,
            data: [
                0, 0, 0, 0, null, 0.17, null, null, 0.68, 0.78, 1.0, 1.1, 1.2, 1.1, 1.0, 0.81, 1.4, 1.7, null, 3.1, 1.6, 1.9, 2.1, 1.7, 1.6, 0.64, 0.69, 0.59, 0.61, 0.54, 0.69, 0.70, 0.20, 1.6, 2.0, 2.6, 3.0, 3.5, 4.1, 4.7, 4.9, 5.5, 5.5, 6.6, 6.4, 7.3
            ]
        }
    ]
});
