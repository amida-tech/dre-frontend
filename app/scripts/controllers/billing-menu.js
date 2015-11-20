'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('BillingMenuCtrl', function ($scope, dreFrontendGlobals, _) {
        $scope.model = {
            menuItems: [
                dreFrontendGlobals.resourceTypes.Insurance,
                dreFrontendGlobals.resourceTypes.Claim
            ]
        };
        _.forEach($scope.model.menuItems, function (item) {
            item.url = 'billing.' + item.alias;
        });
    });
