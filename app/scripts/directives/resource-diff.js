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
            controller: function ($scope, dreFrontendHttp, $log, $http, _, dreFrontendUtil, dreFrontendEntryService) {
                $scope.model = {};

                function _build_differences(diff) {
                    var differences = [];

                    var f = function(rec) {

                        if (angular.isArray(rec)) {
                            angular.forEach(rec,f);
                        } else if (angular.isObject(rec)) {
                            if (rec.path) {
                                var r, l;
                                r = dreFrontendUtil.buildObjectByPath(rec.path, rec.rhs);
                                l = dreFrontendUtil.buildObjectByPath(rec.path, rec.lhs);

                                differences.push({
                                    apply: true,
                                    kind: rec.kind,
                                    lhs: dreFrontendEntryService.buildTable(l, []),
                                    rhs: dreFrontendEntryService.buildTable(r, [])
                                });
                            } else {
                                $log.debug("no path", rec);
                            }
                        }
                    };

                    if (diff.changes) {
                        angular.forEach(diff.changes, f);
                    }

                    return {
                        diff : differences,
                        rhs_type: diff.rhs.resourceType,
                        lhs_type: diff.lhs.resourceType
                    };
                }

                $scope.model = _build_differences($scope.resourceDiff);
            }
        };
    });
