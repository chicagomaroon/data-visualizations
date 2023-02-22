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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "panX",
  wheelY: "zoomX"
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("visible", false);

// Generate random data
var date = new Date();
date.setHours(0, 0, 0, 0);
var value = 1;

function generateData() {
  value = Math.round((Math.random() * 10 - 5) + value);
  if (date.getDay() == 5) {
    am5.time.add(date, "day", 3);
  } else {
    am5.time.add(date, "day", 1);
  }

  return {
    date: date.getTime(),
    value: value
  };
}

function generateDatas(count) {
  var data = [];
  for (var i = 0; i < count; ++i) {
    data.push(generateData());
  }
  return data;
}


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/category-date-axis/
var xRenderer = am5xy.AxisRendererX.new(root, {
  pan:"zoom"
});
xRenderer.labels.template.set("minPosition", 0.01);
xRenderer.labels.template.set("maxPosition", 0.99);

var xAxis = chart.xAxes.push(
  am5xy.CategoryDateAxis.new(root, {
    maxDeviation:0.5,
    categoryField: "date",
    baseInterval: {
      timeUnit: "day",
      count: 1
    },
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    maxDeviation:1,
    renderer: am5xy.AxisRendererY.new(root, {
      pan:"zoom"
    })
  })
);


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5xy.LineSeries.new(root, {
  name: "Series",
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "date",
  tooltip: am5.Tooltip.new(root, {
    labelText: "{valueY}"
  })
}));


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));


// Set data
var data = generateDatas(200);
series.data.setAll(data);
xAxis.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/#Forcing_appearance_animation
series.appear(1000);
chart.appear(1000, 100);