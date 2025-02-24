async function getTopolgy() {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json'
    );
    return topology.json();
}

getTopolgy().then((topology) => {
    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'Georgia, serif'
            }
        }
    });

    // Create the chart
    Highcharts.mapChart('chart-div', {
        chart: {
            map: topology,
            margin: 1
        },

        title: {
            text: 'Hometowns of 33 Surveyed Students From the U.S.',
            style: {
                textOutline: '5px contrast'
            }
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                alignTo: 'spacingBox',
                verticalAlign: 'middle'
            }
        },

        mapView: {
            padding: [50, 50, 50, 50]
        },

        legend: {
            // floating: true,
            margin: 100,
            backgroundColor: '#ffffffcc',
            align: 'center',
            borderWidth: 1
        },

        plotOptions: {
            mappoint: {
                keys: ['id', 'lat', 'lon', 'name', 'y'],
                marker: {
                    lineWidth: 1,
                    lineColor: '#000',
                    symbol: 'mapmarker',
                    radius: 8
                },
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.point.name;
                    },
                    style: {
                        fontSize: 10
                    },
                    y: -23
                }
            }
        },

        tooltip: {
            enabled: false
        },

        series: [
            {
                allAreas: true,
                name: 'Coastline',
                states: {
                    inactive: {
                        opacity: 0.2
                    }
                },
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: false,
                showInLegend: false,
                borderColor: 'blue',
                opacity: 0.3,
                borderWidth: 10
            },
            {
                allAreas: true,
                name: 'Countries',
                states: {
                    inactive: {
                        opacity: 1
                    }
                },
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: false,
                showInLegend: false,
                borderColor: 'rgba(0, 0, 0, 0.25)'
            },
            {
                name: 'Non-FGLI Student',
                color: 'rgb(128,0,0)',
                data: [
                    ['us-nj', 40.03, -74.52, 'New Jersey', -5],
                    ['us-dc', 38.92, -76.98, 'Washington, DC', -3],
                    ['us-va', 38.85, -77.31, 'Fairfax, VA', -3],
                    ['us-ct', 41.76, -72.74, 'West Hartford, CT', -10],
                    ['us-nj', 40.03, -74.52, 'New Jersey', -1],
                    ['us-md', 38.98, -77.12, 'Bethesda, MD', -2],
                    ['us-ny', 40.71, -74.01, 'New York, NY', -3],
                    ['us-wa', 47.6, -122.33, 'Seattle, WA', -1],
                    ['us-mi', 42.39, -82.91, 'Detroit, MI', 0],
                    ['us-ct', 41.67, -72.82, 'Connecticut', -1],
                    ['us-ny', 42.89, -78.89, 'Buffalo, NY', 0],
                    ['us-ny', 40.66, -73.9, 'Brooklyn, NY', 0],
                    ['us-tx', 32.85, -97.04, 'Dallas Fort-Worth, TX', 0],
                    ['us-ca', 36.84, -119.85, 'California', -5],
                    ['us-ca', 37.81, -122.28, 'Oakland, CA', 4],
                    ['us-ca', 37.91, -122.07, 'Walnut Creek, CA', 4]
                ],
                type: 'mappoint'
            },
            {
                name: 'FGLI Student',
                color: 'rgb(255,163,25)',
                data: [
                    ['us-ca', 34.05, -118.33, 'Los Angeles, CA', -6],
                    ['us-ut', 40.75, -111.91, 'Salt Lake City, UT', 1],
                    ['us-nc', 36.09, -80.22, 'Winston-Salem, NC', -6],
                    ['us-ky', 37.36, -85.01, 'Kentucky', -8],
                    ['us-il', 41.87, -88.11, 'Wheaton, IL', -4],
                    ['us-dc', 38.92, -76.78, 'Washington, DC', -4],
                    ['us-il', 41.86, -87.7, 'Chicago, IL', -4],
                    ['us-sc', 34.85, -82.4, 'Greenville, SC', -4],
                    ['us-fl', 28.54, -81.3, 'Orlando, FL', 4],
                    ['us-ky', 38.25, -85.76, 'Louisville, KY', 4]
                ],
                type: 'mappoint'
            }
        ]
    });
});
