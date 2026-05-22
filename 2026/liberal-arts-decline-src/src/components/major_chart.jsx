import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import {
    useWindowWidth,
    getAxisFontSize,
    formatXAxisYear,
    setChartTitleLines
} from './chartMobile';

const COLORS = [
    '#800',
    '#1e3a5f',
    '#2a7f3e',
    '#c45a00',
    '#5e35b1',
    '#00838f',
    '#d81b60',
    '#5d4037'
];

export default function MajorChart({
    series,
    width = 700,
    height = 400,
    margin = { top: 40, right: 50, bottom: 30, left: 70 }
}) {
    const svgRef = useRef();
    const windowWidth = useWindowWidth();

    // One-time setup: create persistent groups (idempotent — checks the DOM, not a flag)
    useEffect(() => {
        const svg = d3.select(svgRef.current);

        if (svg.select('.lines').empty()) {
            svg.append('g').attr('class', 'x-axis');
            svg.append('g').attr('class', 'y-axis');
            svg.append('g').attr('class', 'y-grid');
            svg.append('g').attr('class', 'lines');
            svg.append('text').attr('class', 'chart-title');
        }
    }, []);

    // Update on every series change — runs synchronously, with transitions
    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // Safety: if groups somehow don't exist yet, create them now
        if (svg.select('.lines').empty()) {
            svg.append('g').attr('class', 'x-axis');
            svg.append('g').attr('class', 'y-axis');
            svg.append('g').attr('class', 'y-grid');
            svg.append('g').attr('class', 'lines');
            svg.append('text').attr('class', 'chart-title');
        }

        setChartTitleLines(svg.select('.chart-title'), windowWidth, {
            x: (margin.left + width - margin.right) / 2,
            y: margin.top - 45,
            lines: ['Share of UChicago', 'Majors']
        });

        const allPoints = (series || []).flatMap((s) => s.values);
        const hasData = allPoints.length > 0;

        const xDomain = hasData
            ? d3.extent(allPoints, (d) => d.year)
            : [2005, 2024];
        const yMaxRaw = hasData ? d3.max(allPoints, (d) => d.value) : 10;

        const x = d3
            .scaleLinear()
            .domain(xDomain)
            .range([margin.left, width - margin.right]);

        const niceSteps = [0.1, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25];
        const idealStep = yMaxRaw / 5;
        const yTickStep =
            niceSteps.find((s) => s >= idealStep) ||
            niceSteps[niceSteps.length - 1];
        const domainTop = Math.ceil(yMaxRaw / yTickStep) * yTickStep;
        const yTicks = d3.range(0, domainTop + yTickStep / 2, yTickStep);

        const y = d3
            .scaleLinear()
            .domain([0, domainTop])
            .range([height - margin.bottom, margin.top]);

        const lineInstructions = d3
            .line()
            .x((d) => x(d.year))
            .y((d) => y(d.value));

        svg.select('.x-axis').interrupt();
        svg.select('.y-axis').interrupt();

        const t = svg.transition().duration(900).ease(d3.easeCubicInOut);
        const axisPadding = 5;

        // --- X AXIS ---
        svg.select('.x-axis')
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
        // svg.select('.x-axis')
        //     .attr('transform', `translate(0,${height - margin.bottom + axisPadding})`)
        //     .attr('color', 'gray')
        //     .transition(t)
        //     .call(d3.axisBottom(x).tickFormat(d => d.toString()).tickSizeOuter(0))
        //     .on('end interrupt', function () {
        //         d3.select(this).attr('transform', `translate(0,${height - margin.bottom + axisPadding})`);
        //     })
        //     .call(g => g.selectAll('.tick text')
        //         .attr('font-size', 16)
        //         .attr('font-family', 'Playfair Display, serif')
        //     );

        // --- Y AXIS ---
        svg.select('.y-axis')
            .attr('transform', `translate(${margin.left - axisPadding},0)`)
            .attr('color', 'gray')
            .transition(t)
            .call(
                d3
                    .axisLeft(y)
                    .tickValues(yTicks)
                    .tickFormat((d) => {
                        if (yTickStep >= 1) return `${d}%`;
                        if (yTickStep >= 0.5) return `${d.toFixed(1)}%`;
                        return `${d.toFixed(2)}%`;
                    })
                    .tickSize(0)
            )
            .on('end interrupt', function () {
                d3.select(this).attr(
                    'transform',
                    `translate(${margin.left - axisPadding},0)`
                );
            })
            .call((g) =>
                g
                    .selectAll('.tick text')
                    .attr('font-size', getAxisFontSize(windowWidth))
                    .attr('font-family', 'Playfair Display, serif')
            );

        svg.select('.y-axis').select('.domain').attr('opacity', 0);

        // --- Gridlines ---
        const grid = svg.select('.y-grid').selectAll('line').data(yTicks);

        grid.enter()
            .append('line')
            .attr('x1', margin.left)
            .attr('x2', width - margin.right)
            .attr('stroke', '#e6e6e6')
            .attr('stroke-width', 1)
            .attr('y1', (d) => y(d))
            .attr('y2', (d) => y(d))
            .merge(grid)
            .transition(t)
            .attr('y1', (d) => y(d))
            .attr('y2', (d) => y(d));

        grid.exit().remove();

        // --- Lines (keyed by major) ---
        const lines = svg
            .select('.lines')
            .selectAll('path')
            .data(series || [], (d) => d.major);

        lines
            .enter()
            .append('path')
            .attr('fill', 'none')
            .attr('stroke-width', 2.5)
            .attr('stroke-linecap', 'round')
            .attr('stroke', (d) => COLORS[series.indexOf(d) % COLORS.length])
            .attr('d', (d) => lineInstructions(d.values))
            .attr('opacity', 0)
            .transition(t)
            .attr('opacity', 1);

        lines
            .transition(t)
            .attr('stroke', (d) => COLORS[series.indexOf(d) % COLORS.length])
            .attr('d', (d) => lineInstructions(d.values));

        lines.exit().transition(t).attr('opacity', 0).remove();

        svg.select('.labels').remove();
    }, [series, windowWidth]);

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
// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const COLORS = ['#800', '#1e3a5f', '#2a7f3e', '#c45a00', '#5e35b1', '#00838f', '#d81b60', '#5d4037'];

