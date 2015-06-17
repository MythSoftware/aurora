auroraApp.controller('HomeCtrl', function($scope, $location, $routeParams) {
  var _stateTabs;

  glob = $location;

  var init = function () {
    var abbr;
    _stateTabs = [];
    if ($routeParams.state) {
      abbr = $routeParams.state.toUpperCase();
      if (!StateHash[abbr]) {
        $location.path('/');
      }
      else {
        _stateTabs.push(StateHash[abbr]);
      }
    }
  };
  init();

  $scope.getStateTabs = function () {
    return _stateTabs;
  };
});
