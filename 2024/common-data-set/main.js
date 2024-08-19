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

        stackLabels: {
            enabled: true,
            formatter: function(){
                return this.stack
            },
            crop: false,
            overflow: 'allow',
            style: {textOutline: 'none'}
        },
    },

    plotOptions: {
        column: {
            stacking: 'percent', // percent chart
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.0f}%',
                style: {textOutline: 'none'}
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
        {name:'Male', data:[17513,1254,1067],stack:'2021-2022'},
        {name:'Female', data:[20445,1206,986],stack:'2021-2022'},
        {name:'Male', data:[16830,1064,937],stack:'2022-2023',showInLegend:false},
        {name:'Female', data:[20670,975,792],stack:'2022-2023',showInLegend:false},
        {name:'Male', data:[17373,994,885],stack:'2023-2024',showInLegend:false},
        {name:'Female', data:[21249,855,741],stack:'2023-2024',showInLegend:false}         
    ]

});


Highcharts.chart('chart-northwestern', {
    // data: {
    //     csvURL: window.location.origin + '/gender.csv'
    // },

    // All code for your chart goes here
    title: {
        text: '2021-2022 Northwestern applicants by status and gender',
        text: 'Northwestern applicants by status, year, and gender',
        align: 'center'
    },

    series: [
        {name:'Male', data:[21781,1452,925],stack:'2021-2022'},
        {name:'Female', data:[25855,1869,1161],stack:'2021-2022'},
        {name:'Male', data:[23534,1652,923],stack:'2022-2023',showInLegend:false},
        {name:'Female', data:[27725,2043,1115],stack:'2022-2023',showInLegend:false},
        {name:'Male', data:[24511,1729,965],stack:'2023-2024',showInLegend:false},
        {name:'Female', data:[27256,2010,1144],stack:'2023-2024',showInLegend:false}           
    ]
});