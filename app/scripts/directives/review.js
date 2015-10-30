"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:diffForm
 * @description
 * # diffForm
 */

angular.module('dreFrontendApp')
    .directive('review', function (_, dreFrontendUtil, $log) {
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

                var _revertChanges = function (changes) {
                    _.forEach(changes, function(chng) {
                        if (angular.isArray(chng)) {
                            _revertChanges(chng);
                        } else {
                            chng.apply = true;
                        }
                    });
                };

                $scope.undoAllButton = function () {
                    var item = $scope.model.matches[$scope.model.index];
                    if (item) {
                        _revertChanges(item.changes);
                    }
                };

                $scope.createNewButton = function () {
                    $log.debug("createNew is not implemented");
                };

                $scope.submitButton = function () {
                    $log.debug("saveUpdates is not implemented");
                    $log.debug($scope.model.matches[$scope.model.index]);
                };

                $scope.ignoreButton = function () {
                    $log.debug("ignoreUpdates is not implemented");
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
