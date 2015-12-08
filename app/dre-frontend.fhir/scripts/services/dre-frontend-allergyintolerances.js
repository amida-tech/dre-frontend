"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendAllergyIntolerances', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("AllergyIntolerance", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('AllergyIntolerance', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('AllergyIntolerance');
            }
        };
    });
