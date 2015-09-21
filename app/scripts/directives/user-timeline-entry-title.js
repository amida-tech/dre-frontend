'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userTimelineEntryTitle', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals) {
        return {
            template: ' <h4> <span class="text-left">{{model.actionTitle}}</span></h4>',
            restrict: 'AE',
            scope: {
                userTimelineEntryTitle: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    actionTitle: $scope.userTimelineEntryTitle.title
                };
            }
        };
    });
