'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimelineEntry', function () {
        return {
            template: '<div class="row"><i class="col-sm-2 h_line"></i></div>\
            <div class="row"><div class="col-sm-2"> <div user-timeline-entry-icon="userTimelineEntry"></div></div> \
            <div class="col-sm-10"><div user-timeline-entry-body="userTimelineEntry"></div></div></div>',
            restrict: 'AE',
            scope: {
                userTimelineEntry: '='
            },
            link: function ($scope, element) {
            }
        };
    });
