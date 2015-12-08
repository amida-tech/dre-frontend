/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirDocumentReference', function (_, FhirResource, dreFrontendUtil, $q, dreFrontendFhirService) {

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

        FhirDocumentReference.prototype.getLinkData = function () {
            var data = {
                indexed: this.indexed,
                display: "User uploaded record",
                getBody: this.getContent,
                status: this.status
            };

            if (this.type && this.type.coding[0] && this.type.coding[0].display) {
                data.display = this.type.coding[0].display;
            }

            if (this.content && this.content[0]) {
                if (this.content[0].attachment) {
                    angular.extend(data, this.content[0].attachment);
                } else {
                    angular.extend(data, this.content[0]);
                }
            }

            return data;
        };

        FhirDocumentReference.prototype.dates = function() {
            var res = FhirResource.prototype.dates();
            if (this.indexed) {
                res.startDate = this.indexed;
            }
            //res.isActive = (this.status === 'current');
            return this._formatDates(res);
        };

        FhirDocumentReference.prototype.title = function() {
            return this.codableConceptTitle(this.type) || this.status;
        };

        FhirDocumentReference.prototype.additionalInfo = function () {
            var aFiles = [];
            if (this.content) {
                aFiles = _.pluck(this.content,'attachment.title');
            }
            return aFiles.join(' ');
        };

        FhirDocumentReference.prototype.getBody = FhirDocumentReference.prototype.getContent;

        return FhirDocumentReference;
    });

