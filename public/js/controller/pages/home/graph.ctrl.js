auroraApp.controller('GraphCtrl', function($scope, recallService) {

<<<<<<< HEAD
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
=======
  $scope.init = function () {

>>>>>>> a86a1d27d175f29750b1052a7bd2fb26d64f96db
  };

});
