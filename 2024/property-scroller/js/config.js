const config = [
    {
        chapterTitle: 'Chapter 1: The Beginning',
        id: '1',
        image: './static/images/chapter1.jpg',
        subsections: [
            {
                id: '1.1',
                text: `In January 1890, prominent Hyde Park landowner Marshall Fields pledged 
                        10 acres of his land—now the quad—to a new university. The site stretches 
                        from 57th to 59th Street, between Ellis and Lexington. Over the next forty years, 
                        UChicago’s quadrangle takes shape.`,
                start_year: 1890,
                end_year: 1900,
                zoom: 17
                //pan: uChiLocation
            },
            {
                id: '1.2',
                text: `In 1892, architect Henry Ives Cobb draws up a master plan for the University. 
                A neo-Gothic style, advocated for by trustees Ryerson and Hutchinson, aims to situate 
                the University among storied European universities and “their ancient lineage of scholarship.” 
                “The Gothic aesthetic allowed the new university to grant itself a sense of institutional 
                legitimacy that belied its age,” Eldred writes.`,
                start_year: 1900,
                end_year: 1910
            },
            {
                id: '1.3',
                text: `Over time, iconic buildings such as the Hutchinson Commons/Reynolds Club/Mitchell Tower/Mandel Hall complex (1903), Harper Memorial Library (1912), and Bond Chapel (1926) are completed. The Neo-Gothic buildings on the Main Quad were designed by five different architects/firms (Henry Ives Cobb; Dwight, Heald Perkins; Shepley, Rutan and Coolidge; Holabird and Roche; and Coolidge and Hodgdon).`
            },
            {
                id: '1.4',
                text: `The end of this period is marked by a push to expand South to the area between 60th and 61st Streets and Ellis and University Avenues. One trustee, Frederic C. Woodward, argues for on-campus housing, wanting to emulate the Oxbridge tradition or the collegiate model of Oxford and Cambridge University. However, the only new building realized from this vision is Burton-Judson Courts, which opened in the autumn quarter of 1931. The full expansion would take place years later.`
            },
            {
                id: 'closing1',
                text: `During the first decades, the university stays cloistered from the rapidly growing Chicago metropolis.
`
            }
        ]
    },
    {
        chapterTitle:
            'The Problem of our Property: Racially-Restrictive Covenants, 1933–1948',
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
