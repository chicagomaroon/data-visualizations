$(document).ready(function () {
    $('.take-poll-btn').click(function (event) {
        $(this).toggle();
        $('#hidden-iframe,form,.poll-border').toggle();
    });
    if ($.cookie('v') == 'true')
        voted();
    $('#fb-icon').click(function (event) {
        event.preventDefault();
        FB.ui({
            method: 'share',
            href: 'http://chicagomaroon.github.io/aramark/',
        }, function (response) {});
    });
    // We bind a new event to our link
    $('a.tweet').click(function (e) {

        //We tell our browser not to follow that link
        e.preventDefault();

        //We get the URL of the link
        var loc = $(this).attr('href');

        //We get the title of the link
        var title = encodeURIComponent($(this).attr('title'));

        //We trigger a new window with the Twitter dialog, in the middle of the page
        window.open('http://twitter.com/share?url=' + loc + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 225) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

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
    if ($.cookie('v') !== 'true')
        $.cookie('v', 'true', {
            expires: 365
        });
}