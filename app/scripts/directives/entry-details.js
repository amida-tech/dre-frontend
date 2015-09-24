'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('entryDetails', function () {
        return {
            templateUrl: 'views/directives/entry-details.html',
            restrict: 'AE',
            scope: {
                entryDetails: '='
            },
            controller: function ($scope, dreFrontendEntryService) {
                $scope.model = {
                    data: [],
                    wasLoaded: false,
                    blackList: ['reference', 'patient', 'meta', 'resourceType', 'id', 'subject']
                };

                if (!$scope.model.wasLoaded && $scope.entryDetails) {
                    if ($scope.entryDetails.loadAll) {
                        $scope.entryDetails.loadAll().then(function () {
                            $scope.model.data = dreFrontendEntryService.buildTable($scope.entryDetails, $scope.model.blackList);
                            $scope.model.wasLoaded = true;
                        });
                    } else {
                        $scope.model.data = dreFrontendEntryService.buildTable($scope.entryDetails, $scope.model.blackList);
                        $scope.model.wasLoaded = true;
                    }
                }
            }
        };
    });