// export default function MajorChart({ series, width = 700, height = 400, margin = { top: 60, right: 50, bottom: 30, left: 50 } }) {
//     const svgRef = useRef();

//     useEffect(() => {
//         const svg = d3.select(svgRef.current);
//         svg.selectAll('*').remove();

//         const allPoints = (series || []).flatMap(s => s.values);
//         const hasData = allPoints.length > 0;

//         // Default axis ranges when there's no data yet
//         const xDomain = hasData
//             ? d3.extent(allPoints, d => d.year)
//             : [2005, 2024];   // your data's typical year range

//         const yMaxRaw = hasData
//             ? d3.max(allPoints, d => d.value)
//             : 10;             // a sensible default ceiling (10%)

//         // Scales
//         const x = d3.scaleLinear()
//             .domain(xDomain)
//             .range([margin.left, width - margin.right]);

//         const yMax = yMaxRaw;
//         const niceSteps = [0.1, 0.25, 0.5, 1, 2, 2.5, 5, 10, 20, 25];
//         const targetTickCount = 5;
//         const idealStep = yMax / targetTickCount;
//         const yTickStep = niceSteps.find(s => s >= idealStep) || niceSteps[niceSteps.length - 1];
//         const domainTop = Math.ceil(yMax / yTickStep) * yTickStep;
//         const yTicks = d3.range(0, domainTop + yTickStep / 2, yTickStep);

//         const y = d3.scaleLinear()
//             .domain([0, domainTop])
//             .range([height - margin.bottom, margin.top]);

//         const lineInstructions = d3.line()
//             .x(d => x(d.year))
//             .y(d => y(d.value));

//         const axisPadding = 5;

//         // x axis
//         svg.append('g')
//             .attr('transform', `translate(0,${height - margin.bottom + axisPadding})`)
//             .attr('color', 'gray')
//             .call(d3.axisBottom(x).tickFormat(d => d.toString()).tickSizeOuter(0))
//             .call(g => g.selectAll('.tick text')
//                 .attr('font-size', 16)
//                 .attr('font-family', 'Playfair Display, serif')
//             );

