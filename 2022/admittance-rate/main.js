// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#C76363',
        '#C04A49',
        '#A42323',
        '#7F1416',
        '#571612',
        '#3D3D3D',
        '#392F83',
        '#184F26'
    ],

    // All code for your chart goes here
    title: {
        text: 'Admittance Rate by Graduation Year'
    },

    legend: {
        enabled: false
    },

    yAxis: {
        title: {
            text: 'Admission Rate (%)'
        }
    },

    xAxis: {
        title: {
            text: 'Graduation Year'
        }
    },

    plotOptions: {
        series: {
            pointStart: 2017
        }
    },

    tooltip: {
        formatter: function () {
            return (
                'The ' +
                this.series.name.toLowerCase() +
                ' for <b>' +
                this.x +
                '</b> is: <b>' +
                this.y +
                '%</b>'
            );
        }
    },

    series: [
        {
            name: 'Admittance rate',
            label: {
                enabled: false
            },
            data: [8.8, 8.4, 7.8, 7.9, 8.7, 7.2, 5.9, 7.3, 6.5, 5.4]
        }
    ]
});
