"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedication', function (dreFrontendFhirService, $q) {

        function setData(obj,data) {
            if (data)
                angular.extend(obj,data);
        }

        function Medications(data) {
            setData(this,data);
        }

        var medications = {
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
