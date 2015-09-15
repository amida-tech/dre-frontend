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
                        $scope.model.testresultsList.push({
                            rawEntry: entry,
                            type: 'ObservationTestResult',
                            title: entry.code.coding[0].display,
                            date: dreFrontendUtil.formatFhirDate(entry.appliesDateTime)
                        })
                    }
                });
            });
        });
    });
