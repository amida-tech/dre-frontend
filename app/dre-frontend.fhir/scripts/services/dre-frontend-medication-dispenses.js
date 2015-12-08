"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationDispenses', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationDispense", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationDispense', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationDispense');
            }
        };
    });
