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
      '<i class="fa fa-2x {{model.actionClass}}"></i></a>',
      restrict: 'AE',
      scope: {
        userTimelineEntryIcon: '='
      },
      controller: function ($scope) {
        $scope.model = {
          actionClass:'',
          isInactive : $scope.userTimelineEntryIcon.isInactive
        };
        switch ($scope.userTimelineEntryIcon.actionType){
          case 'login':
            $scope.model.actionClass = 'fa-sign-in';
            break;
          case 'logout':
            $scope.model.actionClass = 'fa-sign-out';
            break;
          case 'upload':
            $scope.model.actionClass = 'fa-cloud-upload';
            break;
          case 'create':
            $scope.model.actionClass = 'fa-user';
            break;
          case 'medication':
            $scope.model.actionClass = 'icon-pill';
            break;
          case 'inhaler':
            $scope.model.actionClass= 'icon-inhaler';
            break;
          default:
            $scope.model.actionClass = '';
        }
        $scope.toggleDetails = function(){
          $scope.userTimelineEntryIcon.isDetailsOpen = !($scope.userTimelineEntryIcon.isDetailsOpen || false);
        }
      }
    };
  });
