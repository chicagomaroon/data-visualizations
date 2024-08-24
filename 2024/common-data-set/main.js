// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    },

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

    xAxis: {
        categories: [2014,2015,2016,2017,2018,2019,2020,2021,2022,2023],
        title: { text: 'Class of' }
    },

    yAxis: {
        labels: {
            format: '{value}%'
        },
        title: {
            enabled: false
        }
    }
});

Highcharts.chart('chart-admit', {
    // data: {
    //     csvURL: window.location.origin + '/gender.csv'
    // },

    chart: {
        type: 'line'
    },

    title: {
        text: 'UChicago admit gender distribution, 2014-2023',
        align: 'center',
        margin: 40
    },

    subtitle: {
        text: '1-2% fewer female students admitted compared to male students since 2014'
    },

    series: [
        { name: 'Male', data: [9.2,9.2,8.5,9.4,7.9,6.8,8.3,7.2,6.3,5.7] },
        { name: 'Female', data: [8.4,7.7,7.5,8.1,6.7,5.7,6.5,5.9,4.7,4.0] },
        { name: 'Total', data: [8.8,8.4,7.9,8.7,7.3,6.2,7.3,6.5,5.4,4.8] },
],

    accessibility: {
        point: {
            valueDescriptionFormat:
                '{index}. {point.category}, {point.y:.1f}%.'
        }
    },

    tooltip: {
        pointFormat:
            '{series.name}: {point.y:.1f}%',
        split: true
    }
});

Highcharts.chart('chart-percent', {
    // data: {
    //     csvURL: window.location.origin + '/gender.csv'
    // },

    chart: {
        type: 'line'
    },

    title: {
        text: 'UChicago admit gender distribution, 2014-2023',
        align: 'center',
        margin: 40
    },

    subtitle: {
        text: 'As a percentage of total applicants, more male than female students admitted for 7 of the last 10 years'
    },

    series: [
        { name: 'Male', data: [4.4,4.2,3.9,4.4,3.7,3.1,3.8,3.3,2.8,2.6] },
        { name: 'Female', data: [4.4,4.1,4.1,4.3,3.5,3.1,3.5,3.2,2.6,2.2] },
        // { name: 'Total', data: [8.8,8.4,7.9,8.7,7.3,6.2,7.3,6.5,5.4,4.8] }
    ],

    yAxis: {
        tickPositions: [2,2.5,3,3.5,4,4.5],
    },

    accessibility: {
        point: {
            valueDescriptionFormat:
                '{index}. {point.category}, {point.y:.1f}%.'
        }
    },

    tooltip: {
        pointFormat:
            '{series.name}: {point.y:.1f}%',
        split: true
    }
});