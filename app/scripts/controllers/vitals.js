'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('VitalsCtrl', function ($scope, dreFrontendEntryService, dreFrontendObservations, _, dreFrontEndPatientInfoService, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            vitalsList: [],
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: 'vitals'
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendObservations.getVitalSigns(patientId).then(function (results) {
                $scope.model.vitalsList = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.vitalsList.push({
                        rawEntry: entry,
                        type: dreFrontendGlobals.resourceTypes.Vital.type,
                        additionalInfo: entry.valueQuantity.value + ' ' + (angular.isDefined(entry.valueQuantity.units) && entry.valueQuantity.units != '1' ? entry.valueQuantity.units : ''),
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        updates: 1
                    });
                });
            });
        });
    });
