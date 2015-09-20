(function() {
  angular.module('app').controller("RegLogController", RegLogController);
  RegLogController.$inject = [];
  function RegLogController(){
    var vm = this;
    vm.loginTitle = "Login";
    vm.registerTitle = "Register"
  }
})();
