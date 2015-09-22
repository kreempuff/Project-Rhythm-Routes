(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ["$modal", "$rootScope", "UserFactory", "$state"];

  function HomeController(modal, $rootScope, UF, $state) {
    var home = this;
    home.title = 'Welcome to Rhythm Routes!';
    home.description = "This app in its final form will allow a user, to connect with their Spotify account and automatically produce theme music on the go."
    home.loginTitle = "Login";
    home.registerTitle = "Register!";
    home.user = $rootScope._user || $rootScope._spotifyUser;
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
          registerModal.submitAction = "Finish Register";

          registerModal.ok = function() {
            UF.registerUser(registerModal.user).then(function(res) {
              delete registerModal.user;
                home.loginStart();
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
    //Logout initiated---------------------------------------------------------------------
    home.logout = function() {
      UF.logout();
      home.user = $rootScope._user
    }

    //Edit Profile Modal----------------------------------------------------------------------------------------------------------------

    home.startEdit = function() {
      var editModal = modal.open({
        templateUrl: "../../templates/edit_profile.html",
        controller: ["$http", "$modalInstance", function($http, $modalInstance) {
          var registerModal = this;
          registerModal.editing = true;
          registerModal.submitAction = "Submit Edit";
          $http.post("/api/v1/users/editProfileStart", {
            _id: home.user.id
          }).success(function(res) {
            registerModal.user = res;
          })
          registerModal.ok = function() {
            $http.post("/api/v1/users/editProfileFinish", registerModal.user).success(function(res) {
              delete registerModal.user;
              $modalInstance.close();
            })
          }

          registerModal.cancel = function() {
            delete registerModal.user;
            $modalInstance.dismiss();
          }

        }],
        controllerAs: "registerModal",
        size: "md",
      })
    }

    //End of edit Modal--------------------------------------------------------------------------------------------------------
    //delete Modal---------------------------------------------------------------------------------------------------
    home.delete = function() {
      UF.delete().then(function(res) {
        $state.go("Home");
      });
    }
  }
})();
