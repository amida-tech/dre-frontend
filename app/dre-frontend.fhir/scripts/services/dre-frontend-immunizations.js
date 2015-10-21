"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendImmunizations', function (dreFrontendFhirService, FhirImmunization) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirImmunization(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirImmunization(entry);
        }

        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Immunization", {patient: patient_id})
                    .then(proceedBundle);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Immunization', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Immunization')
                    .then(proceedBundle);
            }
        };
    });
