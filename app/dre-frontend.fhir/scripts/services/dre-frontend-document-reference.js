"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendDocumentReference', function (dreFrontendFhirService) {
        return {
            getByPatientId: function (patient_id, params) {
                angular.extend(params, {author: patient_id});
                return dreFrontendFhirService.search("DocumentReference", params);
            },
            getById: function (id) {
                return dreFrontendFhirService.read('DocumentReference', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('DocumentReference');
            }
        };
    });
