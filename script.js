// set the dimensions and margins of the graph
var margin = {top: 50, right: 10, bottom: 50, left: 10},
    width = screen.width - margin.left - margin.right,
    height = 550

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("./DemDebateReadingScoresData.csv", function(data) {

    // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
    dimensions = ["June", "July", "Sept", "Oct", "Nov", "Dec"]
        
    // For each dimension, I build a linear scale. I store all in a y object
    y = d3.scaleLinear()
        .domain( [6,14] )
        .range([height, 0])
        
    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
        .range([0, width])
        .padding(1)
        .domain(dimensions);

    axisCount = 0;

    // Draw the axes:
    svg.selectAll("myAxis")
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    .attr("class", "axis")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
    // And I build the axis with the call function
    .each(function(d) { 
        if (axisCount == 0){
            axisCount = axisCount + 1;
            d3.select(this).call(d3.axisLeft().scale(y).ticks(9).tickValues([6,7,8,9,10,11,12,13])); 
        }
        else if (axisCount == 5){
            d3.select(this).call(d3.axisRight().scale(y).ticks(9).tickValues([6,7,8,9,10,11,12,13])); 
        }
        else{
            axisCount = axisCount + 1;
            d3.select(this).call(d3.axisLeft().scale(y).ticks(9).tickFormat("")); 
        }})
    // Add axis title
    .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d; })
        .style("fill", "black")
        .style('font-size',"20px");

    // auto generate colors array for dots
    colors = []
    degreeIncrement = 360 / data.length;

    for (i=0;i<data.length;i++){
      if (i % 2 == 0){
        colors.push(["hsl("+i*degreeIncrement+",100%,50%)"])
      }
      else {
        colors.push(["hsl("+(i-1)*degreeIncrement+",100%,33%)"])
      }
    }

    for (i=0; i < data.length; i++){
        for (d=0; d < dimensions.length; d++){

            if (data[i][dimensions[d]]==0){
                continue;
            }

            svg.append("circle")
            .attr("cy", y(data[i][dimensions[d]]))
            .attr("cx", x(dimensions[d]))
            .attr("r", 5 )
            .style("fill", colors[i])
            .attr("id", data[i]["name"]);
        }
    }




})

