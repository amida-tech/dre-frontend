/**
 * Created by igi on 20.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirObservation', function (FhirResource) {

        // reuse the original constructor
        var FhirObservation = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirObservation.prototype = new FhirResource();

        /* extend prototype */

        FhirObservation.prototype.dateTime = function () {
            return this.issued || this.effectiveDateTime || entry.meta.lastUpdated;
        };

        FhirObservation.prototype.getQuantity = function (withUnit) {
            var res;
            if (this.valueQuantity) {
                res = this.valueQuantity.value;
                if (withUnit) {
                    res += ' ' + this.valueQuantity.unit;
                }
            }
            return res;
        };

        FhirObservation.prototype.measurement = function (withUnit) {

            var res = this.getQuantity(withUnit);

            if (!res) {
                res = this.valueString;
            }

            return res;
        };


        return FhirObservation;
    });

