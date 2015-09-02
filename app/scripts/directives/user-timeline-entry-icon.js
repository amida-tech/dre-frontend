'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('userTimelineEntryIcon', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
    return {
      template: '<a class="text-center center-block" ng-class="{\'timeline-entry-icon\': !model.isInactive, ' +
      '\'timeline-entry-icon-inactive\': model.isInactive}" ng-click="toggleDetails()"> ' +
      '<i class="fa fa-ban fa-stack-2x fa-rotate-90" ng-if="model.isInactive"></i>' +
      '<i class="fa fa-2x {{model.displayClass}}"></i></a>',
      restrict: 'AE',
      scope: {
        userTimelineEntryIcon: '='
      },
      controller: function ($scope) {
        $scope.model = {
          displayClass: '',
          isInactive: false
        };
        switch ($scope.userTimelineEntryIcon.type) {
          case 'initAccount':
            $scope.model.displayClass = 'fa-user';
            break;
          case 'loggedIn':
            $scope.model.displayClass = 'fa-sign-in';
            break;
          case 'loggedOut':
            $scope.model.displayClass = 'fa-sign-out';
            break;
          case 'fileUploaded':
            $scope.model.displayClass = 'fa-cloud-upload';
            break;
          case 'fileDownloaded':
            $scope.model.displayClass = 'fa-cloud-download';
            break;
          case 'labResults':
            $scope.model.displayClass = 'fa-flask';
            break;
          case 'passwordChange':
            $scope.model.displayClass = 'fa-cog';
            break;
          case 'infoUpdate':
            $scope.model.displayClass = 'fa-pencil';
            break;
          case 'medUpdate':
            $scope.model.displayClass = 'icon-pill';
            break;
          case 'MedicationPrescription':
            $scope.model.displayClass = 'icon-pill';
            $scope.model.isInactive = $scope.userTimelineEntryIcon.isInactive;
            break;
          /*case 'inhaler':
           $scope.model.actionClass= 'icon-inhaler';
           break;*/
          default:
            $scope.model.displayClass = '';
        }
        $scope.toggleDetails = function () {
          $scope.userTimelineEntryIcon.isDetailsOpen = !($scope.userTimelineEntryIcon.isDetailsOpen || false);
        }
      }
    };
  });
