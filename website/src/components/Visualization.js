import React, { useEffect } from 'react';
import * as d3 from 'd3';

const Visualization = () => {
  useEffect(() => {
    const data = [
      { country: 'USA', schools: 100 },
      { country: 'Canada', schools: 80 },
      { country: 'UK', schools: 75 },
      { country: 'Australia', schools: 65 },
      { country: 'Germany', schools: 85 }
    ];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.country))
      .range([0, width])
      .padding(0.1);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.schools)])
      .nice()
      .range([height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.country))
      .attr("y", d => y(d.schools))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.schools))
      .attr("fill", "steelblue");

  }, []);

  return (
    <section style={{ padding: '20px', textAlign: 'center' }}>
      <div id="chart"></div>
    </section>
  );
};

export default Visualization;
