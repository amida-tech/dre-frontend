'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:ProfileMenuCtrl
 * @description
 * # ProfileMenuCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('ProfileMenuCtrl', function ($scope, _, $location, $anchorScroll, $log) {
        var scroll = function (id) {
            var old = $location.hash();
            $location.hash(id);
            $anchorScroll();
            $location.hash(old);
        };

        $scope.scrollToAncor = scroll;

    });
