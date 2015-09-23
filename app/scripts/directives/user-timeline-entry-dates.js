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
                $scope.model = {
                    startDate: angular.isDefined($scope.userTimelineEntryDates.dates.startDate) ? dreFrontendUtil.formatFhirDate($scope.userTimelineEntryDates.dates.startDate) : undefined,
                    endDate: angular.isDefined($scope.userTimelineEntryDates.dates.endDate) ? dreFrontendUtil.formatFhirDate($scope.userTimelineEntryDates.dates.endDate) : undefined,
                    isActive: angular.isDefined($scope.userTimelineEntryDates.dates.isInactive) ? !$scope.userTimelineEntryDates.dates.isInactive : false
                };

            }
        };
    });
