'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ImmunizationsCtrl
 * @description
 * # ImmunizationsCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ImmunizationsCtrl', function ($scope, dreFrontendEntryService, dreFrontendImmunizations, dreFrontEndPatientInfoService, _, dreFrontendGlobals) {
        $scope.model = {
            lastUpdate: new Date(),
            userName: '',
            list: [],
            entryType: dreFrontendGlobals.resourceTypes.Immunization.type,
            title: dreFrontendGlobals.resourceTypes.Immunization.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
            dreFrontendImmunizations.getByPatientId(patient.id).then(function (immunizations) {
                _.forEach(immunizations.entry, function (entry) {
                    $scope.model.list.push(dreFrontendEntryService.getEntry(
                            entry,
                            dreFrontendGlobals.resourceTypes.Immunization.type,
                            dreFrontendGlobals.menuRecordTypeEnum.inline
                        )
                    );
                });
            });
        });
    });
