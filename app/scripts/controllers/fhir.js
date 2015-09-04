'use strict';

/**
 * @ngdoc function
 * @name dreFrontendApp.controller:FhirCtrl
 * @description
 * # FhirCtrl
 * Controller of the dreFrontendApp
 */
angular.module('dreFrontendApp')
    .controller('FhirCtrl',
    function ($scope,
              $log,
              dreFrontendFhirService,
              dreFrontendMedications,
              dreFrontendObservations,
              dreFrontendPatient,
              dreFrontendEncounters
    ) {

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

        $scope.getPatients = function () {
            dreFrontendPatient.getAll()
                .then(function (bundle) {
                    bundle.entry[0].official_name = bundle.entry[0].getOfficialName();
                    $scope.response = bundle;
                    $scope.res_type = "success";
                    return bundle;
                })
                .catch(fail_handler);
        };

        $scope.getPatient = function (id) {
            dreFrontendPatient.getById(id)
                .then(function (patient) {
                    $scope.response = patient;
                    $scope.response.official_name = patient.getOfficialName();
                    $scope.res_type = "success";
                    return patient;
                })
                .catch(fail_handler);
        };

        $scope.getMedications = function () {
            dreFrontendMedications.getAll()
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getMedication = function (id) {
            dreFrontendMedications.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.Medications = function (patient_id) {
            dreFrontendMedications.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getWeightHistory = function (patient_id) {
            dreFrontendObservations.getWeightHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getHeightHistory = function (patient_id) {
            dreFrontendObservations.getHeightHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastWeight = function (patient_id) {
            dreFrontendObservations.getLastWeight(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastHeight = function (patient_id) {
            dreFrontendObservations.getLastHeight(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastBMI = function(patient_id){
            dreFrontendObservations.getLastBMI(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getBMIHistory = function(patient_id){
            dreFrontendObservations.getBMIHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getBloodPressureSystolicHistory = function(patient_id){
            dreFrontendObservations.getBloodPressureSystolicHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getBloodPressureDiastolicHistory = function(patient_id){
            dreFrontendObservations.getBloodPressureDiastolicHistory(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastBloodPressureSystolic = function(patient_id){
            dreFrontendObservations.getLastBloodPressureSystolic(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getLastBloodPressureDiastolic = function(patient_id){
            dreFrontendObservations.getLastBloodPressureDiastolic(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };
        
        $scope.getEncounters = function(patient_id){
            dreFrontendEncounters.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getTestResults = function (patient_id) {
            dreFrontendObservations.getTestResults(patient_id,50)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getVitalSigns = function (patient_id) {
            dreFrontendObservations.getVitalSigns(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.loadData = function () {
            $scope.response = [];
            $scope.res_type = "success";
            angular.forEach(_.pluck(fhir_data, "resource"), function (res) {
                var res_body = _.omit(res, ["meta", "id"]);
                /* change reference path before loading */
                res_body.subject = {reference : "Patient/3768"};
                res_body.performer = [];
                dreFrontendFhirService.create(res.resourceType, res_body)
                    .then(function (r) {
                        $scope.response.push(res_body.code.coding[0].display);
                    });
            });
        };
        /* paste data in array below */
        var fhir_data = [];
    });
