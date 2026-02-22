import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Scrollama, Step } from 'react-scrollama';

const ScrollBar = ({ scrollYProgress }) => {
    return (
        <div className="absolute left-0 right-0 z-10 top-0 flex justify-center">
            <div
                className="relative w-full max-w-xl h-[8px]
             bg-gray-500 overflow-hidden
            lg:max-w-none lg:h-[8px]"
            >
                <motion.div
                    className="absolute inset-0 rounded-full bg-[#800000] origin-left"
                    style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                />
            </div>
        </div>
    );
};

const ScrollContainer = (props) => {
    const { start, onStepEnter, onStepExit, textArray, height } = props;
    return (
        <div className="relative px-5 py-5 z-10 mx-auto">
            <Scrollama
                onStepEnter={onStepEnter}
                onStepExit={onStepExit}
                offset={1}
            >
                {textArray.map((_, index) => (
                    <Step data={start + index} key={start + index}>
                        <div
                            className="relative w-[100px] h-[100px]"
                            style={{ marginBottom: 0.9 * height + 'px' }}
                        >
                            <p className="scroll_font text-center"></p>
                        </div>
                    </Step>
                ))}
            </Scrollama>
        </div>
    );
};

const AnimationContainer = (props) => {
    const {
        currentStepIndex,
        textArray,
        scrollYProgress,
        barLength,
        imageArray
    } = props;

    const barProgress = useTransform(scrollYProgress, [0, barLength], [0, 1]);

    console.log(scrollYProgress.current);

    return (
        <div className="sticky bg-black top-0 h-screen w-full relative flex justify-center">
            <ScrollBar scrollYProgress={barProgress} />
            {imageArray.map((el, index) => (
                <div
                    key={index}
                    className={`absolute top-0 left-1/2 -translate-x-1/2
                max-w-xl w-full max-h-screen
                lg:flex lg:items-center lg:justify-center lg:h-screen
                lg:p-6 lg:gap-5 lg:max-w-6xl lg:w-full
                ${
                    el[2] <= currentStepIndex && currentStepIndex <= el[3]
                        ? 'z-30 pointer-events-auto'
                        : 'z-0 pointer-events-none'
                }`}
                >
                    <div className="flex flex-col items-center lg:flex-[2] lg:min-w-0 pointer-events-auto">
                        <img
                            src={el[0]}
                            alt={el[1]}
                            className={`mt-[20px] top-0 w-full h-auto object-contain lg:mt-0 lg:max-w-5xl lg:w-full
                                transition-opacity duration-[1500ms]
                                ${
                                    el[2] <= currentStepIndex &&
                                    currentStepIndex <= el[3]
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                }`}
                        />
                        <p
                            className={`text-gray-400 mt-3 lg:mt-5 text-sm italic
                                text-left w-full relative z-10 ml-5
                                transition-opacity duration-[500ms]
                            ${
                                el[2] <= currentStepIndex &&
                                currentStepIndex <= el[3]
                                    ? 'opacity-100'
                                    : 'opacity-0 pointer-events-none'
                            }`}
                            dangerouslySetInnerHTML={{ __html: el[1] }}
                        />
                    </div>
                    <div
                        className="z-[25] absolute left-0 right-0
                        flex justify-center top-[120%] sm:top-[110%]
                        lg:relative lg:top-0 lg:left-0 lg:right-0 lg:flex-1
                        lg:min-w-0 lg:flex lg:items-center lg:justify-center"
                    >
                        <p
                            className={`absolute text-white content lg:relative lg:text-left 
                        ${
                            el[2] <= currentStepIndex &&
                            currentStepIndex <= el[3]
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

export const AnimationBox = (props) => {
    const {
        currentStepIndex,
        scrollText,
        paragraphText,
        windowWidth,
        imageArray,
        barLength,
        onStepEnter,
        onStepExit,
        height,
        start
    } = props;
    const stepsContainerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: stepsContainerRef,
        offset: ['start end', 'end start']
    });

    return (
        <div>
            <div className="w-[100dvw] mx-auto py-10 md:py-10 flex flex-col items-center">
                {paragraphText.map((p, index) => (
                    <p
                        className="mb-[20px] px-[2%] md:px-[20%] z-[20] content"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: p }}
                    />
                ))}
            </div>
            <AnimationContainer
                currentStepIndex={currentStepIndex}
                textArray={scrollText}
                scrollYProgress={scrollYProgress}
                windowWidth={windowWidth}
                imageArray={imageArray}
                barLength={barLength}
            />
            <div ref={stepsContainerRef}>
                <ScrollContainer
                    onStepEnter={onStepEnter}
                    onStepExit={onStepExit}
                    textArray={scrollText}
                    start={start}
                    height={height}
                />
            </div>
        </div>
    );
};
