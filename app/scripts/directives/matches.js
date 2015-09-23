"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:diffForm
 * @description
 * # diffForm
 */

angular.module('dreFrontendApp')
    .directive('matches', function () {
        return {
            templateUrl: 'views/directives/matches.html',
            restrict: 'AE',
            scope: {
                matches: "="
            },
            controller: function ($scope, _,dreFrontendUtil, $log) {
                var matches=[];

                if ($scope.matches.hasOwnProperty("changeType")) {
                    matches.push({
                        resourceType:"unknown",
                        matchArray: [$scope.matches]
                    });
                } else {
                    angular.forEach($scope.matches, function(res_body, res_type){
                       if (res_type && dreFrontendUtil.isFhirResource(res_type) && res_body[0].hasOwnProperty("changeType")) {
                           matches.push({
                               resourceType: res_type,
                               matchArray: res_body
                           })
                       }
                    });
                }

                $scope.model = {
                    matches: matches
                };
            }
        };
    });
