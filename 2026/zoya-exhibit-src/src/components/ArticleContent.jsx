import React, { useState, useEffect } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import {
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    s1,
    s2,
    s3,
    s4,
    s5,
    showing
} from '../../public/content.js';

const ScrollContainer = (props) => {
    const { start, onStepEnter, onStepExit, textArray, height } = props;

    const end = start + textArray.length;
    return (
        <div className="relative px-5 py-5 z-10 mx-auto">
            <Scrollama
                onStepEnter={onStepEnter}
                onStepExit={onStepExit}
                offset={1}
            >
                {textArray.map((text, index) => (
                    <Step data={start + index} key={start + index}>
                        <div
                            className="relative p-2
                            border border-[#800000] rounded-[10px]
                            bg-white z-20 w-[300px] md:w-[350px] mx-auto"
                            style={{ marginBottom: 0.9 * height + 'px' }}
                        >
                            <p
                                className="scroll_font text-center"
                                dangerouslySetInnerHTML={{ __html: text }}
                            ></p>
                        </div>
                    </Step>
                ))}
                <Step data={end}>
                    <div style={{ height: `10px` }}></div>
                </Step>
            </Scrollama>
        </div>
    );
};

const AnimationContainerOne = ({ currentStepIndex, direction, scrollY }) => {
    return (
        <div className="sticky top-0 h-screen w-full relative flex items-center justify-center max-[440px]:-mt-[13vh]">
            <img
                src="love.jpg"
                alt="image1"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex <= 0 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="love2.jpg"
                alt="image2"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex >= 1 ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

const AnimationContainerTwo = ({ currentStepIndex, direction, scrollY }) => {
    console.log('currentStepIndex', currentStepIndex);
    return (
        <div className="sticky top-0 h-screen w-full relative flex items-center justify-center max-[440px]:-mt-[20vh]">
            <img
                src="global.jpg"
                alt="image1"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex <= 9 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="global-zoomed.jpg"
                alt="image2"
                className={`absolute w-[95dvw] h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex >= 10 && currentStepIndex <= 12 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="kitchen.jpg"
                alt="image2"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 13 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="cabin.jpg"
                alt="image2"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex >= 14 ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

const AnimationContainerThree = ({ currentStepIndex, direction, scrollY }) => {
    console.log('currentStepIndex', currentStepIndex);
    return (
        <div className="sticky top-0 h-screen w-full relative flex items-center justify-center max-[440px]:-mt-[30vh]">
            <img
                src="table.jpg"
                alt="image1"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex <= 15 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="impale.jpg"
                alt="image2"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 16 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="intifada.jpg"
                alt="image2"
                className={`absolute max-h-screen w-auto h-auto object-cover-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 17 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="beach.jpg"
                alt="image2"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 18 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="bath.jpg"
                alt="image2"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex >= 19 ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

const AnimationContainerFour = ({ currentStepIndex, direction, scrollY }) => {
    return (
        <div className="sticky top-0 h-screen w-full relative flex items-center justify-center max-[440px]:-mt-[20vh]">
            <img
                src="cover.jpg"
                alt="image1"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex <= 21 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="cover-table.jpg"
                alt="image1"
                className={`absolute max-h-screen w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 23 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="cover-zoomed.jpg"
                alt="image1"
                className={`absolute max-h-screen max-w-[95dvw] w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 24 || currentStepIndex == 22 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="cover-window.jpg"
                alt="image1"
                className={`absolute max-h-screen max-w-[95dvw] w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 25 || currentStepIndex == 26 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="side.jpg"
                alt="image1"
                className={`absolute max-h-screen max-w-[95dvw] w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 27 || currentStepIndex >= 30 ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
                src="woman.jpg"
                alt="image1"
                className={`absolute max-h-screen max-w-[95dvw] w-auto h-auto object-cover
                    transition-opacity duration-[1500ms]
                    ${currentStepIndex == 28 || currentStepIndex == 29 ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

const VideoContainer = ({ currentStepIndex, direction, scrollY }) => {
    const videoRef = React.useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            if (currentStepIndex >= 5 && currentStepIndex < 8) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [currentStepIndex]);

    return (
        <div className="sticky top-0 h-screen w-full relative flex items-center justify-center max-[440px]:-mt-[8vh]">
            <video
                ref={videoRef}
                src="protests.mp4"
                className={`absolute w-auto h-screen transition-opacity duration-[1500ms]
                    ${currentStepIndex <= 3 || currentStepIndex >= 5 ? 'opacity-100' : 'opacity-0'}`}
                loop
                muted
                playsInline
            />
            <img
                src="jewishmuseum.jpg"
                alt="Painting at the Jewish Museum"
                className={`absolute max-h-screen w-auto h-auto
                transition-opacity duration-[1500ms]
                ${currentStepIndex == 4 ? 'opacity-100' : 'opacity-0'}`}
            />
        </div>
    );
};

export default function ArticleContent({ windowWidth, windowHeight }) {
    const spacing = 1.1;
    const height = windowHeight * spacing;

    const [scrollY, setScrollY] = useState(() => {
        const saved = localStorage.getItem('scrollY');
        return saved !== null ? parseInt(saved) : 0;
    });

    const [currentStepIndex, setCurrentStepIndex] = useState(() => {
        const saved = localStorage.getItem('currentStepIndex');
        return saved !== null && scrollY > 2000 ? parseInt(saved) : 0;
    });
    const [direction, setDirection] = useState(() => {
        const saved = localStorage.getItem('direction');
        return saved !== null ? saved : 'down';
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

    // Reset currentStepIndex to 0 when user scrolls to the top of the page
    useEffect(() => {
        if (scrollY <= 100) {
            setCurrentStepIndex(0);
        }
    }, [scrollY]);

    const onStepEnter = ({ data }) => {
        setCurrentStepIndex(data);
    };

    const onStepExit = ({ data, direction }) => {
        setCurrentStepIndex(data);
        if (direction === 'up') {
            setCurrentStepIndex(data - 1); // move back a step
            setDirection('up');
        } else if (direction === 'down') {
            setCurrentStepIndex(data); // move forward
            setDirection('down');
        }
    };

    return (
        <div className="[overflow-x:clip]">
            <p className="text-right mr-3 md:mr-5 text-sm">
                <i>The Loner</i> (2025) looks out at the University of Chicago,
                awaiting a response.
                <br />
                Courtesy of BOB (Robert Heishman).
            </p>
            <div className="w-[95dvw] mx-auto py-10 md:py-10 flex flex-col items-center">
                {p1.map((text, index) => (
                    <p
                        className="mb-[20px] px-[2%] lg:px-[20%]"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
                <AnimationContainerOne
                    currentStepIndex={currentStepIndex}
                    direction={direction}
                    scrollY={scrollY}
                />
                <ScrollContainer
                    onStepEnter={onStepEnter}
                    onStepExit={onStepExit}
                    textArray={s1}
                    start={0}
                    height={height}
                />
            </div>
            <div className="w-[95dvw] mx-auto max-[440px]:-mt-[17vh] md:py-10 flex flex-col items-center">
                {p2.map((text, index) => (
                    <p
                        className="mb-[20px] px-[2%] lg:px-[20%]"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
                <VideoContainer
                    currentStepIndex={currentStepIndex}
                    direction={direction}
                    scrollY={scrollY}
                />
                <ScrollContainer
                    onStepEnter={onStepEnter}
                    onStepExit={onStepExit}
                    textArray={s2}
                    start={3}
                    height={height}
                />
            </div>
            <p className="text-[14px] italic text-right justify-center flex pr-4 bg-white relative z-20 ml-[50%] sm:ml-[30%]">
                Video courtesy of Hyperallergic.
                <br />
                Painting courtesy of the artist and Fort Gansevoort, New York.
            </p>
            <div className="w-[95dvw] mx-auto mt-[5vh] md:py-10 flex flex-col items-center">
                {p3.map((text, index) => (
                    <p
                        className="mb-[20px] px-[2%] lg:px-[20%]"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
                <AnimationContainerTwo
                    currentStepIndex={currentStepIndex}
                    direction={direction}
                    scrollY={scrollY}
                />
                <ScrollContainer
                    onStepEnter={onStepEnter}
                    onStepExit={onStepExit}
                    textArray={s3}
                    start={9}
                    height={height}
                />
            </div>
            <div className="w-[95dvw] mx-auto py-1 md:py-10 flex flex-col max-[440px]:-mt-[30vh]">
                {p4.map((text, index) => (
                    <p
                        className="mb-[20px] px-[2%] lg:px-[20%]"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
                <AnimationContainerThree
                    currentStepIndex={currentStepIndex}
                    direction={direction}
                    scrollY={scrollY}
                />

                <ScrollContainer
                    onStepEnter={onStepEnter}
                    onStepExit={onStepExit}
                    textArray={s4}
                    start={15}
                    height={height}
                />
            </div>
            <div className="w-[95dvw] mx-auto py-1 md:py-10 flex flex-col max-[440px]:-mt-[27vh]">
                {p5.map((text, index) => (
                    <p
                        className="mb-[20px] px-[2%] lg:px-[20%]"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
                <AnimationContainerFour
                    currentStepIndex={currentStepIndex}
                    direction={direction}
                    scrollY={scrollY}
                />
                <ScrollContainer
                    onStepEnter={onStepEnter}
                    onStepExit={onStepExit}
                    textArray={s5}
                    start={21}
                    height={height}
                />
            </div>
            <div className="w-[95dvw] mx-auto py-1 md:py-10 flex flex-col max-[440px]:-mt-[60vw]">
                {p6.map((text, index) => (
                    <p
                        className="mb-[20px] px-[2%] lg:px-[20%]"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ))}
                <p className="mb-[20px] px-[2%] lg:px-[20%]">
                    {p7}
                    {/* <img src="maroon_logo_m_black.svg" alt="M"
                    className="w-[20px] inline-block align-baseline ml-[7px]" /> */}
                </p>
                <p
                    className="mb-[20px] px-[2%] lg:px-[20%]"
                    dangerouslySetInnerHTML={{ __html: showing }}
                ></p>
            </div>
        </div>
    );
}
