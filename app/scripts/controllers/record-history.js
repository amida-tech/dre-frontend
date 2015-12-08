'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('RecordHistoryCtrl', function ($scope, dreFrontendEntryService, dreFrontEndPatientInfoService,
                                               dreFrontendModalsService, dreFrontendUtil, dreFrontendDocumentReference) {
        var _params = {
            '_sort:desc': 'indexed'
        };

        var _iconType = 'fileDownloaded';

        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            actionsList: [],
            mhrLink: dreFrontendUtil.buildServiceUrl('/mhr')
        };

        dreFrontEndPatientInfoService.getPatientData()
            .then(function (patient) {
                $scope.model.userName = patient.getName()[0];
                return dreFrontendDocumentReference.getByPatientId(patient.id, _params);
            })
            .then(function (bundle) {
                $scope.model.actionsList = [];
                for (var c = 0; c < bundle.entry.length; c++) {
                    $scope.model.actionsList.push(dreFrontendEntryService.getEntry(
                        bundle.entry[c],
                        _iconType,
                        ''
                    ));
                }
            });

        $scope.showPrintDlg = dreFrontendModalsService.showPrintDlg;
    });
