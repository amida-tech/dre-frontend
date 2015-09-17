"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendImmunizations', function (dreFrontendFhirService, fhirEnv) {

        function Immunizations(data) {
            this.setData(data);
        }

        Immunizations.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var immunizations = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Immunization", {patient: patient_id})
                    .then(function (response) {
                        return new Immunizations(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Immunization', id)
                    .then(function (response) {
                        return new Immunizations(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Immunization')
                    .then(function (response) {
                        return new Immunizations(response);
                    });
            },
        };
        return immunizations;
});