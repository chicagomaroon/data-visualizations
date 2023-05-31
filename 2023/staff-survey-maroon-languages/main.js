// For API and chart documentation please look here:
// https://www.highcharts.com/demo
const languageData = [
    {
        name: 'Cantonese',
        weight: 1
    },
    {
        name: 'Japanese',
        weight: 1
    },
    {
        name: 'Bengali',
        weight: 1
    },
    {
        name: 'Hindi',
        weight: 2
    },
    {
        name: 'Italian',
        weight: 1
    },
    {
        name: 'French',
        weight: 3
    },
    {
        name: 'German',
        weight: 3
    },
    {
        name: 'Spanish',
        weight: 9
    },
    {
        name: 'Swahili',
        weight: 1
    },
    {
        name: 'Hungarian',
        weight: 1
    },
    {
        name: 'Korean',
        weight: 2
    },
    {
        name: 'Greek',
        weight: 1
    },
    {
        name: 'Mandarin',
        weight: 5
    }
];

Highcharts.chart('chart-div', {
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
    accessibility: {
        screenReaderSection: {
            beforeChartFormat:
                '<h5>{chartTitle}</h5>' + '<div>{viewTableButton}</div>'
        }
    },
    series: [
        {
            type: 'wordcloud',
            data: languageData,
            name: 'Occurrences'
        }
    ],
    title: {
        text: 'The Maroon Staff Survey 2023: Spoken Languages',
        align: 'center'
    },
    subtitle: {
        text: 'Other than English',
        align: 'center'
    },
    tooltip: {
        headerFormat:
            '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
    }
});
