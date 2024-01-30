// For API and chart documentation please look here:
// https://d3plus.org/?path=/docs/introduction--documentation
var drawGraph = function () {
    //variables for the font family, and some colors
    var fontFamily = 'helvetica';
    var demSquare = '#155F83';
    var repSquare = '#800000';
    var svgBackgroundColor = '#ffffff';

    //width and height of the SVG
    const width = 900;
    const height = 500;

    //create an svg with width and height
    var svg = d3
        .select('#grid-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('background-color', svgBackgroundColor);

    //dem_data
    var demNumRows = 13;
    var demNumCols = 20;

    //dem_data
    var repNumRows = 2;
    var repNumCols = 4;

    //x and y axis scales
    var y = d3.scaleBand().range([0, 200]).domain(d3.range(demNumRows));

    var x = d3.scaleBand().range([0, 360]).domain(d3.range(demNumCols));

    //the data is just an array of numbers for each cell in the grid
    var demData = d3.range(demNumRows * demNumCols);

    var repData = d3.range(repNumRows * repNumCols);

    const demTranslate = 'translate(' + width * 0.5 + ',' + height * 0.3 + ')';

    //container to hold the grid
    var demContainer = svg.append('g').attr('transform', demTranslate);

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
        'translate(' + width * 0.3 + ',' + height * 0.6413 + ')';

    var repContainer = svg.append('g').attr('transform', repTranslate);

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

    var title = svg
        .append('text')
        .attr('class', 'title')
        .attr('x', 175)
        .attr('y', 100)
        .attr('text-anchor', 'start')
        .attr('font-weight', 700)
        .attr('font-size', 20)
        .text(
            'Between 2015 and 2023, University of Chicago professors have donated...'
        );

    var title = svg
        .append('text')
        .attr('class', 'rep-text')
        .attr('x', 305)
        .attr('y', 380)
        .attr('font-weight', 700)
        .attr('text-anchor', 'middle')
        .style('fill', repSquare)
        .text('$80,000')
        .append('tspan')
        .attr('font-weight', 500)
        .style('fill', 'black')
        .text(' to Republican');

    var title = svg
        .append('text')
        .attr('class', 'rep-text')
        .attr('x', 305)
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text('candidates and PACs');

    var title = svg
        .append('text')
        .attr('class', 'rep-text')
        .attr('x', 630)
        .attr('y', 380)
        .attr('text-anchor', 'middle')
        .attr('font-weight', 700)
        .style('fill', demSquare)
        .text('$2,600,000')
        .append('tspan')
        .attr('font-weight', 500)
        .style('fill', 'black')
        .text(' to Democratic');

    var title = svg
        .append('text')
        .attr('class', 'rep-text')
        .attr('x', 630)
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text('candidates and PACs');
};

//call function to draw the graph
drawGraph();
