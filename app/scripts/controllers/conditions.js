'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ConditionsCtrl', function ($scope, dreFrontendEntryService, dreFrontendConditions, _, dreFrontendPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            list: [],
            entryType: dreFrontendGlobals.resourceTypes.Condition.type,
            title: dreFrontendGlobals.resourceTypes.Condition.title
        };
        dreFrontendPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
            dreFrontendConditions.getByPatientId(patient.id).then(function (results) {
                $scope.model.list = [];
                _.forEach(results.entry, function (entry) {
                    if (angular.isObject(entry.code) && angular.isArray(entry.code.coding) && entry.code.coding.length > 0) {
                        $scope.model.list.push(
                            dreFrontendEntryService.getEntry(
                                entry,
                                dreFrontendGlobals.resourceTypes.Condition.type,
                                dreFrontendGlobals.menuRecordTypeEnum.inline
                            )
                        );
                    }
                });
            });
        });
    });
