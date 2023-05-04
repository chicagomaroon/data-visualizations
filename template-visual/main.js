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
        text: '[TITLE]',
        align: 'center'
    },

    plotOptions: {
        series: {
            // PUT PLOT CONFIG OPTIONS HERE SPACE FOR YOUR DATA
        }
    },

    series: [
        {
            name: '[DATA FIELD NAME]',
            label: {
                enabled: false
            },
            data: []
        }
    ]
});
