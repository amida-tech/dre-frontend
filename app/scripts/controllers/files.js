'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FilesCtrl
 * @description
 * # FilesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('FilesCtrl', function ($scope, $filter, $q, $state, NgTableParams, dreFrontendDocumentReference,
                                       dreFrontendAuthService, dreFrontEndPatientInfoService, FileSaver) {
        var files = [];
        var page_size = 50;
        $scope.model = {};

        function openSaveAsDialog(filename, content, mediaType) {
            var save_data = {
                data: [content],
                filename: filename,
                options: {type: mediaType}
            };
            FileSaver.saveAs(save_data);
        }


        $scope.getItemContent = function (item) {
            if (!item.binary) {
                item.getBody()
                    .then(function (binary) {
                        item.binary = binary;
                        openSaveAsDialog(item.title, atob(binary.content), binary.contentType);
                    });
            } else {
                openSaveAsDialog(item.title, atob(item.binary.content), item.binary.contentType);
            }
        };

        function showTable() {
            if (files.length) {
                $scope.model = {
                    tableParams: new NgTableParams(
                        {
                            page: 1,
                            count: 10,
                            sorting: {title: 'asc'}
                        },
                        {
                            counts: [],
                            total: files.length,
                            getData: function ($defer, params) {
                                var orderedData = params.sorting() ?
                                    $filter('orderBy')(files, params.orderBy()) : files;
                                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                            }
                        }
                    )
                };
            }
        }

        dreFrontEndPatientInfoService.getPatientId()
            .then(function (patientId) {
                return dreFrontendDocumentReference.getByPatientId(patientId, {_count: page_size});
            })
            .then(function (bundle) {
                return dreFrontendDocumentReference.getFileList(bundle);
            })
            .then(function (list) {
                files = list;
                showTable();
            });
    });
