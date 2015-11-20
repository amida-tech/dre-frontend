/**
 * Created by igi on 18.11.15.
 */
"use strict";

angular.module('dreFrontendApp')
.directive('resourceDiffPath', function($log){
        return {
            templateUrl: "views/directives/resource-diff-path.html",
            restrict: 'AE',
            path: '=',
            controller: function($scope){
                $log.debug($scope.path);
            }
        };
    });
