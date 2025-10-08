import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Visualization = () => {
  const svgRef = useRef();
  const [smaller, setSmaller] = React.useState(false);  

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const margin = { top: 100, right: 200, bottom: 100, left: 200 };
    const width = 1500;
    const height = 1000;  // Made twice as tall
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    d3.csv("/data/data.csv").then(data => {
      data.forEach(d => {
        console.log("TESTING")
        d.Grant_Amount = parseFloat(d["Grant Amount"].replace(/[$,]/g, ''));
        d.Actual_Amount = parseFloat(d["actual"].replace(/[$,]/g, ''));
      });

      // Get unique categories to create parent nodes
      const categories = [...new Set(data.map(d => d.Category))];
      
      // Create an array with root, category nodes, and data nodes
      const hierarchyData = [
        // Add root node
        {
          Title: "All Grants",
          Category: null  // Root has no parent
        },
        // Add category nodes (their parent is the root)
        ...categories.map(category => ({
          Title: category,
          Category: "All Grants",  // Categories are children of root
          Grant_Amount: 0  // Will be summed up from children
        })),
        // Add the original data (with categories as parents)
        ...data
      ];

      // Create the hierarchy using stratify
      const root = d3.stratify()
        .id(d => d.Title)
        .parentId(d => d.Category)
        (hierarchyData);

      // Calculate values
      root.sum(d => d.Grant_Amount);

      // Create and apply treemap layout
      d3.treemap()
        .tile(d3.treemapSquarify.ratio(1)) // Lower ratio for taller rectangles
        .size([width, height])
        .padding(1)
        .paddingTop(50)
        .round(true)
        (root);

      // For debugging
      console.log(root.leaves());

        

      // Create color scale for different categories
      const colorScale = d3.scaleOrdinal()
        .domain(categories)
        .range(d3.schemeSet3);

      // Draw outer rectangles for each leaf (grant amounts)
      g.selectAll("rect.outer")
        .data(root.leaves())
        .join("rect")
        .attr("class", "outer")
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .style("stroke", "none")
        .style("fill", d => colorScale(d.data.Category))
        .style("opacity", d => smaller ? 0.3 : 1);

      // Draw inner rectangles for actual values (only when smaller is true)
      g.selectAll("rect.inner")
        .data(root.leaves())
        .join("rect")
        .attr("class", "inner")
        .attr('x', d => {
          const outerWidth = d.x1 - d.x0;
          const innerWidth = (d.data.Actual_Amount / d.data.Grant_Amount) * outerWidth;
          // return d.x0 + (outerWidth - innerWidth) / 2; // Center horizontally
          return d.x0
        })
        .attr('y', d => {
          const outerHeight = d.y1 - d.y0;
          const innerHeight = (d.data.Actual_Amount / d.data.Grant_Amount) * outerHeight;
          // return d.y0 + (outerHeight - innerHeight) / 2; // Center vertically
          return d.y0;
        })
        .attr('width', d => {
          const outerWidth = d.x1 - d.x0;
          return (d.data.Actual_Amount / d.data.Grant_Amount) * outerWidth;
        })
        .attr('height', d => {
          const outerHeight = d.y1 - d.y0;
          return (d.data.Actual_Amount / d.data.Grant_Amount) * outerHeight;
        })
        .style("stroke", "none")
        .style("fill", d => colorScale(d.data.Category))
        .style("opacity", d => smaller ? 1 : 0);

      // Add titles
      g.selectAll("text.title")
        .data(root.leaves())
        .join("text")
        .attr("class", "title")
        .attr("x", d => d.x0+5)
        .attr("y", d => d.y0+15)
        .text(d => {
          const width = d.x1 - d.x0;
          const height = d.y1 - d.y0;
          let title = d.data.Title;
          title = title.slice(0, width/10).toLowerCase();
          title = title[0].toUpperCase() + title.slice(1, width/10);
          return (width > 100 && height > 20) ? title + "..." : "";
        })
        .attr("font-size", "12px")
        .attr("fill", "black")
        .style("font-family", "Arial");

      // Add grant amount values
      g.selectAll("text.grant-value")
        .data(root.leaves())
        .join("text")
        .attr("class", "grant-value")
        .attr("x", d => d.x0+5)
        .attr("y", d => d.y0+30)
        .text(d => {
          const width = d.x1 - d.x0;
          const height = d.y1 - d.y0;
          if (width < 100 || height < 20) return "";
          return (d.data.Grant_Amount / 1000000).toFixed(2) + "M";
        })
        .attr("font-size", "11px")
        .attr("fill", d => smaller ? "#666" : "gray")
        .style("opacity", 1);

      // Add actual values (only visible when smaller is true)
      g.selectAll("text.actual-value")
        .data(root.leaves())
        .join("text")
        .attr("class", "actual-value")
        .attr("x", d => {
          return d.x0+5;
        })
        .attr("y", d => {
          return d.y0+45;
          // return d.y0 + (outerHeight + innerHeight) / 2 - 5; // Bottom of inner box
        })
        .text(d => {
          const width = d.x1 - d.x0;
          const height = d.y1 - d.y0;
          if (width < 100 || height < 20 || !smaller) return "";
          return "Delivered: " + (d.data.Actual_Amount / 1000000).toFixed(2) + "M";
        })
        .attr("font-size", "11px")
        .attr("fill", "magenta")
        .style("opacity", smaller ? 1 : 0);

                       // Add title for each category (top level)
         g
         .selectAll("titles")
         .data(root.children)  // Get only the top-level categories
         .enter()
         .append("text")
           .attr("x", function(d){ return d.x0+5})
           .attr("y", function(d){ return d.y0+20})  // Position at top of each category section
           .text(function(d){ 
             if (d.value > 600000) {
               // Convert to title case
               return d.data.Title.split(' ')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                 .join(' ');
             }
             return "";
           })
           .attr("font-size", "14px")
           .attr("font-weight", "bold");

         // Add total values beneath category titles
         g.selectAll("category-totals")
           .data(root.children)
           .enter()
           .append("text")
           .attr("x", function(d){ return d.x0+5})
           .attr("y", function(d){ return d.y0+40})  // 20px below the title
           .text(function(d){ 
             if (d.value > 600000) {
              if (!smaller) return "$" + (d.value / 1000000).toFixed(1) + "M";
              return "$" + (d.value / 1000000).toFixed(1) + "M";
             }
             return "";
           })
           .attr("font-size", "14px")
           .attr("fill", "gray")

        // Add title for the 3 groups
        // g
        // .append("text")
        //   .attr("x", 0)
        //   .attr("y", 14)    // +20 to adjust position (lower)
        //   .text("Three group leaders and 14 employees")
        //   .attr("font-size", "19px")
        //   .attr("fill",  "grey" )


    }).catch(error => {
      console.error("Error loading the CSV file:", error);
    });

    return () => {
      d3.select("body").selectAll("div.tooltip").remove();
    };
  }, [smaller]); // Re-run effect when smaller state changes

      return (
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '1000px', cursor: 'pointer' }}
        onClick={() => setSmaller(!smaller)}
      />
  );
};

export default D3Visualization;  