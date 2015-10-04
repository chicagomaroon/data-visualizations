$(document).ready(function () {
    $('#fb-icon').click(function (event) {
        event.preventDefault();
        FB.ui({
            method: 'share',
            href: 'http://chicagomaroon.github.io/o-issue-2015/',
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
    
    $('.card').hover(
        function() {
            $(this).addClass('z-depth-0');
            $(this).children('.card-image').addClass('z-depth-0');
            $(this).siblings().find('.subcard').show('fast');
        },
        function() {
            $(this).removeClass('z-depth-0');
            $(this).children('.card-image').removeClass('z-depth-0');
            
        });
    $('.card-container').mouseleave(function() {
        //if (!$('body').css('overflow') == "hidden") {
            $(this).find('.subcard').hide('fast');
        //}
    });
    $('.modal-trigger').leanModal();
        
});