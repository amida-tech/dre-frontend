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
            var res = FhirResource.prototype.dates();

            if (this.effectivePeriod) {
                res.startDate = this.effectivePeriod.start;
                res.endDate = this.effectivePeriod.end;
            } else if (this.appliesPeriod) {
                res.startDate = this.appliesPeriod.start;
                res.endDate = this.appliesPeriod.end;
            } else if (this.effectiveDateTime) {
                res.startDate = this.effectiveDateTime;
            } else if (this.appliesDateTime) {
                res.startDate = this.appliesDateTime;
            } else if (this.issued) {
                res.startDate = this.issued;
            }
            return this._formatDates(res);
        };

        FhirObservation.prototype.additionalInfo = function () {
            return this.measurement(true);
        };

        return FhirObservation;
    });

