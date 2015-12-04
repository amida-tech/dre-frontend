"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendConditions', function (dreFrontendFhirService, FhirCondition) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirCondition(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirCondition(entry);
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
