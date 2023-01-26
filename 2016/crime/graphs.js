/* ============================================================
  GRAPHS.JS
  Code to initizalize the three Highcharts graphs.
============================================================ */
$('#graph-1').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Violent Crimes Near the University of Chicago'
    },
    xAxis: {
        categories: [
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014'
        ],
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
                color:
                    (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            },
            formatter: function () {
                return this.total.toString().replace(' ', ',');
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
        href: 'https://data.cityofchicago.org/'
    },
    series: [
        {
            name: 'Homicide',
            data: [3, 3, 0, 5, 5, 8, 2, 4, 6, 1, 5, 2, 2, 3],
            color: 'red'
        },
        {
            name: 'Sexual assault',
            data: [30, 26, 25, 35, 26, 31, 22, 19, 16, 14, 17, 20, 20, 16],
            color: 'orange'
        },
        {
            name: 'Assault',
            data: [84, 81, 67, 77, 72, 70, 76, 56, 59, 40, 46, 53, 28, 22],
            color: 'green'
        },
        {
            name: 'Battery',
            data: [
                137, 122, 106, 110, 120, 104, 104, 92, 84, 65, 69, 65, 51, 60
            ],
            color: 'lime'
        },
        {
            name: 'Robbery',
            data: [
                307, 267, 298, 323, 340, 281, 309, 213, 223, 166, 197, 185, 147,
                162
            ],
            color: 'yellow'
        }
    ]
});

$('#graph-2').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Property Crimes Near the University of Chicago'
    },
    xAxis: {
        categories: [
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014'
        ],
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
                color:
                    (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            },
            formatter: function () {
                return this.total.toString().replace(' ', ',');
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
        href: 'https://data.cityofchicago.org/'
    },
    series: [
        {
            name: 'Arson',
            data: [8, 6, 8, 5, 9, 6, 2, 2, 0, 4, 5, 2, 2, 0],
            color: 'brown'
        },
        {
            name: 'Burglary',
            data: [
                283, 309, 455, 410, 481, 511, 317, 272, 302, 313, 286, 240, 229,
                196
            ],
            color: 'blue'
        },
        {
            name: 'Motor vehicle theft',
            data: [
                401, 357, 324, 394, 395, 291, 283, 233, 211, 243, 217, 168, 135,
                123
            ],
            color: 'gray'
        },
        {
            name: 'Theft',
            data: [
                1809, 1727, 1736, 1710, 1596, 1160, 1340, 1155, 1166, 1231,
                1200, 1147, 1073, 877
            ],
            color: 'purple'
        }
    ]
});

$('#graph-3').highcharts({
    chart: {
        type: 'column'
    },
    title: {
        text: 'Drug Crimes Near the University of Chicago'
    },
    xAxis: {
        categories: [
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014'
        ],
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
                color:
                    (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            },
            formatter: function () {
                return this.total.toString().replace(' ', ',');
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
        href: 'https://data.cityofchicago.org/'
    },
    series: [
        {
            name: 'Other',
            data: [4, 4, 3, 2, 5, 5, 6, 11, 3, 5, 4, 8, 4, 7],
            color: '#E500FF'
        },
        {
            name: 'Cocaine',
            data: [3, 5, 6, 4, 5, 3, 2, 3, 2, 4, 4, 0, 1, 1],
            color: '#FFA07A'
        },
        {
            name: 'Heroin',
            data: [13, 17, 9, 11, 10, 19, 10, 24, 14, 24, 15, 11, 9, 7],
            color: '#3EB278'
        },
        {
            name: 'Crack cocaine',
            data: [66, 56, 45, 39, 29, 34, 42, 34, 20, 18, 15, 8, 8, 1],
            color: '#FF69B4'
        },
        {
            name: 'Cannabis',
            data: [
                158, 152, 139, 197, 167, 130, 187, 167, 196, 230, 195, 115, 72,
                78
            ],
            color: 'aqua'
        }
    ]
});
