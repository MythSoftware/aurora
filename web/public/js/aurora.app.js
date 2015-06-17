var auroraApp = angular.module('auroraApp', ['ngRoute']);

auroraApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about',
        controller: 'AboutCtrl'
      }).
      when('/users', {
        templateUrl: 'partials/users',
        controller: 'UsersCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);

var glob;
