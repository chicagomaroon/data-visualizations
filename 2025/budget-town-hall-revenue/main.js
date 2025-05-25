// For API and chart documentation please look here:
// https://www.highcharts.com/demo
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
        text: 'Operating Revenue, Fiscal Year 2025',
        align: 'center'
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.point.name + '</b>' + ': ' + this.y + '%';
        }
    },

    accessibility: {
        valueSuffix: '%'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        type: 'category'
    },

    yAxis: {
        title: {
            enabled: false
        }
    },

    series: [
        {
            // innerSize: '60%', // donut
            dataLabels: [
                {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                    style: {
                        align: 'center'
                    }
                },
                {
                    enabled: true,
                    format: '{point.y}%',
                    distance: -30,
                    style: {
                        align: 'center'
                    }
                }
            ],
            data: [
                { name: 'Auxiliaries', y: 6 },
                { name: 'Other income', y: 9 },
                { name: 'Deficit', y: 6 },
                { name: 'Tuition and fees', y: 20 },
                { name: 'Federal grants<br>and contracts', y: 18 },
                { name: 'Private gifts', y: 5 },
                { name: 'Endowment payout', y: 5 },
                { name: 'Patient care', y: 13 }
            ]
        }
    ]
});
