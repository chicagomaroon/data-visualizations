/* ============================================================
  MAIN.JS
============================================================ */

$(document).ready(function () {
    /* Facebook app ID. */
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1584750855103746',
            xfbml: true,
            version: 'v2.2'
        });
    };

    /* Facebook tracking code. URL (href) is unique for each page. */
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    $('#fb-icon').click(function (event) {
        event.preventDefault();
        FB.ui(
            {
                method: 'share',
                href: 'http://chicagomaroon.github.io/'
            },
            function (response) {}
        );
    });

    /* Google analytics tracking code.  Code is unique for each page. */
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        (i[r] =
            i[r] ||
            function () {
                (i[r].q = i[r].q || []).push(arguments);
            }),
            (i[r].l = 1 * new Date());
        (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(
        window,
        document,
        'script',
        '//www.google-analytics.com/analytics.js',
        'ga'
    );

    ga('create', 'UA-59818592-3', 'auto');
    ga('send', 'pageview');

    /* Hgihlights tile so that suer knows which tile is active/which one they have selected. */
    /*
    $(".box").hover(
        function () {
            $('.box').not(this).fadeTo('fast', 0.5);
        }, function () {
            $('.box').fadeTo('fast', 1);
        }
    );
    */
});
