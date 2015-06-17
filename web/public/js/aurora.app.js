var auroraApp = angular.module('auroraApp', ['ngRoute']);

auroraApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/about', {
        templateUrl: 'partials/about',
        controller: 'AboutCtrl'
      }).
      when('/', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);

var glob;
