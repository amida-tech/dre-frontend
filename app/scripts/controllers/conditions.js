'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ConditionsCtrl', function ($scope, dreFrontendEntry, dreFrontendConditions, _, dreFrontEndPatientInfo, dreFrontendUtil, dreFrontendGlobals) {
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
                            title: dreFrontendEntry.getEntryTitle(entry),
                            additionalInfo: '',
                            dates: dreFrontendEntry.getEntryDates(entry),
                            menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                        })
                    }
                });
            });
        });
        var formatDay
    });
