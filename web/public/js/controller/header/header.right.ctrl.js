auroraApp.controller('HeaderRightCtrl', function($scope, $location, $routeParams, $controller) {
  angular.extend(this, $controller('FeatureMixin', {$scope: $scope}));
});
