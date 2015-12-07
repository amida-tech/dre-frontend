"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationAdministrations', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationAdministration", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationAdministration', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationAdministration');
            }
        };
    });
