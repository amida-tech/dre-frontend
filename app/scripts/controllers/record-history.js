'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('RecordHistoryCtrl', function ($scope) {
    $scope.model = {
      firstName : 'Not implemented',
      lastUpdate: new Date(),
      actionsList:[
        {
          actionDate: new Date(12,12,2014),
          actionType: 'login'
        },
        {
          actionDate: new Date(12,11,2014),
          actionType: 'upload'
        },
        {
          actionDate: new Date(12,10,2014),
          actionType: 'create'
        }
      ]
    };
  });
