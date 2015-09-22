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
                    if (angular.isArray(entry.type) &&entry.type.length>0 && angular.isArray(entry.type[0].coding) && entry.type[0].coding.length > 0) {
                        $scope.model.conditionsList.push({
                            rawEntry: entry,
                            type: entry.resourceType,
                            title: angular.isObject(entry.code.coding[0].display)? entry.code.coding[0].display : undefined,
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
