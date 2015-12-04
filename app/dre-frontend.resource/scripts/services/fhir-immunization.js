/**
 * Created by igi on 21.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirImmunization', function (FhirResource) {

        // reuse the original constructor
        var FhirImmunization = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirImmunization.prototype = new FhirResource();

        /* extend prototype */
        FhirImmunization.prototype.title = function() {
            return this.codableConceptTitle(this.vaccineCode);
        };

        FhirImmunization.prototype.dates = function() {
            return {
                startDate: this.date ? this.date : null
            };
        };

        return FhirImmunization;
    });
