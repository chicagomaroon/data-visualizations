Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

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
        text: 'The Maroon Staff Survey 2023: Reported Family Income',
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
            name: 'Reported Family Income',
            colorByPoint: true,
            data: [
                {
                    name: '< $65K',
                    y: 2.0
                },
                {
                    name: '$65K to $100K',
                    y: 4.0
                },
                {
                    name: '$100K to $150K',
                    y: 2.0
                },
                {
                    name: '$150K to $200K',
                    y: 12.0
                },
                {
                    name: '$200K to $250K',
                    y: 7.0
                },
                {
                    name: '$250K to $500K',
                    y: 19.0
                },
                {
                    name: 'More than $500K',
                    y: 19.0
                },
                {
                    name: 'Prefer Not to Disclose',
                    y: 35.0
                }
            ]
        }
    ]
});
