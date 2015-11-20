'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimelineEntryDates', function (dreFrontendUtil, $log) {
        return {
            template: '<div ng-show="userTimelineEntryDates.dates.startDate"><strong>\
<span>{{userTimelineEntryDates.dates.startDate}}</span>\
<span ng-show="userTimelineEntryDates.dates.endDate"> - {{userTimelineEntryDates.dates.endDate}}</span>\
</strong></div>',
            restrict: 'AE',
            scope: {
                userTimelineEntryDates: '='
            }
        };
    });
