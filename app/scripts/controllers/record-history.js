'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('RecordHistoryCtrl', function ($scope, dreFrontendEntryService, dreFrontEndPatientInfoService, dreFrontendGlobals, dreFrontendModalsService) {
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
                    type: dreFrontendGlobals.resourceTypes.Vital.type,
                    title: 'New vital sign',
                    additionalInfo: '',
                    dates: {startDate: 'February 15, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.none
                },
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.TestResult.type,
                    title: 'New test result',
                    additionalInfo: '',
                    dates: {startDate: 'February 14, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.none
                },
                {
                    rawEntry: {},
                    type: dreFrontendGlobals.resourceTypes.Procedure.type,
                    title: 'New procedure',
                    additionalInfo: '',
                    dates: {startDate: 'February 13, 2011'},
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.none
                }
            ];
        });

        $scope.showPrintDlg = dreFrontendModalsService.showPrintDlg;
  });
