/**
 * Created by igi on 07.12.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirEncounter', function (FhirResource) {

        // reuse the original constructor
        var FhirEncounter = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirEncounter.prototype = new FhirResource();

        /* extend prototype */
        FhirEncounter.prototype.title = function () {
            return this.codableConceptTitle(this.type);
        };

        FhirEncounter.prototype.dates = function () {
            var res = FhirResource.prototype.dates();

            if (this.entryPeriod) {
                res.startDate = this.entryPeriod.start;
                res.endDate = this.entryPeriod.end;
            } else if (this.period) {
                res.startDate = this.period.start;
                res.endDate = this.period.end;
            }
            return this._formatDates(res);
        };

        FhirEncounter.prototype.additionalInfo = function () {
            return (angular.isArray(this.location) && this.location.length > 0 && this.location[0].location) ? this.location[0].location.name : '';
        };

        return FhirEncounter;
    });
