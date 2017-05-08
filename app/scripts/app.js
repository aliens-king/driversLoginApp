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

    }) .state('logout', {
        // templateUrl: 'views/pages/login.html',
        // url: '/login',
        controller: 'LogoutCtrl',
        //redirectTo:'login',
        templateUrl: 'views/main.html'
    })


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
            alert("ddddddddddddd");

        var loggedIn = LoginService.isAuthenticated();
        alert("dddddddddddddffffffffffff");

        if (loggedIn) {
            $state.go(toState.name, toParams, {notify: false}).then(function () {
                $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);

                alert("000000000000000000000000");

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
}]);
