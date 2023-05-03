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
    const chart = root.container.children.push(
        am5xy.LineSeries.new(root, {
            panX: true,
            panY: true,
            wheelX: 'panX',
            wheelY: 'zoomX',
            pinchZoomX: true
        })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
            baseInterval: {
                timeUnit: 'year',
                count: 1
            },
            renderer: am5xy.AxisRendererX.new(root, {}),
            tooltip: am5.Tooltip.new(root, {})
        })
    );

    const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {})
        })
    );

    const series = chart.series.push(
        am5xy.LineSeries.new(root, {
            name: 'Admittance Rate by Graduation Year',
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: 'admissionRate',
            valueXField: 'graduationYear',
            tooltip: am5.Tooltip.new(root, {
                labelText: '{valueY}'
            })
        })
    );

    xAxis.data.setAll([
        { admissionRate: 8.8, graduationYear: 2017 },
        { admissionRate: 8.4, graduationYear: 2018 },
        { admissionRate: 7.8, graduationYear: 2019 },
        { admissionRate: 7.9, graduationYear: 2020 },
        { admissionRate: 8.7, graduationYear: 2021 },
        { admissionRate: 7.2, graduationYear: 2022 },
        { admissionRate: 5.9, graduationYear: 2023 },
        { admissionRate: 7.3, graduationYear: 2024 },
        { admissionRate: 6.5, graduationYear: 2025 },
        { admissionRate: 5.4, graduationYear: 2026 }
    ]);

    chart.set(
        'scrollbarX',
        am5.Scrollbar.new(root, {
            orientation: 'horizontal'
        })
    );

    series.appear(1000);
    chart.appear(1000, 100);
});
