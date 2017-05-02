'use strict';

angular.module('driversLoginApp')

  .controller('loginController',
    ['$scope', '$rootScope', '$location','LoginService',
      function ($scope, $rootScope, $location,  LoginService) {
        // reset login status

        //$scope.userId='city';
        $scope.login = function () {
          $scope.dataLoading = true;
          alert('kkkkkkkkkkkkk');
          //alert(userId);
          alert($scope.userId);
          console.log($scope);
          LoginService.login($scope.userId, callback);
        };
        function callback(response) {
          alert(response);
          debugger;
          if (response.data.token != null && response.data.token != '' && response.data.token != undefined) {
$rootScope.loggedIn=true;
            $location.path('/home');
          } else {
            $scope.error = response.message;
            $scope.dataLoading = false;
          }
        }
      }]);

