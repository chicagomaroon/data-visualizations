const config = [
    {
        chapterTitle: 'T1890-1933: The Cobb Plan',
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
                zoom: 17,
                image: './static/images/jdr.jpg'
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
        chapterTitle: '1933-1948: Neighborhood Intervention',
        chapterYears: '1933–1948',
        id: '2',
        image: './static/images/chapter2.jpg',
        subsections: [
            {
                id: 'end_gothic',
                text: 'The Committee on Building and Grounds was eliminated on March 21, 1932. International House (1932) and the Field House (1932) were the final buildings constructed in a “minimal Gothic” style, streamlined by Art Deco and modernist design.',
                start_year: 1910,
                end_year: 1930,
                zoom: 16,
                timeline_year: 1932
                //pan: [41.79139, -87.60000]
            },
            {
                id: 'demographics',
                text: `The Great Migration significantly transforms the racial makeup of Chicago. A city that was 2% Black in 1910 would approach 14% by 1950. “Racial succession,” or the process of one racial group replacing another in the neighborhood, becomes a growing concern of both the University and the City.`,
                start_year: 1930,
                end_year: 1940
            },
            {
                id: '2.1',
                text: `1933 documents the first proof of the university’s attempts to “stabilize the neighborhood.” by reinforcing legal racial covenants. They intervene through intermediaries, by providing covert financial support.`,
                timeline_year: 1933
            },
            {
                id: '2.2',
                text: `Between 1933 and 1947, UChicago spends $83,597.46 to support legal assistance for the defense of racially restrictive covenants in Hyde Park, subsidizing neighborhood groups, such as the Woodlawn Property Owners League and the Hyde Park Property Owners Association.During these years President Hutchins maintains that residents of Hyde Park and nearby communities had the right to “invoke and defend'' racially restrictive covenants as legal instruments.`
            },
            {
                id: '2.3',
                text: `Students push back. In 1942, the Chicago chapter of the Committee of Racial Equality is created by two university students who organize mixed-race housing.`,
                timeline_year: 1942
            },
            {
                id: '2.4',
                text: `In 1948, the Shelley vs. Kramer Supreme Court case outlaws racial covenants.`,
                timeline_year: 1948,
                image: './static/images/shelleyvkramer.jpeg'
            }
        ]
    },
    {
        chapterTitle:
            '1949-1962: Urban Renewal and <br>“A Compatible Community”',
        chapterYears: '1949-1962',
        id: '3',
        image: './static/images/urban_renewal_1960.jpg',
        subsections: [
            {
                id: '3.1',
                text: `The University begins shaping the urban environment, beyond its earlier legal and financial methods, through substantial property acquisition and “blight removal.”  It's the first American higher education institution to embark on a comprehensive urban renewal campaign. 
                As early as 1945, in his State of the University message for that year Kimpton writes: “For the last 15 years, the University has steadily deteriorated, until today, I am ashamed to say, the University has the unfortunate distinction of having the worst-housed faculty in the U.S."`
            },
            {
                id: '3.2',
                text: `By the mid-1940s the black population in the area immediately surrounding the university was increasing: Hyde Park had 573 black residents in 1940 and 1,757 in 1950, most of whom had arrived after 1948. At the beginning of the 1950s, the crime rate in Hyde Park was the second highest in the city, according to beat cop Bob Mason. The university sees maintaining a “desirable” neighborhood as tied to its survival. “I believe we have found the answer. It is called "Urban Renewal"...it is, however, a tragic fact that these efforts are today essential to the ability of the institutions to fulfill their primary responsibilities” —Julian Levi`
            }
        ]
    }
];

sessionStorage.setItem('config', JSON.stringify(config));
