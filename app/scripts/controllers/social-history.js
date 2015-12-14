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
                                               dreFrontendPatientInfoService, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            list: [],
            filteredSocialHistoryList: [],
            entryType: dreFrontendGlobals.resourceTypes.SocialHistory.type,
            title: dreFrontendGlobals.resourceTypes.SocialHistory.title
        };
        dreFrontendPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
            dreFrontendObservations.getSocialHistory(patient.id).then(function (results) {
                $scope.model.list = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.list.push(dreFrontendEntryService.getEntry(
                            entry,
                            dreFrontendGlobals.resourceTypes.SocialHistory.type,
                            dreFrontendGlobals.menuRecordTypeEnum.inline
                        )
                    );
                });
            });
        });
    });
