'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FhirCtrl
 * @description
 * # FhirCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp').controller('FhirCtrl', function ($scope, dreFrontendFhirService) {
    $scope.getPatients = function(){
        dreFrontendFhirService.patient.all(function(data){
            console.log(data);
        });
    }
    $scope.getPatient = function(id){
        dreFrontendFhirService.patient.one(id, function(data){
            console.log(data);
        });
    }
    $scope.getMedications = function(){
        dreFrontendFhirService.medication.all(function(data){
            console.log(data);
        });
    }
    $scope.getMedication = function(id){
        dreFrontendFhirService.medication.one(id, function(data){
            console.log(data);
        });
    }
});