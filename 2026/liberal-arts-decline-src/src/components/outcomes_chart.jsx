import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function OutcomesChart({
    data,
    width = 725,
    height = 400,
    margin = { top: 60, right: 80, bottom: 30, left: 50 }
}) {
    const svgRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const series = data.map((d) => ({
            year: d.year,
            value: d.share,
            label: d.originalYear
        }));

        // Find the gap: split where consecutive years jump by more than 1
        // Split into segments wherever there's a gap > 1 year
        const segments = [];
        let currentSegment = [];

        for (let i = 0; i < series.length; i++) {
            currentSegment.push(series[i]);
            const isLast = i === series.length - 1;
            const gapAhead =
                !isLast && series[i + 1].year - series[i].year > 1.5;
            if (gapAhead || isLast) {
                segments.push(currentSegment);
                currentSegment = [];
            }
        }

        // Build bridges between consecutive segments
        const bridges = [];
        for (let i = 0; i < segments.length - 1; i++) {
            const lastOfPrev = segments[i][segments[i].length - 1];
            const firstOfNext = segments[i + 1][0];
            bridges.push([lastOfPrev, firstOfNext]);
        }

        // Scales
        const x = d3
            .scaleLinear()
            .domain(d3.extent(series, (d) => d.year))
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(series, (d) => d.value)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        const lineInstructions = d3
            .line()
            .x((d) => x(d.year))
            .y((d) => y(d.value));

        const axisPadding = 5;

        // x axis — show every year in the range, even missing ones
        const [minYear, maxYear] = d3.extent(series, (d) => d.year);
        const allYears = d3.range(Math.floor(minYear), Math.ceil(maxYear) + 1);

        svg.append('g')
            .attr(
                'transform',
                `translate(0,${height - margin.bottom + axisPadding})`
            )
            .attr('color', 'gray')
            .call(
                d3
                    .axisBottom(x)
                    .tickValues(allYears)
                    .tickFormat((d) => {
                        // If this year has a data point with a custom label (like 2021.5 → "2021-2022"), use it
                        const match = series.find(
                            (s) => Math.abs(s.year - d) < 0.01
                        );
                        if (match) return match.label;
                        // For 2022, show the grouped label since 2021-2022 is stored at 2021.5
                        if (d === 2022) return '2021-2022';
                        return d.toString();
                    })
                    .tickSizeOuter(0)
            )
            .call((g) =>
                g
                    .selectAll('.tick text')
                    .attr('font-size', 14)
                    .attr('font-family', 'Playfair Display, serif')
                    .attr('transform', 'rotate(-30)')
                    .attr('text-anchor', 'end')
            );
        // y axis
        const yMax = d3.max(series, (d) => d.value);
        const yTickStep = yMax > 20 ? 10 : 5;
        const yTicks = d3.range(0, yMax + yTickStep, yTickStep);

        svg.append('g')
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
                    .attr('font-size', 16)
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
        svg.append('text')
            .attr('x', margin.left)
            .attr('y', margin.top - 15)
            .attr('fill', 'black')
            .attr('font-size', 22)
            .attr('font-family', 'Georgia, serif')
            .text('UChicago Students Entering Finance & Business');

        // Solid lines for each segment with 2+ points
        segments.forEach((segment) => {
            if (segment.length > 1) {
                svg.append('path')
                    .datum(segment)
                    .attr('fill', 'none')
                    .attr('stroke', '#800000')
                    .attr('stroke-width', 2.5)
                    .attr('stroke-linecap', 'round')
                    .attr('d', lineInstructions);
            }
        });

        // Dashed lines bridging each gap
        bridges.forEach((bridge) => {
            svg.append('path')
                .datum(bridge)
                .attr('fill', 'none')
                .attr('stroke', '#8000009b')
                .attr('stroke-width', 2.5)
                .attr('stroke-linecap', 'round')
                .attr('stroke-dasharray', '5,5')
                .attr('d', lineInstructions);
        });

        // Data point dots
        svg.append('g')
            .selectAll('circle')
            .data(series)
            .join('circle')
            .attr('cx', (d) => x(d.year))
            .attr('cy', (d) => y(d.value))
            .attr('r', 4)
            .attr('fill', '#800000');
    }, [data]);

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
