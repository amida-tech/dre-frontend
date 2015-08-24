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
      template: '<a class="timeline-entry-icon text-center center-block" ng-click="toggleDetails()"> <i class="fa fa-2x {{model.actionClass}}"></i></a>',
      restrict: 'AE',
      scope: {
        userTimelineEntryIcon: '='
      },
      controller: function ($scope) {
        $scope.model = {
          actionClass:''
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
          default:
            $scope.model.actionClass = '';
        }
        $scope.toggleDetails = function(){
          $scope.userTimelineEntryIcon.isDetailsOpen = !($scope.userTimelineEntryIcon.isDetailsOpen || false);
        }
      }
    };
  });
