'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('EncountersCtrl', function ($scope, dreFrontendEntryService, dreFrontendEncounters, _, dreFrontEndPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            list: [],
            entryType: dreFrontendGlobals.resourceTypes.Encounter.type,
            title: dreFrontendGlobals.resourceTypes.Encounter.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
            dreFrontendEncounters.getByPatientId(patient.id).then(function (results) {
                $scope.model.list = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.list.push(
                        dreFrontendEntryService.getEntry(
                            entry,
                            dreFrontendGlobals.resourceTypes.Encounter.type,
                            dreFrontendGlobals.menuRecordTypeEnum.inline
                        )
                    );
                });
            });
        });
    });
