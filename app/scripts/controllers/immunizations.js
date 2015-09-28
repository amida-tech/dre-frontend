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
            immunizations: [],
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: 'immunizations'
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendImmunizations.getByPatientId(patientId).then(function(immunizations) {
                _.forEach(immunizations.entry, function(entry){
                    var immunization = {
                        rawEntry: entry,
                        type: entry.resourceType,
                        additionalInfo: '',
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                        updates: 1
                    };
                    $scope.model.immunizations.push(immunization);
                });
            })
        });
    });
