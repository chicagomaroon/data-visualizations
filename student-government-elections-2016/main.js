$(document).ready(function () {
    $('#fb-icon').click(function (event) {
        event.preventDefault();
        FB.ui({
            method: 'share',
            href: 'http://chicagomaroon.github.io/student-government-elections-2015/',
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

    $('.tiles').mouseleave(function(event) {
        $('.tile').css('opacity', '1');
    }).mouseenter(function(event) {
        $('.tile').css('opacity','.5');
        $('.tile:hover').css('opacity','1');
    });

    $('.tile').mouseenter(function(event) {
        $(this).css('opacity','1');
    }).mouseleave(function(event) {
        $(this).css('opacity', '.5');
    });

    $('.video-container').fitVids();
    $(window).scroll(function() {
        console.log('scroll');
    });
    $('.to-top-a').click(function(event) {
        console.log('to top');
    });
});
