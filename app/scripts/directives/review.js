"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:diffForm
 * @description
 * # diffForm
 */

angular.module('dreFrontendApp')
    .directive('review', function (_, $log) {
        return {
            templateUrl: 'views/directives/matches.html',
            restrict: 'AE',
            scope: {
                matches: "="
            },
            link: function (scope, element, attrs, ctrl) {
                scope.$watch('matches', function (newValue) {
                    if (newValue) {
                        ctrl.update(newValue);
                    }
                }, true);
            },
            controller: function ($rootScope, $scope, $state, dreFrontendMergeService, dreFrontendGlobals, dreFrontendModalsService) {

                $scope.model = {
                    index: 0,
                    qty: null
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
                    $rootScope.$broadcast(dreFrontendGlobals.recordEvents.updateReviewList, dreFrontendMergeService.removeFromList($scope.model.matches[$scope.model.index]));
//                    _.pullAt($scope.model.matches, $scope.model.index);
                    if ($scope.model.matches.length === 0 && $state.params.group) {
                        $state.go($state.current.name, {group: undefined});
                    }
                };

                $scope.undoAllButton = function () {
                    var item = $scope.model.matches[$scope.model.index];
                    if (item) {
                        _revertChanges(item.changes);
                    }
                };

                $scope.replaceResource = function (isLeft) {
                    var _match = $scope.model.matches[$scope.model.index];
                    var primary_id = (isLeft) ? _match.lhs.id : _match.rhs.id;
                    var dup_id = (isLeft) ? _match.rhs.id : _match.lhs.id;
                    dreFrontendMergeService.replace(_match.lhs.resourceType, primary_id, dup_id)
                        .then(_resolveMatch)
                        .catch(function (err) {
                            $log.debug("Replacement error", err);
                        });
                };

                $scope.updateResource = function () {
                    dreFrontendModalsService.showConfirm('Review updates', 'This will update your health record')
                        .then(function (res) {
                            if (res) {
                                dreFrontendMergeService.update($scope.model.matches[$scope.model.index])
                                    .then(_resolveMatch)
                                    .catch(function (err) {
                                        $log.debug("Update error", err);
                                    });
                            }
                        });
                };

                $scope.ignoreMatch = function () {
                    dreFrontendModalsService.showConfirm('Review updates', 'This will update your health record')
                        .then(function (res) {
                            if (res) {
                                dreFrontendMergeService.ignore($scope.model.matches[$scope.model.index])
                                    .then(_resolveMatch)
                                    .catch(function (err) {
                                        $log.debug("Ignore error", err);
                                    });
                            }
                        });
                };

                this.update = function (data) {
                    angular.extend($scope.model, dreFrontendMergeService.formatList(data));
                };

                this.update($scope.matches);
            }
        };
    });
