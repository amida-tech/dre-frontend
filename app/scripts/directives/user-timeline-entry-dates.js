'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimelineEntryDates', function (dreFrontendUtil) {
        return {
            template: ' <div><strong><span ng-show="model.startDate" ng-bind="model.startDate"></span>' +
            '<span ng-show="model.endDate || model.isActive"> - </span>' +
            '<span ng-show="model.isActive">Present</span>' +
            '<span ng-show="model.endDate && !model.isActive" ng-bind="model.endDate"></span></strong></div>',
            restrict: 'AE',
            scope: {
                userTimelineEntryDates: '='
            },
            controller: function ($scope) {
                $scope.model = {};
                if ($scope.userTimelineEntryDates) {
                    $scope.model = {
                        startDate: angular.isDefined($scope.userTimelineEntryDates.startDate) ? dreFrontendUtil.formatFhirDate($scope.userTimelineEntryDates.startDate) : undefined,
                        endDate: angular.isDefined($scope.userTimelineEntryDates.endDate) ? dreFrontendUtil.formatFhirDate($scope.userTimelineEntryDates.endDate) : undefined,
                        isActive: angular.isDefined($scope.userTimelineEntryDates.isInactive) ? !$scope.userTimelineEntryDates.isInactive : false
                    };
                }
            }
        };
    });
