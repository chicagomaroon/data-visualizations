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

    // All code for your chart goes here
    title: {
        text: 'Applicants and Enrollment from 2014 to 2023',
        align: 'center'
    },
    subtitle: {
        text: `While both increased, growth in applicants outpaced growth in enrollment.<br/>`,
        align: 'center'
    },

    xAxis: {
        categories: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
    },
    yAxis: {
        title: {
            text: ''
        },
        labels: {
            format: '{value:,.0f}',
            step: 2
        },
        max: 40000,
        tickInterval: 5000
    },

    plotOptions: {
        series: {
            lineWidth: 5,
            marker: {
                enabled: false
            }
        }
    },
    annotations: [
        {
            draggable: '',
            labelOptions: {
                borderRadius: 0,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                borderWidth: 0,
                borderColor: '#AAA'
            },
            labels: [
                {
                    point: 'aMax',
                    y: 68,
                    align: 'right',
                    style: {
                        fontSize: '15px'
                    },
                    text: '<span style="color:#800000">+30% in applicants <br>since 2014'
                },
                {
                    point: 'e',
                    align: 'right',
                    x: -10,
                    style: {
                        fontSize: '14px'
                    },
                    text: '<span style="color:black">+25% in enrollment'
                }
            ]
        }
    ],
    legend: {
        enabled: false
    },

    series: [
        {
            name: 'Applicants',
            label: {
                enabled: false
            },
            data: [
                27500,
                30069,
                31484,
                27694,
                32283,
                34641,
                34350,
                37958,
                37500,
                { y: 38622, id: 'aMax' }
            ]
        },
        {
            name: 'Enrollment',
            color: 'black',
            label: {
                enabled: false
            },
            data: [
                5608,
                5800,
                5976,
                6295,
                6600,
                6801,
                7011,
                { y: 7559, id: 'eText' },
                { y: 7512, id: 'eMax' },
                { y: 7489, id: 'e' }
            ]
        },
        {
            type: 'arearange',
            data: [
                [5608, 27500],
                [5800, 30069],
                [5976, 31484],
                [6295, 27694],
                [6600, 32283],
                [6801, 34641],
                [7011, 34350],
                [7559, 37958],
                [7512, 37500],
                [7489, 38622]
            ],
            showInLegend: false,
            enableMouseTracking: false,
            lineWidth: 0,
            color: '#80000020'
        }
    ]
});
