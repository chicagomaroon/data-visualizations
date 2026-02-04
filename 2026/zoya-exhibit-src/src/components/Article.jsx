import React from 'react';
import Header from './Header.jsx';
import ArticleContent from './ArticleContent.jsx';
import { useEffect, useState } from 'react';
import Credits from './Footer.jsx';

export default function Article() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="[overflow-x:clip]">
            <Header windowWidth={windowWidth} />
            <ArticleContent
                windowWidth={windowWidth}
                windowHeight={windowHeight}
            />
            <Credits />
        </div>
    );
}
