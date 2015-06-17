auroraApp.controller('HeaderLeftCtrl', function($scope, $location, $routeParams) {
  
  $scope.getCurrentPath = function () {
    return $location.path();
  };

  $scope.isHome = function () {
    return $location.path() == '/'
      || ($routeParams.state && StateHash[$routeParams.state.toUpperCase()]);
  };

});
