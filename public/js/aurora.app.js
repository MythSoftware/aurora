var auroraApp = angular.module('auroraApp', ['ngRoute']);

auroraApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/about', {
        templateUrl: 'partials/about',
        controller: 'AboutCtrl'
      }).
      when('/users', {
        templateUrl: 'partials/users',
        controller: 'UsersCtrl'
      }).
      when('/contact', {
          templateUrl: 'partials/contact',
          controller: 'ContactCtrl'
        }).

      when('/landing', {
          templateUrl: 'partials/home/landing',
          controller: 'LandingCtrl'
        }).

      when('/:state?', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      }).

      otherwise({
        redirectTo: '/'
      });
  }
]);

var glob;
