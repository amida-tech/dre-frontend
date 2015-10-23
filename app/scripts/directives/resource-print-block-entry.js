/**
 * Created by igi on 22.10.15.
 */
"use strict";
angular.module('dreFrontendApp')
    .directive('resourcePrintBlockEntry', function () {
        return {
            templateUrl: 'views/directives/resource-print-block-entry.html',
            restrict: 'AE',
            scope: {
                data: "=",
                showUserData:"=",
                type: "="
            },
            controller: function ($scope, $injector, dreFrontendEntryService) {
                $scope.model = {
                    type: $scope.type,
                    title: dreFrontendEntryService.getEntryTitle($scope.data),
                    additionalInfo: dreFrontendEntryService.getEntryAddInfo($scope.data),
                    dates: dreFrontendEntryService.getEntryDates($scope.data),
                    rawEntry: $scope.data
                };
            }

        };
    });
