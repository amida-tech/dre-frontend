'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FhirCtrl
 * @description
 * # FhirCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp').controller('FhirCtrl', function ($scope, dreFrontendFhirService, DreFrontendMedications) {
    $scope.getPatients = function(){
        dreFrontendFhirService.read("Patient")
          .then(function(res){
            $scope.response = res;
            $scope.res_type = "success";
          })
          .catch(function(err){
            $scope.response = err;
            $scope.res_type = "danger";
          });
    };
    $scope.getPatient = function(id){
      dreFrontendFhirService.read("Patient", id)
        .then(function(res){
          $scope.response = res;
          $scope.res_type = "success";
        })
        .catch(function (err) {
          $scope.response = err;
          $scope.res_type = "danger";
        });
    };
    $scope.getMedications = function(){
        dreFrontendFhirService.read("Medication")
          .then( function (res) {
            $scope.response = res;
            $scope.res_type = "success";
          })
          .catch(function (err) {
            $scope.response = err;
            $scope.res_type = "danger";
          });
    };
    $scope.getMedication = function(id){
      dreFrontendFhirService.read("Medication",id)
        .then(function (res) {
          $scope.response = res;
          $scope.res_type = "success";
        })
        .catch(function (err) {
          $scope.response = err;
          $scope.res_type = "danger";
        });
    };

    $scope.getPatientMedications = function(patient_id) {
      dreFrontendFhirService.search("MedicationPrescription", {patient: patient_id})
        .then(function (res) {
          $scope.response = res;
          $scope.res_type = "success";
          res.entry[0].medication.load()
            .then(function(r){
              r.manufacturer.load();
            });
        })
        .catch(function (err) {
          $scope.response = err;
          $scope.res_type = "danger";
        });
    };

  $scope.MedicationPrescription = function() {
    dreFrontendFhirService.read("MedicationPrescription")
      .then(function (res) {
        $scope.response = res;
        $scope.res_type = "success";
        return res;
      })
      .then(function(res) {
        res.next().then(function(next_res){
          $scope.response = next_res;
          return next_res;
        })
        return(res);
      })
      .catch(function (err) {
        $scope.response = err;
        $scope.res_type = "danger";
      });
  };

    $scope.Medications = function(patient_id) {
      var medications = DreFrontendMedications.getByPatientId(patient_id)
        .then(function(res){
          console.log(res);
          $scope.response = res;
          $scope.res_type = "success";
        });
    }
});