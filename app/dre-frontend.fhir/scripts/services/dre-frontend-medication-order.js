"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationOrder', function (dreFrontendFhirService, $q) {

        function setData(obj,data) {
            if (data)
                angular.extend(obj,data);
        }

        function Medications(data) {
            setData(this,data);
        }

        var medications = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationOrder", {patient: patient_id})
                    .then(function (response) {
                        var medicationsArray = [];
                        angular.forEach(response.entry, function (resource) {
                            if (resource.medicationReference) {
                                medicationsArray.push(resource.medicationReference.load());
                            }
                        });
                        return $q.all(medicationsArray).then(function () {
                            return new Medications(response);
                        });
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationOrder', id)
                    .then(function (response) {
                        return new Medications(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationOrder')
                    .then(function (response) {
                        return new Medications(response);
                    });
            },
            save: function(entry, medication, prescriber) {

            }
        };

        return medications;
    });
