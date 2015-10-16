'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('ClaimsCtrl', function ($scope, dreFrontendEntryService, dreFrontEndPatientInfoService, dreFrontendGlobals, dreFrontendClaim) {
        $scope.model = {
            userName : '-',
            lastUpdate: new Date(),
            list: [],
            entryType: dreFrontendGlobals.resourceTypes.Claim.type,
            title: dreFrontendGlobals.resourceTypes.Claim.title
        };
        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
        dreFrontEndPatientInfoService.getPatientId().then(function (patientId) {
            dreFrontendClaim.getByPatientId(patientId).then(function(bundle){
                $scope.model.list = [];
                _.forEach(bundle.entry, function (claim) {
                    $scope.model.list.push({
                        rawEntry: claim,
                        type: dreFrontendGlobals.resourceTypes.Claim.type,
                        title: dreFrontendEntryService.getEntryTitle(claim),
                        dates: dreFrontendEntryService.getEntryDates(claim),
                        menuType: dreFrontendGlobals.menuRecordTypeEnum.popup,
                        updates: 2
                    })
                });
                console.log($scope.model.list);
            });
        });
  });
