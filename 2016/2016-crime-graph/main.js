var chart = AmCharts.makeChart('chartdiv', {
    type: 'serial',
    theme: 'light',
    marginRight: 30,
    legend: {
        equalWidths: false,
        periodValueText: 'total: [[value.sum]]',
        position: 'top',
        valueAlign: 'left',
        valueWidth: 100
    },
    dataProvider: [
        {
            year: 2005,
            homicide: 5,
            'sexual assault': 28,
            robbery: 338,
            assault: 69,
            battery: 128,
            burglary: 482,
            theft: 1621,
            'motor vehicle theft': 392,
            arson: 9
        },
        {
            year: 2006,
            homicide: 7,
            'sexual assault': 31,
            robbery: 277,
            assault: 69,
            battery: 111,
            burglary: 522,
            theft: 1180,
            'motor vehicle theft': 293,
            arson: 6
        },
        {
            year: 2007,
            homicide: 2,
            'sexual assault': 23,
            robbery: 305,
            assault: 76,
            battery: 106,
            burglary: 316,
            theft: 1349,
            'motor vehicle theft': 281,
            arson: 2
        },
        {
            year: 2008,
            homicide: 4,
            'sexual assault': 19,
            robbery: 212,
            assault: 56,
            battery: 92,
            burglary: 275,
            theft: 1159,
            'motor vehicle theft': 231,
            arson: 2
        },
        {
            year: 2009,
            homicide: 6,
            'sexual assault': 16,
            robbery: 226,
            assault: 60,
            battery: 85,
            burglary: 307,
            theft: 1161,
            'motor vehicle theft': 207,
            arson: 0
        },
        {
            year: 2010,
            homicide: 2,
            'sexual assault': 15,
            robbery: 167,
            assault: 43,
            battery: 68,
            burglary: 316,
            theft: 1239,
            'motor vehicle theft': 241,
            arson: 3
        },
        {
            year: 2011,
            homicide: 5,
            'sexual assault': 17,
            robbery: 198,
            assault: 46,
            battery: 75,
            burglary: 290,
            theft: 1243,
            'motor vehicle theft': 219,
            arson: 5
        },
        {
            year: 2012,
            homicide: 2,
            'sexual assault': 20,
            robbery: 187,
            assault: 53,
            battery: 68,
            burglary: 244,
            theft: 1174,
            'motor vehicle theft': 170,
            arson: 2
        },
        {
            year: 2013,
            homicide: 2,
            'sexual assault': 21,
            robbery: 145,
            assault: 30,
            battery: 53,
            burglary: 228,
            theft: 1080,
            'motor vehicle theft': 133,
            arson: 2
        },
        {
            year: 2014,
            homicide: 3,
            'sexual assault': 16,
            robbery: 159,
            assault: 24,
            battery: 59,
            burglary: 194,
            theft: 880,
            'motor vehicle theft': 123,
            arson: 0
        },
        {
            year: 2015,
            homicide: 4,
            'sexual assault': 21,
            robbery: 175,
            assault: 38,
            battery: 54,
            burglary: 160,
            theft: 763,
            'motor vehicle theft': 153,
            arson: 3
        },
        {
            year: 2016,
            homicide: 4,
            'sexual assault': 19,
            robbery: 155,
            assault: 45,
            battery: 42,
            burglary: 262,
            theft: 849,
            'motor vehicle theft': 125,
            arson: 2
        }
    ],
    valueAxes: [
        {
            stackType: 'regular',
            gridAlpha: 0.07,
            position: 'left',
            title: 'Crimes Reported'
        }
    ],
    graphs: [
        {
            balloonText:
                "Homicide <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Homicide',
            valueField: 'homicide'
        },
        {
            balloonText:
                "Sexual assault <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Sexual assault',
            valueField: 'sexual assault'
        },
        {
            balloonText:
                "Robbery <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Robbery',
            valueField: 'robbery'
        },
        {
            balloonText:
                "Assault <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Assault',
            valueField: 'assault'
        },
        {
            balloonText:
                "Battery <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Battery',
            valueField: 'battery'
        },
        {
            balloonText:
                "Burglary <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Burglary',
            valueField: 'burglary'
        },
        {
            balloonText:
                "Theft <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Theft',
            valueField: 'theft'
        },
        {
            balloonText:
                "Motor vehicle theft <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Motor vehicle theft',
            valueField: 'motor vehicle theft'
        },
        {
            balloonText:
                "Arson <span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
            fillAlphas: 0.6,
            lineAlpha: 0.4,
            title: 'Arson',
            valueField: 'arson'
        }
    ],
    plotAreaBorderAlpha: 0,
    marginTop: 10,
    marginLeft: 0,
    marginBottom: 0,
    chartScrollbar: {},
    chartCursor: {
        cursorAlpha: 0
    },
    categoryField: 'year',
    categoryAxis: {
        startOnAxis: true,
        axisColor: '#DADADA',
        gridAlpha: 0.07,
        title: 'Year'
    },
    export: {
        enabled: true
    }
});
