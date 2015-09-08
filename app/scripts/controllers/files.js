'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FilesCtrl
 * @description
 * # FilesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('FilesCtrl', function ($scope, $filter, dreFrontendFilesService, NgTableParams) {
        $scope.model = {
            total: 0
        };
        dreFrontendFilesService.getFiles()
            .then(function (data) {
                $scope.model = {
                    total: data.storage.length,
                    tableParams: new NgTableParams(
                        {
                            page: 1,
                            count: 25,
                            sorting: {file_name: 'asc'}
                        },
                        {
                            total: data.storage.length,
                            getData: function ($defer, params) {
                                // use build-in angular filter
                                var orderedData = params.sorting() ?
                                    $filter('orderBy')(data.storage, params.orderBy()) : data.storage;
                                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        }
                    )
                };
            });
    });
