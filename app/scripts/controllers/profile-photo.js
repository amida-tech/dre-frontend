'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ProfilePhotoCtrl
 * @description
 * # ProfilePhotoCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ProfilePhotoCtrl', function ($scope, dreFrontEndPatientInfoService) {
        $scope.model = {
            patient: undefined
        };
        dreFrontEndPatientInfoService
            .getPatientData()
            .then(function (patient) {
                $scope.model.patient = patient;
            });
    });
