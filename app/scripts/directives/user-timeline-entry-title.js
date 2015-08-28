'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('userTimelineEntryTitle', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
    return {
      template: ' <h4> <span class="text-left">{{model.actionTitle}}</span></h4>',
      restrict: 'AE',
      scope: {
        userTimelineEntryTitle: '='
      },
      controller: function ($scope) {
        $scope.model = {
          actionTitle:''
        };
        switch ($scope.userTimelineEntryTitle.actionType){
          case 'login':
            $scope.model.actionTitle = 'Logged in';
            break;
          case 'logout':
            $scope.model.actionTitle = 'Logged out';
            break;
          case 'upload':
            $scope.model.actionTitle = 'Logged out';
            break;
          case 'create':
            $scope.model.actionTitle = 'Account created';
            break;
          case 'medication':
            $scope.model.actionTitle = 'Aspirin';//TODO replace
            break;
          case 'inhaler':
            $scope.model.actionTitle= 'Inhaler';
            break;
          default:
            $scope.model.actionTitle = '';
        }
      }
    };
  });
