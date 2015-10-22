'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MedicationInfoCtrl
 * @description
 * # MedicationInfoCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationInfoCtrl', function ($scope, $modalInstance, item) {
        $scope.model = {
            medication: item,
            currentTab: 'details'
        };
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.setTab = function (tab) {
            $scope.model.currentTab = tab;
        }
    });
