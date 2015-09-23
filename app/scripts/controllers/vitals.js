'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('VitalsCtrl', function ($scope, dreFrontendEntry, dreFrontendObservations, _, dreFrontEndPatientInfo, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            vitalsList: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendObservations.getVitalSigns(patientId).then(function (results) {
                $scope.model.vitalsList = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.vitalsList.push({
                        rawEntry: entry,
                        type: 'ObservationVital',
                        additionalInfo: entry.valueQuantity.value + ' ' + (angular.isDefined(entry.valueQuantity.units) && entry.valueQuantity.units != '1' ? entry.valueQuantity.units : ''),
                        title: dreFrontendEntry.getEntryTitle(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                        dates: dreFrontendEntry.getEntryDates(entry)
                    });
                });
            });
        });
    });
