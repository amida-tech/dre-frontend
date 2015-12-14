'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('AccountHistoryCtrl', function ($scope, dreFrontendAccountHistoryService, _, dreFrontendPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastLogin: '',
            lastUpdate: '',
            actionsList: []
        };

        dreFrontendPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });

        dreFrontendAccountHistoryService.getLastMasterActions().then(function (response) {
            var acc_created;
            $scope.model.actionsList = [];
            _.forEach(response.recordHistory, function (itm) {
                if (itm.event_type === 'initAccount') {
                    acc_created = itm.date;
                }
                $scope.model.actionsList.push({
                    type: itm.event_type,
                    title: itm.type,
                    date: new Date(itm.date),
                    note: itm.note,
                    menuType: dreFrontendGlobals.menuRecordTypeEnum.none
                });
            });
            if (!response.lastUpdate ) {
                response.lastUpdate = acc_created;
            }
            $scope.model.lastLogin = new Date(response.lastLogin);

            if (response.lastUpdate) {
                $scope.model.lastUpdate = new Date(response.lastUpdate);
            }
        });
    });
