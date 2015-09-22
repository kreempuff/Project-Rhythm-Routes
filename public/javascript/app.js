(function() {
  'use strict';
  angular.module('app', ['ui.router', "ngMaterial", "ui.bootstrap"])
    .config(StateConfig)
    .config(ColorScheme);
  StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function ColorScheme($mdThemingProvider) {
    $mdThemingProvider.theme("default")
      .primaryPalette('red')
      .accentPalette("pink");
  }

  function StateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('Home', {
      url: '/',
      templateUrl: 'templates/home.html',
      controller: "HomeController",
      controllerAs: "home"
    }).state("Error", {
      url: "/error",
      templateUrl:"templates/error.html"
    }).state("Profile", {
      url: "/profile",
      templateUrl:"templates/profile.html",
      controller: "HomeController",
      controllerAs: "profile"
    });
    $urlRouterProvider.otherwise('/');
  }
})();
