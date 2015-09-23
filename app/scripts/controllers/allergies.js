'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:AllergiesCtrl
 * @description
 * # AllergiesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('AllergiesCtrl', function ($scope, dreFrontendAllergyIntolerances, dreFrontEndPatientInfo, _, dreFrontendGlobals) {
        $scope.model = {
            lastUpdate: new Date(),
            userName: '',
            allergies: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendAllergyIntolerances.getByPatientId(patientId).then(function(allergies) {
                _.forEach(allergies.entry, function(entry){
                    var allergy = {
                        rawEntry: entry,
                        type: entry.resourceType,
                        additionalInfo: '',
                        title: '',
                        startDate: entry.lastOccurence != undefined ? entry.lastOccurence : null,
                        endDate: null,
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    };
                    if(angular.isDefined(entry.event)) {
                        if(entry.event.length != 0) {
                            if(angular.isDefined(entry.event[0].manifestation)) {
                                if(entry.event[0].manifestation.length >= 1) {
                                    if(angular.isDefined(entry.event[0].manifestation[0].coding)) {
                                        if(entry.event[0].manifestation[0].coding.length != 0) {
                                            if(angular.isDefined(entry.event[0].manifestation[0].coding[0].display)) {
                                                allergy.title = entry.event[0].manifestation[0].coding[0].display;
                                            }
                                        }
                                    }
                                    if(entry.event[0].manifestation.length == 2) {
                                        if(angular.isDefined(entry.event[0].manifestation[1].coding)) {
                                            if(entry.event[0].manifestation[1].coding.length != 0) {
                                                if(angular.isDefined(entry.event[0].manifestation[1].coding[0].display)) {
                                                    allergy.additionalInfo = entry.event[0].manifestation[1].coding[0].display;
                                                }
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
