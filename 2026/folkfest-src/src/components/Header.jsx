import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import {
    headlinesm,
    headlinelg,
    subhead,
    byline
} from '../../public/content.js';

const CoverImage = () => {
    return (
        <img
            className="absolute inset-0 w-full h-[50%] sm:h-full object-cover"
            src="cover.jpg"
            alt=""
        />
    );
};

const MaroonLogo = () => {
    return (
        <a
            href="https://chicagomaroon.com/"
            className="w-[300px] md:w-[400px] absolute top-[10px]"
        >
            <img
                className="w-[300px] md:w-[400px] absolute top-[20px]"
                src="maroon_logo_white.svg"
                alt="The Chicago Maroon"
            />
        </a>
    );
};

const Headline = ({ windowWidth, windowHeight }) => {
    return (
        <div
            className="w-10/12 mx-auto relative z-[5]"
            style={{
                top: windowWidth < 640 ? '27vh' : '25%'
            }}
        >
            <h1
                className="font-boldtext text-[black]
                sm:text-white"
                style={{
                    fontSize:
                        windowWidth < 640
                            ? windowHeight < 800
                                ? '2em'
                                : '2.8em'
                            : '3.2em',
                    lineHeight: windowHeight < 800 ? '1.2em' : '1.1em'
                }}
                dangerouslySetInnerHTML={{
                    __html: windowWidth < 640 ? headlinesm : headlinelg
                }}
            ></h1>
        </div>
    );
};

const Subhead = ({ windowWidth }) => {
    return (
        <div
            className="w-10/12 mx-auto relative mt-5"
            style={{
                top: windowWidth < 640 ? '27vh' : '25%'
            }}
        >
            <h1 className="text-lg sm:text-2xl text-[black] sm:text-white">
                {subhead}
            </h1>
        </div>
    );
};

const Byline = ({ windowWidth }) => {
    return (
        <div
            className="px-1 sm:px-12 mx-auto relative mt-5 text-[black] w-[90vw]
             top-[100vh]"
        >
            {byline.map((text, index) => (
                <p
                    key={index}
                    className="text-md sm:text-lg"
                    dangerouslySetInnerHTML={{ __html: text }}
                ></p>
            ))}
        </div>
    );
};

const Divider = () => {
    return (
        <div
            className="w-2/3 max-w-md h-1 bg-white rounded-full absolute
                left-1/2 -translate-x-1/2"
            style={{ bottom: '27%' }}
        ></div>
    );
};

const Arrow = () => {
    return (
        <FontAwesomeIcon
            icon={faAngleDoubleDown}
            color="white"
            id="arrow"
            size="3x"
            className="mt-4 absolute animate-float"
            style={{
                left: '50%',
                bottom: '2%'
            }}
        />
    );
};

const Header = ({ windowWidth, windowHeight }) => {
    return (
        <div className="w-full h-[100vh] relative">
            <CoverImage />
            <p
                className="text-right mr-3 md:mr-5 text-sm z-[6] 
            sm:hidden relative top-[50vh]"
            >
                One of the many jam circles that formed during the workshop.{' '}
                <a href="https://chicagomaroon.com/staff_name/nolan-shaffer/">
                    Nolan Shaffer
                </a>
                .
            </p>
            <div
                className="w-full h-[50vh] sm:h-[100vh] absolute bg-gray-500
            opacity-20 top-0 z-[0]"
            ></div>

            <div
                className="absolute inset-0 flex flex-col 
                            items-center justify-center"
            >
                <MaroonLogo />
                <Headline
                    windowWidth={windowWidth}
                    windowHeight={windowHeight}
                />
                <Subhead windowWidth={windowWidth} />
            </div>
            <p
                className="text-left mr-3 md:mr-5 text-sm z-[6] 
            hidden sm:block relative top-[100vh] text-right"
            >
                One of the many jam circles that formed during the workshop.{' '}
                <a href="https://chicagomaroon.com/staff_name/nolan-shaffer/">
                    Nolan Shaffer
                </a>
                .
            </p>
            <Byline windowWidth={windowWidth} />
        </div>
    );
};

export default Header;
