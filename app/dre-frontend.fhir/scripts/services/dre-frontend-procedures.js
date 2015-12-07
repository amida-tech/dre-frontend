"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendProcedures', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Procedure", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Procedure', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Procedure');
            }
        };
    });
