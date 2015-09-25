"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendProvenance', function (dreFrontendFhirService, dreFrontendUtil, dreFrontendDocumentReference, $q, $log) {

        function Provenance(data) {
            this.setData(data);
        }

        Provenance.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        Provenance.prototype.getDocReferences = function () {
            var doc_refs = [];

            if (this.entity) {
                angular.forEach(this.entity, function(entity){
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

        var get_for_resource = function(resourceType, resourceId) {
            var res = $q.reject("cannt get sources");

            if (resourceType && resourceId) {
                var params = {};
                params["target:" + resourceType] = resourceId;
                res = dreFrontendFhirService.search("Provenance", params)
                    .then(function(provenance_bundle) {
                        angular.forEach(provenance_bundle.entry, function(provenance, k){
                            provenance_bundle.entry[k] = new Provenance(provenance);
                        });
                        return provenance_bundle;
                    });
            }
            return res;
        };

        return {
            getResourceSources: function (resourceType, resourceId) {
                return get_for_resource(resourceType, resourceId)
                    .then(function(bundle){
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
                    .then(function (response) {
                        return new Provenance(response);
                    });
            },
            getAll: function () {
                var patients = [];
                return dreFrontendFhirService.read('Provenance')
                    .then(function (bundle) {
                        angular.forEach(bundle.entry, function (v, k) {
                            bundle.entry[k] = new Provenance(v);
                        });
                        return bundle;
                    });
            }
        };
    });
