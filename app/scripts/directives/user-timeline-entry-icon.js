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
          case 'login':
            $scope.model.displayClass = 'fa-sign-in';
            break;
          case 'logout':
            $scope.model.displayClass = 'fa-sign-out';
            break;
          case 'upload':
            $scope.model.displayClass = 'fa-cloud-upload';
            break;
          case 'create':
            $scope.model.displayClass = 'fa-user';
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
