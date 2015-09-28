'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:reviewUpdates
 * @description
 * # reviewUpdates
 */
angular.module('dreFrontendApp')
    .directive('reviewUpdates', function() {
        return {
            templateUrl: 'views/directives/review-updates.html',
            restrict: 'E',
            scope: {
                updates: '=',
                entryType: '='
            },
            controller: function($scope) {
                $scope.updatesCount = $scope.updates;
            }
        };
    });
