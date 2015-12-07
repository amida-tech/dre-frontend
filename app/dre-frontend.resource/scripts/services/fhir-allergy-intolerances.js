/**
 * Created by igi on 04.12.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirAllergyIntolerance', function (FhirResource) {

        // reuse the original constructor
        var FhirAllergyIntolerance = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirAllergyIntolerance.prototype = new FhirResource();

        /* extend prototype */
        FhirAllergyIntolerance.prototype.title = function () {
            return this.codableConceptTitle(this.substance);
        };

        FhirAllergyIntolerance.prototype.dates = function () {
            var res = FhirResource.prototype.dates();

            res.isActive = (this.status.toLowerCase() === 'active' || this.status.toLowerCase() === 'yes');

            if (this.reaction && this.reaction.onset) {
                res.startDate = this.reaction.onset;
                if (!res.isActive) {
                    res.endDate = this.lastOccurence ? this.lastOccurence : null;
                }
            } else {
                res.startDate = this.lastOccurence ? this.lastOccurence : null;
            }

            return this._formatDates(res);
        };

        FhirAllergyIntolerance.prototype.additionalInfo = function () {
            if (angular.isDefined(this.event) && this.event.length !== 0) {
                if (angular.isDefined(this.event[0].manifestation) && this.event[0].manifestation.length === 2) {
                    return this.codableConceptTitle(this.event[0].manifestation[1]);
                }
            }
            return '';
        };

        return FhirAllergyIntolerance;
    });
