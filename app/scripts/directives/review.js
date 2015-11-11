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
            controller: function ($scope, dreFrontendMergeService, dreFrontendUtil) {

                $scope.model = {
                    index: 0,
                    qty: 0
                };

                $scope.next = function () {
                    if ($scope.model.index < $scope.model.qty - 1) {
                        $scope.model.index++;
                    }
                };

                $scope.prev = function () {
                    if ($scope.model.index > 0) {
                        $scope.model.index--;
                    }
                };

                var _revertChanges = function (changes) {
                    _.forEach(changes, function (chng) {
                        if (angular.isArray(chng)) {
                            _revertChanges(chng);
                        } else {
                            chng.apply = false;
                        }
                    });
                };

                var _resolveMatch = function () {
                    _.pullAt($scope.model.matches, $scope.model.index);
                    // 2do: update qty in leftside menu
                    $log.debug($scope.model.matches.length);
                };

                $scope.undoAllButton = function () {
                    var item = $scope.model.matches[$scope.model.index];
                    if (item) {
                        _revertChanges(item.changes);
                    }
                };

                $scope.replace = function (isLeft) {
                    var _match = $scope.model.matches[$scope.model.index];
                    var primary_id = (isLeft) ? _match.lhs.id : _match.rhs.id;
                    var dup_id = (isLeft) ? _match.rhs.id : _match.lhs.id;
                    dreFrontendMergeService.replace(_match.lhs.resourceType, primary_id, dup_id)
                        .then(_resolveMatch)
                        .catch(function (err) {
                            $log.debug("Replacement error", err);
                        });
                };

                $scope.update = function () {
                    dreFrontendMergeService.update($scope.model.matches[$scope.model.index])
                        .then(_resolveMatch)
                        .catch(function (err) {
                            $log.debug("Replacement error", err);
                        });
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
