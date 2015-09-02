'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('MedicationsCtrl', function ($scope,dreFrontendMedications,_) {
    $scope.model = {
      firstName : 'Not implemented',
      lastUpdate: new Date(),
      showInactive: false,
      medicationsList:[]
    };
    dreFrontendMedications.getByPatientId(3768).then(function(medications){
      $scope.model.medicationsList = [];
      _.forEach(medications.entry, function(entry){
        $scope.model.medicationsList.push({
          rawEntry: entry,
          type: entry.resourceType,
          isInactive: entry.status != 'active',
          title: entry.medication.name,
          startDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? entry.dispense.validityPeriod.start : undefined,
          stopDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? entry.dispense.validityPeriod.stop : undefined
        })
      });
    });
    //3768
  });
