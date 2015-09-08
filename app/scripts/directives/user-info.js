'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userInfo', function (dreFrontEndPatientInfo) {
        return {
            templateUrl: 'views/directives/user-info.html',
            restrict: 'AE',
            scope: {},
            controller: function ($scope) {
                $scope.model = {
                    userName: '-',
                    avatarData: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Photo&w=100&h=100',
                    dateOfBorn: null
                };
                dreFrontEndPatientInfo.getPatientData().then(function (patient) {
                    console.log('data', patient);
                    $scope.model.userName = patient.getOfficialName()[0];
                    $scope.model.dateOfBorn = new Date(patient.birthDate);
                    if (patient.photo && patient.photo.length > 0) {
                        var photo = patient.photo[0];
                        $scope.model.avatarData = 'data:' + photo.contentType + ';base64,' + photo.data;
                    }
                });
            }
        };
    });
