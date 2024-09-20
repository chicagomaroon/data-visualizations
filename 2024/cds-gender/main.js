// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    },

    colors: [
        // '#FFA319',
        '#C16622',
        '#8F3931',
        '#800000',
        '#8A9045',
        '#58593F',
        '#155F83',
        '#350E20',
        '#47B5FF',
        '#FF3399'
    ],

    xAxis: {
        categories: [
            2014,
            2015,
            2016,
            2017,
            2018,
            2019,
            2020,
            2021,
            2022,
            2023,
            ''
        ],
        endOnTick: false,
        max: 10
    },

    yAxis: {
        labels: {
            format: '{value}%'
        },
        title: {
            enabled: false
        }
    }
});

Highcharts.chart('chart-admit', {
    // data: {
    //     csvURL: window.location.origin + '/gender.csv'
    // },

    chart: {
        type: 'line'
    },

    title: {
        text: 'Admission Rates by Gender from 2014-2023',
        align: 'center',
        margin: 40
    },

    subtitle: {
        text: 'Female admission rate is lower than male.'
    },

    legend: {
        enabled: false
    },

    plotOptions: {
        line: {
            marker: false
        }
    },

    annotations: [
        {
            labels: [
                {
                    point: 'mmax',
                    text: 'Male',
                    y: 15,
                    style: {
                        color: '#C16622'
                    }
                },
                {
                    point: 'fmax',
                    text: 'Female',
                    y: 20,
                    style: {
                        color: '#8F3931'
                    }
                },
                {
                    point: 'omax',
                    text: 'Overall',
                    y: 15,
                    style: {
                        color: '#800000'
                    }
                }
            ],
            labelOptions: {
                draggable: '',
                color: 'black',
                backgroundColor: 'none',
                borderColor: 'none',
                align: 'right',
                x: 70,
                style: {
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            }
        }
    ],

    series: [
        {
            name: 'Male',
            data: [
                9.2,
                9.2,
                8.5,
                9.4,
                7.9,
                6.8,
                8.3,
                7.2,
                6.3,
                { y: 5.7, id: 'mmax' }
            ],
            lineWidth: 2,
            dashStyle: 'Dash',
            id: 'male'
        },
        {
            name: 'Female',
            data: [
                8.4,
                7.7,
                7.5,
                8.1,
                6.7,
                5.7,
                6.5,
                5.9,
                4.7,
                { y: 4.0, id: 'fmax' }
            ],
            lineWidth: 2,
            dashStyle: 'Dot'
        },
        {
            name: 'Overall',
            data: [
                8.8,
                8.4,
                7.9,
                8.7,
                7.3,
                6.2,
                7.3,
                6.5,
                5.4,
                { y: 4.8, id: 'omax' }
            ],
            lineWidth: 3,
            dashStyle: 'solid'
        }
    ],

    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.category}, {point.y:.1f}%.'
        }
    },

    tooltip: {
        pointFormat: '{series.name}: {point.y:.1f}%',
        split: true
    }
});
