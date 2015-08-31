'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
  .directive('entryDetails', function () {
    return {
      template: 'views/directives/entry-details.html',
      restrict: 'AE',
      scope: {
        entryDetails: '='
      },
      controller: function ($scope) {
        $scope.model = {
          detailRows: [{key: 'Status', value: 'Completed'},{key: 'Sig', value: 'Aspirin'}]
        };
      }
    };
  });
