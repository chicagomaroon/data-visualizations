import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Visualization = () => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 100, right: 200, bottom: 100, left: 200 };
        const width =
            svg.node().getBoundingClientRect().width -
            margin.left -
            margin.right;

        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        d3.csv('/data/data.csv')
            .then((data) => {
                // Parse dollar amounts
                data.forEach((d) => {
                    d.Grant_Amount = parseFloat(
                        d['Grant Amount'].replace(/[$,]/g, '')
                    );
                });

                // Calculate grid layout
                const spacing = 100; // Fixed spacing between circle centers
                const columns = Math.floor(width / spacing);

                // Direct scaling - radius will be proportional to amount
                const radiusScale = (d) => Math.sqrt(d.Grant_Amount) / 100;

                // Create tooltip div
                const tooltip = d3
                    .select('body')
                    .append('div')
                    .style('position', 'absolute')
                    .style('background', 'white')
                    .style('padding', '10px')
                    .style('border', '1px solid #ccc')
                    .style('border-radius', '5px')
                    .style('pointer-events', 'none')
                    .style('opacity', 0);

                g.selectAll('circle')
                    .data(data)
                    .join('circle')
                    .attr('cx', (d, i) => {
                        const col = i % columns;
                        return (width / columns) * (col + 0.5);
                    })
                    .attr('cy', (d, i) => {
                        const row = Math.floor(i / columns);
                        return spacing + row * spacing;
                    })
                    .attr('r', radiusScale)
                    .attr('fill', '#5f0f40')
                    .on('mouseover', (event, d) => {
                        tooltip
                            .transition()
                            .duration(200)
                            .style('opacity', 0.9);
                        tooltip
                            .html(
                                d.Title?.substring(0, 100) +
                                    (d.Title?.length > 100 ? '...' : '') +
                                    '<br/>Amount: $' +
                                    d.Grant_Amount.toLocaleString()
                            )
                            .style('left', event.pageX + 10 + 'px')
                            .style('top', event.pageY - 10 + 'px');
                    })
                    .on('mouseout', () => {
                        tooltip.transition().duration(500).style('opacity', 0);
                    });
            })
            .catch((error) => {
                console.error('Error loading the CSV file:', error);
            });

        return () => {
            d3.select('body').selectAll('div.tooltip').remove();
        };
    }, []);

    return <svg ref={svgRef} style={{ width: '100%', height: '500px' }} />;
};

export default D3Visualization;
