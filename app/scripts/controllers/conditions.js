'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ConditionsCtrl', function ($scope, dreFrontendConditions, _, dreFrontEndPatientInfo, dreFrontendUtil) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            conditionsList: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendConditions.getByPatientId(patientId).then(function (results) {
                $scope.model.conditionsList = [];
                _.forEach(results.entry, function (entry) {
                    if (angular.isObject(entry.code) && angular.isArray(entry.code.coding) && entry.code.coding.length > 0) {
                        $scope.model.conditionsList.push({
                            rawEntry: entry,
                            type: entry.resourceType,
                            title: entry.code.coding[0].display,
                            additionalInfo: '',
                            startDate: angular.isObject(entry.abatementPeriod) ? entry.abatementPeriod.start : undefined,
                            endDate: angular.isObject(entry.abatementPeriod) ? entry.abatementPeriod.end : undefined
                        })
                    }
                });
            });
        });
        var formatDay
    });
