"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:fhirBinaryLink
 * @description
 * # fhirBinaryLink
 */

angular.module('dreFrontendApp')
    .directive('fhirBinaryLink', function () {
        return {
            template: '<a ng-click="getContent()">{{docRef.title}}</a>',
            restrict: 'AE',
            scope: {
                docRef: "="
            },
            controller: function ($scope, FileSaver, $log) {

                function openSaveAsDialog(filename, content, mediaType) {
                    var save_data = {
                        data: [content],
                        filename: filename,
                        options: {type: mediaType}
                    };
                    FileSaver.saveAs(save_data);
                }


                $scope.getContent = function () {
                    if (!$scope.docRef.binary) {
                        $scope.docRef.getBody().then(function (docRef) {
                            $scope.docRef.binary = docRef;
                            openSaveAsDialog($scope.docRef.title, atob(docRef.content), docRef.contentType);
                        });
                    } else {
                        openSaveAsDialog($scope.docRef.title, atob($scope.docRef.binary.content), $scope.docRef.binary.contentType);
                    }
                };
            }
        };
    });
