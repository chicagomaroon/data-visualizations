import React, { useState, useEffect } from 'react';
import { AnimationBox } from "./Interactives.jsx"
import { sections, p7 } from '../../public/content.js';


export default function ArticleContent({ windowHeight, windowWidth }) {
    const spacing = .2;
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
        height,
    };

    return (
        <div className="[overflow-x:clip]">
            <p className="text-right mr-3 md:mr-5 text-sm">
            The student-run coffee shop became a dance club for Battle of the DJ’s. Courtesy of Taylor Pate.
            </p>
            {sections.map((section, index) => (
                <AnimationBox
                    key={index}
                    {...baseProps}
                    scrollText={section.scrollText}
                    paragraphText={section.paragraphText}
                    imageArray={section.imageArray}
                    barLength={section.barLength}
                    start={section.start}
                />
            ))}
            <div className="w-[100dvw] mx-auto py-10 md:py-10 flex flex-col">
                {p7.map((p, index) => (
                    <p
                        className={`${index === p7.length - 1 ? '' : 'mb-[20px]'} px-[2%] md:px-[20%] z-[20] content`}
                        key={index}
                        dangerouslySetInnerHTML={{ __html: p }}
                    />
                ))}
            </div>
            <div className="flex flex-col items-center">
                <img
                    src="gate.jpg"
                    alt="The entrance of Cobb Café"
                    className="top-0 w-[40rem] max-w-full h-auto object-contain"
                />
                <p className="text-right w-[40rem] max-w-full text-sm mb-5 mr-3 md:mr-5">
                    The gate to the party.{' '}
                    <a href="https://chicagomaroon.com/staff_name/nolan-shaffer/">Nolan Shaffer</a>.
                </p>
            </div>
        </div>
    );
}
