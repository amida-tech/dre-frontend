'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FhirCtrl
 * @description
 * # FhirCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp').controller('FhirCtrl', function ($scope, $fhir) {
    $scope.getPatients = function(){
        $fhir.read("Patient")
        .then(
          function(data){
            $scope.response = data;
          },
          function(err){
            console.log(err);
          }
        );
    };
    $scope.getPatient = function(id){
      $fhir.read("Patient", id)
        .then(function(data){
          $scope.response = data;
        });
    };
    $scope.getMedications = function(){
        $fhir.read("medication").then(
          function(data) {
            $scope.response = data;
          }
        );
    };
    $scope.getMedication = function(id){
      $fhir.read("medication",id)
        .then(function(data){
            $scope.response = data;
        });
    };

    $scope.getPatientMedications = function(patient_id) {
      $fhir
        .search("MedicationPrescription", {patient: patient_id})
        .then(function (data) {
          $scope.response = data;
        });
    };
});
