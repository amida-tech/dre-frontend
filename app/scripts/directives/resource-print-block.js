/**
 * Created by igi on 22.10.15.
 */
"use strict";
angular.module('dreFrontendApp')
    .directive('resourcePrintBlock', function () {
        return {
            templateUrl: 'views/directives/resource-print-block.html',
            restrict: 'AE',
            scope: {
                data: "="
            },
            controller: function ($scope, dreFrontendHttp, $log, $http, _, dreFrontendUtil, dreFrontendEntryService) {
                $scope.model = {
                    title: $scope.data.title,
                    bundle: ['empty']
                };
            }
        };
    });
