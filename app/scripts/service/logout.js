(function () {
    'use strict';

    angular.module('driversLoginApp').controller('LogoutCtrl',LogoutCtrl);
    LogoutCtrl.$inject=['LoginService','$state'];
    function LogoutCtrl(LoginService,$state) {
        console.log('LogoutCtrl');
        alert('done');
        LoginService.ClearCredentials();
        $state.go('login');
    }
})();
