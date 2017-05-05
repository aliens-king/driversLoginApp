'use strict';



angular.module('driversLoginApp', ['ui.router','ngCookies'] ).config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    alert("app.js loaded.Continue...");
    $urlRouterProvider.otherwise('/login');
    // HOME STATES AND NESTED VIEWS ========================================
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/main.html',
            controller:'loginController as vm'

        })
        .state('home', {
            url: '/home',
        templateUrl: 'views/home.html'

    })/*.state('register',{
     url:'/register',
     templateUrl:'views/register.html',
     controller:'registerController'
     })*/


    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
        })
}]).run(['$rootScope', '$location', '$cookies', '$http','LoginService','$state',
    function ($rootScope, $location, $cookies, $http, LoginService,$state) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        alert("lllllllllll");
        // redirect to login page if not logged in and trying to access a restricted page
        /* var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
         var loggedIn = $rootScope.globals.currentUser;
         if (restrictedPage && !loggedIn) {
         $location.path('/login');
         }*/

        var loggedIn = LoginService.isAuthenticated();
        if (loggedIn) {
            $state.go(toState.name, toParams, {notify: false}).then(function () {
                $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);

            });
        }
        else if(toState.name=='login' && !loggedIn){
            console.log("Login Page");
        }
        else if (!loggedIn) {
            event.preventDefault();
            $state.go('login');
        } else {
            console.log('User is not logged in and trying to access unauthorized page');
        }
    });
}])
;
