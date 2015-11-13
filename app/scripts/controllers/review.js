'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ReviewCtrl', function ($rootScope, $scope, $state, _, dreFrontEndPatientInfoService, dreFrontendMergeService,
                                        dreFrontendGlobals, $log) {
        $scope.model = {
            userName: '-',
            matches: [],
            spin: {lines: 9, radius: 4, width: 2, length: 3},
            isLoading: true
        };

        function _filter(matches) {
            var res = [];
            if ($state.params.group) {
                angular.forEach(matches, function (match) {
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
                dreFrontendMergeService.getListByPatientId(patient.id)
                    .then(function (resp) {
                        if (resp) {
                            $rootScope.$broadcast(dreFrontendGlobals.recordEvents.updateReviewList, resp);
                            $scope.model.matches = _filter(resp);
                            if ($scope.model.matches.length ===0 && $state.params.group) {
                                $state.go($state.current.name, {group:undefined});
                            }
                        }
                    })
                    .finally(function () {
                        $scope.model.isLoading = false;
                    });
            });
    });
