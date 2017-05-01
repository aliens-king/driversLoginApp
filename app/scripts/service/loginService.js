


'use strict';

angular.module('driversLoginApp')
  .factory('AuthenticationService',
    [ '$http',  '$rootScope', '$timeout',
      function ( $http,  $rootScope, $timeout) {


        var service = {};
        service.login = login;
        return service;

        /* function login(email,password,callback) {

         var data = JSON.stringify(
         {
         "email": "peter@klaven",
         "password": "cityslicka"
         }
         );
         return $http.post('https://reqres.in/api/login',data).then(callback,'lll');
         }*/
        var userId="city";

        function  login(userId,callback) {
          if (userId=="city"){
            callback({
              data: {token:' jsndlkjkjkjlkjlk'}
            });
          }
          else{
            callback({
              data: {error: "Missing email or username"}
            });

          }
        }

      }]);












