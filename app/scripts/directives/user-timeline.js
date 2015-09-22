'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('userTimeline', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
    return {
      templateUrl: 'views/directives/user-timeline.html',
      restrict: 'AE',
      scope:{
          userTimeline:'='
      },
      controller: function ($scope) {
      }
    };
  });
