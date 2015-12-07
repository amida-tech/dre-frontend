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
            return this.issued || this.effectiveDateTime || this.meta.lastUpdated;
        };

        FhirObservation.prototype.getQuantity = function (withUnit) {
            var res;
            if (this.valueQuantity) {
                res = this.valueQuantity.value;
                if (withUnit && (this.valueQuantity.unit || this.valueQuantity.code)) {
                    res += ' ' + (this.valueQuantity.unit || this.valueQuantity.code);
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

        FhirObservation.prototype.title = function () {
            return this.codableConceptTitle(this.code);
        };

        FhirObservation.prototype.dates = function () {
            if (angular.isDefined(this.appliesDateTime)) {
                return {startDate: this.appliesDateTime};
            } else if (this.effectiveDateTime) {
                return {startDate: this.effectiveDateTime};
            } else if (angular.isDefined(this.appliesPeriod)) {
                return {
                    startDate: this.appliesPeriod.start,
                    endDate: this.appliesPeriod.end
                };
            } else if (this.effectivePeriod) {
                return {
                    startDate: this.effectivePeriod.start,
                    endDate: this.effectivePeriod.end
                };
            } else if (angular.isDefined(this.issued)) {
                return {startDate: this.issued};
            }
            return {startDate: null};
        };

        FhirObservation.prototype.additionalInfo = function () {
            return this.measurement(true);
        };

        return FhirObservation;
    });

