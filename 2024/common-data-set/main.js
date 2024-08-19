// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        type: 'column',
        // inverted: true,
        height: '400',
        width: '600',
        style: {
            fontFamily: 'Georgia, serif'
        }
    },
    colors: [
        '#800000',
        '#FFA319'
    ],
    

    xAxis: {
        categories: ['Applied','Admitted','Enrolled'],
        title: {
            text: 'Year'
        }
    },
    
    yAxis: {
        title: {
            text: 'Percent'
        },
    },

    plotOptions: {
        column: {
            stacking: 'percent', // percent chart
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.0f}%'
            }
        }
    }
});

Highcharts.chart('chart-uchicago', {

    // data: {
    //     csvURL: window.location.origin + '/gender.csv'
    // },

    // All code for your chart goes here
    title: {
        text: 'UChicago applicants by status, year, and gender',
        align: 'center'
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

    series: [
        {name:'Male', data:[21781,1452,925],},
        {name:'Female', data:[25855,1869,1161]}         
    ]
});