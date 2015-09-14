"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDiagnosticOrders', function (dreFrontendFhirService, fhirEnv) {

        function DiagnosticOrders(data) {
            this.setData(data);
        }

        DiagnosticOrders.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var diagnosticOrders = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("DiagnosticOrder", {patient: patient_id})
                    .then(function (response) {
                        return new DiagnosticOrders(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DiagnosticOrder', id)
                    .then(function (response) {
                        return new DiagnosticOrders(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('DiagnosticOrder')
                    .then(function (response) {
                        return new DiagnosticOrders(response);
                    });
            },
        };
        return diagnosticOrders;
});