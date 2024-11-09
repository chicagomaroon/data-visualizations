// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FD4C4C', '#FFA319', '#FC0000', '#7D2525', '#C90000'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },

    title: {
        text: 'High School Type',
        align: 'center'
    },

    tooltip: {
        headerFormat: '',
        pointFormat:
            '<b>{point.name}</b>: {point.y}%'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y}%'
            }
        }
    },
    series: [
        {
            name: 'High School Type',
            colorByPoint: true,
            data: [
                {
                    name: 'Boarding school',
                    y: 12
                },
                {
                    name: 'Public school',
                    y: 30
                },
                {
                    name: 'Religious school',
                    y: 7
                },
                {
                    name: 'Secular private day school',
                    y: 51
                }
            ]
        }
    ]
});
