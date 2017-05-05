(function () {
    'use strict';

    angular.module('driversLoginApp').factory('AuthenticationService', AuthenticationService);
    AuthenticationService.$inject = ['$http', '$rootScope', '$timeout',  'Session', '$cookieStore'];
    function AuthenticationService($http, $rootScope, $timeout ,Session, $cookieStore) {
        var service = {};
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.isAuthenticated = isAuthenticated;
        service.isAuthorized = isAuthorized;



        function Login(userId,  callback) {

            //var response={'userid':'12345','indatetime':'2016-01-11 22:23:26','token':'f7e0dfc437f055f9c2fe958f03941a39'};
            //var status = 200;
            //Session.Create(response);
            //callback(response, status);

            /*  var data = JSON.stringify([
             {
             "userid": username,
             "password": password
             }
             ]);
             */
            /*  $http.post(API.HOST + 'logins', data)*/
            var userId = "city";

            function login(userId, callback) {
                if (userId == "city") {
                    callback({
                        data: {token: ' jsndlkjkjkjlkjlk'}
                    }).success(function (response, status) {
                        Session.Create(response);
                        callback(response, status);
                    });
                }
                else {
                    callback({
                        data: {error: "Missing email or username"}
                    });


                    /*
                     .error(function (response, status, headers) {
                     callback(response, status);
                     });*/
                }

                function SetCredentials(loginUser) {
                    Session.Update(loginUser);
                    $rootScope.globals = {
                        currentUser: {
                            userId: Session.userId,
                            userName: loginUser.name,
                            token: Session.token,
                            permission: loginUser.perms,
                            userType: loginUser.usertype,
                            userObj: loginUser,
                            dateDisplay: Session.dateDisplay

                        }
                    };


                    $http.defaults.headers.common.Accept = 'Basic ' + Session.userId;
                    $cookieStore.put('globals', $rootScope.globals);
                    //$cookies.put('globals', $rootScope.globals);

                    /*$rootScope.currentUser = {
                     username: Session.userId,
                     authData: Session.token
                     };

                     // $http.defaults.headers.common['Authorization'] = 'Basic' + Session.token;
                     $cookieStore.put('currentUser', $rootScope.currentUser);*/
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
        }}
        })();

