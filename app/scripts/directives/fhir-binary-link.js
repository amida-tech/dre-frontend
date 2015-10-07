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
            template: '<a ng-click="getContent()"><i class="fa {{getIcon(docRef.contentType)}}"></i> {{docRef.title}}</a>',
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

                $scope.getIcon = function (mimeType) {
                    var res = "fa-file-o";
                    if (mimeType) {
                        var parts = mimeType.split('/');
                        switch (parts[0]) {
                            case "text":
                                res = (parts[1] === "xml") ? "fa-file-code-o" : "fa-file-text-o";
                                break;
                            case "image":
                                res = "fa-file-image-o";
                                break;
                        }
                    }
                    return res;
                };

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
