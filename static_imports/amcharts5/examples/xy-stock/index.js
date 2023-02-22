// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: false,
    wheelX: "panX",
    wheelY: "zoomX",
    layout: root.verticalLayout
  })
);

chart.get("colors").set("step", 2);


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var valueAxisRenderer = am5xy.AxisRendererY.new(root, {
  inside: true
});
valueAxisRenderer.labels.template.setAll({
  centerY: am5.percent(100),
  maxPosition: 0.98
});
var valueAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: valueAxisRenderer,
  height: am5.percent(70)
}));
valueAxis.axisHeader.children.push(am5.Label.new(root, {
  text: "Value",
  fontWeight: "bold",
  paddingBottom: 5,
  paddingTop: 5
}));

var volumeAxisRenderer = am5xy.AxisRendererY.new(root, {
  inside: true
});
volumeAxisRenderer.labels.template.setAll({
  centerY: am5.percent(100),
  maxPosition: 0.98
});
var volumeAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: volumeAxisRenderer,
  height: am5.percent(30),
  layer: 5
}));
volumeAxis.axisHeader.set("paddingTop", 10);
volumeAxis.axisHeader.children.push(am5.Label.new(root, {
  text: "Volume",
  fontWeight: "bold",
  paddingTop: 5,
  paddingBottom: 5
}));


var dateAxisRenderer = am5xy.AxisRendererX.new(root, {});
dateAxisRenderer.labels.template.setAll({
  minPosition: 0.01,
  maxPosition: 0.99
});
var dateAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
  groupData: true,
  baseInterval: {
    timeUnit: "day",
    count: 1
  },
  renderer: dateAxisRenderer
}));
dateAxis.set("tooltip", am5.Tooltip.new(root, {}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var valueSeries1 = chart.series.push(am5xy.LineSeries.new(root, {
  name: "XTD",
  valueYField: "price1",
  calculateAggregates: true,
  valueYShow: "valueYChangeSelectionPercent",
  valueXField: "date",
  xAxis: dateAxis,
  yAxis: valueAxis,
  legendValueText: "{valueY}"
}));

var valueTooltip = valueSeries1.set("tooltip", am5.Tooltip.new(root, {
  getFillFromSprite: false,
  getStrokeFromSprite: true,
  getLabelFillFromSprite: true,
  autoTextColor: false,
  pointerOrientation: "horizontal",
  labelText: "{name}: {valueY} {valueYChangePercent.formatNumber('[#00ff00]+#,###.##p|[#ff0000]#,###.##p|[#999999]0')}"
}));

valueTooltip.get("background").set("fill", root.interfaceColors.get("background"));

var firstColor = chart.get("colors").getIndex(0);
var volumeSeries = chart.series.push(am5xy.ColumnSeries.new(root, {
  name: "XTD",
  fill: firstColor,
  stroke: firstColor,
  valueYField: "quantity",
  valueXField: "date",
  valueYGrouped: "sum",
  xAxis: dateAxis,
  yAxis: volumeAxis,
  legendValueText: "{valueY}",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));
volumeSeries.columns.template.setAll({
  strokeWidth: 0.2,
  strokeOpacity: 1,
  stroke: am5.color(0xffffff)
});

// Add legend to axis header
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-headers/
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
var valueLegend = valueAxis.axisHeader.children.push(
  am5.Legend.new(root, {
    useDefaultMarker: true
  })
);
valueLegend.data.setAll([valueSeries1]);

var volumeLegend = volumeAxis.axisHeader.children.push(
  am5.Legend.new(root, {
    useDefaultMarker: true
  })
);
volumeLegend.data.setAll([volumeSeries]);


// Stack axes vertically
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
chart.leftAxesContainer.set("layout", root.verticalLayout);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {}))


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
  orientation: "horizontal",
  height: 50
}));

var sbDateAxis = scrollbar.chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    groupData: true,
    groupIntervals: [{
      timeUnit: "week",
      count: 1
    }],
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: am5xy.AxisRendererX.new(root, {})
  })
);

var sbValueAxis = scrollbar.chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

var sbSeries = scrollbar.chart.series.push(
  am5xy.LineSeries.new(root, {
    valueYField: "price1",
    valueXField: "date",
    xAxis: sbDateAxis,
    yAxis: sbValueAxis
  })
);

sbSeries.fills.template.setAll({
  visible: true,
  fillOpacity: 0.3
});


// Generate random data and set on series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
var data = [];
var price1 = 1000;
var quantity = 10000;

for (var i = 1; i < 5000; i++) {
  price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 20);

  if (price1 < 100) {
    price1 = 100;
  }

  quantity += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 500);

  if (quantity < 0) {
    quantity *= -1;
  }
  data.push({
    date: new Date(2010, 0, i).getTime(),
    price1: price1,
    quantity: quantity
  });
}

valueSeries1.data.setAll(data);
volumeSeries.data.setAll(data);
sbSeries.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/#Forcing_appearance_animation
chart.appear(1000, 100);