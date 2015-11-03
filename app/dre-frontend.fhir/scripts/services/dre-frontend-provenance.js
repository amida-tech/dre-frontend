"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendProvenance', function (dreFrontendFhirService, dreFrontendUtil, dreFrontendDocumentReference, $q, FhirProvenance,$log) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirProvenance(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirProvenance(entry);
        }

        var get_for_resource = function(resourceType, resourceId) {
            var res = $q.reject("cannt get sources");

            if (resourceType && resourceId) {
                var params = {};
                params["target:" + resourceType] = resourceId;
                res = dreFrontendFhirService.search("Provenance", params)
                    .then(proceedBundle);
            }
            return res;
        };

        return {
            getResourceSources: function (resourceType, resourceId) {
                return get_for_resource(resourceType, resourceId)
                    .then(function(bundle){
                        $log.debug("Provenance total",bundle.total);
                        var provenances = [];
                        angular.forEach(bundle.entry,function(p){
                            provenances.push(p.getDocReferences())
                        });

                        return $q.all(provenances)
                            .then(function(doc_ref_set){
                                return _.flatten(doc_ref_set);
                            });
                    })
                    .then(function(doc_references){
                        return dreFrontendDocumentReference.getFileList({entry: doc_references});
                    });
            },
            getForResource: get_for_resource,
            getById: function (id) {
                return dreFrontendFhirService.read('Provenance', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Provenance')
                    .then(proceedBundle);
            }
        };
    });
