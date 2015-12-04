"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendAllergyIntolerances', function (dreFrontendFhirService, FhirAllergyIntolerances) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirAllergyIntolerances(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirAllergyIntolerances(entry);
        }

        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("AllergyIntolerance", {patient: patient_id})
                    .then(proceedBundle);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('AllergyIntolerance', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('AllergyIntolerance')
                    .then(proceedBundle);
            }
        };
    });
