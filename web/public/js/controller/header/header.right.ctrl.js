auroraApp.controller('HeaderRightCtrl', function($scope, $controller) {
  angular.extend(this, $controller('FeatureMixin', {$scope: $scope}));
});
