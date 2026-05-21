import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import {
    useWindowWidth,
    getAxisFontSize,
    getSeriesLabelFontSize,
    formatXAxisYear,
    setChartTitleLines
} from './chartMobile';

export default function AriChart({
    data,
    width = 700,
    height = 400,
<<<<<<< HEAD
    margin = { top: 70, right: 100, bottom: 30, left: 50 }
=======
    margin = { top: 40, right: 100, bottom: 30, left: 50 }
>>>>>>> origin/main
}) {
    const svgRef = useRef();
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (!data) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Build two series from the wide-format data
        const englishSeries = data.map((d) => ({
            year: d.year,
            value: d.english
        }));
        const polisciSeries = data.map((d) => ({
            year: d.year,
            value: d.politicalScience
        }));
        const allPoints = [...englishSeries, ...polisciSeries];

        // Scales
        const x = d3
            .scaleLinear()
            .domain(d3.extent(allPoints, (d) => d.year))
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(allPoints, (d) => d.value)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const lineInstructions = d3
            .line()
            .x((d) => x(d.year))
            .y((d) => y(d.value));

        const axisPadding = 5;

        // x axis
        svg.append('g')
            .attr('class', 'x-axis')
            .attr(
                'transform',
                `translate(0,${height - margin.bottom + axisPadding})`
            )
            .attr('color', 'gray')
            .call(
                d3
                    .axisBottom(x)
                    .tickFormat((d) => formatXAxisYear(windowWidth, d))
                    .tickSizeOuter(0)
            )
            .call((g) =>
                g
                    .selectAll('.tick text')
                    .attr('font-size', getAxisFontSize(windowWidth))
                    .attr('font-family', 'Playfair Display, serif')
            );

        // y axis
        const yMax = d3.max(allPoints, (d) => d.value);
        const yTickStep = yMax > 20 ? 10 : 2;
        const yTicks = d3.range(0, yMax + yTickStep, yTickStep);

        svg.append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margin.left - axisPadding},0)`)
            .attr('color', 'gray')
            .call(
                d3
                    .axisLeft(y)
                    .tickValues(yTicks)
                    .tickFormat((d) => `${d}%`)
                    .tickSize(0)
            )
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g
                    .selectAll('.tick text')
                    .attr('font-size', getAxisFontSize(windowWidth))
                    .attr('font-family', 'Playfair Display, serif')
            );

        // Horizontal gridlines
        svg.append('g')
            .attr('class', 'y-grid')
            .selectAll('line')
            .data(yTicks)
            .join('line')
            .attr('x1', margin.left)
            .attr('x2', width - margin.right)
            .attr('y1', (d) => y(d))
            .attr('y2', (d) => y(d))
            .attr('stroke', '#e6e6e6')
            .attr('stroke-width', 1);

        // Chart title
        setChartTitleLines(svg.append('text'), windowWidth, {
            x: margin.left,
            y: margin.top - 55,
            lines: [
                'UChicago Students in Select',
                'Humanities and Social Science Majors'
            ]
        });

        // English line — maroon
        svg.append('path')
            .datum(englishSeries)
            .attr('fill', 'none')
            .attr('stroke', '#7bb14e')
            .attr('stroke-width', 2)
            .attr('stroke-linecap', 'round')
            .attr('d', lineInstructions);

        // Political Science line — navy
        svg.append('path')
            .datum(polisciSeries)
            .attr('fill', 'none')
            .attr('stroke', '#0076bd')
            .attr('stroke-width', 2)
            .attr('stroke-linecap', 'round')
            .attr('d', lineInstructions);

        // End-of-line labels
        const lastEnglish = englishSeries[englishSeries.length - 1];
        const lastPolisci = polisciSeries[polisciSeries.length - 1];

        svg.append('text')
            .attr('x', x(2015))
            .attr('y', y(6.5))
            .attr('dy', '0.35em')
            .attr('fill', '#7bb14e')
            .attr('font-size', getSeriesLabelFontSize(windowWidth))
            .attr('font-family', 'Georgia, serif')
            .text('English');

        svg.append('text')
            .attr('x', x(2018))
            .attr('y', y(9.4))
            .attr('dy', '0.35em')
            .attr('fill', '#0076bd')
            .attr('font-size', getSeriesLabelFontSize(windowWidth))
            .attr('font-family', 'Georgia, serif')
            .text('Political science');
    }, [data, windowWidth]);

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                overflow: 'visible'
            }}
        />
    );
    // return <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }} />;
}
