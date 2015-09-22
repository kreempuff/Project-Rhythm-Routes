(function() {
  angular.module('app').controller("GoogleController", GoogleController);
  GoogleController.$inject = ["GoogleFactory"];

  function GoogleController(GF) {
    var vm = this
    vm.displayLoc = function() {
      GF.getLocation().then(function(res) {
        console.log(res);
        initMap(res.location.lat, res.location.lng);
      })
    }

    
  }
})();
