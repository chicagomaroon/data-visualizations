Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    colors: ['#800000'],

    title: {
        text: 'Tenure and Tenure-Track Undergraduate Teaching',
        align: 'center'
    },
    subtitle: {
        text: 'Fiscal Years of 2006 through 2020',
        align: 'center'
    },

    xAxis: {
        categories: [
            '2006',
            '2007*',
            '2008*',
            '2009',
            '2010*',
            '2011*',
            '2012',
            '2013*',
            '2014*',
            '2015',
            '2016*',
            '2017',
            '2018',
            '2019',
            '2020'
        ],
        accessibility: {
            rangeDescription: 'Fiscal Year Range: 2006 to 2020'
        },
        title: {
            text: '* Years are intermediate years in range imputed from known 3-year interval data points'
        }
    },

    legend: {
        enabled: false
    },

    yAxis: {
        min: 30,
        title: {
            text: 'Percent of Total Undergraduate Courses'
        }
    },

    tooltip: {
        valueSuffix: '%'
    },

    series: [
        {
            name: 'Classes Taught',
            connectNulls: true,
            label: {
                enabled: false
            },
            data: [
                45,
                null,
                null,
                41,
                null,
                null,
                39,
                null,
                null,
                40,
                null,
                42,
                38,
                37,
                38
            ]
        }
    ]
});
