/**
 * Created by igi on 07.12.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirClaim', function (FhirResource) {

        // reuse the original constructor
        var FhirClaim = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirClaim.prototype = new FhirResource();

        /* extend prototype */
        FhirClaim.prototype.title = function () {
            var title = FhirResource.prototype.title();

            if (this.identifier && this.identifier[0] && this.identifier[0].value) {
                title = this.identifier[0].value;
            }

            return title;
        };

        FhirClaim.prototype.dates = function () {
            var res = FhirResource.prototype.dates();

            if (this.created) {
                res.startDate = this.created;
            }
            return res;
        };

        return FhirClaim;
    });
