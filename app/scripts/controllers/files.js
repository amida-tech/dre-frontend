'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FilesCtrl
 * @description
 * # FilesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('FilesCtrl', function ($scope, $filter, $q, NgTableParams, dreFrontendDocumentReference, dreFrontEndPatientInfo, $log) {
        var files = [];
        var page_size = 50;
        $scope.model = { };

        $scope.getItemContent = function (item){
            item.getBody()
                .then(function(binary){
                    $log.debug(binary);
                });
        };

        function showTable() {
            $scope.model = {
                tableParams: new NgTableParams(
                    {
                        page: 1,
                        count: 10,
                        sorting: {title: 'asc'}
                    },
                    {
                        total: files.length,
                        getData: function ($defer, params) {
                            var orderedData = params.sorting() ?
                                $filter('orderBy')( files, params.orderBy()) : files;
                            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }
                    }
                )
            };
        }

        function proceedBundle(bundle){
            angular.forEach(bundle.entry, function(e){
                var data = {
                    indexed: e.indexed,
                    display: "User uploaded record",
                    getBody: e.getContent
                };

                if (e.type && e.type.coding[0]) {
                    angular.extend(data, e.type.coding[0]);
                }

                if (e.content[0]) {
                    angular.extend(data,e.content[0]);
                }

                files.push(data);
            });
        }

        dreFrontendDocumentReference.getByPatientId(dreFrontEndPatientInfo.getPatientId(),{_count:page_size})
            .then(function(bundle){
                proceedBundle(bundle);

                if (bundle.getPage) {
                    var pages = [];
                    for (var i = 1; i < bundle.total/page_size;i++) {
                        pages.push(bundle.getPage(i));
                    }
                    $q.all(pages).then(function(bundles){
                        angular.forEach(bundles, function (b) {
                            proceedBundle(b);
                        });
                        showTable();
                    });
                } else {
                    showTable();
                }
            });

    });
