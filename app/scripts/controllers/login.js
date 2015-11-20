'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('LoginCtrl', function (dreFrontendAuthService, $state) {
        dreFrontendAuthService.isAuthenticated().then(function (isAuthenticated) {
            if (isAuthenticated) {
                $state.go('home');
            }
        });
    });
