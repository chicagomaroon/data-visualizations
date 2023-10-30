// For API and chart documentation please look here:
// https://www.highcharts.com/demo
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
        text: 'First-Year Candidates Running for College Council: 2016 to 2023',
        align: 'center'
    },

    yAxis: {
        title: {
            text: 'Number of Candidates'
        },
        max: 20,
        min: 0
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2016 to 2023'
        },
        tickPositioner: function () {
            return [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2016
        }
    },

    series: [
        {
            data: [18, 18, 13, 14, 19, 18, 15, 9],
            name: 'Number of candidates',
            label: { enabled: false },
            showInLegend: false
        }
    ],

    responsive: {
        rules: [
            {
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }
        ]
    }
});
