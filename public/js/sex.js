var d3 = require('d3');

// variables for sexCnt
var roseWidth = width - margin.left - margin.right,
    roseHeight = height - margin.top - margin.bottom;

var sexsvg = d3.select("#sex-chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var innerRadius = 20,
    outerRadius = (Math.min(roseWidth, roseHeight) / 2);

var angle = d3.scaleLinear()
        .range([0, 2 * Math.PI]);

var radius = d3.scaleLinear()
        .range([innerRadius, outerRadius]);

var x = d3.scaleBand()
        .range([0, 2 * Math.PI])
        .align(0);

var y = d3.scaleLinear()
        .range([innerRadius, outerRadius]);

var z = d3.scaleOrdinal(d3.schemeCategory10);

// parsing data from CSV file
d3.csv("data_q.csv", function(data) {
  // regrouping sex assigned at birth
  var sexCnt = d3.nest()
      .key(function(d) { return d.Q9; })
      .rollup(function(v) { return v.length; })
      .entries(data)
      .map(function(d) {
        return {
          sex: d.key,
          count: +d.value
        }
      });
  console.log(sexCnt);

  /**
    * rose chart for sex assigned at birth
    */
    x.domain(sexCnt.map(function(d) { return d.sex; }));
    y.domain([0, d3.max(sexCnt, function(d) { return d.count; })]);
    z.domain(sexCnt.slice(1));

    angle.domain([0, d3.max(sexCnt, function(d, i) {
      return i+1;
    })]);

    radius.domain([0, d3.max(sexCnt, function(d) {
      return d.y0 + d.y;
    })]);

    angleOffset = -360.0/data.length/2.0;

    sexsvg.append("g")
        .selectAll("g")
        .data(d3.stack().keys(sexCnt.slice(1)(sexCnt)))
      .enter().append("g")
        .attr("fill", function(d) { return z(d.count); })
        .selectAll("path")
        .data(function(d) { return d; })
      .enter().append("path")
        .attr("d", d3.arc()
            .innerRadius(function(d) { return y(d[0]); })
            .outerRadius(function(d) { return y(d[1]); })
            .startAngle(function(d) { return x(d.sex); })
            .endAngle(function(d) { return x(d.sex) + x.bandwidth(); })
            .padAngle(0.01)
            .padRadius(innerRadius))
        .attr("transform", function() { return "rotate(" + angleOffset + ")"});

    var label = sexsvg.append("g")
          .selectAll("g")
          .data(sexCnt)
          .enter().append("g")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) { return "rotate(" + ((x(d.sex) + x.bandwidth()/2) * 180/Math.PI - (90-angleOffset)) + ")translate(" + (outerRadius+30) + ",0)"; });

    label.append("text")
        .attr("transform", function(d) { return (x(d.angle) + x.bandwidth()/ 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-9)"; })
        .text(function(d) { return d.sex; })
        .style("font-size", 14);

    sexsvg.selectAll(".axis")
      .data(d3.range(sex.domain()[1]))
      .enter().append("g")
      .attr("class", "axis")
      .attr("transform", function(d) { return "rotate(" + angle(d) * 180 / Math.PI + ")"; })
      .call(d3.axisLeft()
          .scale(radius.copy().range([-innerRadius, -(outerRadius+10)])));

    var yAxis = sexsvg.append("g")
        .attr("text-anchor", "middle");

    var yTick = yAxis
        .selectAll("g")
        .data(y.ticks(5).slice(1))
        .enter().append("g");

    yTick.append("circle")
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-dasharray", "4,4")
        .attr("r", y);

    yTick.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "-0.35em")
        .attr("x", function() { return -10; })
        .text(y2.tickFormat(5, "s"))
        .style("font-size",14);


    var legend = sexsvg.append("g")
        .selectAll("g")
        .data(sexCnt.slice(1).reverse())
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + (outerRadius+0) + "," + (-outerRadius + 40 +(i - (sexCnt.columns.length - 1) / 2) * 20) + ")"; });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z);

    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(function(d) { return d; })
        .style("font-size",12);

});
