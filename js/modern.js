// set the dimensions and marginLines of the graph
var marginLine = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1000 - marginLine.left - marginLine.right,
    height = 500 - marginLine.top - marginLine.bottom;

// append the svg object to the body of the page
var svgLine = d3.select("#my_dataviz2")
  .append("svg")
    .attr("width", width + marginLine.left + marginLine.right)
    .attr("height", height + marginLine.top + marginLine.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginLine.left + "," + marginLine.top + ")");

//Read the data
d3.csv("data/deaths.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svgLine.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svgLine.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svgLine.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#6C2D2B")
      .attr("stroke-width", 3)
      .attr("d", d3.line()
        .x(function(d) { return x(d.date) })
        .y(function(d) { return y(d.value) })
        )

})