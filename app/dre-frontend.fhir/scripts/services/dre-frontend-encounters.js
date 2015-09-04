"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendEncounters', function (dreFrontendFhirService, fhirEnv) {

        function Encounters(data) {
            this.setData(data);
        }

        Encounters.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var encounters = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Encounter", {patient: patient_id})
                    .then(function (response) {
                        return new Encounters(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Encounter', id)
                    .then(function (response) {
                        return new Encounters(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Encounter')
                    .then(function (response) {
                        return new Encounters(response);
                    });
            },
        };
        return encounters;
});