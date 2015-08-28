'use strict';

/**
 * @ngdoc directive
 * @name dreFrontendApp.directive:loginForm
 * @description
 * # loginForm
 */
angular.module('dreFrontendApp')
  .directive('loginForm', function (dreFrontendAuthService, dreFrontendEnvironment, $state) {
    return {
      templateUrl: 'views/directives/login-form.html',
      restrict: 'AE',
      scope: {},
      controller: function ($scope) {
        $scope.model = {
          login: dreFrontendEnvironment.defaultUser,
          password: dreFrontendEnvironment.defaultPassword,
          error: null
        };
        $scope.submitLogin = function () {
          if ($scope.loginForm.$valid) {
            dreFrontendAuthService.login($scope.model.login, $scope.model.password).then(function () {
              $state.go('home');
            }).catch(function () {
              $scope.model.error = 'Please check your Login/Password';
            });
          } else {
            $scope.model.error = 'Please check your Login/Password';
          }
        };
      }
    };
  });
