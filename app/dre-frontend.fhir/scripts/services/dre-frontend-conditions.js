"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendConditions', function (dreFrontendFhirService, FhirResource) {
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
                return dreFrontendFhirService.search("Condition", {patient: patient_id})
                    .then(proceedBundle);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Condition', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Condition')
                    .then(proceedBundle);
            }
        };
    });
