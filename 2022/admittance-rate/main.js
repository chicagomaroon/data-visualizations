// For API and chart documentation please look here:
// https://www.amcharts.com/demos/
am5.ready(function () {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const root = am5.Root.new('chart-div');

    // Setting themes and default colors
    const maroonTheme = am5.Theme.new(root);
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

    am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
        jpgOptions: {
            maintainPixelRatio: true
        },
        pdfOptions: {
            maintainPixelRatio: true
        },
        pngOptions: {
            maintainPixelRatio: true
        }
    });

    // All code for your chart goes here
    var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelY: 'none'
        })
    );

    chart.zoomOutButton.set('forceHidden', true);

    chart.get('colors').set('step', 2);

    // Create x axis
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            baseInterval: { timeUnit: 'year', count: 1 },
            renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 })
        })
    );

    // Create y axis
    let durationAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            min: 5.0,
            max: 9.0,
            renderer: am5xy.AxisRendererY.new(root, {})
        })
    );

    var durationSeries = chart.series.push(
        am5xy.LineSeries.new(root, {
            xAxis: xAxis,
            yAxis: durationAxis,
            valueYField: 'admissionRate',
            valueXField: 'graduationYear',
            tooltip: am5.Tooltip.new(root, {
                labelText:
                    "Admission rate for {valueX.formatDate('yyyy')}: {valueY}%"
            })
        })
    );

    durationSeries.strokes.template.setAll({ strokeWidth: 2 });

    // Add circle bullet
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
    durationSeries.bullets.push(function () {
        var graphics = am5.Rectangle.new(root, {
            width: 10,
            height: 10,
            centerX: am5.p50,
            centerY: am5.p50,
            fill: durationSeries.get('stroke')
        });

        return am5.Bullet.new(root, {
            sprite: graphics
        });
    });

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
        'cursor',
        am5xy.XYCursor.new(root, {
            xAxis: xAxis
        })
    );

    // Set title
    // https://www.amcharts.com/docs/v5/concepts/common-elements/labels/#creating-labels
    chart.children.unshift(am5.Label.new(root, {
        text: "This is a chart title",
        fontSize: 25,
        fontWeight: "500",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 0
      }));

    durationSeries.data.setAll([
        { admissionRate: 8.8, graduationYear: new Date(2017, 0, 1).getTime() },
        { admissionRate: 8.4, graduationYear: new Date(2018, 0, 1).getTime() },
        { admissionRate: 7.8, graduationYear: new Date(2019, 0, 1).getTime() },
        { admissionRate: 7.9, graduationYear: new Date(2020, 0, 1).getTime() },
        { admissionRate: 8.7, graduationYear: new Date(2021, 0, 1).getTime() },
        { admissionRate: 7.2, graduationYear: new Date(2022, 0, 1).getTime() },
        { admissionRate: 5.9, graduationYear: new Date(2023, 0, 1).getTime() },
        { admissionRate: 7.3, graduationYear: new Date(2024, 0, 1).getTime() },
        { admissionRate: 6.5, graduationYear: new Date(2025, 0, 1).getTime() },
        { admissionRate: 5.4, graduationYear: new Date(2026, 0, 1).getTime() }
    ]);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
});
