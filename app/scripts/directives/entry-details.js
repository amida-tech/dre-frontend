'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('entryDetails', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
    return {
      template: 'views/directives/entry-details.html',
      restrict: 'AE',
      scope: {
        entryDetails: '='
      },
      controller: function ($scope) {
        $scope.model = {
          displayClass: '',
          isInactive: false
        };
        switch ($scope.userTimelineEntryIcon.type) {
          case 'MedicationPrescription':

            break;
          default:

        }
      }
    };
  });
