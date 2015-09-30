'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('InsuranceCtrl', function ($scope, dreFrontendEntryService, dreFrontEndPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName : '-',
            lastUpdate: new Date(),
            insuranceList:[]
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            $scope.model.insuranceList = [
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Insurance.type,
                    title: 'Good Health Insurance',
                    dates: {},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                },
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Insurance.type,
                    title: 'Aetna Medicare Value Plan (HMO)',
                    dates: {startDate: 'February 14, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                },
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Insurance.type,
                    title: 'STATE HEALTH BENEFITS PROGRAM',
                    dates: {startDate: 'February 15, 2011', endDate: 'February 15, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                }
            ];
        });
  });
