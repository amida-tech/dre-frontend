"use strict";
/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:uploadForm
 * @description
 * # uploadForm
 */

angular.module('dreFrontendApp')
    .directive('uploadForm', function () {
        return {
            templateUrl: 'views/directives/upload-form.html',
            restrict: 'AE',
            scope: {
                uploadError: '=',
                uploadSuccess: '='
            },
            controller: function ($scope, dreFrontendEnvironment, FileUploader) {
                var uploader = $scope.uploader = new FileUploader({
                    url: dreFrontendEnvironment.baseServerUrl + '/storage',
                    withCredentials: true,
                    method:"PUT",
                    removeAfterUpload:1,
                    queueLimit: 1
                });

                var color_issues = function (issues) {
                    angular.forEach(issues, function (v, k) {
                        switch (v.severity) {
                            case 'error':
                                issues[k].severity = "danger";
                                break;
                            case "success":
                                issues[k].severity = "success";
                                break;
                            default:
                                issues[k].severity = "info";
                        }
                    });
                    return issues;
                };

                uploader.onBeforeUploadItem = function () {
                    $scope.model = {};
                };

                uploader.onSuccessItem = $scope.uploadSuccess;

                uploader.onErrorItem = $scope.uploadError || function(fileItem, response) {
                    $scope.model = {
                        issues: color_issues(response.issue)
                   };
                };
            }
        };
    });
