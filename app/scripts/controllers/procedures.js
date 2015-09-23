'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ProceduresCtrl', function ($scope, dreFrontendEntry, dreFrontendProcedures, _, dreFrontEndPatientInfo, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            proceduresList: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendProcedures.getByPatientId(patientId).then(function (results) {
                $scope.model.proceduresList = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.proceduresList.push({
                        rawEntry: entry,
                        type: entry.resourceType,
                        title: dreFrontendEntry.getEntryTitle(entry),
                        additionalInfo: '',
                        startDate: entry.performedDateTime,
                        endDate: undefined,
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    })
                });
            });
        });
        var formatDay
    });
