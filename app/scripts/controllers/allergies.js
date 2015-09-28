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
            allergies: [],
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: 'allergies'
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendAllergyIntolerances.getByPatientId(patientId).then(function (allergies) {
                _.forEach(allergies.entry, function (entry) {
                    var allergy = {
                        rawEntry: entry,
                        type: entry.resourceType,
                        additionalInfo: '',
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    };
                    if (angular.isDefined(entry.event)) {
                        if (entry.event.length != 0) {
                            if (angular.isDefined(entry.event[0].manifestation)) {
                                if (entry.event[0].manifestation.length == 2) {
                                    if (angular.isDefined(entry.event[0].manifestation[1].coding)) {
                                        if (entry.event[0].manifestation[1].coding.length != 0) {
                                            if (angular.isDefined(entry.event[0].manifestation[1].coding[0].display)) {
                                                allergy.additionalInfo = entry.event[0].manifestation[1].coding[0].display;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $scope.model.allergies.push(allergy);
                });
            })
        });
    });
