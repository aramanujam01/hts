const data = {
  "Disease": {
    "Major Threat": 79,
    "Minor Threat": 19,
    "Not a Threat": 2
  },
  "Terrorism": {
    "Major Threat": 73,
    "Minor Threat": 25,
    "Not a Threat": 2
  },
  "Nuclear Weapons": {
    "Major Threat": 73,
    "Minor Threat": 23,
    "Not a Threat": 3
  },
  "Cyberattacks": {
    "Major Threat": 72,
    "Minor Threat": 25,
    "Not a Threat": 3
  },
  "China": {
    "Major Threat": 62,
    "Minor Threat": 29,
    "Not a Threat": 7
  }
};

// Step 1: Define dimensions
const width = 1000;
const height = 600;
const margin = { top: 0, right: 100, bottom: 30, left: 40 };

// Step 2: Create SVG element
var svg = d3.select("#us-threat")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Step 3: Define scales
var xScale = d3.scaleBand()
  .domain(Object.keys(data))
  .range([0, width])
  .padding(0.2);

var yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

// Step 4: Create axes
var xAxis = d3.axisBottom(xScale)
  .tickSize(0)
  .tickPadding(10);

// Step 5: Create color scale
var colorScale = {
  'Major Threat': "red",
  "Minor Threat": "blue",
  "Not a Threat": "green"
}

// Add category labels
svg.selectAll(".category-label")
  .data(Object.keys(data))
  .enter().append("text")
  .attr("class", "category-label")
  .attr("x", function(d) { return xScale(d) + xScale.bandwidth() / 2; })
  .attr("y", height + margin.bottom / 2)
  .style("text-anchor", "middle")
  .text(function(d) { return d; });

// Step 6: Add bars to chart
svg.selectAll("rect")
.data(Object.keys(data))
.enter().append("rect")
.attr("x", function(d) { return xScale(d); })
.attr("y", function(d) { return yScale(data[d]["Major Threat"]); })
.attr("width", xScale.bandwidth())
.attr("height", function(d) { return height - yScale(data[d]["Major Threat"]); })
.attr("fill", colorScale["Major Threat"]);

svg.selectAll("rect")
.data(Object.keys(data))
.enter().append("rect")
.attr("x", function(d) { return xScale(d); })
.attr("y", function(d) { return yScale(data[d]["Minor Threat"]); })
.attr("width", xScale.bandwidth())
.attr("height", function(d) { return height - yScale(data[d]["Minor Threat"]); })
.attr("fill", colorScale["Minor Threat"]);

svg.selectAll("rect")
.data(Object.keys(data))
.enter().append("rect")
.attr("x", function(d) { return xScale(d); })
.attr("y", function(d) { return yScale(data[d]["Not a Threat"]); })
.attr("width", xScale.bandwidth())
.attr("height", function(d) { return height - yScale(data[d]["Not a Threat"]); })
.attr("fill", colorScale["Not a Threat"]);

