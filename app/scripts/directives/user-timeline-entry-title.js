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
        switch ($scope.userTimelineEntryTitle.type){
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
          case 'MedicationPrescription':
            $scope.model.actionTitle = $scope.userTimelineEntryTitle.title;
            break;
          default:
            $scope.model.actionTitle = '';
        }
      }
    };
  });
