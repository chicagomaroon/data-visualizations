Highcharts.setOptions({
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
            pointStart: 2003
        }
    },

    series: [
        {
            name: 'Total Enrollment',
            data: [
                265, 252, 248, 272, 257, 278, 307, 294, 303, 308, 336, 354, 354,
                369, 502, 774, 915, 1006, 1089, 1200, 1123
            ]
        },
        {
            name: 'New Students',
            data: [
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                155,
                142,
                178,
                162,
                109,
                122,
                309,
                344,
                410,
                421,
                536,
                557,
                519
            ]
        }
    ]
});
