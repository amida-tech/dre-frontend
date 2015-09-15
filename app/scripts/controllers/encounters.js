'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('EncountersCtrl', function ($scope, dreFrontendEncounters, _, dreFrontEndPatientInfo) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            encountersList: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getOfficialName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendEncounters.getByPatientId(patientId).then(function (results) {
                $scope.model.encountersList = [];
                _.forEach(results.entry, function (entry) {
                    if (angular.isArray(entry.type) &&entry.type.length>0 && angular.isArray(entry.type[0].coding) && entry.type[0].coding.length > 0) {
                        $scope.model.encountersList.push({
                            rawEntry: entry,
                            type: entry.resourceType,
                            title: entry.type[0].coding[0].display,
                            location: 'Test location',//entry.location,
                            startDate: angular.isObject(entry.period) ? entry.period.start : undefined,
                            stopDate: angular.isObject(entry.period) ? entry.period.stop : undefined
                        })
                    }
                });
            });
        });
    });
