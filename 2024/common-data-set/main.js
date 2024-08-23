// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    colors: ['#800000', '#FFA319'],

    xAxis: {
        categories: [2025, 2026, 2027],
        title: { text: 'Class of' }
    },

    yAxis: {
        labels: {
            format: '{value}%'
        },
        title: {
            enabled: false
        }
    },

    plotOptions: {
        series: {
            pointStart: 2025
        },
        area: {
            stacking: 'percent', // percent chart
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.0f}%',
                style: { textOutline: 'none' }
            }
        }
    }
});

Highcharts.chart('chart-uchicago', {
    // data: {
    //     csvURL: window.location.origin + '/gender.csv'
    // },

    chart: {
        type: 'line',
        // inverted: true,
        style: {
            fontFamily: 'Georgia, serif'
        }
    },

    title: {
        text: 'UChicago applicants by incoming year, and gender',
        align: 'center',
        margin: 40
    },

    series: [
        { name: 'Male - Accepted', data: [1254, 1064, 994] },
        { name: 'Female - Accepted', data: [1206, 975, 855] },
        { name: 'Male - Applied', data: [17513, 16830, 17373] },
        { name: 'Female - Applied', data: [20445, 20670, 21249] }
    ],

    accessibility: {
        point: {
            valueDescriptionFormat:
                '{index}. {point.category}, {point.y:,' +
                '.0f}, {point.percentage:.1f}%.'
        }
    },

    tooltip: {
        pointFormat:
            '{series.name}: <b>{point.percentage:.1f}%</b> ({point.y:,.0f})<br/>',
        split: true
    }
});
