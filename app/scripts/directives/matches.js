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
            link: function (scope, element, attrs, ctrl) {
                scope.$watch('matches', function (newValue, oldValue) {
                    if (newValue)
                        ctrl.update(newValue);
                }, true);
            },
            controller: function ($scope) {

                $scope.model = {
                    index: 0,
                    qty:0
                };

                $scope.next = function(){
                    if ($scope.model.index<$scope.model.qty-1) {
                        $scope.model.index++;
                    }
                };

                $scope.prev = function() {
                    if ($scope.model.index>0) {
                        $scope.model.index--;
                    }
                };

                $scope.undoAllButton = function () {
                    $log.debug("undoAllButton() is not implemented");
                };

                $scope.createNewButton = function () {
                    $log.debug("createNewButton() is not implemented");
                };

                $scope.submitButton = function () {
                    $log.debug("submitButton() is not implemented");
                    $log.debug(model.matches[model.index]);
                };

                $scope.ignoreButton = function () {
                    $log.debug("ignoreButton() is not implemented");
                };

                var _format_matches = function (src_matches) {
                    var res = {
                        matches: [],
                        qty: 0
                    };
                    if (src_matches) {
                        if (angular.isArray(src_matches)) {
                            res.matches = src_matches;
                            res.qty = src_matches.length;
                        } else {
                            if (src_matches.hasOwnProperty("changeType")) {
                                res.matches.push(src_matches);
                            } else {
                                angular.forEach(src_matches, function (_body, _key) {
                                    if (_key && dreFrontendUtil.isFhirResource(_key)) {
                                        res.matches = res.matches.concat(_body)
                                    }
                                });
                            }
                        }
                        res.qty = res.matches.length;
                    }
                    return res;
                };

                var _update = function (data) {
                    angular.extend($scope.model, _format_matches(data));
                };

                _update($scope.matches);

                this.update = _update;
            }
        };
    });
