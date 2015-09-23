'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MatchesCtrl
 * @description
 * # MatchesCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('MatchesCtrl', function ($http, $scope, dreFrontEndPatientInfo) {
        $scope.model = {
            matches: [],
            userName: '-'
        };

        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });

        $http({
            url: /*'mock/diff/m-merge',*/
            /* 'mock/diff/p-merge', */
            'mock/diff/b-0',
            method: 'GET'
        }).then(function (resp) {

            $scope.model.matches = resp.data;
        });

    });
