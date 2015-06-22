auroraApp.controller('AboutCtrl', function($scope, $controller) {
  angular.extend(this, $controller('LoadableMixin', {$scope: $scope}));
  	$scope.aboutmessage = 'This web application is designed to present the user with up to date data of food recalls by state.  The system will also alert users via SMS when a new recall has been detected, thereby raising awareness and safety. Additional specs/ technologies used can go here as well.'
  	$scope.aboutus = 'Some blurb about you guys and your history together.'
  		// wait for a second to simulate loading
  setTimeout(function () {
    $scope.setLoading(false);
    $scope.$apply();
  }, 1000);
});
