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

                uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    var issues = [];
                    angular.forEach(_.pluck(response.entry, "resource"), function(v,k){
                        if (v && v.resourceType === "OperationOutcome") {
                            angular.merge(issues, v.issue);
                        }
                    });
                    $scope.model = {issues: color_issues(issues)};
                };
                uploader.onErrorItem = function(fileItem, response, status, headers) {
                    $scope.model = {
                        issues: color_issues(response.issue)
                   };
                };
                uploader.onCancelItem = function(fileItem, response, status, headers) {
                    /* add handler here */
                };
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    /* add handler here */
                };
                uploader.onCompleteAll = function() {
                    /* add handler here */
                };

            }
        };
    });
