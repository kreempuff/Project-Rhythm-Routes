(function() {
  angular.module('app').controller("SpotifyController", SpotifyController);
  SpotifyController.$inject = ["SpotifyFactory"];
  function SpotifyController(SpotifyFactory){
    var spotC = this;

    spotC.login = function () {
      SpotifyFactory.loginWithSpotify().then(function (res) {
        alert("You logged in!");
      })
    }
  }
})();
