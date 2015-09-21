(function() {
  angular.module("app").factory("SpotifyFactory", SpotifyFactory);
  SpotifyFactory.inject = ["$http", "$q"];


  function SpotifyFactory($http, $q) {
    var o = {};

    //Spotify Authorization--------------------------------------------------------------------------------------------
    // function getSpotAuth() {
    //
    //   return spotAuth = {
    //     header: {
    //       Authorization: "Bearer: " + localStorage.token
    //     }
    //   }
    // }


    o.loginWithSpotify = function() {

      var q = $q.defer();
      $http.get('/api/v1/spotify/login').success(function(res) {

        q.resolve(res);
      })
      return q.promise;
    }


    return o;

  }
})();
