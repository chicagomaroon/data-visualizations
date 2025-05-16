const categoryColors = {
    Language: '#800000',
    Arts: '#c16622',
    'Biological Science': '#8a9045',
    'Physical Science': '#1F4F21',
    'Mathematical Science': '#0f425c',
    'Civilization Studies': '#5b8fa8',
    Humanities: '#8f3931',
    'Social Sciences': '#ffb547'
};

fetch('csvjson.json')
    .then((response) => response.json())
    .then((data) => {
        const categoryMap = {};

        data.forEach((d) => {
            const category = d['Category'];
            if (!categoryMap[category]) {
                categoryMap[category] = [];
            }

            categoryMap[category].push({
                x: parseFloat(d['Average of Average Hours']),
                y: parseFloat(d['Average of Sentiment Score']),
                name: d['Course Name'],
                category: category,
                color: categoryColors[category] || '#d6d6ce',
                originalColor: categoryColors[category] || '#d6d6ce'
            });
        });

        const seriesData = Object.entries(categoryMap).map(
            ([category, points]) => ({
                name: category,
                data: points,
                color: categoryColors[category] || '#d6d6ce',
                marker: {
                    symbol: 'circle'
                }
            })
        );

        Highcharts.chart('container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy',
                events: {
                    load: function () {
                        const chart = this;

                        const redrawArrows = () => {
                            if (chart.customArrows) {
                                chart.customArrows.forEach((arrow) =>
                                    arrow.destroy()
                                );
                            }
                            chart.customArrows = [];

                            // arrow shape
                            chart.customArrows.push(
                                chart.renderer
                                    .path([
                                        'M',
                                        chart.plotLeft + chart.plotWidth,
                                        chart.yAxis[0].toPixels(0),
                                        'L',
                                        chart.plotLeft + chart.plotWidth - 10,
                                        chart.yAxis[0].toPixels(0) - 5,
                                        'L',
                                        chart.plotLeft + chart.plotWidth - 10,
                                        chart.yAxis[0].toPixels(0) + 5,
                                        'Z'
                                    ])
                                    .attr({ fill: 'black', zIndex: 3 })
                                    .add()
                            );
                            chart.customArrows.push(
                                chart.renderer
                                    .path([
                                        'M',
                                        chart.plotLeft,
                                        chart.yAxis[0].toPixels(0),
                                        'L',
                                        chart.plotLeft + 10,
                                        chart.yAxis[0].toPixels(0) - 5,
                                        'L',
                                        chart.plotLeft + 10,
                                        chart.yAxis[0].toPixels(0) + 5,
                                        'Z'
                                    ])
                                    .attr({ fill: 'black', zIndex: 3 })
                                    .add()
                            );
                            chart.customArrows.push(
                                chart.renderer
                                    .path([
                                        'M',
                                        chart.xAxis[0].toPixels(8),
                                        chart.plotTop,
                                        'L',
                                        chart.xAxis[0].toPixels(8) - 5,
                                        chart.plotTop + 10,
                                        'L',
                                        chart.xAxis[0].toPixels(8) + 5,
                                        chart.plotTop + 10,
                                        'Z'
                                    ])
                                    .attr({ fill: 'black', zIndex: 3 })
                                    .add()
                            );
                            chart.customArrows.push(
                                chart.renderer
                                    .path([
                                        'M',
                                        chart.xAxis[0].toPixels(8),
                                        chart.plotTop + chart.plotHeight,
                                        'L',
                                        chart.xAxis[0].toPixels(8) - 5,
                                        chart.plotTop + chart.plotHeight - 10,
                                        'L',
                                        chart.xAxis[0].toPixels(8) + 5,
                                        chart.plotTop + chart.plotHeight - 10,
                                        'Z'
                                    ])
                                    .attr({ fill: 'black', zIndex: 3 })
                                    .add()
                            );

                            // solid axis lines on top
                            chart.customArrows.push(
                                chart.renderer
                                    .path([
                                        'M',
                                        chart.plotLeft,
                                        chart.yAxis[0].toPixels(0),
                                        'L',
                                        chart.plotLeft + chart.plotWidth,
                                        chart.yAxis[0].toPixels(0)
                                    ])
                                    .attr({
                                        'stroke-width': 1,
                                        stroke: '#333',
                                        zIndex: 2
                                    })
                                    .add()
                            );
                            chart.customArrows.push(
                                chart.renderer
                                    .path([
                                        'M',
                                        chart.xAxis[0].toPixels(8),
                                        chart.plotTop,
                                        'L',
                                        chart.xAxis[0].toPixels(8),
                                        chart.plotTop + chart.plotHeight
                                    ])
                                    .attr({
                                        'stroke-width': 1,
                                        stroke: '#333',
                                        zIndex: 2
                                    })
                                    .add()
                            );

                            // put labels in
                            chart.customArrows.push(
                                chart.renderer
                                    .text(
                                        'DECREASING\nHOURS',
                                        chart.plotLeft + 20,
                                        chart.yAxis[0].toPixels(0) - 10
                                    )
                                    .css({
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    })
                                    .add()
                            );
                            chart.customArrows.push(
                                chart.renderer
                                    .text(
                                        'INCREASING\nHOURS',
                                        chart.plotLeft + chart.plotWidth - 170,
                                        chart.yAxis[0].toPixels(0) - 10
                                    )
                                    .css({
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    })
                                    .add()
                            );
                            chart.customArrows.push(
                                chart.renderer
                                    .text(
                                        'INCREASING\nSENTIMENT',
                                        chart.xAxis[0].toPixels(8) + 15,
                                        chart.plotTop + 20
                                    )
                                    .css({
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    })
                                    .add()
                            );
                            chart.customArrows.push(
                                chart.renderer
                                    .text(
                                        'DECREASING\nSENTIMENT',
                                        chart.xAxis[0].toPixels(8) + 15,
                                        chart.plotTop + chart.plotHeight - 10
                                    )
                                    .css({
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    })
                                    .add()
                            );
                        };

                        redrawArrows();
                        Highcharts.addEvent(chart, 'redraw', redrawArrows);
                    }
                }
            },
            title: { text: 'The Core, Ranked' },
            subtitle: {
                text: 'Each dot shows a Core class by average hours worked and sentiment.'
            },
            xAxis: {
                min: 0,
                max: 16,
                tickPositions: [4, 8, 12, 16],
                gridLineWidth: 1,
                gridLineColor: '#d6d6ce',
                gridLineDashStyle: 'Dot',
                plotLines: [
                    {
                        value: 0,
                        color: '#d6d6ce',
                        width: 1,
                        dashStyle: 'Dot',
                        zIndex: 0
                    },
                    {
                        value: 2,
                        color: '#d6d6ce',
                        width: 1,
                        dashStyle: 'Dot',
                        zIndex: 0
                    },
                    {
                        value: 6,
                        color: '#d6d6ce',
                        width: 1,
                        dashStyle: 'Dot',
                        zIndex: 0
                    },
                    {
                        value: 10,
                        color: '#d6d6ce',
                        width: 1,
                        dashStyle: 'Dot',
                        zIndex: 0
                    },
                    {
                        value: 14,
                        color: '#d6d6ce',
                        width: 1,
                        dashStyle: 'Dot',
                        zIndex: 0
                    }
                ],
                lineWidth: 0,
                labels: { style: { fontSize: '13px' }, y: 20, align: 'center' },
                tickLength: 0,
                title: { text: null }
            },
            yAxis: {
                min: 0,
                max: 0.4,
                tickPositions: [-0.1, 0, 0.1, 0.2, 0.3, 0.4],
                gridLineWidth: 1,
                gridLineColor: '#d6d6ce',
                gridLineDashStyle: 'Dot',
                labels: { style: { fontSize: '13px' }, x: -10 },
                tickLength: 0,
                title: { text: null },
                plotLines: [
                    { value: 0, color: '#ffffff', width: 0, zIndex: -1 }
                ]
            },
            legend: {
                enabled: true,
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            tooltip: {
                formatter: function () {
                    return (
                        `<b>${this.point.name}</b><br>` +
                        `Average Hours Worked per Week: ${Highcharts.numberFormat(
                            this.point.x,
                            2
                        )}<br>` +
                        `Average Sentiment: ${Highcharts.numberFormat(
                            this.point.y,
                            3
                        )}`
                    );
                }
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 3,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: '#333'
                            }
                        }
                    },
                    point: {
                        events: {
                            mouseOver: function () {
                                const hoveredCat = this.options.category;
                                Highcharts.charts[0].series.forEach(
                                    (series) => {
                                        series.points.forEach((point) => {
                                            const isSameCategory =
                                                point.options.category ===
                                                hoveredCat;
                                            point.update(
                                                {
                                                    color: isSameCategory
                                                        ? point.options
                                                              .originalColor
                                                        : '#d6d6ce'
                                                },
                                                false
                                            );
                                        });
                                    }
                                );
                                this.series.chart.redraw();
                            },
                            mouseOut: function () {
                                Highcharts.charts[0].series.forEach(
                                    (series) => {
                                        series.points.forEach((point) => {
                                            point.update(
                                                {
                                                    color: point.options
                                                        .originalColor
                                                },
                                                false
                                            );
                                        });
                                    }
                                );
                                this.series.chart.redraw();
                            }
                        }
                    }
                }
            },
            series: seriesData
        });
    })
    .catch((err) => {
        console.error('Error loading csvjson.json:', err);
    });
