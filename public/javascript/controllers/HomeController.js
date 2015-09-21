(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ["$modal", "$rootScope", "UserFactory"];

  function HomeController(modal, $rootScope, UF) {
    var home = this;
    home.title = 'Welcome to Rhythm Routes!';
    home.loginTitle = "Login";
    home.registerTitle = "Register!";
    home.user = $rootScope._user;
    //LOGIN MODAL-----------------------------------------------------
    home.loginStart = function() {
        var loginInstance = modal.open({
          animation: true,
          templateUrl: "../../templates/login.html",
          //MODALINSTANCE CONTROLLER AS FUNCTION---------------------------------
          controller: ["$modalInstance", "UserFactory", function($modalInstance, UF) {
            var loginModal = this;

            loginModal.ok = function() {
              UF.loginUser(loginModal.user).then(function(res) {
                delete loginModal.user;
                home.user = $rootScope._user;
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
        //What to do after modal closes?
        // loginInstance.result.then(function() {
        // })
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

    //END of Register Modal!!---------------------------------------------------------------------
    home.logout = function() {
      UF.logout();
      home.user = $rootScope._user
    }


  }
})();
