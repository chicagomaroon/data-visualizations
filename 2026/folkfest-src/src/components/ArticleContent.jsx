import React, { useState, useEffect } from 'react';
import {
    AnimationBoxOne,
    AnimationBoxTwo,
    ScrollContainer
} from './Interactives.jsx';
import { sections } from '../../public/content.js';

export default function ArticleContent({
    windowHeight,
    windowWidth,
    isMobile
}) {
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
    return (
        <div className="[overflow-x:clip]">
            <AnimationBoxOne
                currentStepIndex={currentStepIndex}
                scrollText={sections[0].scrollText}
                paragraphText={sections[0].paragraphText}
                isMobile={isMobile}
                windowWidth={windowWidth}
                imageArray={sections[0].imageArray}
                onStepEnter={onStepEnter}
                onStepExit={onStepExit}
                barLength={sections[0].barLength}
                barStart={sections[0].barStart}
                height={windowHeight}
                start={sections[0].start}
                width={windowWidth}
            />
            <p className="content mt-10 mb-10">
                {sections[0].paragraphText[0]}
            </p>
            {sections.slice(1, 4).map((section, index) => (
                <div key={index}>
                    <AnimationBoxTwo
                        currentStepIndex={currentStepIndex}
                        scrollText={section.scrollText}
                        paragraphText={section.paragraphText}
                        windowWidth={windowWidth}
                        imageArray={section.imageArray}
                        barLength={section.barLength}
                        barStart={section.barStart}
                        onStepEnter={onStepEnter}
                        onStepExit={onStepExit}
                        isMobile={isMobile}
                        height={windowHeight}
                        start={section.start}
                        width={windowWidth}
                    />
                    {section.paragraphText.map((paragraph, index) => (
                        <p className="content mt-10 mb-10" key={index}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}
