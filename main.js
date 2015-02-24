$(document).ready(function () {
    $('#fb-icon').click(function(event) {
        event.preventDefault();
        FB.ui({
  method: 'share',
  href: 'http://chicagomaroon.github.io/',
}, function(response){});
    });
    $('.popup').click(function(event) {
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        via = '@ChicagoMaroon',
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    
    window.open(url, via, text, opts);
 
    return false;
  });
    
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 550 && !$('.nav').hasClass('visible')) {
            $('.nav').animate({
                opacity: 1
            }, 'fast', function () {
                $(this).addClass('visible').removeAttr('style');
            });
        } else if ($(this).scrollTop() <= 500 && $('.nav').hasClass('visible')) {
            $('.nav').animate({
                opacity: 0
            }, 'fast', function () {
                $(this).removeClass('visible').removeAttr('style');
            });
        }
    });
    $('.view-transcript').click(function (event) {
        $(this).parent().siblings('div:nth-of-type(3)').children('.transcript').toggle();
        $(this).text(function (i, text) {
            return text === "View transcript" ? "Hide transcript" : "View transcript";
        })

    });

    $.getJSON('data.json', function (data) {

        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
        $.each(data, function (i, val) {
            if (val["value"] == 0)
                delete data[i];
            this.flag = this.code.replace('UK', 'GB').toLowerCase();
        });

        // Initiate the chart
        $('#container').highcharts('Map', {

            title: {
                //text : 'International Students by Country of Citizenship'
                text: '',
            },
            //subtitle : {
            //    text : 'Source: <a href="">Office of the Registrar, Autumn 2014 Census</a>'
            //},

            legend: {
                title: {
                    text: 'Students',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                },
                enableMouseWheelZoom: false,
            },
            tooltip: {
                backgroundColor: 'none',
                borderWidth: 0,
                shadow: false,
                useHTML: true,
                padding: 0,
                hideDelay: 10000,
                headerFormat: '',
                formatter: function () {
                    var intervieweeBase = "<table width:'250px'><tr>"
                    if (this.point.intervieweeName)
                        intervieweeBase = '<span>' + this.point.intervieweePhoto + ' ' + this.point.intervieweeName + '</span>'
                    if (this.point.interviewee2Name)
                        intervieweeBase = intervieweeBase + '<br><span>' + this.point.interviewee2Photo + ' ' + this.point.interviewee2Name + '</span>'
                    var students = this.point.value > 1 ? ' students' : ' student'
                    
                    var base = '<span class="f32"><span class="flag ' + this.point.flag + '"></span></span>' + ' ' + this.point.name + ': <b>' + this.point.value + '</b>' + students + '<br>' + intervieweeBase
                    return base
                },
                footerFormat: '',
                positioner: function (boxWidth, boxHeight, point) {
                    
                        return {
                            x: 0,
                            y: 250
                        };
                }

            },
            legend: {
                enabled: false
            },
            colorAxis: {
                type: 'logarithmic',
                min: 1,
                max: 1000,

            },

            series: [{
                data: data,
                mapData: Highcharts.maps['custom/world-highres'],
                joinBy: ['iso-a2', 'code'],
                name: 'Students',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                animation: false
            }],
            credits: {
                enabled: true,
                text: 'Source: Office of the Registrar, Autumn 2014 Census',
                href: '',
            },
        });
    });

    $('.chart-3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'International Student Population by Country'
        },
        xAxis: {
            categories: [
                'China',
                'India',
                'Canada',
                'South Korea',
                'Mexico',
                'United Kingdom',
                'Brazil',
                'Germany',
                'Singapore',
                'Turkey',
                'Russia',
            ],
            labels: {
                rotation: -45,
                style: {
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        credits: {
            enabled: true,
            text: 'Source: Office of the Registrar',
            href: '',
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Students'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Students',
            data: [863, 389, 210, 209, 95, 91, 88, 73, 71, 69, 67],
            animation: false,
            }]
    });
    $('.chart-2').highcharts({
        title: {
            text: 'Most Well-Represented Countries',
            x: -20 //center
        },
        xAxis: {
            title: {
                text: 'Year'
            },
            categories: ['2011', '2012', '2013', '2014']
        },
        yAxis: {
            title: {
                text: 'Percentage of the Total Intl. Student Population'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        credits: {
            enabled: true,
            text: 'Source: Office of the Registrar',
            href: '',
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        
        series: [{
                name: 'China',
                data: [Math.round(595/30.53 * 100) / 100, Math.round(692/31.01 * 100) / 100, Math.round(733/31.37 * 100) / 100, Math.round(863/33.50 * 100) / 100]
        }, {
                name: 'India',
                data: [Math.round(375/30.53 * 100) / 100, Math.round(369/31.01 * 100) / 100, Math.round(388/31.37 * 100) / 100, Math.round(389/33.50 * 100) / 100]
        }, {
                name: 'Canada',
                data: [Math.round(201/30.53 * 100) / 100, Math.round(201/31.01 * 100) / 100, Math.round(197/31.37 * 100) / 100, Math.round(210/33.50 * 100) / 100]
        },
            {
                name: 'South Korea',
                data: [Math.round(230/30.53 * 100) / 100, Math.round(226/31.01 * 100) / 100, Math.round(225/31.37 * 100) / 100, Math.round(209/33.50 * 100) / 100]
        },
            {
                name: 'Mexico',
                data: [Math.round(81/30.53 * 100) / 100, Math.round(106/31.01 * 100) / 100, Math.round(106/31.37 * 100) / 100, Math.round(95/33.50 * 100) / 100]
        }]
    });
    $('.chart-1').highcharts({
        title: {
            text: 'International Students: College vs. University',
            x: -20 //center
        },
        xAxis: {
            categories: ['1980', '1984', '1986', '1988', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'],
            labels: {
                rotation: -45,
                style: {
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'International Student Population (Percent)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        credits: {
            enabled: true,
            text: 'Source: National Center for Education Statistics',
            href: '',
        },
        series: [{
            name: 'University Total',
            data: [9.55, 8.63, 10.19, 11.13, 12.03, 12.74, 12.96, 12.90, 12.85, 13.09, 12.90, 13.19, 13.38, 14.01, 15.18, 16.20, 19.03, 17.93, 17.04, 17.42, 18.04, 18.45, 19.06, 16.91, 19.44, 19.71, 19.91, 20.61]
        }, {
            name: 'The College',
            data: [1.14, 1.76, 1.92, 1.55, 2.30, 2.78, 2.94, 3.28, 3.92, 4.31, 4.72, 5.26, 5.46, 5.31, 6.61, 7.21, 8.20, 8.01, 8.10, 7.47, 7.63, 8.16, 8.47, 8.55, 8.90, 9.55, 9.45, 9.47]
        }, ]

        /*
        series: [{
            name: 'University Total',
            data: [597, 641, 844, 984, 1107, 1177, 1218, 1209, 1247, 1305, 1286, 1309, 1371, 1684, 1902, 2087, 2508, 2490, 2363, 2465, 2573, 2689, 2819, 2552, 2946, 2953, 3036, 3101]
        }, {
            name: 'The College',
            data: [33, 52, 60, 51, 71, 94, 99, 111, 135, 152, 168, 194, 208, 204, 265, 294, 346, 349, 367, 349, 367, 402, 426, 437, 469, 516, 531, 540]
        },]
        */


    });
                 
});
                 