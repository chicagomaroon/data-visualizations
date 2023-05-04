// For API and chart documentation please look here:
// https://www.highcharts.com/demo
am5.ready(function () {
    // Setting themes and default colors
    Highcharts.theme = {
        colors: [
            '#C76363',
            '#C04A49',
            '#A42323',
            '#7F1416',
            '#571612',
            '#3D3D3D',
            '#392F83',
            '#184F26'
        ]
    };
    Highcharts.setOptions(Highcharts.theme);

    // All code for your chart goes here
    Highcharts.chart('chart-div', {
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
                data: []
            }
        ]
    });
});
