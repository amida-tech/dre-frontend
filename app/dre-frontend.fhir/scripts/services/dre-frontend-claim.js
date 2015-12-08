"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendClaim', function (dreFrontendFhirService) {
        return {
            getById: function (id) {
                return dreFrontendFhirService.read('Claim', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Claim');
            },
            getByPatientId: function (patientId) {
                return dreFrontendFhirService.search('Claim', {patient: patientId});
            }
        };
    });
