'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ReviewCtrl
 * @description
 * # ReviewCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('RecordReviewCtrl', function ($rootScope, $scope, $state, _, dreFrontendPatientInfoService,
                                              dreFrontendMergeService, dreFrontendGlobals) {
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
            dreFrontendMergeService.formatList(res);
            return res;
        }

        dreFrontendPatientInfoService.getPatientData()
            .then(function (patient) {
                $scope.model.userName = patient.getName()[0];
                dreFrontendMergeService.getListByPatientId(patient.id)
//                dreFrontendMergeService.getMockData()
                    .then(function (resp) {
                        if (resp) {
                            var matches = _filter(resp);

                            if (matches.length ===0 && $state.params.group) {
                                $state.go($state.current.name, {group:undefined});
                            } else {
                                $rootScope.$broadcast(dreFrontendGlobals.recordEvents.updateReviewList, resp);
                                $scope.model.matches = matches;
                            }
                        }
                    })
                    .finally(function () {
                        $scope.model.isLoading = false;
                    });
            });
    });
