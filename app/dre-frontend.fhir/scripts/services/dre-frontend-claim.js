"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendClaim', function (dreFrontendFhirService, $log, FhirResource) {
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
            getById: function (id) {
                return dreFrontendFhirService.read('Claim', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Claim')
                    .then(proceedBundle);
            },
            getByPatientId: function (patientId) {
                return dreFrontendFhirService.search('Claim', {patient: patientId})
                    .then(proceedBundle);
            }
        };
    });
