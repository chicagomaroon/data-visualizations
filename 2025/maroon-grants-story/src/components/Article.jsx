import React, { useState, useEffect } from 'react';
import scrollama from 'scrollama';
import D3Visualization from './visualizations/D3Visualization';
import Header from './Header';
import ScrollTest from './ScrollTest';

const isMobile = {
    android: () => navigator.userAgent.match(/Android/i),

    blackberry: () => navigator.userAgent.match(/BlackBerry/i),

    ios: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),

    opera: () => navigator.userAgent.match(/Opera Mini/i),

    windows: () => navigator.userAgent.match(/IEMobile/i),

    any: () =>
        isMobile.android() ||
        isMobile.blackberry() ||
        isMobile.ios() ||
        isMobile.opera() ||
        isMobile.windows()
};

const Article = () => {
    const [height, setHeight] = useState(window.innerHeight);
    const mobile = isMobile.any();

    const handleResize = () => {
        const newHeight = window.innerHeight;
        setHeight(newHeight);
    };

    useEffect(() => {
        if (mobile) return;
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [height]);

    return (
        <div id="rootparent">
            <Header height={height} />
            <ScrollTest height={height} />
        </div>
    );
};

export default Article;
