(function() {
  'use strict';
  angular.module('app', ['ui.router', "ngMaterial"])
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
    })
    .state("Login",{
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "RegLogController",
      controllerAs: "user"
    })
    .state("Register",{
      url: "/register",
      templateUrl: "templates/edit_profile.html",
      controller: "RegLogController",
      controllerAs: "user"
    });
    $urlRouterProvider.otherwise('/');
  }
})();
