'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('RegisterCtrl', function ($scope, dreFrontendGlobals, dreFrontendAuthService, $state) {
        $scope.model = {
            step: 1,
            dateFormat: dreFrontendGlobals.dateFormat,
            error: '',
            login: '',
            email: '',
            password: '',
            confirm: '',
            firstName: '',
            middleName: '',
            lastName: '',
            birthDay: '',
            gender: '',
            isSubmitting: false
        };
        $scope.DobStatus = {
            opened: false
        };
        $scope.openDob = function () {
            $scope.DobStatus.opened = true;
        };
        $scope.submitRegistration = function () {
            $scope.model.isSubmitting = true;
            var _data = {
                username: $scope.model.login,
                password: $scope.model.password,
                email: $scope.model.email,
                firstName: $scope.model.firstName,
                middleName: $scope.model.middleName,
                lastName: $scope.model.lastName,
                dob: $scope.model.birthDay,
                gender: $scope.model.gender
            };
            dreFrontendAuthService.registerUser(_data)
                .then(function () {
                    return dreFrontendAuthService.login($scope.model.login, $scope.model.password)
                        .then(function (isAuthenticated) {
                            if (isAuthenticated) {
                                $state.go('home');
                            } else {
                                $scope.model.error = 'An error occurred while log in user. Please try again later.';
                            }
                        });
                })
                .catch(function (errorMessage) {
                    $scope.model.error = errorMessage;
                })
                .finally(function () {
                    $scope.model.isSubmitting = false;
                });
        };
    });
