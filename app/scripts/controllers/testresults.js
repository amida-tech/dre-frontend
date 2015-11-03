'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('TestresultsCtrl', function ($scope, dreFrontendEntryService, dreFrontendObservations, _, dreFrontEndPatientInfoService, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            list: [],
            entryType: dreFrontendGlobals.resourceTypes.TestResult.type,
            title: dreFrontendGlobals.resourceTypes.TestResult.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendObservations.getTestResults(patientId).then(function (results) {
                $scope.model.list = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.list.push({
                        rawEntry: entry,
                        type: dreFrontendGlobals.resourceTypes.TestResult.type,
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                        dates: dreFrontendEntryService.getEntryDates(entry)
                    });
                });
            });
        });
    });
