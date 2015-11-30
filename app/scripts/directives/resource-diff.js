"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:resourceDiff
 * @description
 * # resourceDiff
 */

angular.module('dreFrontendApp')
    .directive('resourceDiff', function ($log, dreFrontendDiff) {
        return {
            templateUrl: 'views/directives/resource-diff.html',
            restrict: 'AE',
            scope: {
                resourceDiff: "="
            },
            link: function ($scope) {
                var _updateModel = function(diff) {
                    if(typeof diff === 'object' && !diff.updating) {
                        dreFrontendDiff.buildDiffView(diff)
                            .then(function (model) {
                                $scope.model = model;
                            });
                    }
                };
                $scope.$watch('resourceDiff', _updateModel, true);
            }
        };
    });
