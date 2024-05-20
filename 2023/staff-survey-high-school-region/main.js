Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#800000',
        '#FD4C4C',
        '#FFA319',
        '#155F83',
        '#FC0000',
        '#7D2525',
        '#C90000',
        '#58593F'
    ],

    // All code for your chart goes here
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'The Maroon Staff Survey 2023: U.S. High School Regions',
        align: 'center'
    },
    tooltip: {
        headerFormat:
            '<span style="font-size:11px;font-weight:bold;">{series.name}</span><br>',
        pointFormat:
            '<span>{point.name}</span>: {point.y:.1f}% of Maroon members'
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
                format: '<b>{point.name}</b>: {point.percentage:.1f}%'
            }
        }
    },
    series: [
        {
            name: 'High School Location',
            colorByPoint: true,
            data: [
                {
                    name: 'Mid-Atlantic',
                    y: 22.0
                },
                {
                    name: 'Midwest',
                    y: 18.0
                },
                {
                    name: 'Northeast',
                    y: 18.0
                },
                {
                    name: 'Northwest',
                    y: 2.0
                },
                {
                    name: 'Southeast',
                    y: 9.0
                },
                {
                    name: 'Southwest',
                    y: 9.0
                },
                {
                    name: 'West',
                    y: 16.0
                },
                {
                    name: 'Not in the U.S.',
                    y: 6.0
                }
            ]
        }
    ]
});
