import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const PisaStackedBarChart = ({ data, title, subtitle, source }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 400;
    const margin = { top: 40, right: 20, bottom: 70, left: 40 };

    // Create SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f4f4f4")
      .style("overflow", "visible");

    // Create a tooltip div element
    const tooltip = d3
      .select(tooltipRef.current)
      .style("position", "absolute")
      .style("opacity", 0)
      .style("background", "#fff")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none");

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.level))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.level))
      .range(d3.schemeCategory10);

    // Create bars
    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.level))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(d.value))
      .attr("fill", (d) => colorScale(d.level))
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(`Level: ${d.level}<br>Value: ${d.value}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Add title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("class", "title")
      .text(title)
      .style("font-size", "16px")
      .style("font-weight", "bold");

    // Add subtitle
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2 + 20)
      .attr("text-anchor", "middle")
      .attr("class", "subtitle")
      .text(subtitle)
      .style("font-size", "12px")
      .style("fill", "gray");

  }, [data, title, subtitle]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
};

export default PisaStackedBarChart;
