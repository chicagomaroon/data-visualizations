$(document).ready(function () {
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

});