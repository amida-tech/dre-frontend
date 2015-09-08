"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:uploadForm
 * @description
 * # uploadForm
 */

angular.module('dreFrontendApp')
    .directive('uploadForm', function (dreFrontendAuthService, dreFrontendEnvironment, $state,FileUploader) {
        var upload_url = dreFrontendEnvironment.baseServerUrl + '/storage';
        return {
            templateUrl: 'views/directives/upload-form.html',
            restrict: 'AE',
            scope: {},
            controller: function ($scope) {
                var uploader = $scope.uploader = new FileUploader({
                    url:upload_url,
                    withCredentials: true,
                    method:"PUT",
                    queueLimit: 1
                });

                uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    console.info('onSuccessItem', fileItem, response, status, headers);
                };
                uploader.onErrorItem = function(fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };
                uploader.onCancelItem = function(fileItem, response, status, headers) {
                    console.info('onCancelItem', fileItem, response, status, headers);
                };
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    console.info('onCompleteItem', fileItem, response, status, headers);
                };
                uploader.onCompleteAll = function() {
                    console.info('onCompleteAll');
                };

            }
        };
    });
