'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('AccountHistoryCtrl', function ($scope) {
    $scope.model = {
      firstName : 'Not implemented',
      lastLogin: new Date(),
      lastUpdate: new Date(),
      actionsList:[
        {
          actionDate: new Date(12,12,2014),
          type: 'login',
          actionData: '158.46.35.150'
        },
        {
          actionDate: new Date(12,11,2014),
          type: 'logout'
        },
        {
          actionDate: new Date(12,10,2014),
          type: 'upload',
          actionData: 'bluebutton-duplicate.xml'
        },
        {
          actionDate: new Date(12,9,2014),
          type: 'create',
          actionData: 'isabella'
        }
      ]
    };
  });