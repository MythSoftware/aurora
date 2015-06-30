function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
    return "<h4>"+n+"</h4><table>"+
        "<tr><td>Low</td><td>"+(d.low)+"</td></tr>"+
        "<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
        "<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
        "</table>";
}

function drawD3Map() {
    var sampleData ={};	/* Sample random data. */
    ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
        "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
        "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
        "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
        "WI", "MO", "AR", "OK", "KS", "LS", "VA"]
        .forEach(function(d){
            var low=Math.round(100*Math.random()),
                mid=Math.round(100*Math.random()),
                high=Math.round(100*Math.random());
            low = d3.min([low,mid,high]);
            high = d3.max([low,mid,high]);
            mid = Math.round((low+mid+high)/3);

            sampleData[d]={low:low, high:high, avg:mid};

            console.log("Value:" + low/100);

            if(mid/100 < .5) {
                sampleData[d].color = d3.interpolate("white", "yellow")(mid/100);
            } else {
                sampleData[d].color = d3.interpolate("white", "yellow")(mid/100);
            }
        });

    window.addEventListener("resize", function() {
        var stateSvg = document.getElementById("statesvg");
        stateSvg.viewbox = "0,0," + stateSvg.parentNode.clientHeight + "," + stateSvg.parentNode.clientWidth;
    });

    var stateSvg = document.getElementById("statesvg");
    stateSvg.viewbox = "0,0," + stateSvg.parentNode.clientHeight + "," + stateSvg.parentNode.clientWidth;

    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml);
}
