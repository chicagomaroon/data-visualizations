// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#FD4C4C', '#800000', '#FFA319', '#FC0000', '#7D2525', '#C90000'],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'The Maroon Staff Survey 2024: First-Generation, Low Income Status',
        align: 'center'
    },
    tooltip: {
        headerFormat: '',
        pointFormat:
            '<span style="font-size:11px;font-weight:bold;">{point.name}</span>: {point.percentage:.1f}% of Maroon members ({point.y})'
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
                format: '<b>{point.name}</b>: {point.percentage:.1f}% ({point.y})'
            }
        }
    },
    series: [
        {
            name: 'FGLI Status',
            colorByPoint: true,
            data: [
                {
                    name: 'Prefer Not to Disclose',
                    y: 1
                },
                {
                    name: 'Low Income',
                    y: 3
                },
                {
                    name: 'First-Generation',
                    y: 0
                },
                {
                    name: 'First-Generation and Low Income',
                    y: 0
                },
                {
                    name: 'Neither',
                    y: 36
                }
            ]
        }
    ]
});
