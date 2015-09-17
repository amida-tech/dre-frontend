"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationDispenses', function (dreFrontendFhirService, fhirEnv) {

        function MedicationDispenses(data) {
            this.setData(data);
        }

        MedicationDispenses.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var medicationDispenses = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationDispense", {patient: patient_id})
                    .then(function (response) {
                        return new MedicationDispenses(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationDispense', id)
                    .then(function (response) {
                        return new MedicationDispenses(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationDispense')
                    .then(function (response) {
                        return new MedicationDispenses(response);
                    });
            },
        };
        return medicationDispenses;
});