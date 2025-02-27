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
        text: 'University lobbying expenses, fiscal years 2000-2024'
    },

    legend: {
        enabled: false
    },

    yAxis: {
        title: {
            text: 'Expenses in dollars'
        }
    },

    xAxis: {
        title: {
            text: 'Fiscal Year'
        }
    },

    plotOptions: {
        series: {
            pointStart: 2000
        }
    },

    tooltip: {
        formatter: function () {
            return (
                'The University spent ' +
                this.y +
                ' dollars on lobbying in ' +
                this.x 
            );
        }
    },

    series: [
        {
            name: 'Lobbying Spending',
            label: {
                enabled: false
            },
            data: [160000.0,160000.0,160000.0,160000.0,160000.0,160000.0,800000.0,780000.0,99635.0,247676.0,167440.0,200870.0,220626.0,223704.0,369223.0,311281.0,176531.0,203080.0,177207.0,189012.0,183214.0,149510.0,235947.0,300281.0,225272.0
            ]
        }
    ]
});
