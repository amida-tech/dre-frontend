"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedication', function (dreFrontendFhirService, $q) {

        function setData(obj, data) {
            if (data)
                angular.extend(obj, data);
        }

        function Medications(data) {
            setData(this, data);
        }

        Medication.prototype.baseTemplate = function () {
            return {
                "resourceType": "Medication",
                "code": {}, // Codes that identify this medication CodeableConcept
                "isBrand": false, // True if a brand <boolean>
                "manufacturer": {}, // Manufacturer of the item Reference(Organization)
                "product": { // Administrable medication details
                    "form": {code: '', display: '', source: ''} // CodeableConcept powder | tablets | carton +
                }
            };
        };

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
            },
            getByData: function (data, autoCreate) {
                console.log(data);
                return dreFrontendFhirService.search('Medication', {code: data.rxcui})
            }
        };

        return medications;
    });
