(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ["$modal"];

  function HomeController(modal, modalInstance, user) {
    var home = this;
    home.title = 'Welcome to Rhythm Routes!';
    home.loginTitle = "Login";
    home.registerTitle = "Register!";


    //LOGIN MODAL-----------------------------------------------------
    home.loginStart = function() {
        var loginInstance = modal.open({
          animation: true,
          templateUrl: "../../templates/login.html",
          //MODALINSTANCE CONTROLLER AS FUNCTION---------------------------------
          controller: ["$modalInstance", function($modalInstance) {
            var loginModal = this;

            loginModal.ok = function() {
              $modalInstance.close();
            }

            loginModal.cancel = function() {
              delete loginModal.user;
              $modalInstance.dismiss();
            }
          }],
          controllerAs: "loginModal",
          //END OF MODAL INSTANCE CONTROLLER---------------------------------------------
          size: "md",
        });

        loginInstance.result.then(function() {
          console.log("Modal closed");
        })
      }
      //END OF LOGIN MODAL INSTANCE----------------------------------------------------------------

    //Register MODAL-----------------------------------------------------

    home.registerStart = function() {
      var registerModal = modal.open({
        animation: true,
        templateUrl: "../../templates/edit_profile.html",
        controllerAs: "registerModal",
        controller: ["$modalInstance", function($modalInstance) {
          var registerModal = this;

          registerModal.ok = function() {
            console.log(registerModal.user);
            $modalInstance.close();
          }

          registerModal.cancel = function() {
            delete registerModal.user;
            $modalInstance.dismiss();
          }
        }],
        size: "md"
      })
    }





  }
})();
