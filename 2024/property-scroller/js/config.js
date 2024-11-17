const config = [
    {
        chapterTitle: '1890-1933: The Cobb Plan',
        chapterYears: '1890-1933',
        id: '1',
        image: './static/images/chapter1.jpg',
        subsections: [
            {
                id: '1.1',
                text: `UChicago founder John D. Rockefeller commits $600,000 toward a “new institution of learning in Chicago.”`,
                start_year: 1890,
                end_year: 1900,
                timeline_year: 1889,
                zoom: 17
                //pan: uChiLocation
            },
            {
                id: '1.2',
                text: `Prominent Hyde Park landowner Marshall Fields pledges 10 acres of his land to a new university. The site stretches from 57th to 59th Street, between Ellis and Lexington. Over the next forty years, UChicago’s quadrangle takes shape.`,
                start_year: 1900,
                end_year: 1910,
                timeline_year: 1890,
                image: './static/images/og_uchi.jpg'
            },
            {
                id: '1.3',
                text: `Architect Henry Ives Cobb draws up a master plan for the University. A neo-Gothic style, advocated for by trustees Martin Ryerson and Charles Hutchinson, aims to situate the University among established, storied European universities. “The Gothic aesthetic allowed the new university to grant itself a sense of institutional legitimacy that belied its age,” Eldred writes.`,
                timeline_year: 1892,
                image: './static/images/chapter1.jpg'
            },
            {
                id: '1.3a',
                text: `Over time, iconic buildings are completed including Hutchinson Commons, Reynolds Club, Mitchell Tower, Mandel Hall, Harper Memorial Library, and Bond Chapel.`
            },
            {
                id: '1.4',
                text: `The University makes provisions to add on-campus housing. Architect Charles Klauder is commissioned to begin work on the “South Campus Plan” for the development of new residence halls on the south side of the Midway, however, the only building realized under the plan is Burton-Judson Courts in 1931. It remains a commuter campus through the Great Depression.`,
                timeline_year: 1927
            },
            {
                id: '1.5',
                text: `While the campus was self-contained, a community-university relationship began slowly to form. When President William Rainey Harper hired sought-after coach Stagg, football culture and games at Stagg Field grew the University’s reputation among Chicagoans.`,
                image: './static/images/football.jpg'
            }
        ]
    },
    {
        chapterTitle:
            '1933–1948: The Problem of our Property: Racially-Restrictive Covenants',
        chapterYears: '1933–1948',
        id: '2',
        image: './static/images/chapter2.jpg',
        subsections: [
            {
                id: '2.1',
                text: 'This is the section 2.1',
                start_year: 1910,
                end_year: 1930,
                zoom: 16
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
