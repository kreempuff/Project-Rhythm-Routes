(function() {
  angular.module("app").factory("SpotifyFactory", SpotifyFactory);
  SpotifyFactory.inject = ["$http", "$q", "$rootScope"];


  function SpotifyFactory($http, $q, $rootScope) {
    var o = {};
    //Spotify Token Handling--------------------------------------------------------------------------
    
    function setTokens(accessToken, refreshToken) {
      localStorage.setItem("spotify-acTokens", accessToken);
      localStorage.setItem("spotify-refTokens", refreshToken);
    }

    o.setTheTokens = function(tok1, tok2) {
        setTokens(tok1, tok2);

      }
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

        q1.resolve();
      })

      return q1.promise;
    }


    return o;

  }
})();
