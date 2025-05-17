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

    subtitle: {
        text: 'The acceptance rate has decreased by roughly half over the past decade, from the class of 2017 to the class of 2028.'
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
            text: ''
        },
        minorTickLength: 0,
        tickLength: 0,
    },

    plotOptions: {
        series: {
            pointStart: 2017,
            marker: {
                enabled: false
            },
            lineWidth: 2
        }
    },

    tooltip: {
        formatter: function () {
            return (
                'The ' +
                this.series.name.toLowerCase() +
                ' for the class of <b>' +
                this.x +
                '</b> was: <b>' +
                this.y +
                '%</b>'
            );
        }
    },

    annotations: [{
          draggable: '',
            labelOptions: {
                borderRadius: 0,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderWidth: 0,
                borderColor: '#AAA'},
    labels: [{
        point: {
            xAxis: 0,
            yAxis: 0,
            x: 0, // 2017 is pointStart, so index 0
            y: 8.81
        },
        text: 'Highest: 8.81% (2017)'
    }, {
        point: {
            xAxis: 0,
            yAxis: 0,
            x: 11, // 2017 + 11 = 2028
            y: 4.48
        },
        text: 'Lowest: 4.48% (2028)'
    }],
    labelOptions: {
        align: 'right',
        verticalAlign: 'top'
    }
}],

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