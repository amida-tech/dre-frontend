'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('EncountersCtrl', function ($scope, dreFrontendEntryService, dreFrontendEncounters, _, dreFrontEndPatientInfoService, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            encountersList: [],
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: 'encounters'
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendEncounters.getByPatientId(patientId).then(function (results) {
                $scope.model.encountersList = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.encountersList.push({
                        rawEntry: entry,
                        type: entry.resourceType,
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        additionalInfo: (angular.isArray(entry.location) && entry.location.length > 0 && entry.location[0].location) ? entry.location[0].location.name : undefined,
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                        updates: 5
                    })
                });
            });
        });
        var formatDay
    });
