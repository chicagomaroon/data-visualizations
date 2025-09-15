// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.setOptions({
    chart: {
        style: {
            fontFamily: 'Georgia, serif'
        }
    }
});

// Highcharts.chart('chart-div', {
//     // Setting default colors
//     colors: [
//         '#800000',
//         '#FFA319',
//         '#C16622',
//         '#8F3931',
//         '#8A9045',
//         '#58593F',
//         '#155F83',
//         '#350E20',
//         '#47B5FF',
//         '#FF3399'
//     ],

Highcharts.chart('chart-div', {
    title: {
        // text: 'UChicago Budget, Fiscal Year 2024'
        text: 'Revenue, Fiscal Year 2024'
    },
    subtitle: {
        text: 'For clarity, assets from hospital services ($4.2 billion) are excluded. Net assets (total assets minus total liabilities) for FY24 were $245.9 million.'
    },
    accessibility: {
        point: {
            valueDescriptionFormat:
                '{index}. {point.from} to {point.to}, ' + '{point.weight}.'
        }
    },
    tooltip: {
        headerFormat: null,
        pointFormat:
            '{point.fromNode.name} to {point.toNode.name}: ${point.weight:.1f}' +
            'M',
        nodeFormat: '{point.name}: ${point.sum:.1f}M'
    },

    series: [
        {
            keys: ['to', 'from', 'weight'],

            // nodes: [
            //     {
            //         id: 'Total assets',
            //         color: '#800000',
            //     },
            //     {
            //         id: 'Total assets',
            //         color: '#800000',
            //     },
            //     {
            //         id: 'Total assets',
            //         color: '#800000',
            //     },
            //     {
            //         id: 'Total assets',
            //         color: '#800000',
            //     },
            //     {
            //         id: 'Total assets',
            //         color: '#800000',
            //     },
            //     {
            //         id: 'Total assets',
            //         color: '#800000',
            //     },
            //     {
            //         id: 'Total assets',
            //         color: '#800000',
            //     },
            //     {
            //         id: 'Total assets',
            //         color: '#800000',
            //     },
            // ]

            data: [
                [
                    'Total assets<br>(excluding hospital)',
                    'Revenue with restrictions',
                    338.2
                ],
                [
                    'Revenue with restrictions',
                    'Endowment payout with restrictions',
                    0.9
                ],
                ['Revenue with restrictions', 'Private gifts', 406.4],
                [
                    'Revenue with restrictions',
                    'Investment return with restrictions',
                    136.9
                ],

                // ['Budget', 'Revenue without restrictions', 7638.3],
                [
                    'Total assets<br>(excluding hospital)',
                    'Revenue without restrictions<br>(excluding hospital)',
                    3387.2
                ],
                // ['Revenue without restrictions', 'Total operating revenue', 7536.9],
                [
                    'Revenue without restrictions<br>(excluding hospital)',
                    'Total operating revenue',
                    3285.9
                ],
                ['Total operating revenue', 'Net tuition', 611.3],
                [
                    'Total operating revenue',
                    'Government grants and contracts',
                    561.3
                ],
                [
                    'Total operating revenue',
                    'Private gifts, grants, and contracts',
                    293.2
                ],
                [
                    'Total operating revenue',
                    'Endowment payout without restrictions',
                    565.7
                ],
                // ['Total operating revenue', 'Net patient services', 4251.0],
                ['Total operating revenue', 'Other operating revenue', 1254.4],
                // ['Revenue without restrictions', 'Total nonoperating revenue', 101.4],
                [
                    'Revenue without restrictions<br>(excluding hospital)',
                    'Total nonoperating revenue',
                    101.4
                ],
                [
                    'Total nonoperating revenue',
                    'Investment return without restrictions',
                    66.0
                ],
                [
                    'Total nonoperating revenue',
                    'Other nonoperating revenue',
                    35.4
                ]

                // ['Budget', 'Expenses', 7730.6], // negative
                // ['Expenses', 'Total operating expenses', 7730.6],
                // ['Total operating expenses', 'Salaries and benefits', 4212.9],
                // ['Total operating expenses', 'Other expenses', 3517.7],
            ],
            type: 'sankey',
            name: 'Budget'
        }
    ]
});

