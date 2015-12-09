'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entrySource', function (FhirDocumentReference) {
        return {
            templateUrl: 'views/directives/entry-source.html',
            restrict: 'AE',
            scope: {
                entrySource: '=',
                withoutHeader: '='
            },
            controller: function ($scope) {
                $scope.model = {
                    links: []
                };
                if ($scope.entrySource) {
                    $scope.entrySource.getSources().then(function (resources) {
                        $scope.model.links = [];
                        for (var n = 0; n < resources.length; n++) {
                            if (resources[n] instanceof FhirDocumentReference) {
                                $scope.model.links.push(resources[n].getLinkData());
                            } else {
                                $scope.model.links.push(resources[n]);
                            }
                        }
                    });
                } else {
                    $scope.model.links = [];
                }
            }
        };
    });
