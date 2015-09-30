'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimeline', function () {
        return {
            template: '<div class="blocks"><div ng-repeat="item in userTimeline" user-timeline-entry="item"></div></div>',
            restrict: 'AE',
            scope: {
                userTimeline: '='
            }
        };
    });
