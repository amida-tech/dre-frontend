'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FilesUploadCtrl
 * @description
 * # FilesUploadCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('FilesUploadCtrl', function ($scope, $state) {
        $scope.uploadSuccess = function () {
            $state.go('files');
        };
    });
