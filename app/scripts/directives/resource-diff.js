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
            controller: function ($scope, dreFrontendHttp, $log, $http, _, dreFrontendUtil, dreFrontendMergeService,
                                  dreFrontendGlobals, dreFrontendEntryService) {
                $scope.model = {
                    title: '',
                    resource: dreFrontendEntryService.getEntry(
                        $scope.resourceDiff.lhs,
                        '',
                        dreFrontendGlobals.menuRecordTypeEnum.none
                    )
                };

                this.update = function (diff) {
                    if (diff) {
                        $scope.model.title = dreFrontendUtil.camelCaseToString(diff.lhs.resourceType);

                        if (diff.changes) {
                            angular.forEach(diff.changes, dreFrontendMergeService.prepareChangeModel);
                        }
                    }
                };

                this.update($scope.resourceDiff);
            }
        };
    });
