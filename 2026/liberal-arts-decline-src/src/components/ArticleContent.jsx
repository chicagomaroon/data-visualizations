import React, { useState, useEffect } from 'react';
import {
    ScrollContainer,
    IntroAnimation,
    AriChartDemo,
    Substitution,
    Penn,
    Outcomes,
    SocialSciencesHumanities,
    MajorExplorer
} from './Interactives.jsx';
import {
    headlinelg,
    subhead,
    byline,
    section1,
    section2,
    section2Header,
    section3,
    section3Header,
    section4,
    section4Header,
    section5,
    section5Header,
    section6,
    section6Header
} from '../../public/content.js';

const chartCredit = {
    ariJacob: (
        <>
            {' '}
            <a
                href="https://chicagomaroon.com/staff_name/ari-jacob"
                className="text-[#800000] not-italic"
            >
                Ari Jacob
            </a>
            .
        </>
    ),
    olinNafziger: (
        <>
            {' '}
            <a
                href="https://chicagomaroon.com/staff_name/olin-nafziger"
                className="text-[#800000] not-italic"
            >
                Olin Nafziger
            </a>
            .
        </>
    ),
    nolanShaffer: (
        <>
            {' '}
            <a
                href="https://chicagomaroon.com/staff_name/nolan-shaffer"
                className="text-[#800000] not-italic"
            >
                Nolan Shaffer
            </a>
            .
        </>
    )
};

const ArticleSection = ({ header, paragraphs }) => (
    <section className="max-w-2xl mx-auto px-4 my-12">
        {header && (
            <h2 className="text-2xl font-bold mb-6 font-serif">{header}</h2>
        )}
        {paragraphs.map((paragraph, i) => (
            <p
                key={i}
                className="text-lg leading-relaxed mb-5 font-serif font-normal"
                dangerouslySetInnerHTML={{ __html: paragraph }}
            />
        ))}
    </section>
);

