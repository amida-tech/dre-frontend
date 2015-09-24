'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ProceduresCtrl', function ($scope, dreFrontendEntryService, dreFrontendProcedures, _, dreFrontEndPatientInfoService, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            proceduresList: []
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendProcedures.getByPatientId(patientId).then(function (results) {
                $scope.model.proceduresList = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.proceduresList.push({
                        rawEntry: entry,
                        type: entry.resourceType,
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        additionalInfo: '',
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    })
                });
            });
        });
        var formatDay
    });
