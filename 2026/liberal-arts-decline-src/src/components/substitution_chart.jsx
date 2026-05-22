import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import {
    useWindowWidth,
    getAxisFontSize,
    getSeriesLabelFontSize,
    getAnnotationFontSize,
    formatXAxisYear,
    setChartTitleLines
} from './chartMobile';

export default function SubstitutionChart({
    data,
    width = 700,
    height = 500,
    margin = { top: 110, right: 80, bottom: 50, left: 60 }
}) {
    const svgRef = useRef();
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (!data) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Build two series from the wide-format data
        const mathSeries = data.map((d) => ({ year: d.year, value: d.math }));
        const publicPolicySeries = data.map((d) => ({
            year: d.year,
            value: d.publicPolicy
        }));
        const allPoints = [...mathSeries, ...publicPolicySeries];

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
        const yTickStep = yMax > 20 ? 10 : 3;
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

        // Dotted vertical line at 2018
        const annotationYear = 2018;

        svg.append('line')
            .attr('x1', x(annotationYear))
            .attr('x2', x(annotationYear))
            .attr('y1', margin.top)
            .attr('y2', height - margin.bottom)
            .attr('stroke', '#666')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '4,4');

        // Label above the line
        svg.append('text')
            .attr('x', x(2013))
            .attr('y', margin.top + 18)
            .attr('text-anchor', 'middle')
            .attr('fill', '#666')
            .attr('font-size', getAnnotationFontSize(windowWidth))
            .attr('font-family', 'Georgia, serif')
            .text('Business economics introduced');

        // Chart title
        setChartTitleLines(svg.append('text'), windowWidth, {
            x: (margin.left + width - margin.right) / 2,
            y: margin.top - 65,
            lines: ['Percentage of Students by', 'Field of Study at UChicago']
        });

        // Mathematics line — green
        svg.append('path')
            .datum(mathSeries)
            .attr('fill', 'none')
            .attr('stroke', '#2a7f3e')
            .attr('stroke-width', 2.5)
            .attr('stroke-linecap', 'round')
            .attr('d', lineInstructions);

        // Public Policy line — orange
        svg.append('path')
            .datum(publicPolicySeries)
            .attr('fill', 'none')
            .attr('stroke', '#c45a00')
            .attr('stroke-width', 2.5)
            .attr('stroke-linecap', 'round')
            .attr('d', lineInstructions);

        const lastMath = mathSeries[mathSeries.length - 1];
        const lastPubPol = publicPolicySeries[publicPolicySeries.length - 1];

        svg.append('text')
            .attr('x', x(2006.25))
            .attr('y', y(lastMath.value - 2))
            .attr('dy', '0.35em')
            .attr('fill', '#2a7f3e')
            .attr('font-size', getSeriesLabelFontSize(windowWidth))
            .attr('font-family', 'Georgia, serif')
            .text('Math and statistics');

        svg.append('text')
            .attr('x', x(2021.5))
            .attr('y', y(lastPubPol.value + 2.15))
            .attr('dy', '0.35em')
            .attr('fill', '#c45a00')
            .attr('font-size', getSeriesLabelFontSize(windowWidth))
            .attr('font-family', 'Georgia, serif')
            .text('Public policy');
    }, [data, windowWidth]);

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: 'auto', display: 'block' }}
        />
    );
}
