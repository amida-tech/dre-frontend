"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:resourceDiff
 * @description
 * # resourceDiff
 */

angular.module('dreFrontendApp')
    .directive('resourceDiff', function () {
        return {
            templateUrl: 'views/directives/resource-diff.html',
            restrict: 'AE',
            scope: {
                resourceDiff: "="
            },
            link: function (scope, element, attrs, ctrl) {
                scope.$watch('resourceDiff', function (newValue, oldValue) {
                    if (newValue)
                        ctrl.update(newValue);
                }, true);
            },
            controller: function ($scope, dreFrontendHttp, $log, $http, _, dreFrontendUtil, dreFrontendEntryService) {
                $scope.model = {
                  title:''
                };
                function _build_differences(diff) {

                    var f = function (change) {

                        if (angular.isArray(change)) {
                            angular.forEach(change, f);
                        } else if (angular.isObject(change) && !change.model) {
                            if (change.path) {
                                var r = dreFrontendUtil.buildObjectByPath(change.path, change.rhs);
                                var l = dreFrontendUtil.buildObjectByPath(change.path, change.lhs);
                                var path = dreFrontendUtil.buildObjectByPath(change.path, "");

                                change.apply = true;
                                change.model = {
                                    path: dreFrontendEntryService.buildTable(path, []),
                                    lhs: dreFrontendEntryService.buildTable(change.lhs, []),
                                    rhs: dreFrontendEntryService.buildTable(change.rhs, [])
                                };
                            } else {
                                $log.debug("no path", change);
                            }
                        }
                    };

                    $scope.model.title = dreFrontendUtil.camelCaseToString(diff.lhs.resourceType);

                    if (diff.changes) {
                        angular.forEach(diff.changes, f);
                    }
                }

                this.update = function (data) {
                    if (data) {
                        _build_differences(data);
                    }
                };

                this.update($scope.resourceDiff);
            }
        };
    });
