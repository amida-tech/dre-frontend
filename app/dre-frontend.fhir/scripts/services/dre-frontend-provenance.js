"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendProvenance', function (dreFrontendFhirService, dreFrontendDocumentReference, $q, _) {
        var get_for_resource = function(resourceType, resourceId) {
            var res = $q.reject("cannt get sources");

            if (resourceType && resourceId) {
                var params = {};
                params["target:" + resourceType] = resourceId;
                res = dreFrontendFhirService.search("Provenance", params);
            }
            return res;
        };

        return {
            getResourceSources: function (resourceType, resourceId) {
                return get_for_resource(resourceType, resourceId)
                    .then(function(bundle){
                        var provenances = [];
                        angular.forEach(bundle.entry,function(p){
                            provenances.push(p.getDocReferences());
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
                return dreFrontendFhirService.read('Provenance', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Provenance');
            }
        };
    });
