"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:diffForm
 * @description
 * # diffForm
 */

angular.module('dreFrontendApp')
    .directive('matches', function (_, dreFrontendUtil, $log) {
        return {
            templateUrl: 'views/directives/matches.html',
            restrict: 'AE',
            scope: {
                matches: "="
            },
            link: function(scope, element, attrs, ctrl) {
                scope.$watch('matches', function(newValue, oldValue) {
                    if (newValue)
                        ctrl.format_matches(newValue);
                }, true);
            },
            controller: function ($scope) {

                $scope.undoAllButton = function() {
                    $log.debug("undoAllButton() is not implemented");
                };

                $scope.createNewButton = function() {
                    $log.debug("createNewButton() is not implemented");
                };

                $scope.submitButton = function() {
                    $log.debug("submitButton() is not implemented");
                };

                $scope.ignoreButton = function() {
                    $log.debug("ignoreButton() is not implemented");
                };
                $scope.model = {
                };
                this.format_matches = function(src_matches) {
                    var matches=[];

                    if ($scope.matches) {
                        if ($scope.matches.hasOwnProperty("changeType")) {
                            matches.push({
                                resourceType: "unknown",
                                matchArray: [src_matches]
                            });
                        } else {
                            angular.forEach($scope.matches, function (res_body, res_type) {
                                if (res_type && dreFrontendUtil.isFhirResource(res_type) && res_body[0].hasOwnProperty("changeType")) {
                                    matches.push({
                                        resourceType: res_type,
                                        matchArray: res_body
                                    })
                                }
                            });
                        }
                    }

                    $scope.model.matches= matches;
                };

                this.format_matches($scope.matches);
            }
        };
    });
