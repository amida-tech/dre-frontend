'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('AccountCtrl', function ($scope, dreFrontendAuthService) {
        $scope.model = {
            oldPassword: "",
            newPassword: "",
            retypeNewPassword: "",
        };
        $scope.error = '';
        $scope.isPasswordEquals = function() {
            return ($scope.model.newPassword === $scope.model.retypeNewPassword);
        };

        $scope.updatePassword = function() {
            dreFrontendAuthService.changePassword($scope.model.oldPassword, $scope.model.newPassword).then(function(response) { }, function(reason) {
                $scope.error = reason;
            });

        }
  });
