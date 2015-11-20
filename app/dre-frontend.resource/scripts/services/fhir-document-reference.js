/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirDocumentReference', function (FhirResource, dreFrontendUtil, $q, dreFrontendFhirService) {

        // reuse the original constructor
        var FhirDocumentReference = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirDocumentReference.prototype = new FhirResource();

        /* extend prototype */

        FhirDocumentReference.prototype.getContent = function () {
            var parts;
            if (this.url || this.content) {
                parts = dreFrontendUtil.parseResourceReference(this.url || this.content[0].url);
            }
            if (parts && parts.length === 4) {
                return dreFrontendFhirService.history(parts[0], parts[1], parts[3]);
            } else {
                return $q.reject("can't get content");
            }
        };

        return FhirDocumentReference;
    });

