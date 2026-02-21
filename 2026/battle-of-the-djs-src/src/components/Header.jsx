import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { headline, subhead, byline } from '../../public/content.js';

const CoverImage = () => {
    return (
        <img
            className="absolute inset-0 w-full h-full object-cover"
            src="cover.jpg"
            alt=""
        />
    );
};

const MaroonLogo = () => {
    return (
        <img
            className="w-[300px] md:w-[400px] absolute top-[20px]"
            src="maroon_logo_white.svg"
        />
    );
};

const Headline = ({ windowWidth }) => {
    return (
        <div
            className="w-10/12 md:w-1/2 mx-auto absolute"
            style={{
                left: '50%',
                top: windowWidth < 640 ? '30%' : '33%',
                transform: 'translateX(-50%)'
            }}
        >
            <h1
                className="text-3xl sm:text-5xl text-center text-[white]
                bg-[#0D1215]/[0.8] rounded-lg"
                dangerouslySetInnerHTML={{ __html: headline }}
            ></h1>
        </div>
    );
};

const Subhead = () => {
    return (
        <div
            className="w-10/12 md:w-1/2 mx-auto absolute"
            style={{
                left: '50%',
                top: '37%',
                transform: 'translateX(-50%)'
            }}
        >
            <h1
                className="text-md sm:text-xl text-center text-[white]
              bg-[#0D1215]/[0.95] rounded-lg"
            >
                {subhead}
            </h1>
        </div>
    );
};

const Byline = ({ windowWidth }) => {
    return (
        <div
            className="px-5 mx-auto absolute text-[white]
            bg-[#0D1215]/[0.5] rounded-lg w-[70dvw] md:w-auto"
            style={{
                left: '50%',
                bottom: windowWidth < 640 ? '17%' : '20%',
                transform: 'translateX(-50%)'
            }}
        >
            {byline.map((text, index) => (
                <p
                    key={index}
                    className="text-md sm:text-xl text-center"
                    dangerouslySetInnerHTML={{ __html: text }}
                ></p>
                ))}
        </div>
    );
};

const HeaderContent = ({ windowWidth }) => {
    return (
        <div>
            <Headline windowWidth={windowWidth} />
            <Byline windowWidth={windowWidth} />
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
            <div
                className="absolute inset-0 flex flex-col 
                            items-center justify-center"
            >
                <MaroonLogo />
                <HeaderContent windowWidth={windowWidth} />
                <Arrow />
            </div>
        </div>
    );
};

export default Header;
