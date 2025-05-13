Highcharts.setOptions({
  colors: ['#800000'] // all dots begin with maroon
});

fetch("csvjson.json")
  .then((response) => response.json())
  .then((data) => {
    const categoryMap = {};

    data.forEach((d) => {
      const category = d["Category"];
      if (!categoryMap[category]) {
        categoryMap[category] = [];
      }

      categoryMap[category].push({
        x: parseFloat(d["Average of Average Hours"]),
        y: parseFloat(d["Average of Sentiment Score"]),
        name: d["Course Name"],
        originalColor: "#800000",
        color: "#800000"
      });
    });

    const seriesData = Object.entries(categoryMap).map(([category, points]) => ({
      name: category,
      data: points,
      marker: {
        symbol: 'circle'
      }
    }));

    Highcharts.chart("container", {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: "The Core, Ranked"
      },
      subtitle: {
        text: "Each dot shows a core class by hours worked and sentiment."
      },
      xAxis: {
        title: { text: "Average Hours Worked per Week" }
      },
      yAxis: {
        title: { text: "Average Sentiment Score" }
      },
      legend: {
        enabled: true
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.point.name}</b><br>` +
                 `Hours: ${Highcharts.numberFormat(this.point.x, 2)}<br>` +
                 `Sentiment: ${Highcharts.numberFormat(this.point.y, 3)}`;
        }
      },
      plotOptions: {
        series: {
          events: {
            legendItemClick: function () {
              const selectedSeries = this;
              seriesData.forEach(series => {
                series.data.forEach(point => {
                  point.update({
                    color: series.name === selectedSeries.name ? "#800000" : "#D6D6CE"
                  }, false);
                });
              });
              Highcharts.charts[0].redraw();
              return false;
            }
          }
        },
        scatter: {
          marker: {
            radius: 4,
            states: {
              hover: {
                enabled: true,
                lineColor: '#333'
              }
            }
          },
          states: {
            inactive: {
              enabled: true,
              opacity: 0.15
            }
          }
        }
      },
      series: seriesData
    });
  })
  .catch((err) => {
    console.error("Error loading csvjson.json:", err);
  });
