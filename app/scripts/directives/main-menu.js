'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('dreFrontendApp')
    .directive('mainMenu', function ($state, dreFrontendAuthService, $rootScope, dreFrontendGlobals, dreFrontEndPatientInfo) {
        return {
            templateUrl: 'views/directives/main-menu.html',
            restrict: 'AE',
            scope: {},
            controller: function ($scope) {
                $scope.model = {
                    $state: $state,
                    isAuthenticated: false,
                    userName: '-',
                    avatarData: 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Photo&w=100&h=100'
                };
                $scope.logOut = function () {
                    dreFrontendAuthService.logout().finally(function () {
                        $state.go('main');
                    })
                };
                var checkAuth = function () {
                    dreFrontendAuthService.isAuthenticated().then(function (isAuthenticated) {
                        $scope.model.isAuthenticated = isAuthenticated;
                        if (isAuthenticated) {
                            dreFrontEndPatientInfo.getPatientData().then(function (patient) {
                                $scope.model.userName = patient.getOfficialName()[0];
                                if (!angular.isString($scope.model.userName) || $scope.model.userName.length == 0) {
                                    $scope.model.userName = patient.id;
                                }
                                $scope.model.dateOfBorn = new Date(patient.birthDate);
                                if (patient.photo && patient.photo.length > 0) {
                                    var photo = patient.photo[0];
                                    $scope.model.avatarData = 'data:' + photo.contentType + ';base64,' + photo.data;
                                }
                            });
                        } else {
                            $scope.model.userName = '-';
                            $scope.model.avatarData = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=Photo&w=100&h=100';
                        }
                    });
                };
                checkAuth();
                var loggedInCleanEvent = $rootScope.$on(dreFrontendGlobals.authEvents.loggedIn, checkAuth);
                var loggedOutCleanEvent = $rootScope.$on(dreFrontendGlobals.authEvents.loggedOut, checkAuth);

                $scope.$on('$destroy', function () {
                    loggedInCleanEvent();
                    loggedOutCleanEvent();
                });
            }
        };
    });
