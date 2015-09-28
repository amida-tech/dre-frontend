'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MatchesCtrl
 * @description
 * # MatchesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MatchesCtrl', function ($http, $scope, dreFrontEndPatientInfoService, $log) {
        $scope.model = {
            userName: '-',
            matches: [],
            spin: {lines: 9, radius: 4, width:2, length: 3},
            isLoading: true
        };

        dreFrontEndPatientInfoService.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];

            $http({
                url: /*'mock/diff/m-merge',*/
                /* 'mock/diff/p-merge', */
                    'mock/diff/b-0',
                method: 'GET'
            })
                .then(function (resp) {
                    if (resp.data) {
                        $scope.model.matches = resp.data;
                    }
                })
                .finally(function () {
                    $scope.model.isLoading = false;
                });
        });
    });