//         // y axis
//         svg.append('g')
//             .attr('transform', `translate(${margin.left - axisPadding},0)`)
//             .attr('color', 'gray')
//             .call(d3.axisLeft(y)
//                 .tickValues(yTicks)
//                 .tickFormat(d => {
//                     if (yTickStep >= 1) return `${d}%`;
//                     if (yTickStep >= 0.5) return `${d.toFixed(1)}%`;
//                     return `${d.toFixed(2)}%`;
//                 })
//                 .tickSize(0)
//             )
//             .call(g => g.select('.domain').remove())
//             .call(g => g.selectAll('.tick text')
//                 .attr('font-size', 16)
//                 .attr('font-family', 'Playfair Display, serif')
//             );

//         // Gridlines
//         svg.append('g')
//             .attr('class', 'y-grid')
//             .selectAll('line')
//             .data(yTicks)
//             .join('line')
//             .attr('x1', margin.left)
//             .attr('x2', width - margin.right)
//             .attr('y1', d => y(d))
//             .attr('y2', d => y(d))
//             .attr('stroke', '#e6e6e6')
//             .attr('stroke-width', 1);

//         // Chart title
//         svg.append('text')
//             .attr('x', margin.left)
//             .attr('y', margin.top - 25)
//             .attr('fill', 'black')
//             .attr('font-size', 22)
//             .attr('font-family', 'Georgia, serif')
//             .text('Share of UChicago Majors');

//         // Draw one line per series
//         (series || []).forEach((s, i) => {
//             const color = COLORS[i % COLORS.length];

//             svg.append('path')
//                 .datum(s.values)
//                 .attr('fill', 'none')
//                 .attr('stroke', color)
//                 .attr('stroke-width', 2.5)
//                 .attr('stroke-linecap', 'round')
//                 .attr('d', lineInstructions);

//             // Endpoint label
//             const lastPoint = s.values[s.values.length - 1];

//             // First pass: compute ideal label positions
//             const labelPositions = series.map((s, i) => {
//                 const lastPoint = s.values[s.values.length - 1];
//                 return {
//                     major: s.major,
//                     color: COLORS[i % COLORS.length],
//                     x: x(lastPoint.year),
//                     y: y(lastPoint.value)
//                 };
//             });

//             // Sort top-to-bottom
//             labelPositions.sort((a, b) => a.y - b.y);

//             const minSpacing = 16;
//             const topBound = margin.top;                  // labels can't go above the plot
//             const bottomBound = height - margin.bottom;   // labels can't go below the x-axis

//             // Pass 1: push down to resolve overlaps
//             for (let i = 1; i < labelPositions.length; i++) {
//                 const prev = labelPositions[i - 1];
//                 const curr = labelPositions[i];
//                 if (curr.y - prev.y < minSpacing) {
//                     curr.y = prev.y + minSpacing;
//                 }
//             }

//             // Pass 2: if the bottom label overflowed, shift the whole stack up
//             const lastLabel = labelPositions[labelPositions.length - 1];
//             if (lastLabel.y > bottomBound) {
//                 const overflow = lastLabel.y - bottomBound;
//                 labelPositions.forEach(label => {
//                     label.y -= overflow;
//                 });
//             }

//             // Pass 3: clamp the top in case shifting up pushed past the top bound,
//             // then re-resolve any overlaps that clamping reintroduced
//             labelPositions.forEach(label => {
//                 label.y = Math.max(topBound, label.y);
//             });
//             for (let i = 1; i < labelPositions.length; i++) {
//                 const prev = labelPositions[i - 1];
//                 const curr = labelPositions[i];
//                 if (curr.y - prev.y < minSpacing) {
//                     curr.y = prev.y + minSpacing;
//                 }
//             }

//             // Render
//             labelPositions.forEach(label => {
//                 svg.append('text')
//                     .attr('x', label.x)
//                     .attr('dx', 6)
//                     .attr('y', label.y)
//                     .attr('dy', '0.35em')
//                     .attr('fill', label.color)
//                     .attr('font-size', 14)
//                     .attr('font-family', 'Georgia, serif')
//                     .text(label.major);
//             });
//         });

//     }, [series]);

//     return (
//         <svg
//             ref={svgRef}
//             viewBox={`0 0 ${width} ${height}`}
//             preserveAspectRatio="xMidYMid meet"
//             style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
//         />
//     );
//     // return <svg ref={svgRef} width={width} height={height} style={{ overflow: 'visible' }} />;
// }
