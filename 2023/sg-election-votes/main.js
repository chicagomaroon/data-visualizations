// For API and chart documentation please look here:
// https://www.highcharts.com/demo

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
        text: 'Election Results for the College Council Class of 2027',
        align: 'center'
    },
    subtitle: {
        text: 'The top five candidates are elected to office.',
        align: 'center'
    },
    caption: {
        text: 'Note: Candidates with asterisks (*) received a three percent vote deduction. This reduction has been included in the vote totals.'
    },
    // add asterisk to candidates with 3% votes deductions
    xAxis: {
        categories: [
            'Kevin Guo',
            'Demetrius Daniel*',
            'Alex Fuentes',
            'Trinity Bledsoe*',
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
        enabled: false
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
            data: [5, 2, 7, 4, 1, 1, 2, 1, 0]
        },
        {
            name: 'Ballot Votes',
            label: {
                enabled: false
            },
            color: '#800000',
            data: [231, 220, 213, 121, 123, 90, 86, 66, 40]
            // subtracted vote deduction (4 votes from Trinity) and (7 votes from Demetrius)
        }
    ]
});
