topPACs = [
    { name: 'Biden For President/<br/>Biden Victory Fund', y: 367971 },
    { name: 'ActBlue', y: 308475 },
    { name: 'Democratic National<br/>Committee', y: 48787 },
    { name: 'DCCC', y: 35841 },
    { name: 'Lauren Underwood<br/>For Congress', y: 35644 }
];

yAxisLabels = [0, 25000, 50000, 100000, 200000, 300000, 400000];

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
        text: 'Top Five Campaigns/Committees Donated to by Faculty in the 2020 Election',
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
        labels: {
            style: {
                fontSize: '16px'
            }
        }
    },
    yAxis: {
        labels: {
            format: '${value:,.0f}',
            style: {
                fontSize: '16px'
            }
        },
        tickPositions: yAxisLabels,
        enabled: false
    },
    tooltip: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true,
                format: '${y:,.0f}',
                align: 'left',
                inside: true,
                color: 'white',
                style: {
                    fontSize: '20px'
                }
            }
        },
        series: {
            groupPadding: 0,
            pointPadding: 0.05
        }
    },
    series: [{ data: topPACs }]
});
