"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendCarePlans', function (dreFrontendFhirService) {

        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("CarePlan", {patient: patient_id});
            },
            getById: function (id) {
                return dreFrontendFhirService.read('CarePlan', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('CarePlan');
            }
        };
    });
