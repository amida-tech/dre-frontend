'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('AccountHistoryCtrl', function ($scope, dreFrontendAccountHistoryService, _) {
    $scope.model = {
      firstName : 'Not implemented',
      lastLogin: '',
      lastUpdate: '',
      actionsList:[]
    };
    dreFrontendAccountHistoryService.getLastMasterActions().then(function(response){
      console.log('response',response.recordHistory);
      $scope.model.lastLogin = new Date(response.lastLogin);
      $scope.model.lastUpdate = new Date(response.lastUpdate);
      $scope.model.actionsList = [];
      _.forEach(response.recordHistory, function(itm){
        $scope.model.actionsList.push({
          type: itm.event_type,
          title: itm.type,
          date: new Date(itm.date),
          note: itm.note
        });
      });
    });
  });