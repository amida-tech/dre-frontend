'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:AllergiesCtrl
 * @description
 * # AllergiesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('AllergiesCtrl', function ($scope, dreFrontendEntryService, dreFrontendAllergyIntolerances, dreFrontEndPatientInfoService, _, dreFrontendGlobals) {
        $scope.model = {
            lastUpdate: new Date(),
            userName: '',
            list: [],
            entryType: 'Allergies',//dreFrontendGlobals.resourceTypes.AllergyIntolerance.type,
            title: dreFrontendGlobals.resourceTypes.AllergyIntolerance.title
        };

        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });

        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendAllergyIntolerances.getByPatientId(patientId).then(function (allergies) {
                _.forEach(allergies.entry, function (entry) {
                    $scope.model.list.push(
                        dreFrontendEntryService.getEntry(
                            entry,
                            dreFrontendGlobals.resourceTypes.AllergyIntolerance.type,
                            dreFrontendGlobals.menuRecordTypeEnum.inline
                        )
                    );
                });
            })
        });
    });
