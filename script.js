function drawBarGraph(id, graphTitle){ // id of div to draw in, graphTitle is Bigrams or Trigrams

//sort bars based on value
data['Bigrams'] = data['Bigrams'].sort(function (a, b) {
return d3.ascending(a.value, b.value);
})
data['Trigrams'] = data['Trigrams'].sort(function (a, b) {
    return d3.ascending(a.value, b.value);
})

//set up svg using margin conventions - we'll need plenty of room on the left for labels
var margin = {
top: 15,
right: 25,
bottom: 15,
left: 0
};

var width = screen.width / 4 - margin.left - margin.right,
height = screen.height / 3 - margin.top - margin.bottom;

var svg = d3.select("#"+id).append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
.attr("id",id+graphTitle); // id is combo of parameters

var x = d3.scale.linear()
.range([0, width])
//.domain([0, 0.250389]);
.domain([0, d3.max(data[graphTitle], function (d) {
    return d.value;
})]);

var y = d3.scale.ordinal()
.rangeRoundBands([height, 0], .1)
.domain(data[graphTitle].map(function (d) {
    return d.name;
}));

//make y axis to show bar names
var yAxis = d3.svg.axis()
.scale(y)
//no tick marks
.tickSize(0)
.orient("left");

var gy = svg.append("g")
.attr("class", "y axis")
.call(yAxis)

var bars = svg.selectAll(".bar")
.data(data[graphTitle])
.enter()
.append("g")

//append rects
rects = bars.append("rect")
.attr("class", "bar")
.attr("id",function(d, i) {return id + i})
.style("fill",function(d, i) {return "rgb(100, 200, " + (i * 51) + ")";})
.attr("y", function (d) {
    return y(d.name);
})
.attr("height", y.rangeBand())
.attr("x", 0)
.attr("width", function (d) {
    return x(d.value);
});

//add phrase onto each bar
phrases = bars.append("text")
.attr("class", "label")
.style("alignment-baseline","middle")
//y position of the label is halfway down the bar
.attr("y", function (d) {
    return y(d.name) + y.rangeBand() / 2 + 4;
})
//x position is 3 pixels to the right of the bar
.attr("x", function (d) {
    return x(0) + 10;
})
.text(function (d) {
    return d.name;
});

// if (graphTitle=="Bigrams"){
//     subplot = "2-words"
// }
// else{
//     subplot = "3-words"
// };

// // subplot title
// svg.append("text")
// .attr("x",width/2)
// .attr("y",0)
// .attr("font-size","20px")
// .text(subplot)
// .style("text-anchor","middle");

};

// fill every div with the bars and catchphrases
d3.json("data.json", function(error, json) {
    data = json['Amy Klobuchar'];
    //drawBarGraph("klobucharGraph","Bigrams");
    drawBarGraph("klobucharGraph", "Trigrams");

    data = json['Andrew Yang'];
    //drawBarGraph("yangGraph","Bigrams");
    drawBarGraph("yangGraph", "Trigrams");

    data = json['Bernie Sanders'];
    //drawBarGraph("sandersGraph","Bigrams");
    drawBarGraph("sandersGraph", "Trigrams");

    data = json["Beto O’Rourke"];
    //drawBarGraph("betoGraph","Bigrams");
    drawBarGraph("betoGraph", "Trigrams");

    data = json["Cory Booker"];
    //drawBarGraph("bookerGraph","Bigrams");
    drawBarGraph("bookerGraph", "Trigrams");

    data = json["Elizabeth Warren"];
    //drawBarGraph("warrenGraph","Bigrams");
    drawBarGraph("warrenGraph", "Trigrams");
    
    data = json["Joe Biden"];
    //drawBarGraph("bidenGraph","Bigrams");
    drawBarGraph("bidenGraph", "Trigrams");
    
    data = json["Julian Castro"];
    //drawBarGraph("castroGraph","Bigrams");
    drawBarGraph("castroGraph", "Trigrams");
    
    data = json["Kamala Harris"];
    //drawBarGraph("harrisGraph","Bigrams");
    drawBarGraph("harrisGraph", "Trigrams");
    
    data = json["Pete Buttigieg"];
    //drawBarGraph("peteGraph","Bigrams");
    drawBarGraph("peteGraph", "Trigrams");
    
    data = json["Tom Steyer"];
    //drawBarGraph("steyerGraph","Bigrams");
    drawBarGraph("steyerGraph", "Trigrams");
    
    data = json["Tulsi Gabbard"];
    //drawBarGraph("gabbardGraph","Bigrams");
    drawBarGraph("gabbardGraph", "Trigrams");
});


// for tool tip - all comes from quotes.json data
d3.json("quotes.json", function(error, quotes) {

    // Tool tip 
    var tooltip = d3.selectAll("div")
    .append("div")
    .style("max-width","200px")
    .attr('class', 'tooltip');

    d3.selectAll('rect')
    .on("mouseover", function(d){

        return tooltip
        .style("visibility", "visible")
        .style("left", (d3.event.pageX + 50) + "px")
        .style("top", (d3.event.pageY + 50) + "px")
        .html(quotes[d3.select(this)[0][0].id]);
    })
    .on("mouseout", function(d, i){

        // return tooltip
        // .style("visibility", "hidden")
    });

    d3.select('body').on("click", function(){

        return tooltip
        .style("visibility", "hidden")
    });

});