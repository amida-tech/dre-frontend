'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ImmunizationsCtrl
 * @description
 * # ImmunizationsCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ImmunizationsCtrl', function ($scope, dreFrontendEntry, dreFrontendImmunizations, dreFrontEndPatientInfo, _, dreFrontendGlobals) {
        $scope.model = {
            lastUpdate: new Date(),
            userName: '',
            immunizations: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendImmunizations.getByPatientId(patientId).then(function(immunizations) {
                _.forEach(immunizations.entry, function(entry){
                    var immunization = {
                        rawEntry: entry,
                        type: entry.resourceType,
                        additionalInfo: '',
                        title: dreFrontendEntry.getEntryTitle(entry),
                        dates: dreFrontendEntry.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    };
                    $scope.model.immunizations.push(immunization);
                });
            })
        });
    });
