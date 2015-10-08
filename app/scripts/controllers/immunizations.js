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
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: dreFrontendGlobals.resourceTypes.Immunization.type,
            title: dreFrontendGlobals.resourceTypes.Immunization.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendImmunizations.getByPatientId(patientId).then(function(immunizations) {
                _.forEach(immunizations.entry, function(entry){
                    $scope.model.list.push({
                        rawEntry: entry,
                        type: dreFrontendGlobals.resourceTypes.Immunization.type,
                        additionalInfo: '',
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                        updates: 1
                    });
                });
            })
        });
    });
