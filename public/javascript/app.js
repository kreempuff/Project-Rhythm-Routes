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
    }).state("SpotifyToken", {
      url: "/token/:accessToken/:refreshToken/:id",
      templateUrl: "templates/auth.html",
      controller: ["$stateParams", "SpotifyFactory","$state", "$timeout", "$rootScope", function ($sP, SF, $state, time) {
        SF.setTheTokens($sP.accessToken, $sP.refreshToken);
        $state.go("Home");
      }]
    });
    $urlRouterProvider.otherwise('/');
  }
})();
