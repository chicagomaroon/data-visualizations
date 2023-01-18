$(document).ready(function () {
    $('#fb-icon').click(function (event) {
        event.preventDefault();
        FB.ui({
            method: 'share',
            href: 'http://chicagomaroon.github.io/maclean-2015/',
        }, function (response) {});
    });
    // We bind a new event to our link
    $('a.tweet').click(function (e) {

        //We tell our browser not to follow that link
        e.preventDefault();

        //We get the URL of the link
        var loc = $(this).attr('href');

        //We get the title of the link
        var title = encodeURIComponent($(this).attr('title')) + ' -';

        //We trigger a new window with the Twitter dialog, in the middle of the page
        window.open('http://twitter.com/share?url=' + loc + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 225) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

    });
    
    //TODO
    $('.video-container').fitVids();
    
    $('.food-caption-1').toggle();
    $("#slides").slidesjs({
        width: 750,
        height: 500,
        navigation: {
            active: false,
            effect: "slide"
        },
        pagination: {
            active: true,
            effect: "slide"
        },
        callback: {
            start: function (number) {

            },
            complete: function (number) {
                $('.caption').css('display', 'none');
                $('.food-caption-' + number).toggle();
            }
        }
    });
    $("a[data-slidesjs-item]").html('<svg height="14" width="14"><circle cx="7" cy="7" r="5" stroke="#333333" stroke-width="2" fill="none" />Sorry, your browser does not support inline SVG.</svg>'); //Creates code for circles for SlideJS pagination.
    var mq = window.matchMedia('all and (max-width: 700px)');
    if (mq.matches) {
        // the width of browser is less then 700px
        $('#chart-1>div>svg').find('g.highcharts-data-labels').remove()
    } else {
        // the width of browser is more then 700px

    }
});