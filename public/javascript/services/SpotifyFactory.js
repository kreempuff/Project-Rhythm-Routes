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

      var q1 = $q.defer();
      $http.get('/api/v1/spotify/login').success(function(res) {
        var q2 = $q.defer();
        $http.get(res.web_auth_uri).success(function(res2) {
          q2.resolve();
          q1.resolve();
        })
        return q2.promise;

      })
      return q1.promise;
    }


    return o;

  }
})();
