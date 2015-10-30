'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ReviewCtrl', function ($http, $scope, $state, _, dreFrontEndPatientInfoService, dreFrontendMergeService, $log) {
        $scope.model = {
            userName: '-',
            matches: [],
            spin: {lines: 9, radius: 4, width: 2, length: 3},
            isLoading: true
        };

        function _filter(matches) {
            var res = [];
            if ($state.params.group) {
                _.forEach(matches, function (match) {
                    if (match.lhs.resourceType.toLowerCase() === $state.params.group) {
                        res.push(match);
                    }
                });
            } else {
                res = matches;
            }

            return res;
        }

        dreFrontEndPatientInfoService.getPatientData()
            .then(function (patient) {
                $scope.model.userName = patient.getName()[0];
                dreFrontendMergeService.getList(patient.id)
                    .then(function (resp) {
                        if (resp) {
                            $scope.model.matches = _filter(resp);
                        }
                    })
                    .finally(function () {
                        $scope.model.isLoading = false;
                    });
            });
    });
