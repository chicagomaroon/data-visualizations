const config = [{
        chapterTitle: 'Isolation: 1890-1930',
        id: '1',
        image: './static/images/chapter1.jpg',
        subsections: [
            {
                id: '1.1',
                text: 'This is the section 1.1',
                start_year: 1890,
                end_year: 1900,
                zoom: 17,
                //pan: uChiLocation
            },
            {
                id: '1.2',
                text: 'This is the section 1.2',
                start_year: 1900,
                end_year: 1910
            },
            {
                id: '1.3',
                text: 'This is the section 1.3'
            }
        ]
    }, {
        chapterTitle: 'The Problem of our Property: Racially-Restrictive Covenants, 1933–1948',
        id: '2',
        image: './static/images/chapter2.jpg',
        subsections: [
            {
                id: '2.1',
                text: 'This is the section 2.1',
                start_year: 1910,
                end_year: 1930,
                zoom: 16,
                //pan: [41.79139, -87.60000]

            },
            {
                id: '2.2',
                text: 'This is the section 2.2',
                start_year: 1930,
                end_year: 1940
            }
        ]
    }
];

sessionStorage.setItem('config', JSON.stringify(config));
