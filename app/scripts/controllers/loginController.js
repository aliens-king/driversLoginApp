'use strict';

angular.module('driversLoginApp')

  .controller('loginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
      function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status

        //$scope.userId='city';
        $scope.login = function () {
          $scope.dataLoading = true;
          alert('kkkkkkkkkkkkk');
          //alert(userId);
          alert($scope.userId);
          console.log($scope);
          AuthenticationService.login($scope.userId, callback);
        };
        function callback(response) {
          alert(response);
          debugger;
          if (response.data.token != null && response.data.token != '' && response.data.token != undefined) {

            $location.path('/home');
          } else {
            $scope.error = response.message;
            $scope.dataLoading = false;
          }
        };
      }]);

