// For API and chart documentation please look here:
// https://www.amcharts.com/demos/
am5.ready(function () {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new('chart-div');

    // Setting themes and default colors
    var maroonTheme = am5.Theme.new(root);
    maroonTheme
        .rule('ColorSet')
        .set('colors', [
            am5.color('#C76363'),
            am5.color('#C04A49'),
            am5.color('#A42323'),
            am5.color('#7F1416'),
            am5.color('#571612'),
            am5.color('#3D3D3D'),
            am5.color('#392F83'),
            am5.color('#184F26')
        ]);

    root.setThemes([am5themes_Animated.new(root), maroonTheme]);

    // All code for your chart goes here
});
