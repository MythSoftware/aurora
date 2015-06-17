auroraApp.controller('HomeCtrl', function($scope, $location, $routeParams) {
  var _stateTabs;

  var init = function () {
    var abbr;
    _stateTabs = [];
    if ($routeParams.state) {
      abbr = $routeParams.state.toUpperCase();
      if (abbr != 'ADD' && !StateHash[abbr]) {
        $location.path('/');
      }
      else if (abbr != 'ADD') {
        _stateTabs.push(StateHash[abbr]);
      }
    }
  };
  init();

  $scope.isAdding = function () {
    return !$routeParams.state || $routeParams.state.toUpperCase() == 'ADD';
  };

  $scope.getStateTabs = function () {
    return _stateTabs;
  };
});
