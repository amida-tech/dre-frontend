"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDiagnosticOrders', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("DiagnosticOrder", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DiagnosticOrder', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('DiagnosticOrder');
            }
        };
    });
