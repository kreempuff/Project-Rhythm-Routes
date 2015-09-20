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
    });
    $urlRouterProvider.otherwise('/');
  }
})();
