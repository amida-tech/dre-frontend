/**
 * Created by igi on 04.12.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirAllergyIntolerances', function (FhirResource) {

        // reuse the original constructor
        var FhirAllergyIntolerances = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirAllergyIntolerances.prototype = new FhirResource();

        /* extend prototype */
        FhirAllergyIntolerances.prototype.title = function () {
            return this.codableConceptTitle(this.substance);
        };

        FhirAllergyIntolerances.prototype.dates = function () {
            var res = {
                startDate: null,
                endDate: null,
                isActive: true,
                isInactive: false
            };

            res.isActive = (this.status.toLowerCase() === 'active' || this.status.toLowerCase() === 'yes');
            res.isInactive = !res.isActive;

            if (this.reaction && this.reaction.onset) {
                res.startDate = this.reaction.onset;
                if (!res.isActive) {
                    res.endDate = this.lastOccurence ? this.lastOccurence : null;
                }
            } else {
                res.startDate = this.lastOccurence ? this.lastOccurence : null;
            }
            return res;
        };

        FhirAllergyIntolerances.prototype.additionalInfo = function () {
            if (angular.isDefined(this.event) && this.event.length !== 0) {
                if (angular.isDefined(this.event[0].manifestation) && this.event[0].manifestation.length === 2) {
                    return this.codableConceptTitle(this.event[0].manifestation[1]);
                }
            }
            return '';
        };

        return FhirAllergyIntolerances;
    });
