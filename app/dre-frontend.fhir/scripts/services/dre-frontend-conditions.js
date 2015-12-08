"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendConditions', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Condition", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Condition', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Condition');
            }
        };
    });
