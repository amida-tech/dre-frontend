"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDocumentReference', function (dreFrontendFhirService, dreFrontendUtil, $q,
                                                       FhirDocumentReference) {
        function proceedEntry(entry) {
            return new FhirDocumentReference(entry);
        }

        function proceedDocRef(doc_ref) {
            var data = {
                indexed: doc_ref.indexed,
                display: "User uploaded record",
                getBody: doc_ref.getContent,
                status: doc_ref.status
            };

            if (doc_ref.type && doc_ref.type.coding[0] && doc_ref.type.coding[0].display) {
                data.display = doc_ref.type.coding[0].display;
            }

            if (doc_ref.content && doc_ref.content[0]) {
                if (doc_ref.content[0].attachment) {
                    angular.extend(data, doc_ref.content[0].attachment);
                } else {
                    angular.extend(data, doc_ref.content[0]);
                }
            }

            return data;
        }

        return {
            DocumentReference: proceedEntry,
            getByPatientId: function (patient_id, params) {
                angular.extend(params, {author: patient_id});
                return dreFrontendFhirService.search("DocumentReference", params);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DocumentReference', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('DocumentReference');
            },

            getFileList: function (documentReferenceBundle) {
                var files = [];

                function _proceedBundle(bundle) {
                    angular.forEach(bundle.entry, function (doc_ref) {
                        files.push(proceedDocRef(doc_ref));
                    });
                }

                _proceedBundle(documentReferenceBundle);

                if (documentReferenceBundle.getPage) {
                    var pages = [];
                    for (var i = 1; i < documentReferenceBundle.total / dreFrontendFhirService.getCount() +1; i++) {
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
