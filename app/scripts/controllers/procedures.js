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
            list: [],
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: dreFrontendGlobals.resourceTypes.Procedure.type,
            title: dreFrontendGlobals.resourceTypes.Procedure.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendProcedures.getByPatientId(patientId).then(function (results) {
                $scope.model.list = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.list.push({
                        rawEntry: entry,
                        type: dreFrontendGlobals.resourceTypes.Procedure.type,
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        additionalInfo: dreFrontendEntryService.getEntryAddInfo(entry),
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                        updates: 1
                    })
                });
            });
        });
        var formatDay
    });
