(function () {
  angular.module("app").factory("SpotifyFactory", SpotifyFactory);
  SpotifyFactory.inject = ["$http", "$q"];
  function SpotifyFactory($http, $q) {
    var o = {};
    console.log("SpotifyFactory");


    return o;

  }
})();
