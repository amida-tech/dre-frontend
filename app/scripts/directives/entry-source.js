'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entrySource', function () {
        return {
            templateUrl: 'views/directives/entry-source.html',
            restrict: 'AE',
            scope: {
                entrySource: '='
            },
            controller: function ($scope) {

            }
        };
    });
