/**
 * Created by igi on 04.12.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirCondition', function (FhirResource) {

        // reuse the original constructor
        var FhirCondition = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirCondition.prototype = new FhirResource();

        /* extend prototype */
        FhirCondition.prototype.title = function () {
            return this.codableConceptTitle(this.code);
        };

        FhirCondition.prototype.dates = function () {
            var res = {
                startDate: null,
                endDate: null
            };

            if (this.onsetPeriod) {
                res.startDate = this.onsetPeriod.start;
                res.endDate = this.onsetPeriod.end;
            } else if (this.onsetDateTime) {
                res.startDate = this.onsetDateTime;
            }

            if (this.abatementDateTime) {
                res.endDate = this.abatementDateTime;
            } else if (this.abatementPeriod) {
                res.endDate = this.abatementPeriod.start;
            }
            return res;
        };

        return FhirCondition;
    });
