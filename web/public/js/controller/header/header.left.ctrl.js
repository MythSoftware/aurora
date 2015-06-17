auroraApp.controller('HeaderLeftCtrl', function($scope, $location) {
  
  $scope.getCurrentPath = function () {
    return $location.path();
  };

});