export default function ArticleContent({ windowHeight, windowWidth }) {
    const spacing = 0.5;
    const height = windowHeight * spacing;

    const [scrollY, setScrollY] = useState(() => {
        const saved = localStorage.getItem('scrollY');
        return saved !== null ? parseInt(saved) : 0;
    });

    const [currentStepIndex, setCurrentStepIndex] = useState(() => {
        const saved = localStorage.getItem('currentStepIndex');
        return saved !== null && scrollY > 2000 ? parseInt(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem('currentStepIndex', currentStepIndex.toString());
    }, [currentStepIndex]);

    useEffect(() => {
        localStorage.setItem('scrollY', scrollY.toString());
    }, [scrollY]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (scrollY <= 100) {
            setCurrentStepIndex(0);
        }
    }, [scrollY]);

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    const onStepExit = ({ data, direction }) => {
        if (direction === 'up') {
            setCurrentStepIndex(data - 1);
        } else if (direction === 'down') {
            setCurrentStepIndex(data);
        }
    };

    const baseProps = {
        currentStepIndex,
        windowWidth,
        onStepEnter,
        onStepExit,
        height
    };

    return (
        <div className="[overflow-x:clip]">
            {/* Scrollytelling chart opener */}
            <IntroAnimation />

            {/* Section 1: opening prose */}
            <ArticleSection paragraphs={section1.slice(0, 9)} />

            {/* Penn comparison chart (mentioned at end of section 1) */}
            <figure className="mt-24 mb-16 flex flex-col items-start max-w-3xl mx-auto px-2 sm:px-8">
                <div className="w-full">
                    <Penn />
                </div>
                <figcaption className="text-xs text-gray-600 italic mt-4 w-full text-left">
                    The economics major at the University of Chicago used to be
                    half the size of the combination of economics, business, and
                    finance majors at the University of Pennsylvania. Now, they
                    are on equal footing.{chartCredit.ariJacob}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section1.slice(9, 12)} />

            <figure className="my-16 flex flex-col items-start max-w-2xl mx-auto">
                <img
                    src="photos/ruby_photo.jpg"
                    alt="Vincent Li"
                    className="w-full h-auto"
                />
                <figcaption className="text-xs text-gray-600 italic mt-4 px-4 text-left">
                    Ruby Velez, a fourth-year human rights and Law, Letters and
                    Society (LLSO) double major, says that students are
                    thinking: “How do we leverage our education to be the most
                    useful?”{chartCredit.olinNafziger}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section1.slice(12)} />

            {/* Section 2: fiefdom in Saieh */}
            <ArticleSection
                header={section2Header}
                paragraphs={section2.slice(0, 6)}
            />

            <figure className="my-16 flex flex-col items-start max-w-2xl mx-auto">
                <img
                    src="photos/vincent_photo.jpg"
                    alt="Vincent Li"
                    className="w-full h-auto"
                />
                <figcaption className="text-xs text-gray-600 italic mt-4 px-4 text-left">
                    Vincent Li, a fourth-year business economics and LLSO double
                    major, said that if he didn’t have an “irrational fear” of
                    it, he might have done standard-track economics.
                    {chartCredit.olinNafziger}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section2.slice(6, 9)} />

            {/* Substitution chart (math vs public policy) */}
            <figure className="my-16 flex flex-col items-start max-w-3xl mx-auto px-2 sm:px-8">
                <div className="w-full">
                    <Substitution />
                </div>
                <figcaption className="text-xs text-gray-600 italic mt-4 w-full text-left">
                    The share of students majoring in mathematics and
                    statistics, as well as those majoring in public policy, has
                    decreased precipitously since 2018. This comes after these
                    majors were steadily growing for the previous 15 years.
                    {chartCredit.ariJacob}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section2.slice(9, 17)} />

            {/* Outcomes chart (finance/business) */}
            <figure className="my-16 flex flex-col items-start max-w-3xl mx-auto px-2 sm:px-8">
                <div className="w-full">
                    <img
                        src="dotchart.svg"
                        alt="Outcomes chart"
                        className="w-full h-auto"
                    />
                </div>
                <figcaption className="text-xs text-gray-600 italic mt-16 w-full text-left">
                    After growing in the early 2010s, the share of students
                    employed in finance or business-related jobs after
                    graduating from the University of Chicago has barely changed
                    since 2017. The number of students majoring in economics
                    nearly doubled during this time. {chartCredit.nolanShaffer}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section2.slice(17)} />

            <MajorExplorer />

            {/* Section 3: history of UChicago */}
            <ArticleSection
                header={section3Header}
                paragraphs={section3.slice(0, 3)}
            />

            <figure className="my-16 flex flex-col items-start max-w-2xl mx-auto">
                <img
                    src="photos/old_class.jpg"
                    alt="Old class"
                    className="w-full h-auto"
                />
                <figcaption className="text-xs text-gray-600 italic mt-4 text-left px-4">
                    Chicago Maroon Photographic Archive.
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section3.slice(3, 7)} />

            <figure className="my-16 flex flex-col items-start max-w-2xl mx-auto">
                <img
                    src="photos/students_studying.jpg"
                    alt="Old class"
                    className="w-full h-auto"
                />
                <figcaption className="text-xs text-gray-600 italic mt-4 text-left px-4">
                    Chicago Maroon Photographic Archive.
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section3.slice(7)} />

            {/* Section 4: Newman & humanities decline */}
            <ArticleSection
                header={section4Header}
                paragraphs={section4.slice(0, 2)}
            />

            {/* English/PoliSci chart */}
            <figure className="my-16 flex flex-col items-start max-w-3xl mx-auto px-2 sm:px-8">
                <div className="w-full">
                    <AriChartDemo />
                </div>
                <figcaption className="text-xs text-gray-600 italic mt-4 w-full text-left">
                    In 2005, English and political science accounted for 20
                    percent of graduating students. Today, they make up just
                    over 7 percent of the Class of 2024. Their decline began
                    around 2012, the year that students entering college during
                    the Great Recession would have graduated.
                    {chartCredit.ariJacob}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section4.slice(2, 8)} />

            {/* Share of students vs share of degrees chart */}
            <figure className="my-16 flex flex-col items-start max-w-6xl mx-auto px-2 sm:px-8">
                <div className="w-full">
                    <SocialSciencesHumanities />
                </div>
                <figcaption className="text-xs text-gray-600 italic mt-3 w-full text-left">
                    As a percentage of both degrees granted and students in each
                    program, humanities, social sciences, and arts majors at the
                    University of Chicago have declined at the same rate as at
                    peer institutions. When looking at the share of degrees,
                    Chicago is declining more quickly, particularly over the
                    past six years.{chartCredit.ariJacob}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section4.slice(8)} />

            {/* Section 5: humanities response */}
            <ArticleSection
                header={section5Header}
                paragraphs={section5.slice(0, 4)}
            />

            <figure className="my-8 flex flex-col items-start max-w-2xl mx-auto">
                <img
                    src="photos/poster_image.jpg"
                    alt="Poster"
                    className="w-full h-auto"
                />
                <figcaption className="text-xs text-gray-600 italic mt-4 text-left px-4">
                    Classes in the humanities, arts, and social sciences
                    frequently advertise themselves with posters displayed
                    around campus.{chartCredit.olinNafziger}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section5.slice(4, 12)} />

            <figure className="my-8 flex flex-col items-start max-w-2xl mx-auto">
                <img
                    src="photos/classroom_image.jpg"
                    alt="Vincent Li"
                    className="w-full h-auto"
                />
                <figcaption className="text-xs text-gray-600 italic mt-4 text-left px-4">
                    Since 2005, the share of students majoring in the
                    humanities, arts, or social sciences has been declining.
                    {chartCredit.olinNafziger}
                </figcaption>
            </figure>

            <ArticleSection paragraphs={section5.slice(12)} />

            {/* Section 6: conclusion */}
            <ArticleSection
                header={section6Header}
                paragraphs={section6.slice(0, -1)}
            />
            <section className="max-w-2xl mx-auto px-4 mb-12">
                <p className="text-lg leading-relaxed mb-5 font-serif font-normal">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: section6[section6.length - 1]
                        }}
                    />
                    <img
                        src="maroon_logo_m_black.svg"
                        alt=""
                        className="inline h-[0.85em] w-auto ml-2 align-text-bottom"
                    />
                </p>
            </section>

            {/* Editor's note */}
            <section className="max-w-2xl mx-auto px-4 my-5 text-gray-700 italic">
                <p className="text-sm">
                    Editor’s note: Elizabeth Eck previously served as an
                    associate Arts editor for the{' '}
                    <span className="not-italic">Maroon</span>.
                </p>
                <p className="text-sm mt-2">
                    The version of this article published in the May 20 print
                    edition incorrectly stated that all but two humanities
                    majors had seen declines in the share of students enrolling
                    over the past 20 years. All but three had seen such
                    declines.{' '}
                </p>
            </section>
        </div>
    );
}
