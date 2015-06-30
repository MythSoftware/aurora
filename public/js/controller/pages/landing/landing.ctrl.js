auroraApp.controller('LandingCtrl', function($scope, $controller, $routeParams, recallService) {

    $scope.message = "I'm in the controller";

    //var init = function() {
    //    google.setOnLoadCallback(drawUSMap);
    //};

    $scope.init = function() {
        //google.setOnLoadCallback(drawUSMap);
        //drawUSMap();

        drawD3Map();
    };

});
