"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendPatient', function (dreFrontendFhirService) {
        return {
            getById: function (id) {
                return dreFrontendFhirService.read('Patient', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Patient');
            }
        };
    });
