"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationAdministrations', function (dreFrontendFhirService, FhirMedicationAdministration) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirMedicationAdministration(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirMedicationAdministration(entry);
        }

        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationAdministration", {patient: patient_id})
                    .then(proceedBundle);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationAdministration', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationAdministration')
                    .then(proceedBundle);
            }
        };
});
