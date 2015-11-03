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
            list: [],
            entryType: dreFrontendGlobals.resourceTypes.Encounter.type,
            title: dreFrontendGlobals.resourceTypes.Encounter.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendEncounters.getByPatientId(patientId).then(function (results) {
                $scope.model.list = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.list.push({
                        rawEntry: entry,
                        type: dreFrontendGlobals.resourceTypes.Encounter.type,
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        additionalInfo: dreFrontendEntryService.getEntryAddInfo(entry),
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    })
                });
            });
        });
        var formatDay
    });
