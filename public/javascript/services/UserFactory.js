(function() {
  'use strict';
  angular.module('app')
    .factory('UserFactory', UserFactory);

  UserFactory.$inject = ['$http', '$q'];

  function UserFactory($http, $q) {
    var o = {};

    //USER LOGIN---------------------------------------------------------------

    o.loginUser = function(user) {
      var q = $q.defer();
      $http.post("/api/v1/users/login", user)
        .success(function(res) {
          console.log(res);
          q.resolve();
        })
        .error(function(res) {
          q.reject();
        })
      return q.promise;
    }

    //REGISTER A USER---------------------------------------------------------------
    o.registerUser = function(user) {
      var q = $q.defer();
      $http.post("/api/v1/users/register", user)
        .success(function(res) {
          q.resolve(res);
        })
        .error(function(res) {
          q.reject();
        })
      return q.promise;
    }






    return o;
  }
})();
