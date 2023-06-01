const descriptions = [
    {
        name: 'Dedicated',
        weight: 2
    },
    {
        name: 'Responsible',
        weight: 1
    },
    {
        name: 'Reform',
        weight: 1
    },
    {
        name: 'Fluid',
        weight: 1
    },
    {
        name: 'Inquisitive',
        weight: 1
    },
    {
        name: 'Cautious',
        weight: 1
    },
    {
        name: 'Welcoming',
        weight: 3
    },
    {
        name: 'Funk',
        weight: 1
    },
    {
        name: 'Inviting',
        weight: 1
    },
    {
        name: 'Valuable',
        weight: 1
    },
    {
        name: 'Curiosity',
        weight: 1
    },
    {
        name: 'Hard-Working',
        weight: 1
    },
    {
        name: 'Committed',
        weight: 1
    },
    {
        name: 'Driven',
        weight: 1
    },
    {
        name: 'Collaborative',
        weight: 2
    },
    {
        name: 'Exciting',
        weight: 1
    },
    {
        name: 'Independent',
        weight: 1
    },
    {
        name: 'Informative',
        weight: 1
    },
    {
        name: 'Learning',
        weight: 1
    },
    {
        name: 'Everything',
        weight: 1
    },
    {
        name: 'Close',
        weight: 1
    },
    {
        name: 'Busy',
        weight: 1
    },
    {
        name: 'Knowledgeable',
        weight: 1
    },
    {
        name: 'Large',
        weight: 1
    },
    {
        name: 'Chill',
        weight: 1
    },
    {
        name: 'Unparalleled',
        weight: 1
    },
    {
        name: 'Meowparty',
        weight: 1
    }
];

// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
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

    // All code for your chart goes here
    // All code for your chart goes here
    accessibility: {
        screenReaderSection: {
            beforeChartFormat:
                '<h5>{chartTitle}</h5>' + '<div>{viewTableButton}</div>'
        }
    },
    series: [
        {
            type: 'wordcloud',
            data: descriptions,
            name: 'Occurrences'
        }
    ],
    title: {
        text: 'The Maroon Staff Survey 2023: Maroon-in-a-Word',
        align: 'center'
    },
    tooltip: {
        headerFormat:
            '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
    }
});
