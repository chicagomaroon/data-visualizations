// For API and chart documentation please look here:
// https://www.highcharts.com/demo
Highcharts.chart('chart-div', {
    // Setting default colors
    colors: ['#800000', '#FD4C4C', '#FC0000', '#7D2525', '#C90000'],

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
            data: [
                {
                    name: 'Camaraderie',
                    weight: 1
                },
                {
                    name: 'Comforting',
                    weight: 1
                },
                {
                    name: 'Community',
                    weight: 3
                },
                {
                    name: 'Exciting',
                    weight: 1
                },
                {
                    name: 'Friendly',
                    weight: 1
                },
                {
                    name: 'Fun',
                    weight: 2
                },
                {
                    name: 'Hard-working',
                    weight: 1
                },
                {
                    name: 'Impactful',
                    weight: 1
                },
                {
                    name: 'Important',
                    weight: 1
                },
                {
                    name: 'Independent',
                    weight: 1
                },
                {
                    name: 'Interesting',
                    weight: 1
                },
                {
                    name: 'Joyous',
                    weight: 1
                },
                {
                    name: 'Lively',
                    weight: 1
                },
                {
                    name: 'Passionate',
                    weight: 1
                },
                {
                    name: 'Representative',
                    weight: 1
                },
                {
                    name: 'Sincere',
                    weight: 1
                },
                {
                    name: 'Skill-building',
                    weight: 1
                },
                {
                    name: 'Trustworthy',
                    weight: 1
                },
                {
                    name: 'Warm',
                    weight: 1
                },
                {
                    name: 'Welcoming',
                    weight: 1
                },
                {
                    name: 'Whimsical',
                    weight: 1
                },
                {
                    name: 'Wholesome',
                    weight: 1
                },
                {
                    name: 'Wonderful',
                    weight: 1
                },
                {
                    name: 'Wonkish',
                    weight: 1
                }
            ],
            name: 'Occurrences'
        }
    ],
    title: {
        text: 'The Maroon Staff Survey 2024: Maroon-in-a-Word',
        align: 'center'
    },
    tooltip: {
        headerFormat:
            '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
    }
});
