'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ClaimsCtrl', function ($scope, dreFrontendEntryService, dreFrontEndPatientInfoService, dreFrontendGlobals, dreFrontendClaim, _) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            list: [],
            entryType: dreFrontendGlobals.resourceTypes.Claim.type,
            title: dreFrontendGlobals.resourceTypes.Claim.title
        };
        dreFrontEndPatientInfoService.getPatientData()
            .then(function (patient) {
                $scope.model.userName = patient.getName()[0];
                dreFrontendClaim.getByPatientId(patient.id)
                    .then(function (bundle) {
                        $scope.model.list = [];
                        _.forEach(bundle.entry, function (claim) {
                            $scope.model.list.push(
                                dreFrontendEntryService.getEntry(
                                    claim,
                                    dreFrontendGlobals.resourceTypes.Claim.type,
                                    dreFrontendGlobals.menuRecordTypeEnum.inline
                                )
                            );
                        });
                    });
            });
    });
