(function() {
  angular.module('app').factory("GoogleFactory", GoogleFactory);
  GoogleFactory.$inject = ["$http", "$q"];

  function GoogleFactory($http, $q) {
    var g = {}
    g.getLocation = function() {
      var q = $q.defer();
      $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBbpLf1eUVrnwWNIdcgcKDj33ZK78b_RxQ').success(function(res) {
        q.resolve(res);
      });
      return q.promise;
    }
    return g;
  }
})();
