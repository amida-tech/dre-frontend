'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('SocialHistoryCtrl', function ($scope, dreFrontendEntryService, dreFrontendObservations, _, dreFrontEndPatientInfoService, dreFrontendUtil, dreFrontendGlobals) {
        $scope.model = {
            userName: '-',
            lastUpdate: new Date(),
            socialHistoryList: [],
            filteredSocialHistoryList: [],
            entryType: 'SocialHistory'
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendObservations.getSocialHistory(patientId).then(function (results) {
                $scope.model.socialHistoryList = [];
                _.forEach(results.entry, function (entry) {
                    $scope.model.socialHistoryList.push({
                        rawEntry: entry,
                        type: dreFrontendGlobals.resourceTypes.SocialHistory.type,
                        title: dreFrontendEntryService.getEntryTitle(entry),
                        additionalInfo: dreFrontendEntryService.getEntryAddInfo(entry),
                        dates: dreFrontendEntryService.getEntryDates(entry),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.inline
                    });
                });
                $scope.filterSocialHistory();
                if ($scope.model.filteredSocialHistoryList.length === 0) {
                    $scope.model.showInactive = true;
                    $scope.filterSocialHistory();
                }
            });
        });
        $scope.filterSocialHistory = function () {
            $scope.model.filteredSocialHistoryList = $scope.model.showInactive ?
                $scope.model.socialHistoryList :
                _.filter($scope.model.socialHistoryList, function (item) {
                    return item.dates.isInactive === false;
                });
        };
    });
