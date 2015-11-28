"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:resourceDiff
 * @description
 * # resourceDiff
 */

angular.module('dreFrontendApp')
    .directive('resourceDiffTree', function ($log, $compile) {
        return {
            template: '<div class="details-table"></div>',
            restrict: 'AE',
            scope: {
                data: "=",
                lhs: "=",
                rhs: "="
            },
            link: function ($scope, element) {
                $log.debug($scope.lhs, $scope.rhs);
                if (angular.isObject($scope.lhs) || angular.isObject($scope.rhs)) {
                    $log.debug($scope.lhs, $scope.rhs);

                    $compile(element.contents())($scope);
                }

                $scope.$watch('lhs', function (newLhs) {
                    $log.debug(newLhs);
                });

                $scope.$watch('rhs', function (newRhs) {
                    $log.debug(newRhs);
                });
            }
        };
    });
