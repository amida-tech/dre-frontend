"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDiagnosticReports', function (dreFrontendFhirService, fhirEnv) {

        function DiagnosticReports(data) {
            this.setData(data);
        }

        DiagnosticReports.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var diagnosticReports = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("DiagnosticReport", {patient: patient_id})
                    .then(function (response) {
                        return new DiagnosticReports(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DiagnosticReport', id)
                    .then(function (response) {
                        return new DiagnosticReports(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('DiagnosticReport')
                    .then(function (response) {
                        return new DiagnosticReports(response);
                    });
            },
        };
        return diagnosticReports;
});