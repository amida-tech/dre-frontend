"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendEncounters', function (dreFrontendFhirService, $q, FhirResource) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirResource(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirResource(entry);
        }

        return {
            getByPatientId: function (patient_id) {
                return dreFrontendFhirService.search("Encounter", {patient: patient_id})
                    .then(proceedBundle)
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
                return dreFrontendFhirService.read('Encounter', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Encounter')
                    .then(proceedBundle);
            }
        };
    });
