"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendImmunizations', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Immunization", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Immunization', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Immunization');
            }
        };
    });
