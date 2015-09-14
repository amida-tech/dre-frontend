"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendAllergyIntolerances', function (dreFrontendFhirService, fhirEnv) {

        function AllergyIntolerances(data) {
            this.setData(data);
        }

        AllergyIntolerances.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };
        
        var allergyIntolerances = {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("AllergyIntolerance", {patient: patient_id})
                    .then(function (response) {
                        return new AllergyIntolerances(response);
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('AllergyIntolerance', id)
                    .then(function (response) {
                        return new AllergyIntolerances(response);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('AllergyIntolerance')
                    .then(function (response) {
                        return new AllergyIntolerances(response);
                    });
            },
        };
        return allergyIntolerances;
});