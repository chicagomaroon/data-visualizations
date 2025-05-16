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
        text: `UChicago's Current Board of Trustees by Profession`,
        align: 'center'
    },

    xAxis: {
        title: {
            text: 'Profession'
        },
        type: 'category'
    },

    yAxis: {
        title: {
            text: 'Count'
        }
    },

    legend: {
        enabled: false
    },

    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                format: '{point.name} ({point.y})'
            },
            colorByPoint: true
        }
    },

    series: [
        {
            name: 'Count',
            type: 'pie',
            data: [
                ['Investment Banking and <br/>Private Equity', 25],
                ['Business', 6],
                ['Technology and <br/>Entrepreneurship', 5],
                ['Other', 5],
                ['Medicine and <br/>Pharmaceuticals', 5],
                ['Law', 2],
                ['Journalism', 2]
            ]
        }
    ]
});
