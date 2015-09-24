'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('RecordHistoryCtrl', function ($scope,dreFrontEndPatientInfoService) {
    $scope.model = {
        userName : '-',
      lastUpdate: new Date(),
      actionsList:[]
    };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
  });
