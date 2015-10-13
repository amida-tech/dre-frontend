"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationPrescriptions', function (dreFrontendFhirService, fhirEnv) {

        function MedicationPrescriptions(data) {
            this.setData(data);
        }

        MedicationPrescriptions.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        var medicationPrescriptions = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationPrescription", {patient: patient_id})
                    .then(function (response) {
                        return new MedicationPrescriptions(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationPrescription', id)
                    .then(function (response) {
                        return new MedicationPrescriptions(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationPrescription')
                    .then(function (response) {
                        return new MedicationPrescriptions(response);
                    });
            }
        };
        return medicationPrescriptions;
});
