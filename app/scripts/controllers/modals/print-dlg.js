'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:PrintDlgCtrl
 * @description
 * # PrintDlgCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('PrintDlgCtrl', function ($scope, $modalInstance) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    });
