// age demographics
var d3 = require('d3');

var margin = { top: 35, right: 10, bottom: 30, left: 100 },
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#age-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
        .range([0, width]);

var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

d3.csv("client/data_q.csv", function(data) {
  // if (error) throw error;

  // regrouping for age
  var ageCnt = d3.nest()
      .key(function(d) { return d.Q8; })
      .rollup(function(v) { return v.length; })
      .sortKeys(d3.ascending)
      .entries(data)
      .map(function(d) {
        return {
          age: d.key,
          count: +d.value
        }
      });
  console.log(ageCnt);

  // horizontal bar graph for ageCnt
  x.domain([0, d3.max(ageCnt, function(d) { return d.count; })]);
  y.domain(ageCnt.map(function(d) { return d.age; }));

  svg.selectAll(".bar")
      .data(ageCnt)
      .enter().append("rect")
      .attr("class", "bar")
      // .attr("x", function(d) { return x(d.age); })
      .attr("width", function(d) { return x(d.count)})
      .attr("y", function(d) { return y(d.age); })
      .attr("height", y.bandwidth());

  // set x axis
  svg.append("g")
      // .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // set y axis
  svg.append("g")
      // .attr("class", "y axis")
      .call(d3.axisLeft(y))
});
