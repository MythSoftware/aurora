auroraApp.controller('HeaderLeftCtrl', function($scope, $controller, $location, $routeParams) {
  angular.extend(this, $controller('FeatureMixin', {$scope: $scope}));

  $scope.getCurrentPath = function () {
    return $location.path();
  };

  $scope.isHome = function () {
    return $location.path() == '/' || $location.path() == '/add'
      || ($routeParams.state && StateHash[$routeParams.state.toUpperCase()]);
  };

});
