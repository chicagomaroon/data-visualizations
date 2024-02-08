var drawGraph = function () {
    //variables for the font family, and some colors
    const demSquare = '#155F83';
    const repSquare = '#800000';
    const svgBackgroundColor = '#ffffff';

    //width and height of the SVG
    const width = 800;
    const height = 400;

    //create an svg with width and height
    const svg = d3
        .select('#grid-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', svgBackgroundColor);

    //dem_data
    const demNumRows = 12;
    const demNumCols = 20;

    //rep_data
    const repNumRows = 2;
    const repNumCols = 4;

    //x and y axis scales
    const y = d3.scaleBand().range([0, 200]).domain(d3.range(demNumRows));

    const x = d3.scaleBand().range([0, 360]).domain(d3.range(demNumCols));

    //the data is just an array of numbers for each cell in the grid
    const demData = d3.range(demNumRows * demNumCols);

    const repData = d3.range(repNumRows * repNumCols);

    const demTranslate =
        'translate(' + width * 0.43 + ',' + height * 0.22 + ')';

    //container to hold the grid
    const demContainer = svg.append('g').attr('transform', demTranslate);

    demContainer
        .selectAll('square')
        .data(demData)
        .enter()
        .append('rect')
        .attr('class', 'square')
        .attr('id', function (d) {
            return 'id' + d;
        })
        .attr('x', function (d) {
            return x(d % demNumCols);
        })
        .attr('y', function (d) {
            return y(Math.floor(d / demNumCols));
        })
        .attr('height', 13)
        .attr('width', 13)
        .attr('fill', demSquare)
        .style('stroke', demSquare);

    const repTranslate =
        'translate(' + width * 0.19 + ',' + height * 0.643 + ')';

    const repContainer = svg.append('g').attr('transform', repTranslate);

    repContainer
        .selectAll('square')
        .data(repData)
        .enter()
        .append('rect')
        .attr('class', 'square')
        .attr('id', function (d) {
            return 'id' + d;
        })
        .attr('x', function (d) {
            return x(d % repNumCols);
        })
        .attr('y', function (d) {
            return y(Math.floor(d / repNumCols));
        })
        .attr('height', 13)
        .attr('width', 13)
        .attr('fill', repSquare)
        .style('stroke', repSquare);

    svg.append('text')
        .attr('class', 'title')
        .attr('x', 100)
        .attr('y', 40)
        .attr('text-anchor', 'start')
        .attr('font-weight', 700)
        .attr('font-size', 18)
        .text(
            'Between 2015 and 2023, University of Chicago faculty have donated...'
        );

    svg.append('text')
        .attr('class', 'rep-text')
        .attr('x', 190)
        .attr('y', 310)
        .attr('font-weight', 700)
        .attr('text-anchor', 'middle')
        .style('fill', repSquare)
        .text('~$80,000')
        .append('tspan')
        .attr('font-weight', 500)
        .style('fill', 'black')
        .text(' to Republican');

    svg.append('text')
        .attr('class', 'rep-text')
        .attr('x', 190)
        .attr('y', 330)
        .attr('text-anchor', 'middle')
        .text('candidates and PACs');

    svg.append('text')
        .attr('class', 'rep-text')
        .attr('x', 525)
        .attr('y', 310)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 700)
        .style('fill', demSquare)
        .text('~$2,400,000')
        .append('tspan')
        .attr('font-weight', 500)
        .style('fill', 'black')
        .text(' to Democratic');

    svg.append('text')
        .attr('class', 'rep-text')
        .attr('x', 525)
        .attr('y', 330)
        .attr('text-anchor', 'middle')
        .text('candidates and PACs');
};

//call function to draw the graph
drawGraph();
