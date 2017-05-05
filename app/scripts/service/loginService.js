



'use strict';

angular.module('driversLoginApp')
  .factory('LoginService',
    [ '$http',  '$rootScope', '$timeout','Session', '$cookieStore',
      function ( $http,  $rootScope, $timeout,Session,$cookieStore) {


          var service = {};
          service.SetCredential = SetCredential;
          service.ClearCredentials = ClearCredentials;
          service.isAuthenticated = isAuthenticated;
          service.login = login;
          return service;

          //var userId = "peter";

          function login(userId, callback) {
              /*if (userId == "city") {
                  callback({
                      data: {token: ' jsndlkjkjkjlkjlk'}
                  })

              }
              else {
                  callback({
                      data: {error: "Missing email or username"}
                  });

              }*/
              //var email = userId;
              var data = JSON.stringify(
                  {
                      //"email": "peter@klaven",
                      "email": userId,
                      "password": "cityslicka"
                  }
              );
              return $http.post('https://reqres.in/api/login',data).then(function(response,status){
                  console.log(response);

                  Session.Create(response);
                  callback(response,status);
              }).catch(function(response,status){
                  callback(response,status);
              });
         /* .finally(function() {
                  console.log("finally finished gists");
              });*/
          }


          function SetCredential(login) {
              Session.Update(login);
              $rootScope.globals = {
                  currentUser: {
                      userId: userId,
                      token: Session.token,
                      userObj:Session.userObject
                  }
              };

              $http.defaults.headers.common.Accept = 'Basic '+Session.token;
              $cookieStore.put('globals',$rootScope.globals );
          }

          function ClearCredentials() {
              $rootScope.globals = {};
              $cookieStore.remove('globals');
              $http.defaults.headers.common.Accept = 'Basic ';
              Session.Destroy();

          }

          function isAuthenticated() {
              $rootScope.global = $cookieStore.get('globals') || {};
              if ($rootScope.globals.currentUser) {
                  Session.CreateUser($rootScope.globals.currentUser);
              }
              return !!Session.userId;

          }


      }

      ]);












