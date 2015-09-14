'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('userInfo', function ($rootScope, dreFrontendGlobals, dreFrontEndPatientInfo) {
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
                var checkPatientData = function () {
                    dreFrontEndPatientInfo.getPatientData().then(function (patient) {
                        console.log('checkPatientData', patient);
                        $scope.model.userName = patient.getOfficialName()[0];
                        $scope.model.dateOfBorn = new Date(patient.birthDate);
                        if (patient.photo && patient.photo.length > 0) {
                            var photo = patient.photo[0];
                            $scope.model.avatarData = 'data:' + photo.contentType + ';base64,' + photo.data;
                        }
                    });
                };
                checkPatientData();
                var loggedOutCleanEvent = $rootScope.$on(dreFrontendGlobals.authEvents.loggedOut, function () {
                        $scope.model.userName = '-';
                        $scope.model.avatarData = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Photo&w=100&h=100';
                        $scope.model.dateOfBorn = null;
                    }
                );

                $scope.$on('$destroy', function () {
                    loggedOutCleanEvent();
                });
            }
        }
            ;
    })
;
