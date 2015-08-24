'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('userMeasurements', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
    return {
      templateUrl: 'views/directives/user-measurements.html',
      restrict: 'AE',
      scope:{},
      controller: function ($scope) {
        $scope.model = {
          height:'5`11"',
          weight:'198 lbs',
          BMI:'28.5',
          pressure:'145/88 mmHg'
        };
      }
    };
  });
