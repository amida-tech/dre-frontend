"use strict";

angular.module('dreFrontend.fhir')
    .factory('dreFrontendMedication', function (dreFrontendFhirService, $q, FhirMedication) {
        function proceedBundle(bundle) {
            for (var n = 0; n < bundle.entry.length; n++) {
                bundle.entry[n] = new FhirMedication(bundle.entry[n]);
            }
            return bundle;
        }

        function proceedEntry(entry) {
            return new FhirMedication(entry);
        }

        return {
            getById: function (id) {
                return dreFrontendFhirService.read('Medication', id)
                    .then(proceedEntry);
            },
            getAll: function () {
                return dreFrontendFhirService.read('Medication')
                    .then(proceedBundle);
            },
            getByCode: function (code) {
                return dreFrontendFhirService.search('Medication', {code: code})
                    .then(proceedBundle);
            },
            getByRxNormData: function (data, forceCreate) {
                return dreFrontendFhirService.search('Medication', {code: "RxNorm|" + data.rxcui})
                    .then(function (bundle) {
                        var result;

                        if (bundle.entry.length < 1) {
                            if (forceCreate) {
                                var medication = new FhirMedication();
                                medication.setBaseTemplate();
                                angular.extend(medication, {
                                    code: {
                                        coding: [
                                            {
                                                system: "RxNorm",
                                                code: data.rxcui,
                                                display: data.name
                                            }
                                        ],
                                        text: data
                                    }
                                });
                                result = medication.save();
                            } else {
                                result = $q.reject('No medication data found');
                            }
                        } else {
                            result = new FhirMedication(bundle.entry[0]);
                        }
                        return result;
                    });
            }
        };
    });
