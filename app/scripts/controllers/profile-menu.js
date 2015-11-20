'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ProfileMenuCtrl
 * @description
 * # ProfileMenuCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ProfileMenuCtrl', function ($scope, _, $location, $anchorScroll) {
        $scope.scrollToAncor = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            $location.hash(old);
        };
    });
