topPACs = [
    { name: 'Biden For President/<br/>Biden Victory Fund', y: 367971 },
    { name: 'ActBlue', y: 308475 },
    { name: 'Democratic National<br/>Committee', y: 48787 },
    { name: 'DCCC', y: 35841 },
    { name: 'Lauren Underwood<br/>For Congress', y: 35644 }
];

yAxisLabels = [0, 100000, 200000, 300000, 400000];

Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#155F83'],
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Top Five Campaigns/Committees Faculty Donated to in the 2020 Election',
        align: 'center',
        style: {
            fontSize: '20px'
        }
    },
    subtitle: {
        text: 'The top five campaigns/committees were all Democratic leaning.',
        align: 'center',
        style: {
            fontSize: '18px'
        }
    },
    xAxis: {
        type: 'category',
        useHTML: true,
        labels: {
            style: {
                fontSize: '16px'
            }
        }
    },
    yAxis: {
        labels: {
            format: '${text}',
            style: {
                fontSize: '16px'
            }
        },
        tickPositions: yAxisLabels,
        showLastLabel: false,
        title: {
            enabled: false
        }
    },
    tooltip: {
        formatter: function () {
            return (
                '<b>' +
                this.point.name +
                '</b>' +
                ': ' +
                '$' +
                Highcharts.numberFormat(this.y, 0, ',')
            );
        },
        valuePrefix: '$'
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            groupPadding: 0,
            pointPadding: 0.05
        }
    },
    series: [{ data: topPACs }]
});
