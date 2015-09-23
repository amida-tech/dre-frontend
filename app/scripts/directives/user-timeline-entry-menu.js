'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimelineEntryMenu', function () {
        return {
            templateUrl: 'views/directives/user-timeline-entry-menu.html',
            restrict: 'AE',
            scope: {
                userTimelineEntryMenu: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    currentTab: 'details'
                };
                $scope.setTab = function(tabId){
                    $scope.model.currentTab = tabId;
                    $scope.userTimelineEntryMenu.isDetailsOpen = true;
                }
            }
        };
    });
