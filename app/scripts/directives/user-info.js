'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('userInfo', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
    return {
      templateUrl: 'views/directives/user-info.html',
      restrict: 'AE',
      scope:{},
      controller: function ($scope) {
        $scope.model = {
          userName: 'Not Implemented',
          avatarUrl: 'images/img-demo.jpg',
          dateOfBorn: new Date()
        };
      }
    };
  });
