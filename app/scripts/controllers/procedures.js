'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ProceduresCtrl', function ($scope, dreFrontendEntryService, dreFrontendProcedures, _,
                                            dreFrontendPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            list: [],
            entryType: dreFrontendGlobals.resourceTypes.Procedure.type,
            title: dreFrontendGlobals.resourceTypes.Procedure.title
        };
        dreFrontendPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
            dreFrontendProcedures.getByPatientId(patient.id)
                .then(function (results) {
                    $scope.model.list = [];
                    _.forEach(results.entry, function (entry) {
                        $scope.model.list.push(dreFrontendEntryService.getEntry(
                                entry,
                                dreFrontendGlobals.resourceTypes.Procedure.type,
                                dreFrontendGlobals.menuRecordTypeEnum.inline
                            )
                        );
                    });
                });
        });
    });
