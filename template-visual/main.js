// For API and chart documentation please look here:
// https://www.highcharts.com/demo
am5.ready(function () {
    // Setting themes and default colors
    Highcharts.chart('chart-div', {
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
                // PUT STARTING SPACE FOR YOUR DATA
                pointStart: 2010
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
});
