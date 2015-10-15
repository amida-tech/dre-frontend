"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDiagnosticOrders', function (dreFrontendFhirService, FhirResource) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirResource(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirResource(entry);
        }

        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("DiagnosticOrder", {patient: patient_id})
                    .then(proceedBundle);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DiagnosticOrder', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('DiagnosticOrder')
                    .then(proceedBundle);
            }
        };
    });
