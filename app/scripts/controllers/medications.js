'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('MedicationsCtrl', function ($scope,dreFrontendMedications,_, dreFrontEndPatientInfo) {
    $scope.model = {
      userName : '-',
      lastUpdate: new Date(),
      showInactive: false,
      medicationsList:[]
    };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getOfficialName()[0];
        });
    dreFrontendMedications.getByPatientId(dreFrontEndPatientInfo.getPatientId()).then(function(medications){
      $scope.model.medicationsList = [];
      _.forEach(medications.entry, function(entry){
        if(angular.isObject(entry.medication)){
          $scope.model.medicationsList.push({
            rawEntry: entry,
            type: entry.resourceType,
            isInactive: entry.status != 'active',
            title: entry.medication.name,
            startDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? entry.dispense.validityPeriod.start : undefined,
            stopDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? entry.dispense.validityPeriod.stop : undefined
          })
        }
      });
    });
  });
