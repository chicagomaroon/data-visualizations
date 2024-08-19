// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        type: 'column',
        // inverted: true,
        style: {
            fontFamily: 'Georgia, serif'
        }
    },
    colors: [
        '#800000',
});

Highcharts.chart('chart-uchicago', {
    // Setting default colors
    // data: {
    //     csvURL: window.location.origin + '/gender.csv'
    // },

    // All code for your chart goes here
    title: {
        text: '2021-2022 UChicago applicants by status and gender',
        align: 'center'
    },
        '#FFA319'
    ],
    

    xAxis: {
        categories: ['Applied','Admitted','Enrolled']
    },

    yAxis: {
        title: {
            text: 'Percent'
        }
    },

    plotOptions: {
        column: {
            stacking: 'percent', // percent chart
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.0f}%'
            }
        }
    },

    series: [
        {name:'Male', data:[17513,1254,1067],},
        {name:'Female', data:[20445,1206,986]}         
    ]

});


Highcharts.chart('chart-northwestern', {
    // data: {
    //     csvURL: window.location.origin + '/gender.csv'
    // },

    // All code for your chart goes here
    title: {
        text: '2021-2022 Northwestern applicants by status and gender',
        align: 'center'
    },

    xAxis: {
        categories: ['Applied','Admitted','Enrolled']
    },

    yAxis: {
        title: {
            text: 'Percent'
        }
    },

    plotOptions: {
        column: {
            stacking: 'percent', // percent chart
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.0f}%'
            }
        }
    },

    series: [
        {name:'Male', data:[21781,1452,925],},
        {name:'Female', data:[25855,1869,1161]}         
    ]
});