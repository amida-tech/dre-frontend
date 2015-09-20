'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('TestresultsCtrl', function ($scope, dreFrontendObservations, _, dreFrontEndPatientInfo, dreFrontendUtil) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            testresultsList: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendObservations.getTestResults(patientId).then(function (results) {
                $scope.model.testresultsList = [];
                _.forEach(results.entry, function (entry) {
                    if (angular.isObject(entry.code) && angular.isArray(entry.code.coding) && entry.code.coding.length > 0) {
                        var itemEntry = {
                            rawEntry: entry,
                            type: 'ObservationTestResult',
                            title: entry.code.coding[0].display
                        };
                        if(angular.isDefined(entry.appliesDateTime)){
                            itemEntry.startDate = entry.appliesDateTime;
                        }else{
                            if(angular.isDefined(entry.appliesPeriod)){
                                itemEntry.startDate = entry.appliesPeriod.start;
                                itemEntry.endDate = entry.appliesPeriod.end;
                            }else{
                                if(angular.isDefined(entry.issued)){
                                    itemEntry.startDate = entry.issued;
                                }
                            }
                        }

                        $scope.model.testresultsList.push(itemEntry);
                    }
                });
            });
        });
    });
