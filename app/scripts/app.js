
'use strict';



angular.module('driversLoginApp', ['ui.router'] ).config(['$stateProvider','$rootScope',function($stateProvider, $urlRouterProvider) {
  alert("app.js loaded.Continue...");
  $urlRouterProvider.otherwise('/login');
  // HOME STATES AND NESTED VIEWS ========================================
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/main.html',
      controller:'loginController as vm'

    }) .state('home', {
    url: '/home',
    templateUrl: 'views/home.html'

  })
   /* .run(['$rootScope', '$state', '$cookieStore', 'AuthenticationService', 'Idle', function ($rootScope, $state, $cookieStore, AuthenticationService, Idle) {

      $rootScope.globals = $cookieStore.get('globals') || {};
      $rootScope.latitude = $cookieStore.get('latitude') || "";
      $rootScope.longitude = $cookieStore.get('longitude') || "";
      Idle.watch();*/
  /*$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    //    console.log(toState.name);
    //console.log(fromState);
    //console.log(toParams);
    //console.log(fromParams);
    //console.log($state.is(next.name))
    // console.log('Authenticated'+AuthenticationService.isAuthenticated());
    //console.log('$rootScope.globals'+$rootScope.globals);


    var loggedIn = AuthenticationService.isAuthenticated();

    //console.log('state==>' + $state.current.name + "|");
    var isPermitted = $state.is('login') || $state.current.name == '';

    //if(isPermitted && !loggedIn){
    //  console.log('if athenticated'+$rootScope.globals.currentUser);
    //}else {
    //  $state.go(toState.name, toParams, {notify: false}).then(function() {
    //    $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
    //  });
    //}

    if (loggedIn) {
      $state.go(toState.name, toParams, {notify: false}).then(function () {
        $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);

      });
    }
    else if (toState.name == 'forgot' && !loggedIn) {
      $state.go(toState.name, toParams, {notify: false}).then(function () {
        $rootScope.$broadcast('$stateChangeSuccess', toState, toParams, fromState, fromParams);
      });
    } else if (toState.name == 'login' && !loggedIn) {
      console.log('Opening Login Page');
    }
    else if (!loggedIn) {
      event.preventDefault();
      $state.go('login');
    } else {
      console.log('User is not logged in and trying to access unauthorized page');
    }



  })*/



  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
      // we'll get to this in a bit
    });

}]);

