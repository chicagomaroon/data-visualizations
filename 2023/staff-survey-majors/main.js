const majorsData = [
    {
        major: 'Romance Language and Literature',
        weight: 1
    },
    {
        major: 'Astrophysics',
        weight: 1
    },
    {
        major: 'Law Letters and Society',
        weight: 4
    },
    {
        major: 'Critical Race and Ethnic Studies',
        weight: 1
    },
    {
        major: 'Public Policy',
        weight: 4
    },
    {
        major: 'Economics',
        weight: 12
    },
    {
        major: 'Undecided',
        weight: 1
    },
    {
        major: 'Music',
        weight: 1
    },
    {
        major: 'Comparative Literature',
        weight: 1
    },
    {
        major: 'Spanish',
        weight: 1
    },
    {
        major: 'Biological Sciences',
        weight: 1
    },
    {
        major: 'Biochemistry',
        weight: 1
    },
    {
        major: 'Cinema and Media Studies',
        weight: 1
    },
    {
        major: 'Physics',
        weight: 1
    },
    {
        major: 'Linguistics',
        weight: 1
    },
    {
        major: 'Mathematics',
        weight: 1
    },
    {
        major: 'Environmental Science',
        weight: 2
    },
    {
        major: 'Fundamentals',
        weight: 1
    },
    {
        major: 'Urban Studies',
        weight: 1
    },
    {
        major: 'Psychology',
        weight: 1
    },
    {
        major: 'English and Creative Writing',
        weight: 2
    },
    {
        major: 'Global Studies',
        weight: 3
    },
    {
        major: 'Statistics',
        weight: 1
    },
    {
        major: 'English',
        weight: 6
    },
    {
        major: 'English Literature and Language',
        weight: 1
    },
    {
        major: 'Sociology',
        weight: 4
    },
    {
        major: 'Data Science',
        weight: 1
    },
    {
        major: 'Human Rights',
        weight: 2
    },
    {
        major: 'Political Science',
        weight: 4
    },
    {
        major: 'Visual Art',
        weight: 1
    },
    {
        major: 'Computer Science',
        weight: 4
    },
    {
        major: 'History',
        weight: 5
    },
    {
        major: 'Russian and East European Studies',
        weight: 1
    },
    {
        major: 'Chemistry',
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
    title: {
        text: 'The Maroon Staff Survey 2023: Represented Majors',
        align: 'center'
    },

    plotOptions: {
        series: {
            // PUT PLOT CONFIG OPTIONS HERE SPACE FOR YOUR DATA
        }
    },

    series: [
        {
            name: '[DATA FIELD NAME]',
            label: {
                enabled: false
            },
            data: []
        }
    ]
});
