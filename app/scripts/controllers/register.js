'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('RegisterCtrl', function ($scope, dreFrontendGlobals, dreFrontendAuthService,$state) {
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
      isSubmitting:false
    };
    $scope.DobStatus = {
      opened: false
    };
    $scope.openDob = function($event) {
      $scope.DobStatus.opened = true;
    };
    $scope.submitRegistration = function () {
      $scope.model.isSubmitting = true;
      dreFrontendAuthService.registerUser($scope.model.login, $scope.model.password, $scope.model.email, $scope.model.firstName,
        $scope.model.middleName, $scope.model.lastName, $scope.model.birthDay, $scope.model.gender).then(function (isRegistered) {
            dreFrontendAuthService.login($scope.model.login, $scope.model.password).then(function(isAuthenticated){
              if(isAuthenticated){
                $state.go('home');
              }else{
                $scope.model.error = 'An error occurred while log in user. Please try again later.'
              }
            })
          }).catch(function(errorMessage){
          $scope.model.error = errorMessage;
        }).finally(function(){
          $scope.model.isSubmitting = false;
        })
    }
  });
