"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:diffForm
 * @description
 * # diffForm
 */

angular.module('dreFrontendApp')
    .directive('diffFrom', function () {
        return {
            templateUrl: 'views/directives/diff-form.html',
            restrict: 'AE',
            scope: {
            },
            controller: function ($scope) {
                return dreFrontendHttp({
                    url: urls.logout,
                    method: 'GET'
                }).then(function (resp) {

                });
            }
        };
    });
