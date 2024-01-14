// For API and chart documentation please look here:
// https://www.highcharts.com/demo

demPACs = [
    { name: 'Biden For President/<br/>Biden Victory Fund', value: 367971 },
    { name: 'ActBlue', value: 308475 },
    { name: 'Democratic<br/>National<br/>Committee', value: 48787 },
    { name: 'DCCC', value: 35841 },
    { name: 'Lauren<br/>Underwood<br/>For Congress', value: 35644 },
    { name: "People's Action Power", value: 29539 },
    { name: 'Jon Ossoff For Senate', value: 26145 },
    { name: 'DSCC', value: 21871 },
    { name: 'Bernie 2020', value: 20904 },
    { name: 'Fair Fight', value: 19470 }
];

repPACs = [
    { name: 'Win The Era Pac', value: 12855 },
    { name: 'WinRed', value: 11555 },
    { name: 'NRSC', value: 4739 },
    { name: 'The Lincoln Project', value: 3742 },
    { name: 'Donald J. Trump<br/>For President, Inc.', value: 2574 },
    { name: 'Trump Make America<br/>Great Again Committee', value: 1673 },
    { name: 'Mcconnell Senate Committee', value: 688 },
    { name: 'Kansans For Marshall', value: 605 },
    { name: 'Republican National Committee', value: 585 },
    { name: 'Republican Voters Against Trump Inc', value: 355 }
];
Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});

Highcharts.chart('chart-div1', {
    // Setting default colors
    colors: ['#155F83', '#800000'],
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Top 10 Campaigns/PACs Doanted to in 2019-2020',
        align: 'center'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}</b>: ${point.value}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30px',
            maxSize: '250px',
            //zMin: 1000,
            //zMax: 100000,
            layoutAlgorithm: {
                gravitationalConstant: 0.01,
                splitSeries: false,
                useSimulation: false
                //bubblePadding:
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 30000
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal',
                    fontSize: '14px'
                }
            }
        }
    },
    series: [
        {
            name: 'Democratic',
            data: demPACs
        },
        {
            name: 'Republican',
            data: repPACs
        }
    ]
});

Highcharts.chart('chart-div2', {
    // Setting default colors
    colors: ['#155F83', '#800000'],
    chart: {
        type: 'packedbubble',
        height: '100%'
    },
    title: {
        text: 'Top PACs by Party',
        align: 'left'
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}</b>: ${point.value}'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30px',
            maxSize: '250px',
            //zMin: 1000,
            //zMax: 100000,
            layoutAlgorithm: {
                gravitationalConstant: 0.01,
                splitSeries: false,
                useSimulation: false
                //bubblePadding:
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                filter: {
                    property: 'y',
                    operator: '>',
                    value: 100000
                },
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal',
                    fontSize: '14px'
                }
            }
        }
    },
    series: [
        {
            name: 'Democratic',
            data: demPACs
        },
        {
            name: 'Republican',
            data: repPACs
        }
    ]
});
