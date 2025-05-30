// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
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
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Top Six Campaign Donation Sources for Robert Peters (Illinois Senate)',
        align: 'center'
    },
    subtitle: {
        text: 'Robert Peters raised a total of $271,134.',
        align: 'center'
    },
    tooltip: {
        valuePrefix: '$',
        valueSuffix: '.00'
    },

    plotOptions: {
        series: {
            dataLabels: [
                {
                    enabled: true,
                    distance: 20
                },
                {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.0f}%',
                    style: {
                        fontSize: '0.7em',
                        textOutline: 'none',
                        opacity: 1
                    }
                }
            ]
        }
    },
    series: [
        {
            name: 'Contribution',
            colorByPoint: true,
            data: [
                {
                    name: 'Rebecca Janowitz Campaign',
                    y: 59000
                },
                {
                    name: 'Chicago Teachers Union\nLocal 1 PAC',
                    y: 20000
                },
                {
                    name: 'Chicagoland Operators Joint Labor-Management PAC',
                    y: 11000
                },
                {
                    name: 'Aggregated Unitemized Contributions',
                    y: 10359
                },
                {
                    name: 'LIUNA Chicago Laborers District Council PAC',
                    y: 10000
                },
                {
                    name: 'Illinois Laborers Legislative Committee',
                    y: 10000
                }
            ]
        }
    ]
});
