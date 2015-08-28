'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FhirCtrl
 * @description
 * # FhirCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp').controller('FhirCtrl', function ($scope, dreFrontendFhirService, DreFrontendMedications) {

  function success_handler(response) {
    $scope.response = response;
    $scope.res_type = "success";
    return response;
  }

  function fail_handler(response) {
    $scope.response = response;
    $scope.res_type = "danger";
    return response;
  }

    $scope.getPatients = function(){
        dreFrontendFhirService.read("Patient")
          .then(success_handler)
          .catch(fail_handler);
    };
    $scope.getPatient = function(id){
      dreFrontendFhirService.read("Patient", id)
        .then(success_handler)
        .catch(fail_handler);
    };
    $scope.getMedications = function(){
        DreFrontendMedications.getAll()
          .then(success_handler)
          .catch(fail_handler);
    };
    $scope.getMedication = function(id){
      DreFrontendMedications.getById(id)
        .then(success_handler)
        .catch(fail_handler);
    };

    $scope.Medications = function(patient_id) {
      DreFrontendMedications.getByPatientId(patient_id)
        .then(success_handler)
        .catch(fail_handler);
    }
});
