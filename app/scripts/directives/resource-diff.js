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
                scope.$watch('resourceDiff', function (newValue) {
                    if (newValue) {
                        ctrl.update(newValue);
                    }
                }, true);
            },
            controller: function ($scope, $log, dreFrontendUtil, dreFrontendMergeService,
                                  dreFrontendGlobals, dreFrontendEntryService) {
                $scope.model = {
                    title: '',
                    resource: {
                        title: '',
                        dates: {}
                    }
                };

                this.update = function (diff) {
                    if (diff) {
                        if (diff.changes) {
                            angular.forEach(diff.changes, dreFrontendMergeService.prepareChangeModel);
                        }
                        var resource = dreFrontendEntryService.getEntry(
                            diff.lhs, '', dreFrontendGlobals.menuRecordTypeEnum.none
                        );
                        $scope.model.title = dreFrontendUtil.camelCaseToString(diff.lhs.resourceType);
                        $scope.model.resource = resource;
                    }
                };

                this.update($scope.resourceDiff);
            }
        };
    });
