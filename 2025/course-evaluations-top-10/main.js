// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

// from json file
fetch("top_hours.json")
  .then((res) => res.json())
  .then((data) => {
    const categories = data.map(d => d["Course Name"]);
    const values = data.map(d => d["Average of Average Hours"]);

    Highcharts.chart('chart-div', {
        colors: [
            '#800000',
            '#FFA319',
            '#C16622',
            '#8F3931',
            '#8A9045',
            '#58593F',
            '#155F83',
            '#350E20',
            '#47B5FF',
            '#FF3399'
        ],

        chart: {
            type: 'bar'
        },

        title: {
            text: 'Top 10 Courses by Hours Worked',
            align: 'center'
        },
        subtitle: {
            text: 'Each bar shows a Core class by average weekly hours worked.',
            align: 'center'
        },

        legend: {
            enabled: false // no legend
        },

        xAxis: {
            categories: categories,
            title: { text: null },
            labels: {
                style: { fontSize: '13px' }
            },
            gridLineWidth: 0,
            lineWidth: 0
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Average Hours Worked',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            },
            gridLineWidth: 1
        },

        tooltip: {
            valueSuffix: ' hours'
        },

        plotOptions: {
            series: {
                borderRadius: 4,
                groupPadding: 0.1
            }
        },

        series: [{
            name: 'Average Hours Worked',
            data: values
        }]
    });
  })
  .catch((err) => {
    console.error("Error loading top_hours.json:", err);
  });
