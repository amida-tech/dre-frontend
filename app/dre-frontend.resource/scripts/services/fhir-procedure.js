/**
 * Created by igi on 07.12.15.
 */
'use strict';

angular.module('dreFrontend.resource')
    .factory('FhirProcedure', function (FhirResource) {

        // reuse the original constructor
        var FhirProcedure = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirProcedure.prototype = new FhirResource();

        /* extend prototype */
        FhirProcedure.prototype.title = function () {
            var title = this.codableConceptTitle(this.code);
            if (!title && this.focalDevice) {
                title = this.codableConceptTitle(this.focalDevice[0].action);
            }
            return title;
        };

        FhirProcedure.prototype.dates = function () {
            var res = FhirResource.prototype.dates();

            if (this.performedDateTime) {
                res.startDate = this.performedDateTime;
            }
            return this._formatDates(res);
        };

        return FhirProcedure;
    });
