"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDiagnosticReports', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("DiagnosticReport", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DiagnosticReport', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('DiagnosticReport');
            }
        };
    });
