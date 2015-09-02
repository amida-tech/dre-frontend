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
          case 'initAccount':
          case 'loggedIn':
          case 'loggedOut':
          case 'fileUploaded':
          case 'fileDownloaded':
          case 'labResults':
          case 'passwordChange':
          case 'infoUpdate':
          case 'medUpdate':
          case 'MedicationPrescription':
            $scope.model.actionTitle = $scope.userTimelineEntryTitle.title;
            break;
          default:
            $scope.model.actionTitle = '';
        }
      }
    };
  });
