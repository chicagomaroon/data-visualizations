// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        '#FFA319',
        '#C16622',
        '#8F3931',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
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
