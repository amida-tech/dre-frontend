'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entrySource', function (dreFrontendDocumentReference, $log) {
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
                        var docRef;
                        for (var n = 0; n < resources.length; n++) {
                            if (resources[n]) {
                                docRef = dreFrontendDocumentReference.DocumentReference(resources[n]);
                                $scope.model.links.push(docRef.getLinkData());
                            } else {
                                $scope.model.links.push(docRef);
                            }
                        }
                        $log.debug($scope.model.links);
                    });
                } else {
                    $scope.model.links = [];
                }
            }
        };
    });
