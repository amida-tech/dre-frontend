/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirMedication',function(FhirResource){

        // reuse the original constructor
        var FhirMedication = function() {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirMedication.prototype = new FhirResource();

        /* extend prototype */

        FhirMedication.prototype.setBaseTemplate = function () {
            angular.extend(this, {
                "resourceType": "Medication",
                "code": {}, // Codes that identify this medication CodeableConcept
                "isBrand": null, // True if a brand <boolean>
                "manufacturer": {} // Manufacturer of the item Reference(Organization)
            });
        };


        return FhirMedication;
    });

