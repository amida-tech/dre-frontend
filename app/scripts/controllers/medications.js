'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('MedicationsCtrl', function ($scope) {
    $scope.model = {
      firstName : 'Not implemented',
      lastUpdate: new Date(),
      showInactive: false,
      actionsList:[
        {
          actionDate: new Date(12,12,2014),
          actionType: 'medication',
          isInactive: false
        },
        {
          actionDate: new Date(12,11,2014),
          actionType: 'medication',
          isInactive: true
        },
        {
          actionDate: new Date(12,10,2014),
          actionType: 'inhaler',
          isInactive: false
        }
        ,
        {
          actionDate: new Date(12,10,2014),
          actionType: 'inhaler',
          isInactive: true
        }
      ]
    };
  });
