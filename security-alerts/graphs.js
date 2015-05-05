/* ============================================================
  GRAPHS.JS
  Code to initizalize the three Highcharts graphs.
============================================================ */
$('#graph-1').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Violent Crimes Reported Around the University'
    },
    xAxis: {
        categories: ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Crimes'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        },
        stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                },
            formatter: function() {
            return  this.stack;
        }
        },
        allowDecimals: false
    },
    tooltip: {
        enabled: false
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    enabled: false
                }
            }
        }
    },
    credits: {
        enabled: true,
        text: 'Source: City of Chicago, University of Chicago Police Department'
    },
    series: [{
        name: 'Crimes Reported around the Unviersity',
        data: [384, 388, 286, 334, 325, 248, 263, 80],
        color: 'gray',
        }, {
        name: 'Crimes Reported in Hyde Park',
        data: [175, 167, 128, 150, 159, 119, 121, 35],
        color: 'maroon',
        }, {
        name: 'Security Alerts Sent out by the University',
        data: [2, 15, 5, 8, 7, 9, 10, 5],
        color: 'black',
        }]
});

$('#graph-2').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Violent Crimes Reported Around the University'
    },
    xAxis: {
        categories: ['2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014'],
        tickmarkPlacement: 'on',
        title: {
            enabled: false
        }
    },
    yAxis: {
        title: {
            text: 'Crimes Reported'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            },
            formatter: function () {
                return this.total.toString().replace(" ", ",");
            }
        },
        allowDecimals: false
    },
    tooltip: {
        enabled: false
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false
            },
            states: {
                hover: {
                    enabled: false
                }
            }
        },
        column: {
            stacking: 'normal'
        }
    },
    credits: {
        enabled: true,
        text: 'Source: City of Chicago',
        href: 'https://data.cityofchicago.org/',
    },
    series: [{
        name: 'Homicide',
        data: [3, 3, 0, 5, 5, 8, 2, 4, 6, 1, 5, 2, 2, 3],
        color: 'red'
        }, {
        name: 'Sexual assault',
        data: [30, 26, 25, 35, 26, 31, 22, 19, 16, 14, 17, 20, 20, 16],
        color: 'orange'
        }, {
        name: 'Assault',
        data: [84, 81, 67, 77, 72, 70, 76, 56, 59, 40, 46, 53, 28, 22],
        color: 'green'
        }, {
        name: 'Battery',
        data: [137, 122, 106, 110, 120, 104, 104, 92, 84, 65, 69, 65, 51, 60],
        color: 'lime'
        }, {
        name: 'Robbery',
        data: [307, 267, 298, 323, 340, 281, 309, 213, 223, 166, 197, 185, 147, 162],
        color: 'yellow'
        }]
});