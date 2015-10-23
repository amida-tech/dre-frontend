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
            list: [],
            //TODO hardcoded, need to get updates fromo SERVICE
            updates: 5,
            entryType: dreFrontendGlobals.resourceTypes.Condition.type,
            title: dreFrontendGlobals.resourceTypes.Condition.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendConditions.getByPatientId(patientId).then(function (results) {
                $scope.model.list = [];
                _.forEach(results.entry, function (entry) {
                    if (angular.isObject(entry.code) && angular.isArray(entry.code.coding) && entry.code.coding.length > 0) {
                        $scope.model.list.push({
                            rawEntry: entry,
                            type: dreFrontendGlobals.resourceTypes.Condition.type,
                            title: dreFrontendEntryService.getEntryTitle(entry),
                            additionalInfo: dreFrontendEntryService.getEntryAddInfo(entry),
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
