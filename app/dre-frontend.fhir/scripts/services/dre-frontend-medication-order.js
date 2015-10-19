"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationOrder', function (dreFrontendFhirService, $q, FhirMedicationOrder) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirMedicationOrder(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirMedicationOrder(entry);
        }

        return {
            getEmpty: function () {
                return new FhirMedicationOrder();
            },
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationOrder", {patient: patient_id, "_sort:desc":"datewritten"})
                    .then(function (response) {
                        var medicationsArray = [];
                        angular.forEach(response.entry, function (resource) {
                            if (resource.medicationReference) {
                                medicationsArray.push(resource.medicationReference.load());
                            }
                        });
                        return $q.all(medicationsArray).then(function () {
                            return proceedBundle(response);
                        });
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationOrder', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationOrder')
                    .then(proceedBundle);
            }
        };
    });
