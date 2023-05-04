// For API and chart documentation please look here:
// https://www.highcharts.com/demo
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
Highcharts.chart('#chart-div', {
    title: {
        text: 'Admittance Rate by Graduation Year'
    },

    yAxis: {
        title: {
            text: 'Admission Rate (%)'
        }
    },

    xAxis: {
        title: {
            text: 'Graduation Year'
        },
        tickInterval: 1
    },

    plotOptions: {
        series: {
            // PUT STARTING SPACE FOR YOUR DATA
            pointStart: 2010
        }
    },

    series: [
        {
            name: 'Admittance rates',
            data: [8.8, 8.4, 7.8, 7.9, 8.7, 7.2, 5.9, 7.3, 6.5, 5.4]
        }
    ]
});
