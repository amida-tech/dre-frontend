'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimelineEntryInlineInfo', function () {
        return {
            templateUrl: 'views/directives/user-timeline-entry-inline-info.html',
            restrict: 'AE',
            scope: {
                userTimelineEntryInlineInfo: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    currentTab: 'details'
                };
                $scope.setTab = function (tabId) {
                    if (tabId !== $scope.model.currentTab) {
                        $scope.model.currentTab = tabId;
                        $scope.userTimelineEntryInlineInfo.isDetailsOpen = true;
                    } else {
                        $scope.userTimelineEntryInlineInfo.isDetailsOpen = !$scope.userTimelineEntryInlineInfo.isDetailsOpen;
                    }
                };
            }
        };
    });
