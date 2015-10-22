/**
 * Created by igi on 22.10.15.
 */
"use strict";
angular.module('dreFrontendApp')
    .directive('resourcePrintBlockEntry', function () {
        return {
            templateUrl: 'views/directives/resource-print-block-entry.html',
            restrict: 'AE',
            scope: {
                data: "="
            },
            controller: function ($scope, dreFrontendHttp, $log, $http, _, dreFrontendUtil, dreFrontendEntryService) {
                $scope.model = {

                };
            }
        };
    });
