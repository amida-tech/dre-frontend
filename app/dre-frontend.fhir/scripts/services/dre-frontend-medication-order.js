"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationOrder', function (dreFrontendFhirService, $q, FhirMedicationOrder) {
        return {
            getEmpty: function () {
                return new FhirMedicationOrder();
            },
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService
                    .search("MedicationOrder", {
                        patient: patient_id,
                        "_sort:desc": "datewritten"
                    })
                    .then(function (response) {
                        var medicationsArray = [];
                        angular.forEach(response.entry, function (resource) {
                            if (resource.medicationReference) {
                                medicationsArray.push(resource.medicationReference.load());
                            }
                        });
                        return $q.all(medicationsArray).then(function () {
                            return response;
                        });
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationOrder', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationOrder');
            }
        };
    });
