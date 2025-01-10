(async () => {
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json'
    ).then((response) => response.json());

    colors = ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'];

    const data = [
        { region: 'West', state_code: 'AK', value: 13 },
        { region: 'South', state_code: 'AL', value: 9 },
        { region: 'South', state_code: 'AR', value: 9 },
        { region: 'West', state_code: 'AZ', value: 13 },
        { region: 'West', state_code: 'CA', value: 13 },
        { region: 'West', state_code: 'CO', value: 13 },
        { region: 'Northeast', state_code: 'CT', value: 35 },
        { region: 'South', state_code: 'DC', value: 9 },
        { region: 'South', state_code: 'DE', value: 9 },
        { region: 'South', state_code: 'FL', value: 9 },
        { region: 'South', state_code: 'GA', value: 9 },
        { region: 'West', state_code: 'HI', value: 13 },
        { region: 'Midwest', state_code: 'IA', value: 36 },
        { region: 'West', state_code: 'ID', value: 13 },
        { region: 'Midwest', state_code: 'IL', value: 36 },
        { region: 'Midwest', state_code: 'IN', value: 36 },
        { region: 'Midwest', state_code: 'KS', value: 36 },
        { region: 'South', state_code: 'KY', value: 9 },
        { region: 'South', state_code: 'LA', value: 9 },
        { region: 'Northeast', state_code: 'MA', value: 35 },
        { region: 'South', state_code: 'MD', value: 9 },
        { region: 'Northeast', state_code: 'ME', value: 35 },
        { region: 'Midwest', state_code: 'MI', value: 36 },
        { region: 'Midwest', state_code: 'MN', value: 36 },
        { region: 'Midwest', state_code: 'MO', value: 36 },
        { region: 'South', state_code: 'MS', value: 9 },
        { region: 'West', state_code: 'MT', value: 13 },
        { region: 'South', state_code: 'NC', value: 9 },
        { region: 'Midwest', state_code: 'ND', value: 36 },
        { region: 'Midwest', state_code: 'NE', value: 36 },
        { region: 'Northeast', state_code: 'NH', value: 35 },
        { region: 'Northeast', state_code: 'NJ', value: 35 },
        { region: 'West', state_code: 'NM', value: 13 },
        { region: 'West', state_code: 'NV', value: 13 },
        { region: 'Northeast', state_code: 'NY', value: 35 },
        { region: 'Midwest', state_code: 'OH', value: 36 },
        { region: 'South', state_code: 'OK', value: 9 },
        { region: 'West', state_code: 'OR', value: 13 },
        { region: 'Northeast', state_code: 'PA', value: 35 },
        { region: 'Northeast', state_code: 'RI', value: 35 },
        { region: 'South', state_code: 'SC', value: 9 },
        { region: 'Midwest', state_code: 'SD', value: 36 },
        { region: 'South', state_code: 'TN', value: 9 },
        { region: 'South', state_code: 'TX', value: 9 },
        { region: 'West', state_code: 'UT', value: 13 },
        { region: 'South', state_code: 'VA', value: 9 },
        { region: 'Northeast', state_code: 'VT', value: 35 },
        { region: 'West', state_code: 'WA', value: 13 },
        { region: 'Midwest', state_code: 'WI', value: 36 },
        { region: 'South', state_code: 'WV', value: 9 },
        { region: 'West', state_code: 'WY', value: 13 }
    ];

    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: 'Georgia, serif'
            }
        }
    });

    // Instantiate the map
    Highcharts.mapChart('chart-div', {
        chart: {
            map: topology
        },

        title: {
            text: 'Where is the Class of 2024 Going?'
        },
        subtitle: {
            text: 'Most students are staying in the Midwest or heading to the Northeast.'
        },
        legend: {
            enabled: false
        },
        mapNavigation: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        colorAxis: {
            dataClasses: [
                {
                    from: 36,
                    to: 36,
                    color: colors[4],

                    name: 'Midwest'
                },
                {
                    from: 35,
                    to: 35,
                    color: colors[3],
                    name: 'Northeastern'
                },
                {
                    from: 13,
                    to: 13,
                    color: colors[2],
                    name: 'West'
                },
                {
                    from: 9,
                    to: 9,
                    color: colors[1],
                    name: 'South'
                }
            ]
        },
        series: [
            {
                data: data,
                joinBy: ['postal-code', 'state_code'],
                dataLabels: {
                    enabled: false
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        ]
    });
})();
