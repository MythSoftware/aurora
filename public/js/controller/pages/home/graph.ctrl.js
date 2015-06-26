auroraApp.controller('GraphCtrl', function($scope, recallService) {

  var _recallServiceSubIds;

  $scope.init = function () {
    $scope.$on("$destroy", destroy);
    _recallServiceSubIds = [];
    _recallServiceSubIds.push(recallService.subscribe(recallService.Event.FETCH_COUNT, triggerDrawGraph));
    _recallServiceSubIds.push(recallService.subscribe(recallService.Event.SHOW_GRAPH, triggerDrawGraph));
  };

  var destroy = function () {
    recallService.unsubscribe(_recallServiceSubIds);
  };

  $scope.isShowingGraph = function () {
    return recallService.isShowingGraph();
  };

  var triggerDrawGraph = function () {
    var states, state, stateRecallMap;
    if (!recallService.isShowingGraph()) {
      return;
    }
    states = JSON.parse(localStorage['stateTabs']);
    stateRecallMap = {};
    for (state in states) {
      stateRecallMap[state] = recallService.getStateCount(state);
    }
    drawGraph(stateRecallMap);
  };

  var drawGraph = function (data) {
    console.log('drawGraph ' + JSON.stringify(data));
    // draw the graph here
      var state;
      var getState = [];
      var getCount = [];
      for (state in data) {
          //console.log('state = ' + state);
          //console.log('count = ' + data[state]);
          getState.push(state);
          console.log(getState)

          getCount.push(data[state])
          console.log(getCount)

      }
      var colors = ['#0000b4','#0082ca','#0094ff','#0d4bcf','#0066AE','#074285','#00187B','#285964','#405F83','#416545','#4D7069','#6E9985','#7EBC89','#0283AF','#79BCBF','#99C19E'];

      var grid = d3.range(50).map(function(i){
          return {'x1':0,'y1':0,'x2':0,'y2':480};
      });

      var tickVals = grid.map(function(d,i){
          if(i>0){ return i*100; }
          else if(i===0){ return "0";}
      });

      var width = $('#graph-container').width(),
          height = $('#graph').height();

      var margin = {top: 0, right:50, bottom:20, left:10};


      var xscale = d3.scale.linear()
          .domain([0 , d3.max(getCount)])
          .range([0,width - margin.left - margin.right]);

      var yscale = d3.scale.linear()
          .domain([0,getState.length])
          .range([0,height - margin.top - margin.bottom]);


      var colorScale = d3.scale.quantize()
          .domain([0,getState.length])
          .range(colors);

      var canvas = d3.select('#graph')
          .append('svg')
          .attr({'width':width,'height':height, 'id':'graphsvg'})
          .append("g")
          .attr("transform","translate(" + margin.left + ","+ margin.right - 40+ ")");

      /*var aspect = width / height,
          chart = $("#graphsvg");
          $(window).on("resize", function() {
            var targetWidth = width;
            chart.attr("width", targetWidth);
            chart.attr("height", targetWidth / aspect);
          }).trigger("resize");*/

      var grids = canvas.append('g')
          .attr('id','grid')
          .attr('transform','translate(20,0)')
          .selectAll('line')
          .data(grid)
          .enter()
          .append('line')
          .attr({'x1':function(d,i){ return i*30; },
              'y1':function(d){ return d.y1; },
              'x2':function(d,i){ return i*30; },
              'y2':function(d){ return d.y2; },
          })
          .style({'stroke':'#eee','stroke-width':'1px'});

      var	xAxis = d3.svg.axis();
      xAxis
          .orient('bottom')
          .scale(xscale)
          .tickValues(tickVals);

      var	yAxis = d3.svg.axis();
      yAxis
          .orient('left')
          .scale(yscale)
          .tickSize(0)
          .tickFormat(function(d,i){ return getState[i]; })
          .tickValues(d3.range(17));

      var y_xis = canvas.append('g')
          .attr("transform", "translate(20,30)")
          .attr('id','yaxis')
          .call(yAxis);

      var x_xis = canvas.append('g')
          .attr("transform", "translate(20,480)")
          .attr('id','xaxis')
          .call(xAxis);

      var chart = canvas.append('g')
          .attr("transform", "translate(20,0)")
          .attr('id','bars')
          .selectAll('rect')
          .data(getCount)
          .enter()
          .append('rect')
          .attr('height',19)
          .attr({'x':0,'y':function(d,i){ return yscale(i)+19; }})
          .style('fill',function(d,i){ return colorScale(i); })
          .attr('width',function(d,i){ return 0; });


      var transit = d3.select("svg").selectAll("rect")
          .data(getCount)
          .transition()
          .duration(1000)
          .attr("width", function(d) {return xscale(d); });

      var transitext = d3.select('#bars')
          .selectAll('text')
          .data(getCount)
          .enter()
          .append('text')
          .attr({'x':function(d) {return xscale(d); },'y':function(d,i){ return yscale(i)+35; }});
          //.text(function(d, i){ return d; }).style({'fill':'#000','font-size':'10px'});

      function updateData() {

          //var svg = d3.select('#graph').append("svg")
          // set domain for axis
          xscale.domain([0,d3.max(getCount)]);

          // create axis scale
          var xAxis = d3.svg.axis()
              .scale(xscale).orient("bottom");

          // if no axis exists, create one, otherwise update it
          if (canvas.selectAll("#xaxis")[0].length < 1 ){
              //alert('update')
              canvas.append("g")
                  .attr("id","xaxis")
                  .call(xAxis);
          } else {
              //alert('else')
              canvas.selectAll("#xaxis").transition().duration(100).call(xAxis);
              //transitext.text(function(d, i){ return d; }).style({'fill':'#000','font-size':'10px'});
          }

      }
      updateData();
  };
});
