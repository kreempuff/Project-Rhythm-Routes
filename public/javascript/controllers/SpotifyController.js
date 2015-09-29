(function() {
  angular.module('app').controller("SpotifyController", SpotifyController);
  SpotifyController.$inject = ["SpotifyFactory", "$http"];

  function SpotifyController(SpotifyFactory, $http) {
    var spotC = this;
    spotC.songs = [];
    spotC.getSongs = function() {
      spotC.songs.length = 0;
      spotC.songToGet = spotC.songToGet.replace(/\s/g, "%20");
      // console.log(spotC.songToGet);
      $http.post("/api/v1/spotifydata/get-songs", {songs: spotC.songToGet}).success(function(res) {
        //spotC.songs = res;
        delete spotC.songToGet;
        spotC.songs = res.tracks.items;
        console.log(spotC.songs);
      })
    }

    spotC.playSong = function(song) {
      $http.post("/api/v1/spotifydata/play-song-preview", song).success(function (res) {
        spotC.song = res;
      })
    }
  }
})();
