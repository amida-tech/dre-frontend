'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entrySource', function (dreFrontendProvenance) {
        return {
            templateUrl: 'views/directives/entry-source.html',
            restrict: 'AE',
            scope: {
                entrySource: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    links: []
                };
                if ($scope.entrySource) {
                    dreFrontendProvenance.getResourceSources($scope.entrySource.resourceType, $scope.entrySource.id).then(function (sources) {
                        $scope.model.links = sources;
                    });
                }else{
                    $scope.model.links = [];
                }
            }
        };
    });
