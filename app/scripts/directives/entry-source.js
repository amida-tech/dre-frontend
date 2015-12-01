'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entrySource', function (dreFrontendDocumentReference) {
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
                            var docRef = dreFrontendDocumentReference.DocumentReference(resources[n]);
                            $scope.model.links.push(docRef.getLinkData());
                        }
                    });
                } else {
                    $scope.model.links = [];
                }
            }
        };
    });
