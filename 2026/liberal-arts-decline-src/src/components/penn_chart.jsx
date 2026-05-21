import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import {
    useWindowWidth,
    getAxisFontSize,
    getSeriesLabelFontSize,
    formatXAxisYear,
    setChartTitleLines
} from './chartMobile';

export default function PennChart({
    data,
    width = 750,
    height = 400,
    margin = { top: 80, right: 80, bottom: 30, left: 50 }
}) {
    const svgRef = useRef();
    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (!data) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Build two series from the wide-format data
        const uchicagoSeries = data.map((d) => ({
            year: d.year,
            value: d.uchicago
        }));
        const pennSeries = data.map((d) => ({ year: d.year, value: d.penn }));
        const allPoints = [...uchicagoSeries, ...pennSeries];

        // Scales
        const x = d3
            .scaleLinear()
            .domain(d3.extent(allPoints, (d) => d.year))
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain([10, d3.max(allPoints, (d) => d.value)])
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
        const yTickStep = yMax > 20 ? 10 : 5;
        const yTicks = d3.range(10, yMax + yTickStep, yTickStep);

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
            y: margin.top - 90,
            lines: [
                'Percentage of Students',
                'with Business, Economics, or Finance Majors'
            ]
        });

        // UChicago line — green
        svg.append('path')
            .datum(uchicagoSeries)
            .attr('fill', 'none')
            .attr('stroke', '#800')
            .attr('stroke-width', 2.5)
            .attr('stroke-linecap', 'round')
            .attr('d', lineInstructions);

        // Penn line — blue
        svg.append('path')
            .datum(pennSeries)
            .attr('fill', 'none')
            .attr('stroke', '#011F5B')
            .attr('stroke-width', 2.5)
            .attr('stroke-linecap', 'round')
            .attr('d', lineInstructions);

        svg.append('text')
            .attr('x', x(2018))
            .attr('y', y(25))
            .attr('dy', '0.35em')
            .attr('fill', '#800')
            .attr('font-size', getSeriesLabelFontSize(windowWidth))
            .attr('font-family', 'Georgia, serif')
            .text('UChicago');

        svg.append('text')
            .attr('x', x(2010))
            .attr('y', y(42))
            .attr('dy', '0.35em')
            .attr('fill', '#011F5B')
            .attr('font-size', getSeriesLabelFontSize(windowWidth))
            .attr('font-family', 'Georgia, serif')
            .text('University of Pennsylvania');
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
}
