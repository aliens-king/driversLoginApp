/**
 * Created by sudhanshu on 2/5/17.
 */

'use strict';

angular.module('driversLoginApp')
  .factory('AuthenticationService', AuthenticationService);
     AuthenticationService.$inject = ['$http', '$rootScope', '$timeout',  'Session', '$cookieStore'];

     function AuthenticationService($http, $rootScope, $timeout, UserService, API, Session, $cookieStore) {


        var service = {};
        service.isAuthenticated = isAuthenticated;
        service.SetCredentials = SetCredentials;
        service.isAuthenticated = isAuthenticated;
            service.isAuthorized = isAuthorized;
        return service;

        function isAuthenticated() {
             $rootScope.globals = $cookieStore.get('globals') || {};

             if ($rootScope.globals.currentUser) {
               Session.CreateUser($rootScope.globals.currentUser);
             }


             return !!Session.userId;
           }


           function SetCredentials(loginUser) {
                 Session.Update(loginUser);
                 $rootScope.globals = {
                   currentUser: {
                     //userId: Session.userId,
                     userName: "city",
                     token: Session.token,
                     userObj: loginUser,

                   }
                 };


                 $http.defaults.headers.common.Accept = 'Basic ' + Session.userId;
                 $cookieStore.put('globals', $rootScope.globals);


               }

    function ClearCredentials() {

      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Accept = 'Basic';
      Session.Destroy();
    }

    function isAuthenticated() {
      $rootScope.globals = $cookieStore.get('globals') || {};

      if ($rootScope.globals.currentUser) {
        Session.CreateUser($rootScope.globals.currentUser);
      }

      //if(Session.userId == null && $rootScope.globals.currentUser){
      //  $rootScope.globals = $cookies.get('globals') || {};
      //  Session.userId = $rootScope.globals.currentUser.userId;
      //  Session.userName = $rootScope.globals.currentUser.userName;
      //  return  !!Session.userId;
      //}
      return !!Session.userId;
    }

    function isAuthorized(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (service.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
    }

}

      }]);













