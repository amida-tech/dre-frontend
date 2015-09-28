'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:pendingUpdates
 * @description
 * # pendingUpdates
 */
angular.module('dreFrontendApp')
    .directive('pendingUpdates', function() {
        return {
            templateUrl: 'views/directives/pending-updates.html',
            restrict: 'AE',
            scope: {
                recordEntry: '='
            },
            controller: function($scope) {
                $scope.merge = function(){}
            }
        };
    });
