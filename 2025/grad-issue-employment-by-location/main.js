Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    colors: ['#800000', '#FFA319', '#8F3931', '#5c071e', '#f2ca46'],
    chart: {
        type: 'pie'
    },
    title: {
        text: 'The Most Popular Post-Graduation Locations for the Class of 2025',
        style: {
            color: '#000000'
        }
    },
    tooltip: {
        valueSuffix: '%'
    },

    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [
                {
                    enabled: true,
                    distance: 20
                },
                {
                    enabled: true,
                    distance: -40,
                    format: '{point.y}%',
                    style: {
                        fontSize: '0.8em',
                        textOutline: 'none',
                        opacity: 1
                    }
                }
            ]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Chicago',
                    y: 35
                },
                {
                    name: 'New York City',
                    y: 21
                },
                {
                    name: 'California',
                    y: 14
                },
                {
                    name: 'International',
                    y: 10
                },
                {
                    name: 'Other',
                    y: 20
                }
            ]
        }
    ]
});
