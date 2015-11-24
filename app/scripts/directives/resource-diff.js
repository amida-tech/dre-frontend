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
                    },
                    lhs: {},
                    rhs: {}
                };

                this.update = function (diff) {
                    if (diff) {
                        dreFrontendMergeService.prepareModel(diff);

                        $scope.model.resource = dreFrontendEntryService.getEntry(
                            diff.lhs, '', dreFrontendGlobals.menuRecordTypeEnum.none
                        );
                        $scope.model.title = dreFrontendUtil.camelCaseToString(diff.lhs.resourceType);
                    }
                };

                this.update($scope.resourceDiff);
            }
        };
    });
