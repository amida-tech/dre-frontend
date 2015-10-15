/**
 * Created by igi on 15.10.15.
 */
"use strict";

angular.module('dreFrontend.resource')
    .factory('FhirProvenance', function (FhirResource, dreFrontendDocumentReference, dreFrontendFhirService, dreFrontendUtil, $q) {

        // reuse the original constructor
        var FhirProvenance = function () {
            FhirResource.apply(this, arguments);
        };

        // reuse the original prototype
        FhirProvenance.prototype = new FhirResource();

        /* extend prototype */

        FhirProvenance.prototype.getDocReferences = function () {
            var doc_refs = [];

            if (this.entity) {
                angular.forEach(this.entity, function (entity) {
                    var path = dreFrontendUtil.parseResourceReference(entity.reference);
                    if (path && path.length === 4) {
                        doc_refs.push(dreFrontendFhirService.history(path[0], path[1], path[3])
                            .then(function (doc_ref) {
                                return dreFrontendDocumentReference.DocumentReference(doc_ref);
                            }));
                    }
                });
                return $q.all(doc_refs);
            } else {
                return $q.resolve(doc_refs);
            }
        };

        return FhirProvenance;
    });

