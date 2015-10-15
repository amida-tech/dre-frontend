"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationDispenses', function (dreFrontendFhirService, FhirMedicationDispense) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirMedicationDispense(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirMedicationDispense(entry);
        }

        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationDispense", {patient: patient_id})
                    .then(proceedBundle);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationDispense', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationDispense')
                    .then(proceedBundle);
            }
        };
    });
