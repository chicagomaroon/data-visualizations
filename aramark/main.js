$(document).ready(function () {
    $('.take-poll-btn').click(function(event) {
        $(this).toggle();
        $('#hidden-iframe,form,.poll-border').toggle();
    });
    if($.cookie('v') == 'true')
        voted();
    $('#fb-icon').click(function (event) {
        event.preventDefault();
        FB.ui({
            method: 'share',
            href: 'http://chicagomaroon.github.io/aramark/',
        }, function (response) {});
    });
    $('.popup').click(function (event) {
        var width = 575,
            height = 400,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            url = this.href,
            via = '@ChicagoMaroon',
            opts = 'status=1' +
            ',width=' + width +
            ',height=' + height +
            ',top=' + top +
            ',left=' + left;

        window.open(url, via, text, opts);

        return false;
    });
    $('#ss-submit').click(function (event) {
        voted();
    });
     $('#chart-1').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Aramark Historical Performance'
        },
        xAxis: {
            categories: ['2012', '2013', '2014'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'USD (thousands)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return "$" + this.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'right',
            verticalAlign: 'bottom',
            floating: false,
            borderWidth: 0,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: false
        },
        credits: {
            enabled: true,
            text: 'Source: U.S. Securities and Exchange Commission',
            href: '',
        },
        series: [{
            name: 'Revenue',
            data: [13505426, 13945657, 14832913],
            animation: false
        }, {
            name: 'Operating Income/EBIT',
            data: [581775, 514474, 564563],
            animation: false
        }, {
            name: 'Net Income',
            data: [107199, 70366, 149459],
            animation: false
        }],
        
    });

});
function voted() {
    $('#hidden-iframe,form,.take-poll-btn').remove();
    $('.alert-success,.alert-title,.poll-border').toggle();
    if($.cookie('v') !== 'true')
        $.cookie('v','true',{expires: 365});
}