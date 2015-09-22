"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:diffForm
 * @description
 * # diffForm
 */

angular.module('dreFrontendApp')
    .directive('diffForm', function () {
        return {
            templateUrl: 'views/directives/diff-form.html',
            restrict: 'AE',
            scope: {},
            controller: function ($scope, dreFrontendHttp, $log, $http, _, dreFrontendUtil, dreFrontendEntry) {
                $scope.model = {};
                return $http({
                    url: 'mock/diff/p-merge',
                    /* url: 'mock/diff/b-0', */
                    method: 'GET'
                }).then(function (resp) {
                    var diff = resp.data;
                    var differences = [];
                    angular.forEach(diff.changes, function (rec) {
                        var r, l;
                        r = dreFrontendUtil.buildObjectByPath(rec.path, rec.rhs);
                        l = dreFrontendUtil.buildObjectByPath(rec.path, rec.lhs);

                        differences.push({
                            kind: rec.kind,
                            lhs: dreFrontendEntry.buildTable(l, []),
                            rhs: dreFrontendEntry.buildTable(r, [])
                        });
                    });
                    $log.debug(resp.data);
                    $scope.model = {
                        diff : differences,
                        rhs_type: diff.rhs.resourceType,
                        lhs_type: diff.lhs.resourceType
                    };
                });
            }
        };
    });
