'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ConditionsCtrl', function ($scope, dreFrontendEntryService, dreFrontendConditions, _, dreFrontEndPatientInfoService, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            conditionsList: [],
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: 'conditions'
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendConditions.getByPatientId(patientId).then(function (results) {
                $scope.model.conditionsList = [];
                _.forEach(results.entry, function (entry) {
                    if (angular.isObject(entry.code) && angular.isArray(entry.code.coding) && entry.code.coding.length > 0) {
                        $scope.model.conditionsList.push({
                            rawEntry: entry,
                            type: dreFrontendGlobals.resourceTypes.Condition.type,
                            title: dreFrontendEntryService.getEntryTitle(entry),
                            additionalInfo: '',
                            dates: dreFrontendEntryService.getEntryDates(entry),
                            menuType: dreFrontendGlobals.menuRecordTypeEnum.inline,
                            updates: 3
                        })
                    }
                });
            });
        });
        var formatDay
    });
