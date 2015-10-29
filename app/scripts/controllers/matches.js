'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MatchesCtrl
 * @description
 * # MatchesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MatchesCtrl', function ($http, $scope, _, dreFrontEndPatientInfoService, dreFrontendMergeService, $log) {
        $scope.model = {
            userName: '-',
            matches: [],
            spin: {lines: 9, radius: 4, width: 2, length: 3},
            isLoading: true
        };

        dreFrontEndPatientInfoService.getPatientData()
            .then(function (patient) {
                $scope.model.userName = patient.getName()[0];
                dreFrontendMergeService.getList(patient.id)
                    .then(function (resp) {
                        if (resp) {
                            $scope.model.matches = _.filter(resp, {changeType: "update"});
                            $log.debug($scope.model.matches);
                        }
                    })
                    .finally(function () {
                        $scope.model.isLoading = false;
                    });
            });
    });
