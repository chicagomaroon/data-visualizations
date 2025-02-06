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
    colors: ['#800000', '#FFA319'],

    title: {
        text: 'Enrollment at the Harris School of Public Policy',
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
            pointStart: 2020
        }
    },

    series: [
        {
            name: 'Total Enrollment',
            data: [1, 2, 3, 4, 5, 6, 7]
        }
    ]
});
