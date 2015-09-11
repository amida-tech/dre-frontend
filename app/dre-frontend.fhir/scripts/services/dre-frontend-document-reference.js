"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDocumentReference', function (dreFrontendFhirService, $q, $log) {

        function DocumentReference(data) {
            this.setData(data);
        }

        DocumentReference.prototype.setData = function (data) {
            if (data)
                angular.extend(this, data);
        };

        DocumentReference.prototype.getContent = function () {

            $log.debug(this);
            var expr = /([\w\d]+?\/){2}_history\/.+?$/;
            var query = expr.exec(this.url || this.content[0].url);
            var parts = query[0].split('/');
            if (parts && parts.length === 4)
                return dreFrontendFhirService.history(parts[0],parts[1],parts[3]);
            else
                return $q.reject("cannt get content");
        };

        return {
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
            }
        };
    });
