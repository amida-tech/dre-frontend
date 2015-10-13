"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedication', function (dreFrontendFhirService, $q) {

        function setData(obj, data) {
            if (data)
                angular.extend(obj, data);
        }

        function Medication(data) {
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

        function proceedBundle(bundle){
            for(var n=0; n<bundle.entry.lenght; n++){
                bundle.entry[n] = new Medication(bundle.entry[n]);
            }
            return bundle;
        }

        var medications = {
            getById: function (id) {
                return dreFrontendFhirService.read('Medication', id)
                    .then(function(medication){
                        return new Medication(medication);
                    });
            },
            getAll: function () {
                return dreFrontendFhirService.read('Medication')
                    .then(proceedBundle);
            },
            getByCode: function (code, autoCreate) {
                return dreFrontendFhirService.search('Medication', {code: code})
                    .then(proceedBundle);
            }
        };

        return medications;
    });
