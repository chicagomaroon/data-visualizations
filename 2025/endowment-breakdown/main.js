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
        // text: 'UChicago Budget, Fiscal Year 2023-24'
        text: 'Change in Total Assets, Fiscal Year 2023-24'
    },
    subtitle: {
        text: "For clarity, assets from hospital services ($4.2 billion) are excluded. Net assets (total assets minus total liabilities) for FY24 were $245.9 million."
    },
    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.from} to {point.to}, ' +
                '{point.weight}.'
        }
    },
    tooltip: {
        headerFormat: null,
        pointFormat:
      '{point.fromNode.name} to {point.toNode.name}: ${point.weight:.1f}' +
      'M',
        nodeFormat: '{point.name}: ${point.sum:.1f}M'
    },
    // series: [{
    //     keys: ['from', 'to', 'weight'],
        
    //     nodes: [
    //         {
    //             id: 'Total assets',
    //             color: '#800000',
    //             offset: 0
    //         },
            
    //         {
    //             id: 'Net assets',
    //             color: '#C16622',
    //             // column: 2,
    //             offset: -20
    //         },
    //         {
    //             id: 'Restricted',
    //             color: '#74ffe7',
    //             // column: 3,
    //             offset: -10
    //         },
    //         {
    //             id: 'Unrestricted',
    //             color: '#8cff74',
    //             // column: 3,
    //             offset: 0
    //         },
    //         {
    //             id: 'Liabilities',
    //             color: '#FFA319',
    //             // column: 3,
    //             offset: 20
    //         },
    //     ],

    //     data: [
    //         ['Net assets', 'Restricted', 3402069],
    //         ['Net assets', 'Unrestricted', 8187634],
    //         ['Total assets', 'Net assets', 11589703],
    //         ['Total assets', 'Liabilities', 8746043],
    //     ],
    //     type: 'sankey',
    //     name: 'Budget'
    // }]
    series: [{
        keys: ['from', 'to', 'weight'],
        
        // nodes: [
        //     {
        //         id: 'Total assets',
        //         color: '#800000',
        //         offset: 0
        //     },
            
        //     {
        //         id: 'Net assets',
        //         color: '#C16622',
        //         // column: 2,
        //         offset: -20
        //     },
        //     {
        //         id: 'Restricted',
        //         color: '#74ffe7',
        //         // column: 3,
        //         offset: -10
        //     },
        //     {
        //         id: 'Unrestricted',
        //         color: '#8cff74',
        //         // column: 3,
        //         offset: 0
        //     },
        //     {
        //         id: 'Liabilities',
        //         color: '#FFA319',
        //         // column: 3,
        //         offset: 20
        //     },
        // ],

        data: [
            ['Total assets<br>(excluding hospital)', 'Revenue with restrictions', 338.2],
            ['Revenue with restrictions', 'Endowment payout with restrictions', .9],
            ['Revenue with restrictions', 'Private gifts', 406.4],
            ['Revenue with restrictions', 'Investment return with restrictions', 136.9],

            // ['Budget', 'Revenue without restrictions', 7638.3],
            ['Total assets<br>(excluding hospital)', 'Revenue without restrictions<br>(excluding hospital)', 3387.2],
            // ['Revenue without restrictions', 'Total operating revenue', 7536.9], 
            ['Revenue without restrictions<br>(excluding hospital)', 'Total operating revenue', 3285.9], 
            ['Total operating revenue', 'Net tuition', 611.3],
            ['Total operating revenue', 'Government grants and contracts', 561.3],
            ['Total operating revenue', 'Private gifts, grants, and contracts', 293.2],
            ['Total operating revenue', 'Endowment payout without restrictions', 565.7],
            // ['Total operating revenue', 'Net patient services', 4251.0],
            ['Total operating revenue', 'Other operating revenue', 1254.4],
            // ['Revenue without restrictions', 'Total nonoperating revenue', 101.4],
            ['Revenue without restrictions<br>(excluding hospital)', 'Total nonoperating revenue', 101.4],
            ['Total nonoperating revenue', 'Investment return without restrictions', 66.0],
            ['Total nonoperating revenue', 'Other nonoperating revenue', 35.4],
        
            // ['Budget', 'Expenses', 7730.6], // negative
            // ['Expenses', 'Total operating expenses', 7730.6],
            // ['Total operating expenses', 'Salaries and benefits', 4212.9],
            // ['Total operating expenses', 'Other expenses', 3517.7],
        ],
        type: 'sankey',
        name: 'Budget'
    }]

});