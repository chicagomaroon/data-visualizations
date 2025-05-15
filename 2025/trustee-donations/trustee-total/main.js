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

// Sample data objects
const years = [
    '1999-00',
    '2001-02',
    '2003-04',
    '2005-06',
    '2007-08',
    '2009-10',
    '2011-12',
    '2013-14',
    '2015-16',
    '2017-18',
    '2019-20',
    '2021-22',
    '2023-24'
];
const demData = [
    220186, 337581, 449319, 403296, 1075149, 360776, 908755, 660626, 2902913,
    940632, 2521138, 1179557, 1852956
];
const repData = [
    73207, 49417, 130704, 190634, 396336, 491708, 1391689, 964898, 2507512,
    1217334, 1460465, 1977636, 8671320
];

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#155F83', '#800000'],

    // All code for your chart goes here
    title: {
        text: "Current Trustees' Lifetime Political Contributions by Election Cycle",
        align: 'center'
    },
    subtitle: {
        text: "UChicago trustees' donations to Republican candidates increased considerably in the 2023–24 cycle.",
        align: 'center'
    },

    xAxis: {
        categories: years,
        title: {
            text: ''
        }
    },

    yAxis: {
        title: {
            text: 'Donation Amount ($)'
        },
        tickInterval: 2000000, // Setting step size to 2 million
        labels: {
            formatter: function () {
                if (this.value === 0) {
                    return '0';
                } else if (this.value < 10000000) {
                    return (
                        Highcharts.numberFormat(this.value / 1000000, 0) + 'M'
                    );
                }
                return (
                    '$' + Highcharts.numberFormat(this.value / 1000000, 0) + 'M'
                );
            }
        }
    },

    plotOptions: {
        series: {
            marker: {
                enabled: false
            },
            lineWidth: 3
        }
    },

    tooltip: {
        pointFormatter: function () {
            return (
                '<span style="color:' +
                this.color +
                '">\u25CF</span> ' +
                this.series.name +
                ': <b>$' +
                Highcharts.numberFormat(this.y, 0) +
                '</b><br/>'
            );
        }
    },

    legend: {
        enabled: false
    },

    series: [
        {
            name: 'Democratic Donations',
            type: 'line',
            data: demData
        },
        {
            name: 'Republican Donations',
            type: 'line',
            data: repData
        }
    ]
});
