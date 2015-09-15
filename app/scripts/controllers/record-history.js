'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
  .controller('RecordHistoryCtrl', function ($scope,dreFrontEndPatientInfo) {
    $scope.model = {
        userName : '-',
      lastUpdate: new Date(),
      actionsList:[
        {
          actionDate: new Date(12,12,2014),
          type: 'login'
        },
        {
          actionDate: new Date(12,11,2014),
          type: 'upload'
        },
        {
          actionDate: new Date(12,10,2014),
          type: 'create'
        }
      ]
    };
        dreFrontEndPatientInfo.getPatientData().then(function (patient) {
            $scope.model.userName = patient.getName()[0];
        });
  });
