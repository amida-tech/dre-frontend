'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('ClaimsCtrl', function ($scope, dreFrontendEntryService, dreFrontEndPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName : '-',
            lastUpdate: new Date(),
            claimsList:[]
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            $scope.model.claimsList = [
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Claim.type,
                    title: 'medicare',
                    dates: {startDate: 'February 15, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                },
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Claim.type,
                    title: 'medicare',
                    dates: {startDate: 'February 14, 2011', endDate: 'February 15, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                }
            ];
        });
  });
