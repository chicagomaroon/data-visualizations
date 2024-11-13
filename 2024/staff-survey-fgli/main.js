// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#FD4C4C', '#FFA319', '#7D2525', '#FC0000', '#800000', '#C90000'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'First-Generation, Low-Income Status',
        align: 'center'
    },
    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="font-size:11px;font-weight:bold;">{point.name}</span>: {point.y}%'
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
            name: 'FGLI Status',
            colorByPoint: true,
            data: [
                {
                    name: 'Prefer not to disclose',
                    y: 2
                },
                {
                    name: 'Low-income only',
                    y: 8
                },
                {
                    name: 'First-generation only',
                    y: 0
                },
                {
                    name: 'First-generation and low-income',
                    y: 0
                },
                {
                    name: 'Neither',
                    y: 90
                }
            ]
        }
    ]
});
