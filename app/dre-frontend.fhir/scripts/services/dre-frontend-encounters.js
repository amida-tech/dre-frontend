"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendEncounters', function (dreFrontendFhirService, $q) {
        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Encounter", {patient: patient_id})
                    .then(function (bundle) {
                        var locations = [];
                        angular.forEach(bundle.entry, function (res) {
                            angular.forEach(res.location, function (location_entry) {
                                if (location_entry.location) {
                                    locations.push(location_entry.location.load());
                                }
                            });
                        });
                        return $q.all(locations).then(function () {
                            return bundle;
                        });
                    });
            },
            getById: function (id) {
                return dreFrontendFhirService.read('Encounter', id);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Encounter');
            }
        };
    });
