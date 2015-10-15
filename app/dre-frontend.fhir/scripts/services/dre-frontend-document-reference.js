"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDocumentReference', function (dreFrontendFhirService, dreFrontendUtil, $q, FhirDocumentReference) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirDocumentReference(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirDocumentReference(entry);
        }

        return {
            DocumentReference: function (data) {
                return new DocumentReference(data);
            },
            getByPatientId: function (patient_id, params) {
                angular.extend(params, {author: patient_id});
                return dreFrontendFhirService.search("DocumentReference", params)
                    .then(proceedBundle);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DocumentReference', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('DocumentReference')
                    .then(proceedBundle);
            },
            getFileList: function (documentReferenceBundle) {
                var files = [];

                function _proceedBundle(bundle) {
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

                _proceedBundle(documentReferenceBundle);

                if (documentReferenceBundle.getPage) {
                    var pages = [];
                    for (var i = 1; i < documentReferenceBundle.total / page_size; i++) {
                        pages.push(documentReferenceBundle.getPage(i));
                    }
                    return $q.all(pages).then(function (bundles) {
                        angular.forEach(bundles, function (b) {
                            _proceedBundle(b);
                        });
                        return files;
                    });
                } else {
                    return $q.resolve(files);
                }

            }
        };
    });
