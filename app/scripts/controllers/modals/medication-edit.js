'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MedicationEditCtrl
 * @description
 * # MedicationEditCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationEditCtrl', function ($scope, $modalInstance, item) {
        $scope.model = {
            medication: item,
            step: "0",
            searchType: undefined
        };

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.setStep = function (step) {
            $scope.model.step = step;
        };

        $scope.setSearchType = function (searchType) {

        };
    });
