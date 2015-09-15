'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationsCtrl', function ($scope, dreFrontendMedications, _, dreFrontEndPatientInfo,dreFrontendUtil) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            showInactive: false,
            medicationsList: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendMedications.getByPatientId(patientId).then(function (medications) {
                $scope.model.medicationsList = [];
                _.forEach(medications.entry, function (entry) {
                    if (angular.isObject(entry.medication)) {
                        $scope.model.medicationsList.push({
                            rawEntry: entry,
                            type: entry.resourceType,
                            isInactive: entry.status != 'active',
                            title: entry.medication.name,
                            startDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? dreFrontendUtil.formatFhirDate(entry.dispense.validityPeriod.start) : undefined,
                            stopDate: angular.isDefined(entry.dispense) && angular.isDefined(entry.dispense.validityPeriod) ? dreFrontendUtil.formatFhirDate(entry.dispense.validityPeriod.stop) : undefined
                        })
                    }
                });
            });
        });
    });
