(function () {
  'use strict';
  angular.module('driversLoginApp').factory('FlashService', FlashService);
  FlashService.$inject = ['$rootScope', '$timeout'];
  function FlashService($rootScope, $timeout) {
    var service = {};
    //service.Success = Success;
    service.Error = Error;
    initService();
    return service;

    function initService() {
      $rootScope.$on('$locationChangeStart', function () {
   //     clearFlashMessage();
      });

      function Success(message, keepAfterLocationChange) {
        $rootScope.flash = {
          message: message,
          type: 'success',
          keepAfterLocationChange: keepAfterLocationChange
        };
        ExpireFlash();
      }

      function Error(message, keepAfterLocationChange) {
        $rootScope.flash = {
          message: message,
          type: 'error',
          keepAfterLocationChange: keepAfterLocationChange
        };
        ExpireFlash();

      }
    }


    function ExpireFlash() {
      $timeout(function () {
        delete $rootScope.flash;
      }, 5000);
    }
  }

})();
