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
        $fhir.read("Patient").then(
          function (res) {
            $scope.response = res;
            $scope.res_type = "success";
          },
          function (err) {
            $scope.response = err;
            $scope.res_type = "danger";
          }
            );
    };
    $scope.getPatient = function(id){
      $fhir.read("Patient", id).then(
        function (res) {
          $scope.response = res;
          $scope.res_type = "success";
        },
        function (err) {
          $scope.response = err;
          $scope.res_type = "danger";
        }
      );
    };
    $scope.getMedications = function(){
        $fhir.read("Medication").then(
          function (res) {
            $scope.response = res;
            $scope.res_type = "success";
          },
          function (err) {
            $scope.response = err;
            $scope.res_type = "danger";
          }
        );
    };
    $scope.getMedication = function(id){
      $fhir.read("Medication",id).then(
        function (res) {
          $scope.response = res;
          $scope.res_type = "success";
        },
        function (err) {
          $scope.response = err;
          $scope.res_type = "danger";
        }
      );
    };

    $scope.getPatientMedications = function(patient_id) {
      $fhir
        .search("MedicationPrescription", {patient: patient_id}).then(
        function (res) {
          $scope.response = res;
          $scope.res_type = "success";
        },
        function (err) {
          $scope.response = err;
          $scope.res_type = "danger";
        }
      );
    };

    $scope.createPatient = function(_data) {
      $fhir.create("Patient", _data).then(
        function (res) {
          $scope.response = res;
          $scope.res_type = "success";
        },
        function (err) {
          $scope.response = err;
          $scope.res_type = "danger";
        }
      );
    }

});
