auroraApp.controller('ContactCtrl', function($scope, $controller) {
  angular.extend(this, $controller('LoadableMixin', {$scope: $scope}));
  	//reserved for possible email and message fields.
  		// wait for a second to simulate loading
  setTimeout(function () {
    $scope.setLoading(false);
    $scope.$apply();
  }, 1000);
});
