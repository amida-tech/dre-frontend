'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('RecordsMenuCtrl', function ($scope, dreFrontendGlobals, _) {

        //todo: remove controller & view if no need more

        $scope.model = {
            menuItems: [
                dreFrontendGlobals.resourceTypes.MedicationOrder,
                dreFrontendGlobals.resourceTypes.TestResult,
                dreFrontendGlobals.resourceTypes.Encounter,
                dreFrontendGlobals.resourceTypes.Vital,
                dreFrontendGlobals.resourceTypes.Immunization,
                dreFrontendGlobals.resourceTypes.AllergyIntolerance,
                dreFrontendGlobals.resourceTypes.Condition,
                dreFrontendGlobals.resourceTypes.Procedure,
                dreFrontendGlobals.resourceTypes.SocialHistory
            ]
        };
        _.forEach($scope.model.menuItems, function (item) {
            item.url = 'record.' + item.alias;
        });
    });
