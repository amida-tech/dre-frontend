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
            list: [],
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: dreFrontendGlobals.resourceTypes.Vital.type,
            title: dreFrontendGlobals.resourceTypes.Vital.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendObservations.getVitalSigns(patientId).then(function (results) {
                $scope.model.list = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.list.push({
                        rawEntry: entry,
                        type: dreFrontendGlobals.resourceTypes.Vital.type,
                        additionalInfo: dreFrontendEntryService.getEntryAddInfo(entry),
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        updates: 1
                    });
                });
            });
        });
    });
