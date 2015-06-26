auroraApp.controller('LandingCtrl', function($scope, $controller, $routeParams, recallService) {
    angular.extend(this, $controller('LoadableMixin', {$scope: $scope}));

    $scope.message = "I'm in the controller";

    var init = function() {
        google.setOnLoadCallback(drawUSMap);
    };

    $scope.init = function() {
        google.setOnLoadCallback(drawUSMap);
    };

});
