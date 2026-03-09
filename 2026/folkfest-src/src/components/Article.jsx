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


    return (
        <div>
            <Header windowWidth={windowWidth} windowHeight={windowHeight} />
            <ArticleContent windowHeight={windowHeight} windowWidth={windowWidth}/>
            <Credits />
        </div>
    );
}
