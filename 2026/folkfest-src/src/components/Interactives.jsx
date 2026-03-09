import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Scrollama, Step } from 'react-scrollama';

const ScrollBar = ({ scrollYProgress }) => {
    return (
        <div className="absolute left-0 right-0 z-10 flex justify-center">
            <div
                className="relative w-full h-[8px]
             overflow-hidden
            lg:max-w-none lg:h-[8px]"
            >
                <motion.div
                    className="absolute
                    inset-0 rounded-full bg-[#800000] origin-left"
                    style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                />
            </div>
        </div>
    );
};

export const ScrollContainer = (props) => {
    const { start, onStepEnter, onStepExit, textArray, height, isMobile } =
        props;
    const buffer = isMobile.any() ? 3 : 0.9;
    return (
        <div className="relative px-5 py-5 z-10 mx-auto">
            <Scrollama
                onStepEnter={onStepEnter}
                onStepExit={onStepExit}
                offset={0.5}
            >
                {textArray.map((_, index) => (
                    <Step data={start + index} key={start + index}>
                        <div
                            className="relative w-[100px] h-[100px]"
                            style={{ marginBottom: buffer * height + 'px' }}
                        >
                            <p className="scroll_font text-center"></p>
                        </div>
                    </Step>
                ))}
            </Scrollama>
            <div className="h-[50dvh]"></div>
        </div>
    );
};

const MAROON_IMAGES = [
    { src: 'maroon-2009.jpg', positionClass: 'top-[2vh] h-[40%] right-[40vw]' },
    {
        src: 'maroon-1980.jpg',
        positionClass: 'left-[-2vw] sm:left-[10vw] top-0 sm:top-[3vh] h-[35%]'
    },
    { src: 'maroon-1962.jpg', positionClass: 'top-[5vh] right-[10vw] h-full' },
    {
        src: 'maroon-1985.jpg',
        positionClass: 'h-[30%] left-[4vw] bottom-[-8vh]'
    },
    { src: 'maroon-1961.jpg', positionClass: 'h-[35%] left-[4vw] top-[40%]' },
    {
        src: 'maroon-1971.jpg',
        positionClass: 'right-[0vw] bottom-0 h-[28%] sm:right-[38vw] sm:h-[40%]'
    }
];

const CENTERED_TEXT_CONFIG = [
    {
        textIndex: 0,
        stepMin: 0,
        stepMax: 1,
        classExtras: 'max-w-[500px] rounded-lg p-4',
        visibleOpacity: 'opacity-100'
    },
    {
        textIndex: 1,
        stepMin: 2,
        stepMax: 2,
        classExtras: 'max-w-[400px] p-1',
        visibleOpacity: 'opacity-90'
    },
    {
        textIndex: 5,
        stepMin: 7,
        stepMax: 7,
        classExtras: 'max-w-[500px] rounded-lg p-4',
        visibleOpacity: 'opacity-100'
    },
    ...[9, 10, 11, 12].map((textIndex, i) => ({
        textIndex,
        stepMin: 11 + i,
        stepMax: 11 + i,
        classExtras: 'max-w-[500px] rounded-lg p-4 z-[5]',
        visibleOpacity: 'opacity-100'
    }))
];

const AnimationContainerOne = (props) => {
    const {
        currentStepIndex,
        textArray,
        scrollYProgress,
        imageArray,
        width,
        barLength,
        height,
        barStart
    } = props;

    const spacing = [50, 15, 50];
    const showMaroon = currentStepIndex === 2 || currentStepIndex === 3;

    const barProgress = useTransform(
        scrollYProgress,
        [barStart, barLength],
        [0, 1]
    );

    return (
        <div className="sticky top-0 h-screen flex items-stretch">
            <div className="relative flex flex-col w-screen h-full overflow-hidden">
                <ScrollBar scrollYProgress={barProgress} />
                {MAROON_IMAGES.map(({ src, positionClass }, index) => (
                    <img
                        key={src}
                        src={src}
                        className={`absolute object-contain transition-opacity duration-[500ms] ${positionClass} ${
                            showMaroon ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
                {imageArray.slice(0, 3).map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        className={`w-full h-1/3 object-cover transition-opacity duration-[500ms] ${
                            currentStepIndex >= 4 + index &&
                            currentStepIndex <= 6
                                ? 'opacity-100'
                                : 'opacity-0'
                        }`}
                    />
                ))}
                {imageArray.slice(3, 6).map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            className={`w-full h-1/3 object-cover transition-opacity duration-[500ms] absolute sm:w-1/3 sm:h-1/3 ${
                                currentStepIndex >= 8 + index &&
                                currentStepIndex <= 10
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                            style={{
                                top: `${index * 33.3333}%`,
                                left: width < 640 ? '0' : `${index * 33.3333}%`
                            }}
                        />
                        <p
                            className={`text-3xl font-bold absolute
                                    top-1/2 left-1/2 -translate-x-1/2
                                    -translate-y-1/2 z-[5] p-[.3em]
                                    text-white sm:text-black transition-opacity
                                    duration-[500ms] rounded-lg p-4 sm:bg-transparent
                                    flex items-center whitespace-nowrap
                                    [text-shadow:_-1px_-1px_0_grey,_1px_-1px_0_grey,_-1px_1px_0_grey,_1px_1px_0_grey] sm:[text-shadow:none]
                                    ${
                                        currentStepIndex - index >= 8 &&
                                        currentStepIndex <= 10
                                            ? 'opacity-80'
                                            : 'opacity-0'
                                    }`}
                            style={{
                                top:
                                    width < 640
                                        ? `${index * 33.3333 + 5}%`
                                        : `${spacing[index]}%`,
                                left:
                                    width < 640
                                        ? '50%'
                                        : `${index * 33.3333 + 17}%`
                            }}
                        >
                            {textArray[6 + index]}
                        </p>
                    </div>
                ))}
                {CENTERED_TEXT_CONFIG.map(
                    (
                        {
                            textIndex,
                            stepMin,
                            stepMax,
                            classExtras,
                            visibleOpacity
                        },
                        index
                    ) => {
                        const visible =
                            currentStepIndex >= stepMin &&
                            currentStepIndex <= stepMax;
                        return (
                            <p
                                key={index}
                                className={`text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] transition-opacity duration-[500ms] bg-white
                                    ${classExtras} ${
                                    visible ? visibleOpacity : 'opacity-0'
                                }`}
                            >
                                {textArray[textIndex]}
                            </p>
                        );
                    }
                )}
            </div>
        </div>
    );
};

const AnimationContainerTwo = (props) => {
    const {
        currentStepIndex,
        textArray,
        scrollYProgress,
        barStart,
        barLength,
        imageArray,
        height
    } = props;

    const barProgress = useTransform(
        scrollYProgress,
        [barStart, barLength],
        [0, 1]
    );

    return (
        <div className="sticky top-0 h-[100dvh] w-full relative flex justify-center bg-black">
            <ScrollBar scrollYProgress={barProgress} />
            {imageArray.map((el, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-1/2 -translate-x-1/2
                max-w-xl w-full max-h-screen
                lg:flex lg:items-center lg:justify-center lg:h-screen
                lg:p-6 lg:gap-10 lg:max-w-6xl lg:w-full
                ${
                    (el[1] <= currentStepIndex && currentStepIndex <= el[2]) ||
                    currentStepIndex == 11
                        ? 'z-30 pointer-events-auto'
                        : 'z-0 pointer-events-none'
                }`}
                >
                    <div className="flex flex-col items-center lg:flex-[2] lg:min-w-0 pointer-events-auto">
                        <img
                            src={el[0]}
                            className={`mt-[20px] top-0 w-full h-auto object-contain lg:mt-0 lg:max-w-5xl lg:w-full
                                transition-opacity duration-[1500ms] max-h-[50vh] sm:max-h-[60vh]
                                ${
                                    (el[1] <= currentStepIndex &&
                                        currentStepIndex <= el[2]) ||
                                    (currentStepIndex == 11 && el[1] == 0)
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                }`}
                        />
                        <p
                            className={`mt-[10px] lg:mt-[20px] top-0 w-full text-sm px-5 lg:px-0 text-white
                            ${
                                (el[1] <= currentStepIndex &&
                                    currentStepIndex <= el[2]) ||
                                (currentStepIndex == 11 && el[1] == 0)
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                            dangerouslySetInnerHTML={{ __html: el[3] }}
                        ></p>
                    </div>
                    <div
                        className="z-[25] absolute left-0 right-0
                        flex justify-center top-[105%] sm:top-[110%]
                        lg:relative lg:top-0 lg:left-0 lg:right-0 lg:flex-1
                        lg:min-w-0 lg:flex lg:items-center lg:justify-center"
                    >
                        <p
                            className={`absolute caption lg:relative lg:text-left p-5 text-white
                        ${
                            (el[1] <= currentStepIndex &&
                                currentStepIndex <= el[2]) ||
                            (currentStepIndex == 11 && el[1] == 0)
                                ? 'opacity-100'
                                : 'opacity-0'
                        }`}
                            dangerouslySetInnerHTML={{
                                __html: textArray[index]
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export const AnimationBoxOne = (props) => {
    const {
        currentStepIndex,
        scrollText,
        paragraphText,
        windowWidth,
        isMobile,
        imageArray,
        barLength = 1,
        barStart = 0,
        onStepEnter,
        onStepExit,
        height,
        width,
        start
    } = props;
    const stepsContainerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: stepsContainerRef,
        offset: ['start end', 'end start']
    });

    return (
        <div className="relative">
            <AnimationContainerOne
                currentStepIndex={currentStepIndex}
                textArray={scrollText}
                scrollYProgress={scrollYProgress}
                imageArray={imageArray}
                height={height}
                width={width}
                barLength={barLength}
                barStart={barStart}
            />
            <div ref={stepsContainerRef} className="relative">
                <ScrollContainer
                    onStepEnter={onStepEnter}
                    onStepExit={onStepExit}
                    textArray={scrollText}
                    start={start}
                    height={height}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
};

export const AnimationBoxTwo = (props) => {
    const {
        currentStepIndex,
        scrollText,
        imageArray,
        barStart = 0,
        barLength = 1,
        onStepEnter,
        onStepExit,
        isMobile,
        height,
        width,
        start
    } = props;
    const stepsContainerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: stepsContainerRef,
        offset: ['start end', 'end start']
    });

    return (
        <div className="relative">
            <AnimationContainerTwo
                currentStepIndex={currentStepIndex}
                textArray={scrollText}
                scrollYProgress={scrollYProgress}
                imageArray={imageArray}
                height={height}
                width={width}
                barLength={barLength}
                barStart={barStart}
            />
            <div ref={stepsContainerRef} className="relative">
                <ScrollContainer
                    onStepEnter={onStepEnter}
                    onStepExit={onStepExit}
                    textArray={scrollText}
                    start={start}
                    height={height}
                    isMobile={isMobile}
                />
            </div>
        </div>
    );
};
