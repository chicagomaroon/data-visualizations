// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

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
        text: 'Acceptance Rate by Graduation Year'
    },

    legend: {
        enabled: false
    },

    yAxis: {
        title: {
            text: 'Acceptance Rate (%)'
        }
    },

    xAxis: {
        title: {
            text: 'Graduation Year'
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent'
    },

    plotOptions: {
        line: {
            dataLabels: {
                enabled: true,
                allowOverlap: false,
            },
        },
        series: {
            pointStart: 2017,
            marker: {
                enabled: false
            },
            lineWidth: 3
        }
    },

    tooltip: {
        formatter: function () {
            return (
                'The ' +
                this.series.name.toLowerCase() +
                ' for the Class of <b>' +
                this.x +
                '</b> is: <b>' +
                this.y +
                '%</b>'
            );
        }
    },

    series: [
        {
            name: 'Acceptance rate',
            label: {
                enabled: false
            },
            data: [8.81, 8.38, 7.81, 7.94, 8.73, 7.21, 5.92, 7.31, 6.48, 5.44, 4.78, 4.48]
        }
    ]
});