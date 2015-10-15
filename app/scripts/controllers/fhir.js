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
              $q,
              dreFrontendFhirService,
              dreFrontendMedications,
              dreFrontendObservations,
              dreFrontendPatient,
              dreFrontendEncounters,
              dreFrontendPractitioners,
              dreFrontendAllergyIntolerances,
              dreFrontendCarePlans,
              dreFrontendConditions,
              dreFrontendDiagnosticOrders,
              dreFrontendDiagnosticReports,
              dreFrontendImmunizations,
              dreFrontendMedicationAdministrations,
              dreFrontendMedicationDispenses,
              dreFrontendMedicationStatements,
              dreFrontendProcedures,
              dreFrontendProvenance,
              dreFrontendDocumentReference
    ) {

        function success_handler(response) {
            $log.debug(response);
            $scope.response = response;
            $scope.res_type = "success";
            return response;
        }

        function fail_handler(response) {
            $log.debug(response);
            $scope.response = response;
            $scope.res_type = "danger";
            return response;
        }

        $scope.getPatients = function () {
            dreFrontendPatient.getAll()
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getPatient = function (id) {
            dreFrontendPatient.getById(id)
                .then(success_handler)
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
                .then(function(bundle){
                    return bundle.entry[0].loadAll(3).then(function(){return bundle;});
                })
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

        $scope.getPractitioners = function(){
            dreFrontendPractitioners.getAll()
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getAllergyIntolerance = function(id){
            dreFrontendAllergyIntolerances.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getAllergyIntolerances = function(patient_id){
            dreFrontendAllergyIntolerances.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getPractitioner = function(id){
            dreFrontendPractitioners.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getCarePlans = function(patient_id){
            dreFrontendCarePlans.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getCarePlan = function(id){
            dreFrontendCarePlans.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getConditions = function(patient_id){
            dreFrontendConditions.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getCondition = function(id){
            dreFrontendConditions.getById(id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getDiagnosticOrders = function(patient_id){
            dreFrontendDiagnosticOrders.getByPatientId(patient_id)
                .then(success_handler)
                .catch(fail_handler);
        };

        $scope.getDiagnosticOrder = function(id){
            dreFrontendDiagnosticOrders.getById(id)
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

        $scope.uploadError = function(fileItem, response, status, headers) {
            console.log(response);
            $scope.response = response.issue;
            $scope.res_type = "danger";
        };
        $scope.uploadSuccess = function(fileItem, response, status, headers) {
            var issues = [];
            angular.forEach(_.pluck(response.entry, "resource"), function(v,k){
                if (v && v.resourceType === "OperationOutcome") {
                    angular.merge(issues, v.issue);
                }
            });
            $scope.response = issues;
            $scope.res_type = "success";
        };

        $scope.updatePatient = function() {
            $scope.response = [];
            $scope.res_type = "success";
            dreFrontendFhirService.update(fhir_data[0].resourceType,fhir_data[0].id, fhir_data[0])
                .then(function (r) {
                    $scope.response = r;
                });
        };

        $scope.getSources = function(type,id) {
            dreFrontendProvenance.getResourceSources(type, id)
                .then(function(sources){
                    $scope.sources = sources;
                    return sources;
                })
                .then(success_handler);
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
        var fhir_data = [ {
                "resourceType":"Observation",
                "id":"104972",
                "text":{
                    "status":"generated",
                    "div":"<div xmlns=\"http://www.w3.org/1999/xhtml\">2009-05-14: weight = 88.133 kg</div>"
                },
                "status":"final",
                "category": {
                  "coding":[{
                      "code": "vital-signs",
                      "display": "Vital Signs"
                  }]
                },
                "code":{
                    "coding":[
                        {
                            "system":"http://loinc.org",
                            "code":"3141-9",
                            "display":"weight"
                        }
                    ]
                },
                "subject":{
                    "reference":"Patient/104809"
                },
                "encounter":{
                    "reference":"Encounter/104824"
                },
                "valueQuantity":{
                    "value":88.133,
                    "system":"http://unitsofmeasure.org",
                    "code":"kg"
                }
            }];
    });
