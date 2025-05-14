// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

Highcharts.chart('chart-div', {
    // Setting default colors
    colors: [
        '#C76363',
        '#C04A49',
        '#A42323',
        '#7F1416',
        '#571612',
        '#3D3D3D',
        '#392F83',
        '#184F26'
    ],

    // All code for your chart goes here
    title: {
        text: 'Investments by Year'
    },

    legend: {
        enabled: false
    },

    xAxis: {
        type: 'datetime',  
    },

    yAxis: {
        title: {
            text: 'Value (in millions of dollars)'
        }
    },

    // plotOptions: {
    //     series: {
    //         pointStart: 1999
    //     }
    // },

    // accessibility: {
    //     point: {
    //         valueDescriptionFormat: '{index}. {point.from} to {point.to}, ' +
    //             '{point.weight}.'
    //     }
    // },

    tooltip: {
        formatter: function () {
            return (
                this.x +
                '</b>: <b>$' +
                this.y +
                'M</b>'
            );
        }
    },

    series: [
        {
            name: 'SEC Investments',
            label: {
                enabled: false
            },
            data: [
                [Date.UTC(1999,3,31),146.059],
                [Date.UTC(1999,6,30),147.129],
                [Date.UTC(1999,9,30),146.059],
                [Date.UTC(1999,12,31),147.456],
                [Date.UTC(2000,3,31),147.61],
                [Date.UTC(2000,7,31),147.867],
                [Date.UTC(2000,9,30),131.354],
                [Date.UTC(2000,12,31),98.659],
                [Date.UTC(2001,3,31),69.295],
                [Date.UTC(2001,6,30),72.534],
                [Date.UTC(2001,9,30),51.6604],
                [Date.UTC(2001,12,31),56.067],
                [Date.UTC(2002,3,31),61.689],
                [Date.UTC(2002,6,30),49.548],
                [Date.UTC(2002,9,30),87.716],
                [Date.UTC(2002,12,31),104.133],
                [Date.UTC(2003,3,31),80.744],
                [Date.UTC(2003,6,30),96.189],
                [Date.UTC(2003,9,30),112.771],
                [Date.UTC(2003,12,31),129.237],
                [Date.UTC(2004,3,31),132.163],
                [Date.UTC(2004,6,30),138.458],
                [Date.UTC(2004,9,30),135.389],
                [Date.UTC(2004,12,31),81.429],
                [Date.UTC(2005,3,31),141.398],
                [Date.UTC(2005,6,30),144.015],
                [Date.UTC(2005,9,30),151.587],
                [Date.UTC(2005,12,31),148.838],
                [Date.UTC(2006,3,31),166.463],
                [Date.UTC(2006,6,30),163.635],
                [Date.UTC(2006,9,30),165.932],
                [Date.UTC(2006,12,31),183.702],
                [Date.UTC(2007,3,31),191.83],
                [Date.UTC(2007,6,30),198.598],
                [Date.UTC(2007,9,30),152.544],
                [Date.UTC(2007,12,31),151.951],
                [Date.UTC(2008,3,31),143.216],
                [Date.UTC(2008,4,1),null],
                [Date.UTC(2012,12,31),269.434],
                [Date.UTC(2013,3,31),70.869],
                [Date.UTC(2013,6,30),66.792],
                [Date.UTC(2013,9,30),69.128],
                [Date.UTC(2013,12,31),66.635],
                [Date.UTC(2014,3,31),38.013],
                [Date.UTC(2014,6,30),1.532],
                [Date.UTC(2014,9,30),1.518],
                [Date.UTC(2014,12,31),3.476],
                [Date.UTC(2015,3,31),34.809],
                [Date.UTC(2015,6,30),33.7364],
                [Date.UTC(2015,9,30),40.658],
                [Date.UTC(2015,12,31),42.706],
                [Date.UTC(2016,12,31),null],
                [Date.UTC(2018,3,31),388.107],
                [Date.UTC(2018,6,30),213.41],
                [Date.UTC(2018,9,30),189.881],
                [Date.UTC(2018,12,31),163.979],
                [Date.UTC(2019,3,31),101.397],
                [Date.UTC(2019,6,30),103.629],
                [Date.UTC(2019,9,30),94.147],
                [Date.UTC(2019,12,31),34.748],
                [Date.UTC(2020,3,31),9.01],
                [Date.UTC(2020,6,30),12.294],
                [Date.UTC(2020,9,30),11.504],
                [Date.UTC(2020,12,31),46.21],
                [Date.UTC(2021,3,31),52.1084],
                [Date.UTC(2021,6,30),63.414],
                [Date.UTC(2021,9,30),66.104],
                [Date.UTC(2022,12,31),130.108],
                [Date.UTC(2023,3,31),219.695],
                [Date.UTC(2023,6,30),219.411],
                [Date.UTC(2023,9,30),151.789],
                [Date.UTC(2023,12,31),71.986],
                [Date.UTC(2024,3,31),69.304],
                [Date.UTC(2024,6,30),129.722],
                [Date.UTC(2024,9,30),118.274],
                [Date.UTC(2024,12,31),106.532],
                [Date.UTC(2025,3,31),66.032],
            ]
        }]
});
