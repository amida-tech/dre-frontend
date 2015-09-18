"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationAdministrations', function (dreFrontendFhirService, fhirEnv) {

        function MedicationAdministrations(data) {
            this.setData(data);
        }

        MedicationAdministrations.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var medicationAdministrations = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationAdministration", {patient: patient_id})
                    .then(function (response) {
                        return new MedicationAdministrations(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationAdministration', id)
                    .then(function (response) {
                        return new MedicationAdministrations(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationAdministration')
                    .then(function (response) {
                        return new MedicationAdministrations(response);
                    });
            },
        };
        return medicationAdministrations;
});