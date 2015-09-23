'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ProceduresCtrl', function ($scope, dreFrontendProcedures, _, dreFrontEndPatientInfo, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            proceduresList: []
        };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfo.getPatientId().then(function (patientId) {
            dreFrontendProcedures.getByPatientId(patientId).then(function (results) {
                $scope.model.proceduresList = [];
                _.forEach(results.entry, function (entry) {
                    if (angular.isObject(entry.type) && angular.isArray(entry.type.coding) && entry.type.coding.length > 0) {
                        $scope.model.proceduresList.push({
                            rawEntry: entry,
                            type: entry.resourceType,
                            title: entry.type.coding[0].display,
                            additionalInfo: '',
                            startDate: entry.performedDateTime,
                            endDate: undefined,
                            menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                        })
                    }
                });
            });
        });
        var formatDay
    });
