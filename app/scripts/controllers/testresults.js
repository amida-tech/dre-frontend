'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('TestresultsCtrl', function ($scope, dreFrontendEntry, dreFrontendObservations, _, dreFrontEndPatientInfo, dreFrontendUtil, dreFrontendGlobals) {
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
                    var itemEntry = {
                        rawEntry: entry,
                        type: 'ObservationTestResult',
                        title: dreFrontendEntry.getEntryTitle(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    };
                    if (angular.isDefined(entry.appliesDateTime)) {
                        itemEntry.startDate = entry.appliesDateTime;
                    } else {
                        if (angular.isDefined(entry.appliesPeriod)) {
                            itemEntry.startDate = entry.appliesPeriod.start;
                            itemEntry.endDate = entry.appliesPeriod.end;
                        } else {
                            if (angular.isDefined(entry.issued)) {
                                itemEntry.startDate = entry.issued;
                            }
                        }
                    }
                    $scope.model.testresultsList.push(itemEntry);
                });
            });
        });
    });
