"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationStatements', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationStatement", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationStatement', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationStatement');
            }
        };
    });
