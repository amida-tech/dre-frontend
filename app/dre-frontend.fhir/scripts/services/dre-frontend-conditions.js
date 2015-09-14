"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendConditions', function (dreFrontendFhirService, fhirEnv) {

        function Conditions(data) {
            this.setData(data);
        }

        Conditions.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var conditions = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Condition", {patient: patient_id})
                    .then(function (response) {
                        return new Conditions(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Condition', id)
                    .then(function (response) {
                        return new Conditions(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Condition')
                    .then(function (response) {
                        return new Conditions(response);
                    });
            },
        };
        return conditions;
});