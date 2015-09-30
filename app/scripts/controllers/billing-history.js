'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('BillingHistoryCtrl', function ($scope, dreFrontendEntryService, dreFrontEndPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName : '-',
            lastUpdate: new Date(),
            actionsList:[]
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            $scope.model.actionsList = [
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Insurance.type,
                    title: 'duplicate payer',
                    dates: {startDate: 'February 15, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.none
                },
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Insurance.type,
                    title: 'new payer ',
                    dates: {startDate: 'February 14, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.none
                },
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Claim.type,
                    title: 'new claim ',
                    dates: {startDate: 'February 13, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.none
                }
            ];
        });
  });
