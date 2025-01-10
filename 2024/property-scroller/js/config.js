const config = [
    {
        chapterTitle: '1890-1933: Neo-Gothic Beginnings',
        chapterYears: '1890-1933',
        id: '1',
        image: './static/images/chapter1.jpg',
        subsections: [
            {
                id: '1.1',
                text: `The University of Chicago’s story begins in 1889 when industry titan John D. Rockefeller commits $600,000 toward a “new institution of learning in Chicago.”`,
                start_year: 1890,
                end_year: 1900,
                timeline_year: 1889,
                zoom: 17,
                image: './static/images/jdr.jpg',
                image_credit: 'University of Chicago Photographic Archive'
                //pan: uChiLocation
            },
            {
                id: '1.2',
                text: `A few months later, prominent landowner Marshall Fields pledges 10 acres of his land to the new Hyde Park university. The site stretches from 57th to 59th Street, between Ellis and Lexington. Over the next forty years, the University’s quadrangle takes shape.`,
                start_year: 1900,
                end_year: 1910,
                timeline_year: 1890,
                image: './static/images/og_uchi.jpg',
                image_credit: 'University of Chicago Photographic Archive'
            },
            {
                id: '1.3',
                text: `In 1892, the Board of Trustees commissions architect Henry Ives Cobb to draw up a master plan for the University. Trustees Martin Ryerson and Charles Hutchinson advocate for a neo-Gothic style, aiming to situate the University among established, storied European universities. “The Gothic aesthetic allowed the new university to grant itself a sense of institutional legitimacy that belied its age,” Eldred writes.`,
                timeline_year: 1892,
                image: './static/images/chapter1.jpg',
                image_credit: 'University of Chicago Photographic Archive'
            },
            {
                id: '1.3a',
                text: `In 1902, the University contracts the <a href='https://storymaps.arcgis.com/stories/8bc70c8a457943da81800274c93100ca' target = "_blank">Olmsted Brothers</a> to design the campus grounds. Over the next 40 years, the core of what today is called the main campus is built, including iconic buildings such as <span class="highlight hScroller">Reynolds Club</span> and <span class="highlight hScroller">Harper Memorial Library</span>.
                <br>
                <br>
                At any time, click the <span class = 'highlight explore'>Explore Map</span> button in the top right and hover over a building to learn more.`
            },
            {
                id: '1.4',
                text: `Circa 1927, the University makes provisions to add on-campus housing. The trustees commission architect Charles Klauder to  begin work on the “South Campus Plan” for the development of new residence halls on the south side of the Midway, however, the only building realized under the plan during this time is Burton-Judson Courts in 1931. The “South Campus Plan” is not revisited until the 1960s, and the University remains a commuter campus through the Great Depression.`,
                timeline_year: 1927
            },
            {
                id: '1.5',
                text: `While the campus was self-contained, a community-university relationship began slowly to form. When President William Rainey Harper hired sought-after coach Amos Alonzo Stagg, <a href = "https://chicagomaroon.com/39731/grey-city/brains-over-brawn-how-football-found-its-place-at-uchicago/" target = "_blank">football culture </a> and games at <span class="highlight hScroller">Stagg Field</span> grew the University’s reputation among Chicagoans.`,
                image: './static/images/football.jpg',
                image_credit: 'University of Chicago Photographic Archive'
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
                id: 'demographics',
                text: `The Great Migration significantly transforms the racial makeup of Chicago. A city that was 2% Black in 1910 would approach 14% by 1950. “Racial succession,” the process of one racial group replacing another in the neighborhood coined by early 20th-century University of Chicago urban sociologists, becomes a growing concern of both the University and the City.`,
                start_year: 1930,
                end_year: 1940,
                image: './static/images/demos.png',
                image_credit:
                    'Tax, S. (1959). Residential Integration: The Case of Hyde Park in Chicago.'
            },
            {
                id: '2.1',
                text: `Starting in 1933, the University begins to attempt “stabilizing the neighborhood.” Behind the scenes, they reinforce legal racial covenants through intermediaries. Between 1933 and 1947, the University spends $83,597.46 to support legal assistance for the defense of racially restrictive covenants in Hyde Park, subsidizing neighborhood groups, such as the Woodlawn Property Owners League and the Hyde Park Property Owners Association. President Hutchins maintains that residents of Hyde Park and nearby communities have the right to “invoke and defend'' racially restrictive covenants as legal instruments.`
            },
            {
                id: '2.3',
                text: `In 1948, the Shelley v. Kramer Supreme Court case outlawed racial covenants. Despite the University losing this tool to shape the neighborhood, the Great Migration and the fear of “racial succession” drove the University to find other ways to “stabilize” Hyde Park.`,
                timeline_year: 1948,
                image: './static/images/shelleyvkramer.jpeg',
                image_credit: 'University of Chicago Photographic Archive'
            }
        ]
    },
    {
        chapterTitle:
            '1949-1962: Urban Renewal and <br>“A Compatible Community”',
        chapterYears: '1949-1962',
        id: '3',
        image: './static/images/chapter3.png',
        subsections: [
            {
                id: '3.0',
                text: `With the outlawing of racial covenants, the black population in the University’s immediate surroundings continues to increase: Hyde Park had 573 black residents in 1940 and 1,757 in 1950, most of whom had arrived after 1948. The university sees maintaining a “desirable” neighborhood as tied to its survival and key to its academic mission. The University begins shaping the urban environment, beyond its earlier legal and financial methods, through substantial property acquisition and “blight removal” making it the first American higher education institution to embark on a comprehensive urban renewal campaign.`,
                quote: `I believe we have found the answer. It is called 'Urban Renewal' ... it is, however, a tragic fact that these efforts are today essential to the ability of the institutions to fulfill their primary responsibilities`,
                quoteAuthor:
                    'Julian Levi, UChicago Professor and SECC Executive Director'
            },
            {
                id: '3.1',
                text: ` Much of the remaking of Hyde Park was done by the South East Chicago Commission (SECC), a group that was, by most accounts, an extension of the University. University Chancellor Kimpton chose a University Professor, Julian Levi, to chair the new Commission. There were four main plans that comprised Hyde Park’s urban renewal efforts: Hyde Park A + B, the Southwest Hyde Park Redevelopment Corporation Plan, the Urban Renewal Plan, and the South Campus Plan.`,
                timeline_year: 1949
            },
            {
                id: '3.2',
                text: `The Hyde Park A + B plan bagan in 1954.The Land Clearance Commission, a city agency, approves a plan that aims to clear and redevelop approximately 48 acres of land. The intent is to replace “blighted” residences and businesses with groups of similar townhouses along both sides of 55th Street, the twin towers of I.M. Pei’s University Apartments in the middle of 55th Street, and a shopping center at 55th and Lake Park Avenue.`
            },
            {
                id: '3.3',
                text: `Next, the Southwest Hyde Park Redevelopment Corporation uses the 1953 revision of the Neighborhood Redevelopment Corporation Act to take eminent domain of an area from 55th to 59th Streets and from Cottage Grove to Woodlawn Avenues. Most of that area is marked for “rehabilitation.” The area between 55th and 56th and Cottage Grove and Ellis Avenue is slated for wholesale demolition and University acquisition.
`
            },
            {
                id: '3.4',
                text: `The largest and most comprehensive phase is the Hyde Park–Kenwood Urban Renewal Plan, drawn up and approved in 1958. The University, through SECC, is a main plan drafter. The plan focuses on both total and “spot” clearance. It slates 638 structures containing 6,147 dwelling units for demolition and calls for the creation and modernization of low- and high-density residential areas, parks, schools, residential and commercial areas, and more in their place.`
            },
            {
                id: '3.5',
                text: `Lastly, the University  follows through on a suggestion in the 1949 Treasurer’s Report for the University to acquire all property in a strip of land between 60th and 61st street and Cottage Grove and Stony Island avenues to create a buffer zone between the campus and the “deteriorating neighborhood” of Woodlawn immediately to the South. The city purchases everything not yet owned by the university and then sells it to the University. This takes a decade due to legal disputes and activist groups including the Woodlawn Organization opposing the acquisition and the expansion.`
            },
            {
                id: '3.6',
                text: `Cumulatively, these plans called for the demolition of 193 acres (or 20 percent of the community); cost $120 million ($1.4 billion when adjusted for inflation), approximately half of which was public funds and the other half private; displaced more than 30,000 people; and enabled the University of Chicago to add 41 acres of land to its campus. The legacy of urban renewal shows through the urban morphology and population change in Hyde Park and Woodlawn. The campaign is a success, according to the administration. Documented by Julian Levi, it becomes a model for other institutions.`
            }
        ]
    },
    {
        chapterTitle: '1963-2006: Spatial Intervention and Invisible Borders',
        chapterYears: '1963-2006',
        id: '4',
        image: './static/images/chapter4.jpg',
        subsections: [
            {
                id: '4.1',
                text: `After the period of Urban Renewal, the University began to shifts its focus away from initiatives based primarily around property ownership and land clearance in favor of new techniques. The university widens its reach into the community, not through property acquisition, but in the name of safety.
`,
                timeline_year: 1963
            },
            {
                id: '4.2',
                text: `In 1957, the University created the UC Bus, the first iteration of the on-campus shuttle system. Marc David Loeb argues that the shuttle system was “ reappropriated as a tool of urban renewal” and helped build “a selective permeability of space” around the university.” In 2021, the shuttle system added a new route from campus to the Green and Red Line Garfield stations and the Washington Park Arts Incubator. `
            },

            {
                id: '4.3',
                text: `Next, several right-of-way modifications took place during the 1970s. Eldred highlights how physical restrictions to “free and easy access” to and from the area could reduce crime. 151 cul-de-sacs and dead-ends: University Avenue is cut off from 61st Street by a sidewalk and a buffer augmented with trees and shrubbery that is no more than twenty feet wide; Kimbark Avenue dead-ends approximately halfway into the block; Kenwood Avenue is split into a driveway to a parking lot from the North, and a cul-de-sac from the South; Blackstone is almost entirely nonexistent between 60th and 61st, existing only as a small cul-de-sac.`,
                timeline_year: 1970
            },
            {
                id: '4.4',
                text: `The charter schools are a key point of contact between the university and the surrounding neighborhoods. The first school, the North Kenwood/Oakland Campus, opened in 1998, and serves students from pre-Kindergarten to 5th grade. The network’s other schools are Donoghue and Woodlawn. `,
                timeline_year: 1980
            },
            {
                id: '4.4a',
                text: `The opening of Woodlawn Charter in 2018 on 63rd Street broke a <a href = "https://chicagomaroon.com/25412/news/uchicago-charter-schools-opens-new-woodlawn-campus/ target = "_blank">decades-old agreement</a> for the University not to extend further into Woodlawn and calls into question whether it intends to keep this promise.`
            },

            {
                id: '4.5',
                text: `The opening of the University’s charter schools accompanies the expansion of the UCPD’s patrol jurisdiction. The expansion of the University’s own private security force enables it to patrol areas beyond the boundaries of campus proper. “Providing definite boundary limits to the campus...[would] facilitate effective security activities,” Julian Levi is quoted. Community groups also lobbied for the extension of UCPD patrols. By 1980, the UCPD patrol area extended from 47th to 61st Streets, and Cottage Grove Avenue to Lake Shore Drive. Currently, the UCPD patrol zone extends from 37th Street to the north, 64th Street to the south, Lake Shore Drive to the east, and Cottage Grove Avenue to the west.`,
                timeline_year: 1990
            },
            {
                id: '4.6',
                text: `Since 2003, the University’s <a href = "https://ucce.s3.eu-west-2.amazonaws.com/store/b51c4f8ef138f22488f40c5496aa030c.pdf" target = "_blank">Employer-Assisted Housing Program (EAHP)</a>, operated by the Office of Civic Engagement, has aided University employees in buying homes in several South Side neighborhoods. Following a pause during the COVID pandemic, the program adjusted its priority area and explicitly structures loan eligibility according to its development goals: $20,000 towards purchases in the Focus Area (West Woodlawn and Washington Park) $10,000 for its Established Markets Area (Hyde Park/South Kenwood and East Woodlawn), and $5,000 towards residences its Greater South Side Area.`,
                timeline_year: 2000
            },

            {
                id: '4.7',
                text: `During the early 2000s, the University allocates large sums of money toward the construction of extracurricular buildings, amenities, and the acquisition of housing both on and off campus. New facilities include a transformed student center in the Reynolds Club and Ratner, the first new athletics facility built on campus since 1935. The College also formulates a radical plan to reimagine residential life on the campus by constructing new housing and dining facilities within easy walking distance of the central Quadrangles. Between 1998 and 2019, four major new residential facilities are constructed: the Palevsky Residential Commons, the Renee Granville-Grossman Residential Commons, Campus North, and recently Woodlawn Commons which opened in 2020.`
            },
            {
                id: '4.8',
                text: `The creation of a private campus shuttle system, the opening of charter schools, an expanded patrol area for UCPD, the Employer-Assisted Housing Program, and the consolidation of student housing all contributed to creating ‘invisible borders’ around campus during this period.`
            }
        ]
    },
    {
        chapterTitle: '2007-2022: Expansion and Turning to the City',
        chapterYears: '2007-2022',
        id: '5',
        image: './static/images/chapter5.jpg',
        subsections: [
            {
                id: '5.1',
                text: `In 2006, University President Zimmer makes his "back to the city" speech, posing the question: “How should our relationship with the South Side community, city, and the region evolve?” In the following years, the University simultaneously seeks to shrink its portfolio of residential properties across  Hyde Park acquired during Urban Renewal and expand commercial real estate holdings.`
            },
            {
                id: '5.2',
                text: `The University <span class="highlight former">sells</span> over 1,200 apartment units and four lots in Hyde Park between 2004 and 2016 and has bought 26 mixed-use properties in Washington Park since 2008. They acquire commercial real estate, such as Harper Court and Jewel Osco. The University now owns the property that all four major grocery stores in Hyde Park sit on.`
            },
            {
                id: '5.3',
                text: `The University also invests in cultural development throughout the South Side through a partnership with the Hyde Park Arts Center, stewarding the Washington Park Arts Block, and opening the Green Line Performing Arts Center in 2018.`,
                image: './static/images/arts_block.jpg',
                image_credit: 'Visual Manifesto'
            },
            {
                id: '5.4',
                text: `TODO`
            }
        ]
    },
    {
        chapterTitle:
            '2023 Onward: The Future of the University and the South Side',
        chapterYears: '2023 Onward',
        id: '6',
        image: './static/images/chapter6.png',
        subsections: [
            {
                id: '6.1',
                text: `As we have seen, the University of Chicago has played an active role in shaping the neighbhoros surrounds the university. For most of its history, the University justified its actions as necessary. In 2020, then-President Zimmer and incoming President Paul Alivisatos <a href = "https://news.uchicago.edu/story/council-examine-history-relationship-between-university-chicago-and-south-side-communities" target = "_blank">commit </a> to further community engagement by launching the Council on UChicago/Community Relations tasked with examining the role the University has had to its South Side neighbors historically.`
            },
            {
                id: '6.2',
                text: `With the <a href = "https://chicagomaroon.com/41032/grey-city/the-obama-center-a-welcome-neighbor/" target = "_blank"> opening of the Obama Presidential Center nearing </a>, the future of the University’s involvement in Hyde Park and South Chicago is at a crucial inflection point. The Center claims it will bring <a href = 'https://www.obama.org/press-releases/obama-presidential-center-estimated-support-thousands-jobs-city-chicago-south-side-construction-ten-years-operations/' target = '_blank'> $3.1bn in “economic impact” </a> to the region, and the university and <a href = "https://blockclubchicago.org/2022/12/27/as-investors-buy-more-homes-around-the-obama-presidential-center-gentrification-worries-soar/" target = "_blank">investors</a> are primed to take advantage of this. At the same time, local residents are concerned about <a href = 'https://www.theguardian.com/us-news/2023/feb/15/obama-center-chicago-south-side-residents-fear-displacement' target = "_blank">rising rent</a> and how much benefit will reach the local community.`
            },
            {
                id: '6.3',
                text: `The next decade will prove to be a crucial chapter in the ongoing story of the University of Chicago’s involvement in shaping its neighborhood. From its neo-gothic beginnings to its perch as an <a href = 'https://en.wikipedia.org/wiki/Ivy_League#Ivy_Plus' target = "_blank">Ivy Plus</a> university, the University and Hyde Park, as well as the surrounding neighborhoods—have been—and will continue to be–intertwined.`
            },
            {
                id: 'final-scroller',
                text: ``
            }
        ]
    }
];

sessionStorage.setItem('config', JSON.stringify(config));
