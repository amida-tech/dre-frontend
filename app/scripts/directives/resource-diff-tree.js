"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:resourceDiff
 * @description
 * # resourceDiff
 */

angular.module('dreFrontendApp')
    .directive('resourceDiffTree', function () {
        return {
            templateUrl: 'views/directives/resource-diff-tree.html',
            restrict: 'AE',
            scope: {
                data: "="
            },
            link: function ($scope) {
                var _update = function (lhs, rhs) {
                    if (angular.isObject(lhs) && angular.isObject(rhs)) {
                        $scope.model = [];
                        for (var n = 0; n < lhs.length; n++) {
                            $scope.model.push({
                                lhs: lhs[n],
                                rhs: rhs[n]
                            });
                        }
                    }
                };

                $scope.$watch('data', function (newData) {
                    if (newData && newData.lhs.view && newData.rhs.view) {
                        _update(newData.lhs.view, newData.rhs.view);
                    }
                },true);
            }
        };
    });
