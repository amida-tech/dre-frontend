'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('SocialHistoryCtrl', function ($scope, dreFrontendEntryService, dreFrontendObservations, _,
                                               dreFrontEndPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            list: [],
            filteredSocialHistoryList: [],
            entryType: dreFrontendGlobals.resourceTypes.SocialHistory.type,
            title: dreFrontendGlobals.resourceTypes.SocialHistory.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
            dreFrontendObservations.getSocialHistory(patient.id).then(function (results) {
                $scope.model.socialHistoryList = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.socialHistoryList.push(dreFrontendEntryService.getEntry(
                            entry,
                            dreFrontendGlobals.resourceTypes.SocialHistory.type,
                            dreFrontendGlobals.menuRecordTypeEnum.inline
                        )
                    );
                });
                $scope.filterSocialHistory();
                if ($scope.model.filteredSocialHistoryList.length === 0) {
                    $scope.model.showInactive = true;
                    $scope.filterSocialHistory();
                }
            });
        });
    });
