import React, { useRef, useEffect, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import * as d3 from 'd3';

const ivyAbbreviations = {
    'Massachusetts Institute of Technology': 'MIT',
    'University of Pennsylvania': 'Penn',
    'Princeton University': 'Princeton',
    'Stanford University': 'Stanford',
    'Harvard University': 'Harvard',
    'Yale University': 'Yale',
    'Columbia University in the City of New York': 'Columbia',
    'Cornell University': 'Cornell',
    'Brown University': 'Brown',
    'Dartmouth College': 'Dartmouth',
    'Duke University': 'Duke'
};

// Helper to get the display name (fall back to original if no abbreviation)
const abbreviate = (name) => ivyAbbreviations[name] ?? name;

const ANNOTATION_CONNECTOR_PATH =
    'M0.449707 31.495C10.7346 10.3316 19.8843 3.64401 41.9497 0.494995';

// Manual label offsets from each line's endpoint (dx →, dy ↑ negative)
const IVY_LABEL_OFFSETS = {
    'Dartmouth College': { dx: 0, dy: -3 },
    'Harvard University': { dx: 0, dy: -9 },
    'Columbia University in the City of New York': { dx: 0, dy: -5 },
    'Yale University': { dx: 55, dy: 0 },
    'Brown University': { dx: 0, dy: -2 },
    'University of Pennsylvania': { dx: 55, dy: -4 },
    'Cornell University': { dx: 0, dy: 0 },
    'Princeton University': { dx: 55, dy: -6 },
    'Duke University': { dx: 0, dy: 0 },
    'Stanford University': { dx: 0, dy: -8 },
    'Massachusetts Institute of Technology': { dx: 0, dy: 0 }
};

// Title font size in viewBox units — bigger on narrower screens so it stays legible
// when the SVG renders smaller via `width: 90%`.
const getTitleFontSize = (w) => {
    if (w < 400) return 30;
    if (w < 768) return 29;
    if (w < 1024) return 26;
    return 22;
};

const getTitleY = (w, marginTop = 20) =>
    w < 400 ? marginTop - 28 : marginTop - 15;

const isMobile = (w) => w < 400;

const getAxisFontSize = (w) => (isMobile(w) ? 20 : 18);
const getAnnotationFontSize = (w) => (isMobile(w) ? 22 : 20);
const getSeriesLabelFontSize = (w) => (isMobile(w) ? 20 : 17);

const formatXAxisYear = (w, year) =>
    isMobile(w) ? `'${String(year).slice(-2)}` : String(year);

const TITLE_VARIANTS = {
    share: {
        lines: (w) =>
            w < 400
                ? ['Share of Students', 'Majoring in Economics']
                : ['Share of Students Majoring in Economics']
    },
    percentage: {
        lines: (w) =>
            w < 400
                ? ['Percentage of Students', 'Majoring in Economics']
                : ['Percentage of Students Majoring in Economics']
    },
    uchicago: {
        lines: (w) =>
            w < 400
                ? ['Student Majors', 'at UChicago']
                : ['Student Majors at UChicago']
    }
};

const setTitleLines = (
    titleSelection,
    variant,
    windowWidth,
    marginTop = 20
) => {
    if (!titleSelection) return;
    const lines = TITLE_VARIANTS[variant].lines(windowWidth);
    const x = titleSelection.attr('x');
    titleSelection
        .attr('y', getTitleY(windowWidth, marginTop))
        .attr('font-size', getTitleFontSize(windowWidth))
        .text(null)
        .selectAll('tspan')
        .remove();

    lines.forEach((line, i) => {
        titleSelection
            .append('tspan')
            .attr('x', x)
            .attr('dy', i === 0 ? 0 : '1.1em')
            .text(line);
    });
};

export default function LineChart({
    data,
    xKey,
    yKey,
    progress,
    width = 600,
    height = 400,
    margin = { top: 20, right: 70, bottom: 30, left: 40 }
}) {
    const svgRef = useRef();
    const pathRefs = useRef({
        uchicago: null,
        uchicagoInner: null,
        ivy: [],
        hum: null
    });
    const lengthRefs = useRef({ uchicago: 0, ivy: [], hum: 0 });
    const textRefs = useRef({ uchicago: null, ivy: [] });
    const labelVisibilityRef = useRef({ uchicago: false, ivy: false });
    const annotationShadeRef = useRef();
    const annotationConnectorRef = useRef();
    const annotationLabelRef = useRef();
    const titleRef = useRef();
    const titleVariantRef = useRef('share');
    const trendLineRef = useRef();
    const applyProgressStateRef = useRef(() => {});

    const [windowWidthReal, setWindowWidthReal] = useState(window.innerWidth);
    const [windowHeightReal, setWindowHeightReal] = useState(
        window.innerHeight
    );

    useEffect(() => {
        function handleResize() {
            setWindowWidthReal(window.innerWidth);
            setWindowHeightReal(window.innerHeight);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    applyProgressStateRef.current = () => {
        if (!progress || !pathRefs.current.uchicago) return;

        const uchicago = progress.uchicago.get();
        const ivy = progress.ivy.get();
        const ivyFade = progress.ivyFade.get();
        const annotation = progress.annotation.get();
        const annotationFade = progress.annotationFade.get();
        const hum = progress.hum.get();

        if (lengthRefs.current.uchicago) {
            const offset = lengthRefs.current.uchicago * (1 - uchicago);
            pathRefs.current.uchicago.attr('stroke-dashoffset', offset);
            pathRefs.current.uchicagoInner.attr('stroke-dashoffset', offset);
        }

        let uchicagoLabelOpacity = 0;
        if (annotationFade > 0) {
            uchicagoLabelOpacity = 1 - annotationFade;
        } else if (uchicago >= 0.95) {
            uchicagoLabelOpacity = 1;
        }
        textRefs.current.uchicago?.attr('opacity', uchicagoLabelOpacity);
        labelVisibilityRef.current.uchicago = uchicago >= 0.95;

        const ivyCount = pathRefs.current.ivy.length;
        pathRefs.current.ivy.forEach((path, index) => {
            if (!path) return;
            const threshold = ivyCount > 0 ? (index + 1) / ivyCount : 0;
            const visible = ivy >= threshold ? 0.3 : 0;
            path.attr('opacity', visible * (1 - ivyFade));
        });
        textRefs.current.ivy.forEach(({ text, threshold }) => {
            if (!text) return;
            const visible = ivy >= threshold ? 0.6 : 0;
            text.attr('opacity', visible * (1 - ivyFade));
        });

        const annotationOpacity = annotation * (1 - annotationFade);
        annotationShadeRef.current?.attr('opacity', annotation * 0.2);
        annotationConnectorRef.current?.attr('opacity', annotation);
        annotationLabelRef.current?.attr('opacity', annotation);
        trendLineRef.current?.attr('opacity', annotationOpacity);

        if (lengthRefs.current.hum && pathRefs.current.hum) {
            pathRefs.current.hum.attr(
                'stroke-dashoffset',
                lengthRefs.current.hum * (1 - hum)
            );
        }
        textRefs.current.hum?.attr('opacity', hum);
        textRefs.current.econ?.attr('opacity', hum);

        if (titleRef.current) {
            titleVariantRef.current =
                hum > 0.05 ? 'uchicago' : hum > 0 ? 'percentage' : 'share';
            setTitleLines(
                titleRef.current,
                titleVariantRef.current,
                windowWidthReal,
                margin.top
            );
        }
    };

    useEffect(() => {
        if (!data) return;
        const { uchicagoByYear, ivyPlusByYear, humByYear } = data;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const ivySeries = ivyPlusByYear ?? [];
        const ivyPoints = ivySeries.flatMap((d) => d.values);

        console.log('[LineChart] UChicago series:', uchicagoByYear);
        const uchicago2024 = uchicagoByYear.find((d) => d.year === 2024);
        console.log(
            '[LineChart] UChicago 2024 total:',
            uchicago2024?.total ?? null
        );

        const allPoints = [...uchicagoByYear, ...ivyPoints];

        // Scales
        const x = d3
            .scaleLinear()
            .domain(d3.extent(allPoints, (d) => d[xKey]))
            .range([margin.left, width - margin.right]);

        const y = d3
            .scaleLinear()
            .domain(d3.extent(allPoints, (d) => d[yKey]))
            .nice()
            .range([height - margin.bottom, margin.top]);

        const lineInstructions = d3
            .line()
            .x((d) => x(d[xKey]))
            .y((d) => y(d[yKey]));

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
                    .tickFormat((d) => formatXAxisYear(windowWidthReal, d))
                    .tickSizeOuter(0)
            )
            .call((g) =>
                g
                    .selectAll('.tick text')
                    .attr('font-size', getAxisFontSize(windowWidthReal))
                    .attr('font-family', 'Playfair Display, serif')
            );

        // y axis
        svg.append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margin.left - axisPadding},0)`)
            .attr('color', 'gray')
            .call(
                d3
                    .axisLeft(y)
                    .tickValues([40, 30, 20, 10, 0])
                    .tickFormat((d) => `${d}%`)
                    .tickSize(0)
            )
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g
                    .selectAll('.tick text')
                    .attr('font-size', getAxisFontSize(windowWidthReal))
                    .attr('font-family', 'Playfair Display, serif')
            );

        // Horizontal gridlines
        const yTicks = d3.range(0, 41, 10).reverse();
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

        // Read initial progress values (full sync applied after build)
        const uchicagoInitial = progress ? progress.uchicago.get() : 0;
        const ivyInitial = progress ? progress.ivy.get() : 0;
        const humInitial = progress ? progress.hum.get() : 0;
        const annotationInitial = progress ? progress.annotation.get() : 0;

        // Chart title — font size scales up on narrow screens (see resize effect below)
        titleVariantRef.current =
            humInitial > 0.05
                ? 'uchicago'
                : humInitial > 0
                ? 'percentage'
                : 'share';
        titleRef.current = svg
            .append('text')
            .attr('x', margin.left)
            .attr('text-anchor', 'start')
            .attr('fill', 'black')
            .attr('font-family', 'Georgia, serif');
        setTitleLines(
            titleRef.current,
            titleVariantRef.current,
            windowWidthReal,
            margin.top
        );

        // Gray shaded region from 2018 to right edge of chart (initially hidden)
        const annotationYear = 2018;
        const shadeLeft = x(annotationYear);
        const shadeRight = width - margin.right;

        annotationShadeRef.current = svg
            .append('rect')
            .attr('x', shadeLeft)
            .attr('y', margin.top)
            .attr('width', shadeRight - shadeLeft)
            .attr('height', height - margin.bottom - margin.top)
            .attr('fill', '#808080')
            .attr('opacity', annotationInitial * 0.2);

        const annotationX = x(2010);
        const annotationY = margin.top + 80;
        const lineX = x(annotationYear);
        const connectorOriginX = annotationX + 150;
        const connectorOriginY = annotationY - 20;
        const connectorScale = (lineX - connectorOriginX) / 41.5;

        annotationConnectorRef.current = svg
            .append('path')
            .attr('d', ANNOTATION_CONNECTOR_PATH)
            .attr(
                'transform',
                `translate(${connectorOriginX - 0.449707}, ${
                    connectorOriginY - 31.495
                }) scale(${connectorScale})`
            )
            .attr('fill', 'none')
            .attr('stroke', '#666666')
            .attr('stroke-width', 1)
            .attr('opacity', annotationInitial);

        annotationLabelRef.current = svg
            .append('text')
            .attr('x', annotationX)
            .attr('y', annotationY)
            .attr('text-anchor', 'start')
            .attr('fill', '#666')
            .attr('font-size', getAnnotationFontSize(windowWidthReal))
            .attr('font-family', 'Georgia, serif')
            .attr('opacity', annotationInitial)
            .call((text) => {
                text.append('tspan')
                    .attr('x', annotationX)
                    .attr('dy', 0)
                    .text('Business economics');
                text.append('tspan')
                    .attr('x', annotationX)
                    .attr('dy', '1.1em')
                    .text('introduced');
            });

        // const TREND_SLOPE = 0.4808;        // change in % per year (e.g., 0.5 means +0.5% per year)
        // const TREND_INTERCEPT = -944.4735;    // y-value at x = TREND_START_YEAR
        // const TREND_START_YEAR = 2005;
        // const TREND_END_YEAR = 2025;
        // const trendY1 = TREND_INTERCEPT + TREND_SLOPE * TREND_START_YEAR;

        // const trendY2 = TREND_INTERCEPT + TREND_SLOPE * TREND_END_YEAR;

        // trendLineRef.current = svg.append('line')
        //     .attr('x1', x(TREND_START_YEAR))
        //     .attr('y1', y(trendY1))
        //     .attr('x2', x(TREND_END_YEAR))
        //     .attr('y2', y(trendY2))
        //     .attr('stroke', '#66666648')
        //     .attr('stroke-width', 1.5)
        //     .attr('stroke-dasharray', 'null')
        //     .attr('opacity', annotationInitial);

        // Ivy Plus lines
        const ivyPaths = svg
            .append('g')
            .selectAll('.ivy-plus-line')
            .data(ivySeries)
            .join('path')
            .attr('fill', 'none')
            .attr('class', 'ivy-plus-line')
            .attr('stroke', '#1e1e1e')
            .attr('stroke-linecap', 'butt')
            .attr('stroke-width', 1.2)
            .attr('opacity', 0)
            .attr('d', (d) => lineInstructions(d.values));

        pathRefs.current.ivy = ivyPaths.nodes().map((node) => d3.select(node));

        // UChicago line + thicker inner highlight
        pathRefs.current.uchicago = svg
            .append('path')
            .datum(uchicagoByYear)
            .attr('fill', 'none')
            .attr('class', 'line-path')
            .attr('stroke', '#800000')
            .attr('stroke-width', 2)
            .attr('d', lineInstructions);

        pathRefs.current.uchicagoInner = svg
            .append('path')
            .datum(uchicagoByYear)
            .attr('fill', 'none')
            .attr('class', 'line-path-inner')
            .attr('stroke', '#800000')
            .attr('stroke-width', 3)
            .attr('d', lineInstructions);

        // Humanities line — forest green, initially hidden
        pathRefs.current.hum = svg
            .append('path')
            .datum(humByYear)
            .attr('fill', 'none')
            .attr('class', 'line-path-hum')
            .attr('stroke', '#2d5a3f')
            .attr('stroke-width', 3)
            .attr('d', lineInstructions);

        lengthRefs.current.hum = pathRefs.current.hum.node().getTotalLength();

        pathRefs.current.hum
            .attr('stroke-dasharray', lengthRefs.current.hum)
            .attr(
                'stroke-dashoffset',
                lengthRefs.current.hum * (1 - humInitial)
            );

        // Measure path lengths for the draw-on animation
        lengthRefs.current.uchicago = pathRefs.current.uchicago
            .node()
            .getTotalLength();
        lengthRefs.current.ivy = pathRefs.current.ivy.map((path) =>
            path.node().getTotalLength()
        );

        pathRefs.current.uchicago
            .attr('stroke-dasharray', lengthRefs.current.uchicago)
            .attr(
                'stroke-dashoffset',
                lengthRefs.current.uchicago * (1 - uchicagoInitial)
            );

        pathRefs.current.uchicagoInner
            .attr('stroke-dasharray', lengthRefs.current.uchicago)
            .attr(
                'stroke-dashoffset',
                lengthRefs.current.uchicago * (1 - uchicagoInitial)
            );

        const ivyCount = pathRefs.current.ivy.length;
        pathRefs.current.ivy.forEach((path, index) => {
            const threshold = ivyCount > 0 ? (index + 1) / ivyCount : 0;
            path.attr('opacity', ivyInitial >= threshold ? 0.3 : 0);
        });

        // Compute each ivy series' final endpoint
        const ivyEndpoints = ivySeries.map((d, lineIndex) => {
            const lastPoint = d.values[d.values.length - 1];
            return {
                instnm: d.instnm,
                lineIndex,
                x: x(lastPoint[xKey]) + 5,
                y: y(lastPoint[yKey])
            };
        });

        // School name labels — manual offsets in IVY_LABEL_OFFSETS
        const ivyTexts = ivyEndpoints.map((endpoint) => {
            const threshold =
                ivyCount > 0 ? (endpoint.lineIndex + 1) / ivyCount : 0;
            const { dx, dy } = IVY_LABEL_OFFSETS[endpoint.instnm] ?? {
                dx: 0,
                dy: 0
            };
            const text = svg
                .append('text')
                .attr('x', endpoint.x + dx)
                .attr('y', endpoint.y + dy)
                .attr('dy', '0.35em')
                .attr('text-anchor', 'start')
                .attr('fill', '#1e1e1e')
                .attr('font-size', 12)
                .attr('opacity', ivyInitial >= threshold ? 0.6 : 0)
                .attr('font-family', 'Georgia, serif')
                .text(abbreviate(endpoint.instnm));
            return { text, threshold };
        });

        const uchicagoText = svg
            .append('text')
            .attr('x', width - margin.right - 100)
            .attr('y', 55)
            .attr('text-anchor', 'start')
            .attr('fill', '#800000')
            .attr('font-size', getSeriesLabelFontSize(windowWidthReal))
            .attr('opacity', 0)
            .attr('font-family', 'Georgia, serif')
            .text('UChicago');

        const humLabel = svg
            .append('text')
            .attr('x', x(2016))
            .attr('y', y(19))
            .attr('dy', '0.35em')
            .attr('text-anchor', 'start')
            .attr('fill', '#2d5a3f')
            .attr('font-size', getSeriesLabelFontSize(windowWidthReal))
            .attr('opacity', humInitial > 0.95 ? 1 : 0)
            .attr('font-family', 'Georgia, serif')
            .text('Humanities and arts');

        const econLabel = svg
            .append('text')
            .attr('x', x(2018.25))
            .attr('y', y(38.5))
            .attr('dy', '0.35em')
            .attr('text-anchor', 'start')
            .attr('fill', '#800000')
            .attr('font-size', getSeriesLabelFontSize(windowWidthReal))
            .attr('opacity', humInitial)
            .attr('font-family', 'Georgia, serif')
            .text('Economics');

        textRefs.current = {
            uchicago: uchicagoText,
            ivy: ivyTexts,
            hum: humLabel,
            econ: econLabel
        };
        labelVisibilityRef.current = {
            uchicago: uchicagoInitial >= 0.95
        };

        applyProgressStateRef.current();
    }, [data]);

    // Re-sync after scroll restore / layout once progress values are measured
    useEffect(() => {
        if (!data) return;
        applyProgressStateRef.current();
        const raf = requestAnimationFrame(() => {
            applyProgressStateRef.current();
            requestAnimationFrame(() => applyProgressStateRef.current());
        });
        return () => cancelAnimationFrame(raf);
    }, [data]);

    // Re-tune label sizes and title on window resize without rebuilding the chart
    useEffect(() => {
        if (!data) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll('.x-axis .tick').each(function () {
            const year = d3.select(this).datum();
            d3.select(this)
                .select('text')
                .text(formatXAxisYear(windowWidthReal, year));
        });
        svg.selectAll('.tick text').attr(
            'font-size',
            getAxisFontSize(windowWidthReal)
        );
        annotationLabelRef.current?.attr(
            'font-size',
            getAnnotationFontSize(windowWidthReal)
        );
        textRefs.current.uchicago?.attr(
            'font-size',
            getSeriesLabelFontSize(windowWidthReal)
        );
        textRefs.current.hum?.attr(
            'font-size',
            getSeriesLabelFontSize(windowWidthReal)
        );
        textRefs.current.econ?.attr(
            'font-size',
            getSeriesLabelFontSize(windowWidthReal)
        );
        setTitleLines(
            titleRef.current,
            titleVariantRef.current,
            windowWidthReal,
            margin.top
        );
    }, [windowWidthReal, data]);

    useMotionValueEvent(progress.uchicago, 'change', () =>
        applyProgressStateRef.current()
    );
    useMotionValueEvent(progress.ivy, 'change', () =>
        applyProgressStateRef.current()
    );
    useMotionValueEvent(progress.ivyFade, 'change', () =>
        applyProgressStateRef.current()
    );
    useMotionValueEvent(progress.annotation, 'change', () =>
        applyProgressStateRef.current()
    );
    useMotionValueEvent(progress.annotationFade, 'change', () =>
        applyProgressStateRef.current()
    );
    useMotionValueEvent(progress.hum, 'change', () =>
        applyProgressStateRef.current()
    );

    return (
        <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
                width: '90%',
                height: 'auto',
                maxWidth: width,
                overflow: 'visible'
            }}
        />
    );
}
