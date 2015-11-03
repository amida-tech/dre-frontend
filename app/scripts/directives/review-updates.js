'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:reviewUpdates
 * @description
 * # reviewUpdates
 */
angular.module('dreFrontendApp')
    .directive('reviewUpdates', function() {
        return {
            template: '<div class="text-center" ng-if="updates > 0">'+
            '<i class="fa fa-flag-o" style="margin-right: 10px;"></i>'+
            '{{updates}} update<span ng-show="updates > 1" class="">s</span> to your {{entryType}} requiring review.</div>',
            restrict: 'E',
            scope: {
                updates: '=',
                entryType: '='
            },
            controller: function($scope) {}
        };
    });
