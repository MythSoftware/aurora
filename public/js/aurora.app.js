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

      when('/', {
          templateUrl: 'partials/landing/landing',
          controller: 'LandingCtrl'
        }).

      when('/recalls/:state?', {
        templateUrl: 'partials/home',
        controller: 'HomeCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);

var glob;
