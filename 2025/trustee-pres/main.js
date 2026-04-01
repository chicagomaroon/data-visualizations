// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

cycles = [
    '1991–92',
    '1995–96',
    '1999–00',
    '2003–04',
    '2007–08',
    '2011–12',
    '2015–16',
    '2019–20',
    '2023–24'
];

demCount = [2, 1, 7, 5, 22, 11, 16, 14, 12];

repCount = [3, 2, 5, 5, 9, 8, 6, 2, 8];

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#155F83', '#800000'],
    // All code for your chart goes here
    title: {
        text: 'Number of Current Trustees Who Contributed to Presidential Candidates',
        align: 'center'
    },
    subtitle: {
        text: 'In recent presidential election cycles, more trustees have given to Democrats than Republicans.',
        align: 'center'
    },
    chart: {
        type: 'column'
    },

    xAxis: {
        categories: cycles,
        title: {
            text: ''
        },

        labels: {
            rotation: -30,
            style: {
                fontSize: '12px',
                textOverflow: 'none'
            }
        }
    },

    yAxis: {
        min: 0,
        title: {
            text: 'Total Trustees'
        }
    },

    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b><br/>'
    },

    series: [
        {
            name: 'Number of trustees giving to Democrats',
            data: demCount
        },
        {
            name: 'Number of trustees giving to Republicans',
            data: repCount
        }
    ]
});
