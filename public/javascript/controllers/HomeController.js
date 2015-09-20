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
          controller: ["$modalInstance", "UserFactory", function($modalInstance, UF) {
            var loginModal = this;

            loginModal.ok = function() {
              UF.loginUser().then(function(res) {
                delete loginModal.user;
                $modalInstance.close();

              })
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
        controller: ["$modalInstance", "UserFactory", function($modalInstance, UF) {
          var registerModal = this;

          registerModal.ok = function() {
            UF.registerUser(registerModal.user).then(function(res) {
              delete registerModal.user;
              console.log(res);
              $modalInstance.close();
            })
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
