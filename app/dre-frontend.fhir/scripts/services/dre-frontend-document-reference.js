"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDocumentReference', function (dreFrontendFhirService,dreFrontendUtil, $q, $log) {

        function DocumentReference(data) {
            this.setData(data);
        }

        DocumentReference.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        DocumentReference.prototype.getContent = function () {
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

        return {
            DocumentReference: function (data) {
                return new DocumentReference(data);
            },
            getByPatientId: function(patient_id,params) {
                angular.extend(params,{author:patient_id});
                return dreFrontendFhirService.search("DocumentReference",params                                                                                                                                                                                                                                         )
                    .then(function(bundle){
                        angular.forEach(bundle.entry, function (v, k) {
                            bundle.entry[k] = new DocumentReference(v);
                        });
                        return bundle;
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DocumentReference', id)
                    .then(function (response) {
                        return new DocumentReference(response);
                    });
            },
            getAll: function () {
                var patients = [];
                return dreFrontendFhirService.read('DocumentReference')
                    .then(function (bundle) {
                        angular.forEach(bundle.entry, function (v, k) {
                            bundle.entry[k] = new DocumentReference(v);
                        });
                        return bundle;
                    });
            },
            getFileList: function(documentReferenceBundle) {
                var files = [];

                function proceedBundle(bundle) {
                    angular.forEach(bundle.entry, function (doc_ref) {
                        var data = {
                            indexed: doc_ref.indexed,
                            display: "User uploaded record",
                            getBody: doc_ref.getContent,
                            status: doc_ref.status
                        };

                        if (doc_ref.type && doc_ref.type.coding[0]) {
                            angular.extend(data, doc_ref.type.coding[0]);
                        }

                        if (doc_ref.content && doc_ref.content[0]) {
                            angular.extend(data, doc_ref.content[0]);
                        }

                        files.push(data);
                    });
                }

                proceedBundle(documentReferenceBundle);

                if (documentReferenceBundle.getPage) {
                    var pages = [];
                    for (var i = 1; i < documentReferenceBundle.total / page_size; i++) {
                        pages.push(documentReferenceBundle.getPage(i));
                    }
                    return $q.all(pages).then(function (bundles) {
                        angular.forEach(bundles, function (b) {
                            proceedBundle(b);
                        });
                        return files;
                    });
                } else {
                    return $q.resolve(files);
                }

            }
        };
    });
