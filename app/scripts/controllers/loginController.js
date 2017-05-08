
'use strict';

angular.module('driversLoginApp')

  .controller('loginController',
    ['$scope', '$rootScope', '$location', 'LoginService','$state',
      function ($scope, $rootScope, $location, LoginService,$state) {
        // reset login status

        //$scope.userId='city';
        $scope.login = function () {
          //$scope.dataLoading = true;
           LoginService.ClearCredentials();

          console.log($scope);
          //alert(userId);
          alert($scope.userId);
          console.log($scope);
          LoginService.login($scope.userId, callback);
        };
        function callback(response,status) {

          alert(response);
          debugger;
          if (response.data.token != null && response.data.token != '' && response.data.token != undefined) {
             /* if(response.token=="QpwL5tke4Pnpja7X"){*/
                LoginService.SetCredential(response);
                alert(response+" "+"aaaaaaaaaaaaaaaa");

             $state.go('home');
             // $state.transitionTo('home');

          } else {
            $scope.error = response.message;
            $scope.dataLoading = false;
          }
        }
      }]);


