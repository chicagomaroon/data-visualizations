const config = [
    {
        chapterTitle: '1890-1933: Neo-Gothic Beginnings',
        chapterYears: '1890-1933',
        id: '1',
        image: './static/images/chapter1.jpg',
        img_credit: 'University of Chicago Photographic Archive',

        subsections: [
            {
                id: '1.1',
                text: `In 1889, businessman and philanthropist John D. Rockefeller committed $600,000 toward a “new institution of learning in Chicago.”`,
                timeline_year: 1889,
                image: './static/images/jdr.jpg',
                image_credit: 'University of Chicago Photographic Archive'
            },
            {
                id: '1.2',
                text: `A few months later in January 1890, prominent landowner Marshall Field pledged 10 acres of his land in Hyde Park to the new University. The site stretched from 57th to 59th Street, between Ellis and Lexington.`,
                timeline_year: 1890,
                image: './static/images/og_uchi.jpg',
                image_credit: 'University of Chicago Photographic Archive'
            },
            {
                id: '1.3',
                text: `In 1892, the Board of Trustees commissioned architect Henry Ives Cobb to draw up a master plan for the University. Trustees Martin Ryerson and Charles Hutchinson advocated for a neo-Gothic style, aiming to situate the University among established, storied European universities. In a letter to John Rockefeller, President William Rainey Harper wrote that he didn’t want festivities on opening day so that it would seem like “the continuation of work which had been conducted for a thousand years,” Robin Bachin documented in <i>Building the South Side</i>.`,
                timeline_year: 1892,
                image: './static/images/chapter1.jpg',
                image_credit: 'University of Chicago Photographic Archive'
            },
            {
                id: '1.3a',
                text: `
                In 1902, the University contracted the <a href='https://storymaps.arcgis.com/stories/8bc70c8a457943da81800274c93100ca' target = "_blank">Olmsted Brothers</a> to design the campus grounds. Over the next 40 years, the University built the core of the main campus, including iconic buildings such as <span class="highlight hScroller">Reynolds Club</span> and <span class="highlight hScroller">Harper Memorial Library</span>.
                <br>
                At any time, click the <span class = 'highlight explore'>Explore Map</span> button in the top right and hover over a building to learn more.`
            },
            {
                id: '1.4',
                text: `
                Circa 1927, the University made provisions to add on-campus housing. The trustees commissioned architect Charles Klauder whose “South Campus Plan” included new residence halls on the south side of the Midway. However, the only building constructed under the plan during this time was the Burton-Judson Courts in 1931. Only in the 1960s did President George W. Beadle revisit the South Campus plan, and the University remained mostly a commuter campus through the 1930s. In 1933, facing financial difficulties amidst the Great Depression, President Hutchins even <a href='https://www.northwestern.edu/nu150/news/stories/04_05_01_merger.html' target = "_blank">even proposed</a> merging the University with Northwestern.`,
                timeline_year: 1927
            },

            {
                id: '1.5',
                text: `Although the campus was self-contained, a community-university relationship began slowly to form. When President  Harper hired sought-after coach Amos Alonzo Stagg, <a href = "https://chicagomaroon.com/39731/grey-city/brains-over-brawn-how-football-found-its-place-at-uchicago/" target = "_blank">football culture</a> and games at <span class="highlight hScroller">Stagg Field</span> grew the University’s reputation among Chicagoans.`,
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
        img_credit: 'University of Chicago Photographic Archive',
        subsections: [
            {
                id: 'demographics',
                text: `The Great Migration significantly transformed the racial makeup of Chicago. A city that was 2% Black in 1910 would approach 14% by 1950. “<a href = "http://www.encyclopedia.chicagohistory.org/pages/880.html" target = "_blank">Racial succession</a>,” the process of one racial group replacing another in the neighborhood coined by early 20th-century University of Chicago urban sociologists, became a growing concern of both the University and the City. At this stage, the University began to see the fate of the neighborhood as tied to its own.`,
                image: './static/images/demos.png',
                image_credit:
                    'Tax, Residential Integration: The Case of Hyde Park in Chicago'
            },
            {
                id: '2.1',
                text: `Between 1933 and 1947, the University spent $83,597.46 to support legal assistance for the defense of racially restrictive covenants, or private agreements that prohibited African Americans from buying property and living in certain neighborhoods, in Hyde Park, according to historian Arnold R. Hirsch. The University accomplished this goal by subsidizing neighborhood groups advocating for the covenants, such as the Woodlawn Property Owners League and the Hyde Park Property Owners Association. University President Hutchins maintained that residents of Hyde Park and nearby communities had the right to “invoke and defend” racially restrictive covenants as legal instruments.`,
                quote: `“[The University] must endeavor to stabilize its neighborhood as an area in which its students and faculty will be content to live.”`,
                quoteAuthor:
                    'President Maynard Hutchins, responding to <i>Chicago Defender</i> coverage in 1937',
                quoteSource: ''
            },

            {
                id: '2.3',
                text: `In 1948, the Shelley v. Kramer Supreme Court case <a href = "https://www.oyez.org/cases/1940-1955/334us1" target = "_blank">outlawed</a> racial covenants. After losing this legal tool, the Great Migration and continued fear of “racial succession” drove the University to find other ways to “stabilize”  the surrounding communities`,
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
        img_credit: 'Hyde Park Herald',
        subsections: [
            {
                id: '3.0',
                text: `With the outlawing of racial covenants, the Black population in the University’s immediate surroundings continued to increase: Hyde Park had 573 Black residents in 1940 and 1,757 in 1950, most of whom had arrived after 1948, according to Hirsch’s <i>Making the Second Ghetto</i>. Hirsch writes that the University saw maintaining a “desirable” neighborhood as tied to its survival and key to its academic mission. It began substantial property acquisition and “blight removal,” (a term used frequently in the University of Chicago’s 1949 Treasurer’s report)   making it the first American higher education institution to embark on a comprehensive urban renewal campaign.`,
                quote: `“I believe we have found the answer. It is called 'Urban Renewal' ... it is, however, a tragic fact that these efforts are today essential to the ability of the institutions to fulfill their primary responsibilities.”`,
                quoteAuthor:
                    'Julian Levi, UChicago Professor and and South East Chicago Commission (SECC) Executive Director',
                quoteSource: 'Haar, The City as Campus'
            },
            {
                id: '3.0a',
                text: `In his history of the University, John Boyer writes, “Beginning in the early 1940s, signs of deterioration around the University were evident. As a result of the Depression and the war, many buildings had not been maintained for fifteen years, and there had been little new investment in the area. In 1945, 53 percent of the buildings in Hyde Park and 82% of the buildings in Woodlawn were more than forty years old. The heavy migration of blacks from the South to Chicago resulted in severe population pressures on the South Side…which led to predatory real estate practices: slumlords illegally converting six flats into twenty-four unit rooming houses charging exorbitant rental rates, and not maintaining buildings to code.`
            },
            {
                id: '3.1',
                text: `The South East Chicago Commission (SECC) administered much of Hyde Park’s “urban renewal." Much of the SECC leadership came from the University; University Chancellor Kimpton chose University Professor Julian Levi to chair the new Commission. Four main plans comprised Hyde Park’s urban renewal efforts: Hyde Park A + B, the Southwest Hyde Park Redevelopment Corporation Plan, the Hyde Park-Kenwood Urban Renewal Plan, and the South Campus Plan.`,
                timeline_year: 1949,
                quote: '"We are fighting for our lives. We simply cannot operate in slums."',
                quoteAuthor:
                    'University of Chicago Chancellor Lawrence Kimpton',
                quoteSource: ''
            },
            {
                id: '3.2',
                text: `The Hyde Park A + B plan began in 1954. The Land Clearance Commission, a city agency, approved a plan to clear and redevelop approximately 48 acres of land. The intent was to replace “blighted” residences and businesses with groups of similar townhouses along both sides of 55th Street, the twin towers of I.M. Pei’s University Apartments in the middle of 55th Street, and a shopping center at 55th and Lake Park Avenue.`,
                image: './static/images/placeholder.jpg',
                image_credit:
                    'View of 55th St from Lake Park Blvd in 1950 and 1961<br>University of Chicago Photographic Archive'
            },
            {
                id: '3.3',
                text: `
                Next, the Southwest Hyde Park Redevelopment Corporation used the <a href = "https://chicagounbound.uchicago.edu/cgi/viewcontent.cgi?article=2841&context=uclrev" target = "_blank">Neighborhood Redevelopment Corporation Act</a> to have the City acquire any privately owned land between the campus and Washington Park. Most of that area was marked for “rehabilitation.” The area from 55th to 56th Street and from Cottage Grove to Ellis Avenue was slated for wholesale demolition and University acquisition.`
            },
            {
                id: '3.4',
                text: `The largest and most comprehensive phase was the Hyde Park–Kenwood Urban Renewal Plan, drawn up and approved in 1958. The University, through the SECC, was a main plan drafter. The plan focused on both total and “spot” clearance. It slated 638 structures containing 6,147 dwelling units for demolition and called for the creation and modernization of low- and high-density residential areas, parks, schools, residential and commercial areas, and more in their place.`
            },
            {
                id: '3.5',
                text: `
                Finally, the University followed through on a suggestion in the 1949 Treasurer’s Report for the University to acquire all property in the strip of land from 60th to 61st Street and from Cottage Grove to Stony Island Avenue to create a buffer zone between the campus and the “<a href = "https://cegu.uchicago.edu/2023/11/30/university-led-renewal/" target="_blank">deteriorating neighborhood</a>” of Woodlawn immediately to the South. The city purchased everything not yet owned by the University and then sold it to the University in a process that took a decade due to legal disputes and activist groups opposing the acquisition and the expansion. Notably, <a href = "https://www.wttw.com/dusable-to-obama/woodlawn-organization" target = "_blank">The Woodlawn Organization (T.W.O)</a> successfully prevented the University from expanding further southward than 61st Street.`
            },
            {
                id: '3.5a',
                text: `Some interpreted urban renewal efforts as a success, while others expressed concerns around its execution. In 1955, Black residents marched on city hall and demanded that Mayor Richard Daley address the discrimination against Black families, writes Eddie R. Cole in <i>The Campus Color Line</i>.`
            },
            {
                id: '3.6',
                text: `Cumulatively, these plans called for the demolition of 193 acres (20 percent of the Hyde Park); cost $120 million ($1.4 billion when adjusted for inflation), approximately half of which was public funds and the other half private; displaced more than 30,000 people; and enabled the University of Chicago to add 41 acres of land to its campus. The campaign was a success, according to the administration. Documented by Julian Levi, it became a model for other institutions, such <a href = "https://projects.browndailyherald.com/2022/12/13/brown-property-footprint/" target = "_blank">Brown University</a> in the 1960s and <a href = "https://www.theguardian.com/cities/2018/apr/18/gentrify-or-die-inside-a-universitys-controversial-plan-for-baltimore" target = "_blank">Johns Hopkins</a> in the 2010s`,
                quote: `"The Chicago Association of Industry Tuesday endorsed a 50-acre redevelopment project for the Hyde Park area. The association said that the project, planned by the South East Chicago Commission, “may well become a model for similar urban renewal in other sections of the city."`,
                quoteAuthor: 'Chicago Daily News, 1954',
                quoteSource: ''
            }
        ]
    },
    {
        chapterTitle: '1963-2006: Spatial Intervention and Invisible Borders',
        chapterYears: '1963-2006',
        id: '4',
        image: './static/images/chapter4.jpg',
        img_credit: 'University of Chicago Photographic Archive',
        subsections: [
            {
                id: '4.1',
                text: `After the period of urban renewal, the University widened its reach into the community now in the name of student safety, not through property acquisition.`,
                timeline_year: 1963
            },
            {
                id: '4.2',
                text: `
                In 1957, the University created the UC Bus, the first iteration of the on-campus shuttle system. Marc David Loeb <a href = "https://humanities-web.s3.us-east-2.amazonaws.com/college/chicagostudies-prod/s3fs-public/2021-05/Loeb,%20Marc%20-%20Building%20a%20Selective%20Permeability%20of%20Space%20-%20Urban%20Renewal%20and%20The%20University%20of%20Chicago%20Campus%20Shuttle%20System.pdf" target = "_blank">argued</a> that the shuttle system was “reappropriated as a tool of urban renewal,” granting the University freedom to delineate and extend the borders of campus. The shuttle system has added eight <a href = "https://www.chicagomaroon.com/article/2021/9/28/ucpd-announces-new-shuttle-route-garfield-green-red/" target = "_blank">new routes</a> since it was created, including a new route from campus to the Green and Red Line Garfield stations and the Washington Park Arts Incubator in 2021.`
            },
            {
                id: '4.3',
                text: `
                Several right-of-way street modifications took place during the 1970s, Juliet Eldred (A.B ‘17) writes in her thesis, The <a href = "https://www.julieteldred.com/thesis" target = "_blank">The University of Chicago as Urban Planner</a>, arguing that these changes created an explicit division between the University and the neighborhood of Woodlawn. A narrow, tree-lined buffer cuts University Avenue off from 61st Street; Kimbark Avenue dead-ends approximately halfway into the block; Kenwood Avenue is split into a driveway to a parking lot from the North and a cul-de-sac from the South; and Blackstone Avenue is almost entirely nonexistent between 60th and 61st.`,
                timeline_year: 1970
            },
            {
                id: '4.4',
                text: `The expansion of the University’s private security force enabled it to patrol areas beyond the boundaries of campus proper. “Providing definite boundary limits to the campus...[would] facilitate effective security activities,” Julian Levi said. SECC also lobbied for the extension of UCPD patrols. By 1980, the UCPD patrol area extended from 47th to 61st Streets, and Cottage Grove Avenue to Lake Shore Drive. When the University’s charter schools opened, <a href = "https://d3qi0qp55mx5f5.cloudfront.net/safety-security/uploads/files/Extended_Patrol_Map.pdf" target = "_blank">UCPD’s patrol jurisdiction expanded</a> to include them, now extending from 37th Street to the north, 64th Street to the south, Lake Shore Drive to the east, and Cottage Grove Avenue to the west.`,
                timeline_year: 1980
            },

            {
                id: '4.5',
                text: `
                The University has had an ever-increasing role in shaping the neighborhood housing landscape. Since 2003, the University’s <a href = "https://ucce.s3.eu-west-2.amazonaws.com/store/b51c4f8ef138f22488f40c5496aa030c.pdf" target = "_blank">Employer-Assisted Housing Program (EAHP)</a>, operated by the Office of Civic Engagement, has aided more than 300 University employees in buying homes in several South Side neighborhoods.`,
                timeline_year: 1990
            },
            {
                id: '4.6',
                text: `
                During the early 2000s, the College formulated a new plan to reimagine residential life on campus by constructing new housing, dining, and recreational facilities within walking distance of the central Quadrangles. New facilities included a transformed student center in the Reynolds Club and Ratner, the first new athletics facility built on campus since 1935. In 2002, the Max Palevsky Residential Commons were built, beginning a pattern of large dorms built on campus; in subsequent years, three more large dorms were built on campus. These improvements brought necessities and leisure <a href = "https://chicagomaroon.com/42601/grey-city/the-case-of-the-checkerboard-blues/" target = "_blank">closer to</a> campus.`
            },
            {
                id: '4.7',
                text: `The creation of a private campus shuttle system, an expanded patrol area for UCPD, the Employer-Assisted Housing Program, and the consolidation of student amenities all contributed to creating what Eldred termed “invisible borders” around campus during the second half of the 20th century.`
            }
        ]
    },
    {
        chapterTitle: '2007-2022: Expansion and Turning to the City',
        chapterYears: '2007-2022',
        id: '5',
        image: './static/images/chapter5.jpg',

        img_credit: 'UChicago Arts',
        subsections: [
            {
                id: '5.1',
                text: `
                In 2006, University President Zimmer made his "<a href = "https://d3qi0qp55mx5f5.cloudfront.net/convocation/docs/zimmer.pdf?mtime=1517338474" target = "_blank">Back to the City</a>" speech, posing the question: “How should our relationship with the South Side community, city, and the region evolve?” In the following years, the University has simultaneously sought to shrink its portfolio of residential properties acquired during Urban Renewal and the <a href = "https://chicagomaroon.com/20278/news/univ-to-sell-21-residential-properties-in-hyde-park/" target = "_blank">Great Recession</a> and expand non-residential real estate holdings.`
            },
            {
                id: '5.2',
                text: `The University sold over 1,200 apartment units and four lots in Hyde Park between 2004 and 2016 and has bought 26 mixed-use properties in Washington Park since 2008. They acquired commercial real estate, such as Harper Court in 2008 and the building now containing Jewel Osco in 2020. Currently, the University owns the buildings containing four of the major grocery stores in the area.`
            },
            {
                id: '5.3',
                text: `The University also invested in cultural development throughout the South Side through a partnership with the Hyde Park Arts Center, stewarding the <a href = 'https://news.uchicago.edu/story/arts-lawn-community-centered-space-washington-park-celebrates-opening' target = "_blank">Washington Park Arts Block</a> and opening the <a href = 'https://news.uchicago.edu/story/uchicago-opens-green-line-performing-arts-center-washington-park' target = "_blank">Green Line Performing Arts Center</a> in 2018.`,
                image: './static/images/arts_block.jpg',
                image_credit: 'Visual Manifesto'
            }
        ]
    },
    {
        chapterTitle:
            '2023 Onward: The Future of the University and the South Side',
        chapterYears: '2023 Onward',
        id: '6',
        image: './static/images/chapter6.png',
        img_credit: 'The Obama Presidential Center',
        subsections: [
            {
                id: '6.1',
                text: `The future of the University’s involvement in Hyde Park and South Chicago is at a crucial inflection point. With the opening of the <a href = "https://chicagomaroon.com/41032/grey-city/the-obama-center-a-welcome-neighbor/" target = "_blank"> Obama Presidential Center </a> nearing, the University is once again in a position to make decisions that will significantly impact the future of the surrounding communities. The Center - of which University is an investor - claims it will <a href = "https://www.obama.org/press-releases/obama-presidential-center-estimated-support-thousands-jobs-city-chicago-south-side-construction-ten-years-operations/" target = "_blank"> bring $3.1bn in “economic impact”</a> to the region. The University and <a href = "https://blockclubchicago.org/2022/12/27/as-investors-buy-more-homes-around-the-obama-presidential-center-gentrification-worries-soar/" target = "_blank">other investors</a> are prepared to reap the benefits as the Center joins the University’s other recent large-scale projects, including <a href = "https://hydeparklabs.com/" target = "_blank">Hyde Park Labs</a> and <a href = "https://news.uchicago.edu/story/state-approves-uchicago-medicines-plan-build-citys-first-freestanding-cancer-care-and" target = "_blank">UChicago Medicine’s Cancer Pavilion</a>. The projects are expected to have a large impact on the local economy, but residents are concerned about <a href = "https://www.theguardian.com/us-news/2023/feb/15/obama-center-chicago-south-side-residents-fear-displacement" target = "_blank">rising rent</a> and how much benefit will reach the community. `
            },
            {
                id: '6.2',
                text: `Recent actions leave many wary of the University’s commitment to enriching the local economy and urban landscape. 
                
                The opening of the Woodlawn Charter School in 2018 on 63rd Street broke the University’s <a href = "https://chicagomaroon.com/25412/news/uchicago-charter-schools-opens-new-woodlawn-campus/" target = "_blank">decades-old agreement</a>  with The Woodlawn Organization to not develop past 61st Street and further into Woodlawn. In 2020, then-President Zimmer and incoming President Paul Alivisatos committed to exploring and addressing the University’s historical relationship with its surrounding neighborhoods by launching the <a href = "https://news.uchicago.edu/story/council-examine-history-relationship-between-university-chicago-and-south-side-communities' target = "_blank">Council on UChicago/Community Relations</a> tasked with examining the role the University has had to its South Side neighbors historically. However, as of 2023, after the Council's first two years, it was <a href ='https://chicagomaroon.com/40648/news/community-relations-council-tries-to-tackle-public-safety-and-displacement/' target = "_blank">not yet prepared to engage meaningfully with the public</a> but that outreach could begin soon.
`
            },
            {
                id: 'conclusion',
                text: ` Throughout its history, the university has invoked, prioritized, and combined its various roles—as educator, employer, and local investor—through the Oxbridge model, behind-the-scenes intervention, “stabiliz[ing] the community,” and a stated effort to work with the community in promoting economic growth. The next decade represents a crucial chapter in the ongoing story of the University of Chicago’s involvement in shaping its surrounding neighborhoods. From its neo-Gothic beginnings to its perch as an Ivy Plus university, the University of Chicago and the South Side have been—and will continue to be—intertwined.`
            },
            {
                id: 'final-scroller',
                text: ``
            }
        ]
    }
];

sessionStorage.setItem('config', JSON.stringify(config));
