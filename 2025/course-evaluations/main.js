fetch("csvjson.json")
  .then((response) => response.json())
  .then((data) => {
    // Group data by category
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
        color: '#800000' // Set maroon as default
      });
    });

    // Turn category map into series
    const seriesData = Object.entries(categoryMap).map(([category, points]) => ({
      name: category,
      data: points,
      marker: {
        symbol: 'circle'
      }
    }));

    const chart = Highcharts.chart("chart-div", {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: "Core Curriculum: Hours vs Sentiment"
      },
      xAxis: {
        title: { text: "Average Hours Worked per Week" }
      },
      yAxis: {
        title: { text: "Average Sentiment Score" }
      },
      tooltip: {
        formatter: function () {
          return `<b>${this.point.name}</b><br>` +
                 `Hours: ${Highcharts.numberFormat(this.point.x, 3)}<br>` +
                 `Sentiment: ${Highcharts.numberFormat(this.point.y, 3)}`;
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          point: {
            events: {
              mouseOver: function () {
                const hoveredCategory = this.series.name;
                chart.series.forEach(s => {
                  s.points.forEach(p => {
                    p.update({
                      color: s.name === hoveredCategory ? '#800000' : '#D6D6CE'
                    }, false);
                  });
                });
                chart.redraw();
              },
              mouseOut: function () {
                chart.series.forEach(s => {
                  s.points.forEach(p => {
                    p.update({ color: '#800000' }, false);
                  });
                });
                chart.redraw();
              }
            }
          }
        }
      },
      series: seriesData
    });
  })
  .catch((err) => console.error("Error loading JSON:", err));
