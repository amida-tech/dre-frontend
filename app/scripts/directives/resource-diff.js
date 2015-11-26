"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:resourceDiff
 * @description
 * # resourceDiff
 */

angular.module('dreFrontendApp')
    .directive('resourceDiff', function ($log, dreFrontendDiff) {
        return {
            templateUrl: 'views/directives/resource-diff.html',
            restrict: 'AE',
            scope: {
                resourceDiff: "="
            },
            link: function ($scope) {
                if (angular.isObject($scope.resourceDiff)) {
                    dreFrontendDiff.buildDiffView($scope.resourceDiff);
                }

                $scope.$watch('resourceDiff', function (newValue) {
                    if (angular.isObject(newValue)) {
                        $log.debug('updating to', newValue);
                        dreFrontendDiff.buildDiffView(newValue);
                    }
                }, true);
            }
        };
    });
