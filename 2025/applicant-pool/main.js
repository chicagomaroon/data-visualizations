Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    },
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FFA319'],
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Applicant Pool by Graduation Year',
        align: 'center',
        style: {
            fontSize: '20px'
        }
    },
    
    xAxis: {
        min: 2017,
        max: 2028,
        title: {
            text: 'Graduation Year'
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent'
    },
    tooltip: {
        formatter: function () {
            return (
                'The number of ' +
                this.series.name.toLowerCase() +
                ' for the Class of <b>' +
                this.x +
                '</b> is: <b>' +
                this.y
            );
        }
    },
    legend: {
        enabled: true,
        reversed: true
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                allowOverlap: false,
            }
        },
        series: {
            pointStart: 2017,
            stacking: 'normal',
            dataLabels: {
                enabled: false
            }
        }
    },
    
    series: [
        {
            name: 'Applicants',
            label: {
                enabled: false
            },
            data: [30369,
                27503,
                30162,
                31484,
                27694,
                32291,
                34900,
                34372,
                37977,
                37522,
                38800,
                43612]
        },
        {name: 'Admitted Students',
            label: {
                enabled: false
            },
            data: [2676,
                2304,
                2356,
                2499,
                2419,
                2329,
                2065,
                2511,
                2460,
                2041,
                1849,
                1955]
        }
    ]
});