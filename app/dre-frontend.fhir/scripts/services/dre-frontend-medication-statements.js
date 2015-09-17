"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedicationStatements', function (dreFrontendFhirService, fhirEnv) {

        function MedicationStatements(data) {
            this.setData(data);
        }

        MedicationStatements.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var medicationStatements = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("MedicationStatement", {patient: patient_id})
                    .then(function (response) {
                        return new MedicationStatements(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('MedicationStatement', id)
                    .then(function (response) {
                        return new MedicationStatements(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('MedicationStatement')
                    .then(function (response) {
                        return new MedicationStatements(response);
                    });
            },
        };
        return medicationStatements;
});