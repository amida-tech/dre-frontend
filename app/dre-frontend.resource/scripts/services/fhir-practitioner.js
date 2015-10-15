/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirPractitioner',function(FhirResource){

        // reuse the original constructor
        var FhirPractitioner = function() {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirPractitioner.prototype = new FhirResource();

        /* extend prototype */

        FhirPractitioner.prototype.setBaseTemplate = function () {
            angular.extend(this, {
                "resourceType": "Practitioner",
                "active": null, // Whether this practitioner's record is in active use  <boolean>
                "name": {}, // A name associated with the person HumanName
                "telecom": [], // A contact detail for the practitioner ContactPoint
                "address": [], // Where practitioner can be found/visited Address
                "gender": '' // male | female | other | unknown "<code>"
            });
        };

        return FhirPractitioner;
    });

