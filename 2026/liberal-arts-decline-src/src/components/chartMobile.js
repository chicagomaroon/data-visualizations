import { useEffect, useState } from 'react';

export const isMobile = (w) => w < 400;

export const getAxisFontSize = (w) => (isMobile(w) ? 28 : 18);

export const getTitleFontSize = (w) => {
    if (w < 400) return 35;
    if (w < 768) return 29;
    if (w < 1024) return 26;
    return 22;
};

export const getSmallTitleFontSize = (w) => (isMobile(w) ? 24 : 18);

export const getSeriesLabelFontSize = (w) => (isMobile(w) ? 23 : 17);

export const getAnnotationFontSize = (w) => (isMobile(w) ? 22 : 20);

export const formatXAxisYear = (w, year) =>
    isMobile(w) ? `'${String(year).slice(-2)}` : String(year);

export const TITLE_Y_OFFSET = 13;

export const getChartTitleY = (y, offset = TITLE_Y_OFFSET) => y - offset;

export const setChartTitleLines = (
    titleSelection,
    windowWidth,
    { x, y, lines, fontSize = getTitleFontSize, yOffset = TITLE_Y_OFFSET }
) => {
    if (!titleSelection) return;
    const titleLines = Array.isArray(lines) ? lines : [lines];
    titleSelection
        .attr('x', x)
        .attr('y', getChartTitleY(y, yOffset))
        .attr('fill', 'black')
        .attr('font-family', 'Georgia, serif')
        .attr('font-size', fontSize(windowWidth))
        .attr('text-anchor', 'middle')
        .text(null)
        .selectAll('tspan')
        .remove();

    titleLines.forEach((line, i) => {
        titleSelection
            .append('tspan')
            .attr('x', x)
            .attr('dy', i === 0 ? 0 : '1.1em')
            .text(line);
    });
};

export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWidth;
};
