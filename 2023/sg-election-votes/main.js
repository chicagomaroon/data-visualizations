// For API and chart documentation please look here:
// https://www.highcharts.com/demo

(function (H) {
    H.wrap(
        H.Legend.prototype,
        'colorizeItem',
        function (proceed, item, visible) {
            item.legendColor = item.options.legendColor;
            proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    );
})(Highcharts);

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#FFA319',
        '#800000',
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
    chart: {
        type: 'column'
    },
    title: {
        text: 'College Council Class of 2027 Election Results',
        align: 'left'
    },
    subtitle: {
        text: 'The top five candidates were elected.',
        align: 'left'
    },
    xAxis: {
        categories: [
            'Kevin Guo',
            'Demetrius Daniel',
            'Alex Fuentes',
            'Trinity Bledsoe',
            'Andrea Pita Medez',
            'Adan Betancourt',
            'Elena-Alexandra Balan',
            'Wael Kouki',
            'Angharad Seul'
        ]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Votes'
        },
        stackLabels: {
            enabled: true
        }
    },
    stackLabels: {
        enabled: true
    },
    legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 70,
        floating: true
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: false
            }
        }
    },
    series: [
        {
            name: 'Write-in Votes',
            label: {
                enabled: false
            },
            color: '#FFA319',
            data: [5, 2, 7, 4, 1, null, null, null, null]
        },
        {
            name: 'Write-in Votes',
            label: {
                enabled: false
            },
            linkedTo: ':previous',
            color: '#BFBFBF',
            data: [null, null, null, null, null, 1, 2, 1, 0]
        },
        {
            name: 'Ballot Votes',
            label: {
                enabled: false
            },
            color: '#800000',
            data: [231, 227, 213, 125, 123, null, null, null, null]
        },
        {
            name: 'Ballot Votes',
            label: {
                enabled: false
            },
            linkedTo: ':previous',
            color: '#818181',
            data: [null, null, null, null, null, 90, 86, 66, 40]
        }
    ]
});