Highcharts.chart('chart-div2', {
    chart: {
        type: 'pie'
    },

    // Setting default colors
    colors: [
        '#C76363',
        '#C04A49',
        '#A42323',
        '#7F1416',
        '#571612',
        '#3D3D3D',
        '#392F83',
        '#184F26'
    ],

    // All code for your chart goes here
    title: {
        text: 'Investments, Fiscal Year 2024'
    },

    subtitle: {
        text: ''
    },

    legend: {
        enabled: false
    },

    xAxis: {
        type: 'datetime'
    },

    yAxis: {
        title: {
            text: 'Value (in millions of dollars)'
        }
    },

    // plotOptions: {
    //     series: {
    //         pointStart: 1999
    //     }
    // },

    // accessibility: {
    //     point: {
    //         valueDescriptionFormat: '{index}. {point.from} to {point.to}, ' +
    //             '{point.weight}.'
    //     }
    // },

    tooltip: {
        formatter: function () {
            return (
                Highcharts.dateFormat('%Y-%m-%d', this.x) +
                '</b>: <b>$' +
                Math.round(this.y) +
                'M</b>'
            );
        }
    },

    series: [
        {
            name: 'SEC Investments',
            label: {
                enabled: false
            },
            innerSize: '75%',
            data: [
                {
                    name: 'Cash equivalents',
                    y: 198124
                },
                { name: 'Global public equities', y: 3262557 },
                { name: 'Private equity', y: 3210498 },
                { name: 'Funds in trust', y: 300116 },
                { name: 'Fixed income', y: 861458 },
                { name: 'Real assets', y: 572065 },
                { name: 'Real estate', y: 529025 },

                { name: 'Equity oriented', y: 1014774 },
                { name: 'Diversifying', y: 1533315 }
            ]
        }
    ]
});

Highcharts.chart('chart-div3', {
    chart: {
        type: 'pie'
    },

    // Setting default colors
    colors: [
        '#C76363',
        '#C04A49',
        '#A42323',
        '#7F1416',
        '#571612',
        '#3D3D3D',
        '#392F83',
        '#184F26'
    ],

    // All code for your chart goes here
    title: {
        text: 'Investments, Fiscal Year 2002'
    },

    subtitle: {
        text: ''
    },

    legend: {
        enabled: false
    },

    xAxis: {
        type: 'datetime'
    },

    yAxis: {
        title: {
            text: 'Value (in millions of dollars)'
        }
    },

    // plotOptions: {
    //     series: {
    //         pointStart: 1999
    //     }
    // },

    // accessibility: {
    //     point: {
    //         valueDescriptionFormat: '{index}. {point.from} to {point.to}, ' +
    //             '{point.weight}.'
    //     }
    // },

    tooltip: {
        formatter: function () {
            return (
                Highcharts.dateFormat('%Y-%m-%d', this.x) +
                '</b>: <b>$' +
                Math.round(this.y) +
                'M</b>'
            );
        }
    },

    series: [
        {
            name: 'SEC Investments',
            label: {
                enabled: false
            },
            innerSize: '75%',

            data: [
                { name: 'Cash equivalents', y: 87124 },
                { name: 'Global public equities', y: 684615 + 541500 },
                { name: 'Private equity', y: 584054 },
                { name: 'Funds in trust', y: 342324 },
                { name: 'Fixed income', y: 739785 },
                { name: 'Real assets', y: 274593 },
                { name: 'High yield bonds', y: 233478 },
                { name: 'Absolute return', y: 505807 }
            ]
        }
    ]
});

Highcharts.chart('chart-div4', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Data available about the endowment, Fiscal Year 2024',
        align: 'left'
    },
    xAxis: {
        categories: [
            'Global public equities',
            'Private equity',
            // 'Bonds',
            'Diversifying',
            'Equity oriented',
            'Fixed income',
            'Real estate',
            'Real assets',
            'Cash equivalents'
        ]
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [
        {
            name: 'Known',
            data: [
                423832, // Global public equities
                0, // Private equity
                0,
                0,
                0,
                0,
                0,
                0
            ]
        },
        {
            name: 'Unknown',
            data: [
                3262557 - 423832, // Global public equities
                3210498, // Private equity
                1533315,
                1014774,
                861458,
                572065,
                529025,
                198124
            ]
        }
    ]
});
