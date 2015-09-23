'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MedicationsCtrl', function ($scope, dreFrontendEntry, dreFrontendMedications, _, dreFrontEndPatientInfo, dreFrontendUtil, dreFrontendGlobals) {
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
                    $scope.model.medicationsList.push({
                        rawEntry: entry,
                        type: entry.resourceType,
                        title: dreFrontendEntry.getEntryTitle(entry),
                        dates: dreFrontendEntry.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.popup
                    })
                });
            });
        });
    });
