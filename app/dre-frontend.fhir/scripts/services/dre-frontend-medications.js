"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedications', function (dreFrontendFhirService, $q, $log) {

        function Medications(data) {
            this.setData(data);
        }

        Medications.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        var medications = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationPrescription", {patient: patient_id})
                    .then(function (response) {
                        $log.debug(response);
                        var medicationsArray = [];
                        angular.forEach(response.entry, function (resource) {
                            if (resource.medication) {
                                medicationsArray.push(resource.medication.load());
                            }
                        });
                        return $q.all(medicationsArray).then(function () {
                            return new Medications(response);
                        });
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Medication', id)
                    .then(function (response) {
                        return new Medications(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Medication')
                    .then(function (response) {
                        return new Medications(response);
                    });
            }
        };

        return medications;
    });
