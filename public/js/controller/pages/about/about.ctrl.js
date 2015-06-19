auroraApp.controller('AboutCtrl', function($scope, $controller) {
  angular.extend(this, $controller('LoadableMixin', {$scope: $scope}));

  // wait for a second to simulate loading
  setTimeout(function () {
    $scope.setLoading(false);
    $scope.$apply();
  }, 1000);
});
