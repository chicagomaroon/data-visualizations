import React from 'react';
import Header from './Header.jsx';
import ArticleContent from './ArticleContent.jsx';
import { useEffect, useState } from 'react';
import Credits from './Footer.jsx';

export default function Article() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        let lastWidth = window.innerWidth;
        let lastHeight = window.innerHeight;

        function handleResize() {
            const newWidth = window.innerWidth;
            const newHeight = window.innerWidth;

            if (newWidth !== lastWidth || newHeight !== lastHeight) {
                setWindowWidth(newWidth);
                setWindowHeight(newHeight);
                lastWidth = newWidth;
                lastHeight = newHeight;
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    return (
        <div>
            <Header windowWidth={windowWidth} windowHeight={windowHeight} />
            <ArticleContent
                windowHeight={windowHeight}
                windowWidth={windowWidth}
                isMobile={isMobile}
            />
            <Credits />
        </div>
    );
}
